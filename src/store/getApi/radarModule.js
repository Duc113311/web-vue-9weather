import { httpRadar } from "../../configs/http-weather";

const state = {
  radarData: "",
};

const getters = {};

const mutations = {
  setRadarData(state, data) {
    state.radarData = data;
  },
};

const actions = {
  /**
   * API Get Radar Data
   * @param {*} param0
   * @param {*} data
   * @returns
   */
  async getRadarData({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpRadar
        .get(`sradar/${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setRadarData", response.data);
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
  state,
  getters,
  mutations,
  actions,
};
