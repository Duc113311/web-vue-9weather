import { groupTidesByDate } from "@/utils/middleware";
import { httpTides } from "../../configs/http-weather";
const state = {
  tideData: {},
  heightsData: [],
  datumsData: {},
  extremesData: [],
  extremesDataFull: [],
  timestampCurrent: "",
};

const getters = {
  extremesDataGetters(state) {
    return state.extremesData.slice(0, 6);
  },

  datumsDataGetters(state) {
    return state.datumsData;
  },

  heightsDataGetters(state) {
    return state.heightsData;
  },

  tideDataGetters(state) {
    return state.tideData;
  },

  extremesDataFullGetters(state) {
    return state.extremesDataFull.slice(0, 30);
  },
};

const mutations = {
  setTidesDataMutation(state, data) {
    debugger;
    state.tideData = data;

    console.log("tideData", state.tideData);

    // state.extremesData = groupTidesByDate(data.extremes);

    state.extremesData = data.extremes;
    state.extremesDataFull = data.extremes;

    state.datumsData = data.datums;
    state.timestampCurrent = data.timestamp;
    state.heightsData = data.heights;
  },
};

const actions = {
  async getTidesData({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpTides
        .post(
          `api/getTides?keyPrivate=${data.keyPrivate}&duration=${data.duration}&interval=${data.interval}&timestamp=${data.timestamp}&station_id=${data.station_id}&datum=${data.datum}`
        ) // 👈 Chuẩn Axios params
        .then((response) => {
          if (response.status === 200) {
            commit("setTidesDataMutation", response.data);
            resolve(response.data);
          } else {
            reject("Error: API returned non-200 status");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
