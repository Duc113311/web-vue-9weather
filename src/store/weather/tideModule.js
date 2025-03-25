import { httpTides } from "../../configs/http-weather";

const state = {
  tideData: {},
};

const getters = {};

const mutations = {
  setTidesDataMutation(state, data) {
    state.tideData = data;

    state.extremesData = data.extremes;
    state.datumsData = data.datums;
    state.timestampCurrent = data.timestamp;
  },
};

const actions = {
  async getTidesData({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpTides
        .get(`api/getTides?${data}`)
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
