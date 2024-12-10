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

  listDaily30Day: [],

  suggestionsTop100: [],
};

/**
 * Getters
 */
const getters = {
  cityCountryGetters(state) {
    return state.cityCountry;
  },

  currentlyGetters(state) {
    return state.currently;
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

  dailyOneGetters(state) {
    return state.dailyOne;
  },

  suggestionsTop100Getters(state) {
    return state.suggestionsTop100;
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

    debugger;

    const addressResult = listResultAddress.results;
    state.newArray = [];
    for (let index = 0; index < addressResult.length; index++) {
      const element = addressResult[index];
      console.log("element-search", element);

      // const lastElement =
      //   element.address_components[element.address_components.length - 1];
      debugger;
      let objectPush = {};
      const valueCountry = element.address_components.find((x) =>
        ["country", "political"].every((type) => x.types.includes(type))
      ) || { long_name: "" };

      if (valueCountry.long_name === "Vietnam") {
        const nameCity = element.address_components.find((x) =>
          ["administrative_area_level_1", "political"].every((type) =>
            x.types.includes(type)
          )
        ) || { long_name: "" };
        const nameDistrict = element.address_components.find((x) =>
          ["administrative_area_level_2", "political"].every((type) =>
            x.types.includes(type)
          )
        ) ||
          element.address_components.find((x) =>
            ["locality", "political"].every((type) => x.types.includes(type))
          ) || { long_name: "" };

        const nameWard = element.address_components.find((x) =>
          ["political", "sublocality", "sublocality_level_1"].every((type) =>
            x.types.includes(type)
          )
        ) || { long_name: "" };

        objectPush.country = valueCountry.long_name;
        objectPush.country_key = valueCountry.short_name;
        objectPush.city = nameCity.long_name;
        objectPush.district = nameDistrict.long_name;
        objectPush.ward = nameWard.long_name;
        (objectPush.address = element.formatted_address),
          (objectPush.lat = element.geometry.location.lat),
          (objectPush.lng = element.geometry.location.lng);
      } else {
        debugger;
        const nameCity = element.address_components.find((x) =>
          ["locality", "political"].every((type) => x.types.includes(type))
        ) || { long_name: "" };

        const nameDistrict = element.address_components.find((x) =>
          ["administrative_area_level_1", "political"].every((type) =>
            x.types.includes(type)
          )
        ) || { long_name: "" };
        if (valueCountry.long_name.length !== 0) {
          objectPush.country = valueCountry.long_name;
          objectPush.city = nameCity.long_name;
          objectPush.district = nameDistrict.long_name;
          (objectPush.address = element.formatted_address),
            (objectPush.lat = element.geometry.location.lat),
            (objectPush.lng = element.geometry.location.lng);
        }
      }

      // const valueCity = element.address_components.find((x) =>
      //   ["locality", "political"].every((type) => x.types.includes(type))
      // ) || { long_name: "" };

      // const valueDistrict = element.address_components.find((x) =>
      //   ["administrative_area_level_2", "political"].every((type) =>
      //     x.types.includes(type)
      //   )
      // );

      // const valueStreet = element.address_components.find((x) =>
      //   ["route"].every((type) => x.types.includes(type))
      // );

      // const objectAddress = {
      //   country: valueCountry.long_name,
      //   city: valueCity.long_name,
      //   // district: valueDistrict.long_name,
      //   // street: valueStreet.long_name,
      //   address: element.formatted_address,
      //   lat: element.geometry.location.lat,
      //   lng: element.geometry.location.lng,
      // };

      // console.log("objectAddress", objectAddress);

      state.newArray.push(objectPush);
    }
  },

  setWeather30DayData(state, data) {
    state.weatherData30Day = JSON.parse(decodeBase64(data));
    console.log("state.weatherData30Day", state.weatherData30Day);

    state.listDaily30Day = state.weatherData30Day.daily.data;
  },

  setDataTop100City(state, data) {
    state.suggestionsTop100 = data;

    console.log("state.suggestionsTop100", state.suggestionsTop100);
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

  async getWeather30DayData({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setWeather30DayData", response.data);
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
