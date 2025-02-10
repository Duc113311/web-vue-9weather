import { httpWeather } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";
import removeAccents from "remove-accents";

function removeWordAndAccents(str, wordToRemove) {
  const normalizedStr = removeAccents(str); // Loại bỏ dấu nếu có
  return normalizedStr
    .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
    .trim();
}
/**
 * State
 */
const state = {
  weatherCurrentData: {},

  locationOffset: {
    latitude: "",
    longitude: "",
    offset: 0,
    timezone: "Asia/Bangkok",
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

  objectWidget: {},
  weatherWidgetDefault: [],
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

  listDaily30DayGetters(state) {
    return state.listDaily30Day;
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
    debugger;
    if (state.weatherCurrentData) {
      state.locationOffset.latitude = state.weatherCurrentData.latitude;
      state.locationOffset.longitude = state.weatherCurrentData.longitude;
      state.locationOffset.offset = state.weatherCurrentData.offset;
      state.locationOffset.timezone = state.weatherCurrentData.timezone;

      state.currently = state.weatherCurrentData.currently;
      state.dailyOne = state.weatherCurrentData.daily.data[0];
      state.hourly24h = state.weatherCurrentData.hourly.data.slice(0, 24);
      state.hourly48h = state.weatherCurrentData.hourly.data;
      state.dailyData = state.weatherCurrentData.daily.data;

      console.log("state.weatherCurrentData", state.weatherCurrentData);
    }
  },

  setCityWeather(state, data) {
    state.cityCountry = data;
    state.countryFilter = data;
  },

  setFormattedAddress(state, data) {
    const datanew =
      "IhWwmH4sIAAAAAAwASpVAAA+1Uy07CQBTd8xWTWTekD151h0oQjEAAicSQydiOMEk7U9spaAg/49Lf4MecKURbijyiS7tppvfcOefee26XBQAADEkUeyKC4AI8qg/yWW7fKoxdVyIi5HA/4IywLDKH32Z5nE0Rwz5RYDhcvzMwXn8wcE0jEVJHQC2XEs14KM7MEW8B2ehRQn3KFBQLOicIhwQjj8yJh0yoARhwjwrqYA+CSeaelXZWLZfYAU2K2fR4CYegpyk3/lL5iBIhD8d1jzpHBDs8ZiJ8Oyzu+zRJ3QafeehjIYiLts76Ydoa+GqfBvZIh1PCfaJUyPxs6fBJ6nOjfEDFmCx1RnAk9oaTruEkZhrFUsU2jaqda0aCkmOVKEOvFA3bKlm6sYta7Wk0j8VsQU4it3RbLx+j1vWybeaID7lEmsKRPuNsf3tS/NVa2dStfBFp+lq1bJmVk/iQclAy7Hqv1+8+tO7qw8aO0eCckkUgJ/Q/u91TWhEMPOwQRN2knVezVvtl/Dq4Mer3nWGjLwZ8YbMm8ttOZmF+97NMpGw2GUYCi3izuN1bWFgVPgFCfyYLSgYAAA==4GqRg";
    const jsonValueTest = decodeBase64(datanew);
    if (!jsonValueTest) {
      return;
    }

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

      // const lastElement =
      //   element.address_components[element.address_components.length - 1];

      let objectPush = {};
      const valueCountry = element.address_components.find((x) =>
        ["country", "political"].every((type) => x.types.includes(type))
      ) || { long_name: "" };

      if (valueCountry.short_name === "VN") {
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
          ["administrative_area_level_3", "political"].every((type) =>
            x.types.includes(type)
          )
        ) ||
          element.address_components.find((x) =>
            ["neighborhood", "political"].every((type) =>
              x.types.includes(type)
            )
          ) ||
          element.address_components.find((x) =>
            ["political", "sublocality", "sublocality_level_1"].every((type) =>
              x.types.includes(type)
            )
          ) || { long_name: "" };

        objectPush.country = valueCountry.long_name;
        objectPush.country_key = valueCountry.short_name;
        objectPush.city = nameCity.long_name;
        objectPush.district = removeWordAndAccents(
          nameDistrict.long_name,
          "District"
        );
        objectPush.ward = nameWard.long_name;
        (objectPush.address = element.formatted_address),
          (objectPush.lat = element.geometry.location.lat),
          (objectPush.lng = element.geometry.location.lng);
      } else {
        // Các bang
        const nameState = element.address_components.find((x) =>
          ["administrative_area_level_1", "political"].every((type) =>
            x.types.includes(type)
          )
        ) || { long_name: "" };

        // County - quận

        const nameArea = element.address_components.find((x) =>
          ["administrative_area_level_2", "political"].every((type) =>
            x.types.includes(type)
          )
        ) || { long_name: "" };

        // Thành phố
        const nameCity = element.address_components.find((x) =>
          ["locality", "political"].every((type) => x.types.includes(type))
        ) || { long_name: "" };

        if (valueCountry.long_name.length !== 0) {
          objectPush.country = valueCountry.long_name;
          objectPush.country_key = valueCountry.short_name.toLowerCase();
          objectPush.state = nameState.long_name; // bang
          objectPush.state_key = nameState.short_name.toLowerCase(); // key bang
          // objectPush.county = nameArea.long_name; // quận - county
          objectPush.cities = nameCity.long_name; // thành phố
          (objectPush.address = element.formatted_address),
            (objectPush.lat = element.geometry.location.lat),
            (objectPush.lng = element.geometry.location.lng);
        }
      }

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
  },

  // Widget

  setWeatherByWidget(state, data) {
    const widgetCurrently = JSON.parse(decodeBase64(data));
    state.weatherWidgetDefault = widgetCurrently;

    state.objectWidget.currently = widgetCurrently.currently;

    state.objectWidget.listDaily = widgetCurrently.daily.data.slice(0, 3);
  },

  setNumberDailyWeather(state, data) {
    state.objectWidget.listDaily = state.weatherWidgetDefault.daily.data.slice(
      0,
      data
    );
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
            debugger;
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

  async getWeatherByWidget({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setWeatherByWidget", response.data);
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
