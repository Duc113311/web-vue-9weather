import { httpWeather } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";

const state = {
  titleBackgroundColor: "#0D274C",
  descriptionColor: "#C7C8C8",
  titleColor: "#ffffff",
  textColor: "#CCCEFF",
  lineColor: "#F2F2F2",
  statusAddWidget: true,

  objectWidget: {
    titleName: "Hà Nội",
    currently: {
      temperature: 80.62,
      apparentTemperature: 80.62,
      humidity: 0.87,
      icon: "rain",
    },
    listDaily: [
      {
        time: 1722272400,
        humidity: 0.93,
        icon: "rain",
        temperatureMin: 77.16,
        temperatureMax: 79.5,
      },
      {
        time: 1722358800,
        humidity: 0.79,
        icon: "rain",
        temperatureMin: 76.77,
        temperatureMax: 84.7,
      },
      {
        time: 1722445200,
        humidity: 0.61,
        icon: "rain",
        temperatureMin: 77.18,
        temperatureMax: 91.99,
      },
    ],
  },

  objectSetting: {
    activeTemperature: "c",
    activeTime: "12h",
    activePrecipitation: "mm",
    activeDistance: "km",
    activeWindSpeed: "mi/h",
    activePressure: "hPa",
  },

  objectSettingSave: {
    activeTemperature_save: "c",
    activeTime_save: "12h",
    activePrecipitation_save: "mm",
    activeDistance_save: "km",
    activeWindSpeed_save: "mi/h",
    activePressure_save: "hPa",
  },

  objectAqiPollutant: [
    {
      code: "pm25",
      label: "PM2.5",
    },
    {
      code: "pm10",
      label: "PM10",
    },
    {
      code: "03",
      label: "O3",
    },
    {
      code: "no2",
      label: "NO2",
    },
    {
      code: "SO2",
      label: "so2",
    },
    {
      code: "co",
      label: "CO",
    },
  ],

  breadcumsObject: {},

  listLocation: [],
  codeLanguage: "en",
  indexKey: 0,
  weatherWidget: {},
  weatherWidgetOption: {},

  objectCityByLocation: [],
  listCityAll: [],
  listAlabama: [],
  listStateAmerican: [],

  indexComponent: 0,

  locationChomeObject: {},
};

const getters = {
  /**
   * Xét giá trị cho breadcums
   * @param {*} state
   * @returns
   */
  breadcumsObjectGetters(state) {
    return state.breadcumsObject;
  },

  indexComponentGetters(state) {
    return state.indexComponent;
  },

  objectCityByLocationGetters(state) {
    return state.objectCityByLocation;
  },

  listCityAllGetters(state) {
    return state.listCityAll;
  },

  listAlabamaGetters(state) {
    return state.listAlabama;
  },

  listStateAmericanGetters(state) {
    return state.listStateAmerican;
  },

  locationChomeObjectGetters(state) {
    return state.locationChomeObject;
  },

  weatherWidgetOptionGetters(state) {
    return state.weatherWidgetOption;
  },
};

const mutations = {
  setObjectCityByLocation(state, data) {
    sessionStorage.setItem("dataCityLog", JSON.stringify(data));

    state.objectCityByLocation = data;
  },

  setIndexComponent(state, data) {
    debugger;
    state.indexComponent = data;
  },

  setListDetailCityAll(state, data) {
    sessionStorage.setItem("dataCityAll", JSON.stringify(data));

    state.listCityAll = data;
  },

  setStateAmerican(state, data) {
    sessionStorage.setItem("dataAlabama", JSON.stringify(data));

    state.listAlabama = data;
  },

  setAmericanStateRegions(state, data) {
    sessionStorage.setItem("dataStateAmerican", JSON.stringify(data));

    state.listStateAmerican = data;
  },
  /**
   * Xét giá trị location khi cho phép truy cập
   * @param {*} state
   * @param {*} data
   */
  setBreadcumsAllowLocation(state, data) {
    debugger;
    if (data?.country_key === "vn") {
      (state.breadcumsObject.country = data?.country), // Quốc gia
        (state.breadcumsObject.country_key = data?.country_key), // Quốc gia
        (state.breadcumsObject.city = data?.city), // Thành phố
        (state.breadcumsObject.city_key = data?.city_key), // Thành phố
        (state.breadcumsObject.ward = data?.ward), // Phường xã
        (state.breadcumsObject.ward_key = data?.ward_key), // Phường xã
        (state.breadcumsObject.district = data?.district), // Quận huyện
        (state.breadcumsObject.district_key = data?.district_key), // Quận huyện
        (state.breadcumsObject.latitude = data?.latitude), // latitude
        (state.breadcumsObject.longitude = data?.longitude); // longitude
    } else if (data?.country_key === "us") {
      (state.breadcumsObject.country_key = data?.country_key), //  us
        (state.breadcumsObject.country = data?.country), // us
        (state.breadcumsObject.state = data?.state), // State
        (state.breadcumsObject.state_key = data?.state_key), // State key
        (state.breadcumsObject.county = data?.county), // county
        (state.breadcumsObject.cities = data?.cities), // cities
        (state.breadcumsObject.latitude = data?.latitude), // latitude
        (state.breadcumsObject.longitude = data?.longitude); // longitude
    } else {
      (state.breadcumsObject.country = data?.country), //  us
        (state.breadcumsObject.country_key = data?.country_key), //  us
        (state.breadcumsObject.state = data?.state), //  us
        (state.breadcumsObject.regions = data?.regions), //  us
        (state.breadcumsObject.regions_key = data?.regions_key), //  us
        (state.breadcumsObject.cities = data?.cities), //  us
        (state.breadcumsObject.cities_key = data?.cities_key), //  us
        (state.breadcumsObject.latitude = data?.latitude), // longitude
        (state.breadcumsObject.longitude = data?.longitude); //  us
    }
  },

  /**
   * Xét giá trị mặc định Chome
   * @param {*} state
   * @param {*} data
   */
  setLocationChome(state, data) {
    //
    if (data?.country_key === "vn") {
      //
      (state.locationChomeObject.country = data?.country), // Quốc gia
        (state.locationChomeObject.country_key = data?.country_key), // Quốc gia
        (state.locationChomeObject.city = data?.city), // Thành phố
        (state.locationChomeObject.city_key = data?.city_key), // Thành phố
        (state.locationChomeObject.latitude = data?.latitude), // latitude
        (state.locationChomeObject.longitude = data?.longitude); // longitude
    }

    if (data?.country_key === "us") {
      (state.locationChomeObject.country = data?.country), // Quốc gia
        (state.locationChomeObject.country_key = data?.country_key), // Quốc gia
        (state.locationChomeObject.state = data?.state), // Thành phố
        (state.locationChomeObject.state_key = data?.state_key), // Thành phố
        (state.locationChomeObject.latitude = data?.latitude), // latitude
        (state.locationChomeObject.longitude = data?.longitude); // longitude
    }
  },

  /**
   * Xét giá trị location khi không cho phép truy cập
   * @param {*} state
   * @param {*} data
   */
  setBreadcumsNotAllowLocation(state, data) {
    //
    debugger;
    (state.breadcumsObject.country = data?.country), // Quốc gia
      (state.breadcumsObject.country_key = data?.country_key), // Quốc gia
      (state.breadcumsObject.city = data?.city),
      (state.breadcumsObject.city_key = data?.city_key),
      (state.breadcumsObject.ward = ""), // Phường xã
      (state.breadcumsObject.ward_key = ""), // Phường xã
      (state.breadcumsObject.district = ""), // Quận huyện
      (state.breadcumsObject.district_key = ""), // Quận huyện
      (state.breadcumsObject.latitude = data?.latitude), // latitude
      (state.breadcumsObject.longitude = data?.longitude); // longitud  e
  },

  setBreadcumsTheWorld(state, data) {
    //
    debugger;
    (state.breadcumsObject.country = data?.country), // Quốc gia
      (state.breadcumsObject.country_key = data?.country_key), // Quốc gia
      (state.breadcumsObject.city = data?.city),
      (state.breadcumsObject.city_key = data?.city_key),
      (state.breadcumsObject.district = data?.district), // Quận huyện
      (state.breadcumsObject.district_key = data?.district_key), // Quận huyện
      (state.breadcumsObject.latitude = data?.latitude), // latitude
      (state.breadcumsObject.longitude = data?.longitude); // longitud  e
  },

  setUpdateBreadcumsObject(state, data) {
    state.breadcumsObject.country = data.country;
    state.breadcumsObject.city = data.value;
  },
  setCodeLanguage(state, data) {
    state.codeLanguage = data;
  },
  setObjectSetting(state, data) {
    state.objectSetting = data;
  },
  setObjectSettingSaveDefault(state, data) {
    state.objectSettingSave.activeTemperature_save = data.activeTemperature;
    state.objectSettingSave.activeTime_save = data.activeTime;
    state.objectSettingSave.activePrecipitation_save = data.activePrecipitation;
    state.objectSettingSave.activeDistance_save = data.activeDistance;
    state.objectSettingSave.activeWindSpeed_save = data.activeWindSpeed;
    state.objectSettingSave.activePressure_save = data.activePressure;

    let storedData = localStorage.getItem("unit");
    if (storedData) {
      let parsedData = JSON.parse(storedData);

      parsedData = { ...parsedData, ...data };
      localStorage.setItem("unit", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("unit", JSON.stringify(data));
    }
  },
  setObjectSettingNotLocal(state, data) {
    state.objectSettingSave.activeTemperature_save = data.activeTemperature;
    state.objectSettingSave.activeTime_save = data.activeTime;
    state.objectSettingSave.activePrecipitation_save = data.activePrecipitation;
    state.objectSettingSave.activeDistance_save = data.activeDistance;
    state.objectSettingSave.activeWindSpeed_save = data.activeWindSpeed;
    state.objectSettingSave.activePressure_save = data.activePressure;
  },

  setKeyIndexComponent(state, key) {
    state.indexKey = key;
  },

  // unit
  setActiveTemperature(state, data) {
    state.objectSetting.activeTemperature = data;
  },
  setActiveTime(state, data) {
    state.objectSetting.activeTime = data;
  },
  setActivePrecipitation(state, data) {
    state.objectSetting.activePrecipitation = data;
  },
  setActiveDistance(state, data) {
    state.objectSetting.activeDistance = data;
  },
  setActiveWindSpeed(state, data) {
    state.objectSetting.activeWindSpeed = data;
  },
  setActivePressure(state, data) {
    state.objectSetting.activePressure = data;
  },
  // end
  setTitleBackgroundColor(state, data) {
    state.statusAddWidget = false;
    state.titleBackgroundColor = data;
  },

  setDescriptionColor(state, data) {
    state.descriptionColor = data;
  },

  setTitleColor(state, data) {
    state.titleColor = data;
  },

  setTextColor(state, data) {
    state.textColor = data;
  },

  setLineColor(state, data) {
    state.lineColor = data;
  },

  setListLocation(state, data) {
    state.listLocation = data;
  },

  setDataWidget(state, data) {
    state.objectWidget.titleName = data;
  },

  setWeatherWidget(state, data) {
    const jsonValue = decodeBase64(data);
    if (!jsonValue) {
      return;
    }
    const weatherData = JSON.parse(jsonValue);
    if (weatherData) {
      const weatherDataConvert = weatherData.results[0];
      (state.weatherWidgetOption.label =
        weatherDataConvert.formatted_address).trim(),
        (state.weatherWidgetOption.lat =
          weatherDataConvert.geometry.location.lat),
        (state.weatherWidgetOption.lng =
          weatherDataConvert.geometry.location.lng);
    }
    // state.weatherWidget = weatherData;
    // state.objectWidget.currently = weatherData.currently;
    // state.objectWidget.listDaily = weatherData.daily.data.slice(0, 3);
  },

  setNumberDataDaily(state, data) {
    debugger;
    state.objectWidget.listDaily = state.weatherWidget.daily.data.slice(
      0,
      data
    );
  },
  // setting

  // objectSetting: {
  //   activeTemperature: "c",
  //   activeTime: "12h",
  //   activePrecipitation: "mm",
  //   activeDistance: "km",
  //   activeWindSpeed: "m/s",
  //   activePressure: "atm",
  // },
};

const actions = {
  async getWeatherWidget({ commit }, data) {
    return new Promise((resolve, reject) => {
      httpWeather
        .get(`api.php?param=${data}`)
        .then((response) => {
          if (response.status === 200) {
            commit("setWeatherWidget", response.data);
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
