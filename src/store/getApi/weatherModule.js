import { httpWeather } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";

const state = {
  weatherData: {
    currently: {
      time: 1721289354, // Thời gian minisecon
      summary: "light rain",
      icon: "rain",
      precipIntensity: 0, // Lượng mưa cường độ: Precipitation
      precipProbability: 1, // Xác xuất kết tủa: Chance of rain
      precipType: "Rain", // Loại kết tủa : rain/snow
      temperature: 87.12, // Nhiệt độ :
      apparentTemperature: 99.72, // Nhiệt độ rõ ràng : Feels like
      dewPoint: 77.81,
      humidity: 0.74, // Độ ẩm : Humidity
      pressure: 1002, // Áp lực: Pressure
      windSpeed: 8.28, // Tốc độ gió : Wind speed
      windGust: 10.98,
      windBearing: 150,
      cloudCover: 1, // Mây che phủ: Cloud cover
      uvIndex: 3.68,
      visibility: 5.451,
      ozone: 103,
    },
    daily: {},
    hourly: {},
  },

  weatherData30Day: {},
  listDaily30Day: [],
  currently: {},
  // Lấy phần tử đầu tiên ở Daily
  dailyOne: {
    time: 1721235600,
    summary: "moderate rain",
    icon: "rain",
    sunriseTime: 1721255064,
    sunsetTime: 1721302755,
    precipIntensity: 31.27,
    precipProbability: 1,
    precipType: "Rain",
    temperatureMin: 77.99,
    temperatureMax: 87.26,
    apparentTemperatureMin: 79.29,
    apparentTemperatureMax: 98.83,
    dewPoint: 77.9,
    humidity: 0.76,
    pressure: 1003,
    windSpeed: 9.24,
    windGust: 18.23,
    windBearing: 81,
    moonPhase: 0.35,
    cloudCover: 1,
    uvIndex: 9.9,
    visibility: 6.627,
    ozone: 103,
  },

  hourly: [],

  dailyData: [],
  dailyDataThree: [], //3 ngày
  dailyDataSeven: [], // 7 ngày
  dailyDataThreeNext: [],
  cityCountry: {},
  position: {
    latitude: 21.0292,
    longitude: 105.8526,
  },

  addressFilter: {},
  newArray: [],
  countryFilter: {
    country: "",
    value: "",
  },
  weatherCurrent: {},

  locationRecentData: [],
  hourly48: [],
  tomorrowData: [],

  locationRecentDataV2: [],

  locationOffset: {
    latitude: "",
    longitude: "",
    offset: 0,
  },
};

const getters = {};

const mutations = {
  setWeatherData(state, data) {
    // console.log(decodeBase64(data));
    state.weatherData = JSON.parse(decodeBase64(data));
    console.log("state.weatherData", state.weatherData);
    if (state.weatherData) {
      state.locationOffset.latitude = state.weatherData.latitude;
      state.locationOffset.longitude = state.weatherData.longitude;
      state.locationOffset.offset = state.weatherData.offset;
      state.currently = state.weatherData.currently;
      state.dailyOne = state.weatherData.daily.data[0];
      state.hourly = state.weatherData.hourly.data.slice(0, 24);
      state.hourly48 = state.weatherData.hourly.data;
      state.dailyData = state.weatherData.daily.data;
      state.dailyDataThree = state.weatherData.daily.data.slice(1, 4);
      state.dailyDataThreeNext = state.weatherData.daily.data.slice(1, 4);
      state.dailyDataSeven = state.weatherData.daily.data.slice(1, 7);
      state.tomorrowData = state.weatherData.hourly.data.slice(24, 47);
      const objectRecent = {
        countryValue: state.countryFilter,
        dataValue: state.weatherData.currently,
      };
      debugger;
      // Xử lý lưu data phần RecentData
    }
  },

  setRecentLocal(state, data) {
    debugger;
    if (state.locationRecentData.length < 3) {
      state.locationRecentData.push(data);
      localStorage.setItem("recent", JSON.stringify(state.locationRecentData));
    }
  },

  setWeatherDataCurrent(state, data) {
    const weatherCurrentValue = JSON.parse(decodeBase64(data));
    if (weatherCurrentValue) {
      console.log("weatherCurrentValue", weatherCurrentValue);

      state.weatherCurrent = weatherCurrentValue.currently;
      state.position.latitude = weatherCurrentValue.latitude;
      state.position.longitude = weatherCurrentValue.longitude;
    }
  },

  setCountryFilter(state, data) {
    state.countryFilter = data;
  },

  setCityWeather(state, data) {
    state.cityCountry = data;
    state.countryFilter = data;
  },

  setCityCountry(state, data) {
    state.cityCountry = data;
  },

  setPositionData(state, data) {
    state.position = data;
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

  setWeather30DayData(state, data) {
    state.weatherData30Day = JSON.parse(decodeBase64(data));
    state.listDaily30Day = state.weatherData30Day.daily.data;
  },

  setWeatherRecentData(state, data) {
    state.locationRecentDataV2.push(data);
  },
};

const actions = {
  /**
   * API Get Weather Data
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

  async getWeatherData({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setWeatherData", response.data);
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

  async getWeatherRecentData({ commit }, data) {
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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
