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

  newArray: [],
};

/**
 * Getters
 */
const getters = {
  cityCountryGetters(state) {
    return state.cityCountry;
  },

  currentlyGetters(state) {
    return state.cityCountry;
  },

  locationOffsetGetters(state) {
    return state.locationOffset;
  },

  dailyDataGetters(state) {
    return state.dailyData;
  },

  hourly24hGetters(state) {
    return state.hourly24h;
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
      state.locationOffset.latitude = state.weatherCurrentData.latitude;
      state.locationOffset.longitude = state.weatherCurrentData.longitude;
      state.locationOffset.offset = state.weatherCurrentData.offset;

      state.currently = state.weatherCurrentData.currently;
      state.dailyOne = state.weatherCurrentData.daily.data[0];
      state.hourly24h = state.weatherCurrentData.hourly.data.slice(0, 24);
      state.hourly48h = state.weatherCurrentData.hourly.data;
      state.dailyData = state.weatherCurrentData.daily.data;
    }
  },

  setCityWeather(state, data) {
    state.cityCountry = data;
    state.countryFilter = data;
  },

  setFormattedAddress(state, data) {
    const jsonValue = decodeBase64(data);
    if (!jsonValue) {
      return;
    }
    const listResultAddress = JSON.parse(jsonValue);
    const addressResult = listResultAddress.results;
    state.newArray = [];
    for (let index = 0; index < addressResult.length; index++) {
      const element = addressResult[index];
      const lastElement =
        element.address_components[element.address_components.length - 1];

      const objectAddress = {
        value: element.formatted_address,
        country: lastElement.long_name,
        lat: element.geometry.location.lat,
        lng: element.geometry.location.lng,
      };
      state.newArray.push(objectAddress);
    }
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

  async getFormattedAddress({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setFormattedAddress", response.data);
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
