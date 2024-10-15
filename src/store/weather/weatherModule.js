import { httpWeather } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";

/**
 * State
 */
const state = {
  weatherCurrentData: {},

  locationOffset: {
    latitude: "",
    longitude: "",
    offset: 0,
  },

  currently: {},
  dailyOne: {},
  hourly24h: [],
  hourly48h: [],
  dailyData: [],

  cityCountry: {},
};

/**
 * Getters
 */
const getters = {
  cityCountryValue(state) {
    return state.cityCountry;
  },
};

/**
 * Mutations
 */
const mutations = {
  /**
   * Xét giá trị Weather Current Data
   * @param {*} state
   * @param {*} data
   */
  setWeatherDataCurrent(state, data) {
    state.weatherCurrentData = JSON.parse(decodeBase64(data));
    console.log("state.weatherCurrentData", state.weatherCurrentData);
    if (state.weatherCurrentData) {
      state.locationOffset.latitude = state.weatherData.latitude;
      state.locationOffset.longitude = state.weatherData.longitude;
      state.locationOffset.offset = state.weatherData.offset;

      state.currently = state.weatherData.currently;
      state.dailyOne = state.weatherData.daily.data[0];
      state.hourly24h = state.weatherData.hourly.data.slice(0, 24);
      state.hourly48h = state.weatherData.hourly.data;
      state.dailyData = state.weatherData.daily.data;
    }
  },

  setCityWeather(state, data) {
    state.cityCountry = data;
    state.countryFilter = data;
  },
};

/**
 * Actions
 */
const actions = {
  /**
   * API Get Weather By Location
   * @param {*} param0
   * @param {*} data
   * @returns
   */
  async getWeatherDataCurrent({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setWeatherDataCurrent", response.data);
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

  /**
   * Get Data lat,long Weather
   * @param {*} param0
   * @param {*} data
   * @returns
   */
  async getWeatherDataIp({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            debugger;
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
