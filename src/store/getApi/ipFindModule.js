import { httpIpFind } from "../../configs/http-weather";

const state = {
  ipLocation: "",
};

const getters = {};

const mutations = {
  setIpLocation(state, data) {
    state.ipLocation = data;
  },
};

const actions = {
  /**
   * API Get IP Location
   * @param {*} param0
   * @param {*} authKey
   * @returns
   */
  async getIpLocation({ commit }, authKey) {
    return new Promise((resolve, reject) => {
      httpIpFind
        .get(`me?auth=${authKey}`)
        .then((response) => {
          if (response.status === 200) {
            // commit("setIpLocation", response.data);
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
