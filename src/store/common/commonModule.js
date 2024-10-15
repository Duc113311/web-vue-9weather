import { httpWeather } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";

const state = {
  titleBackgroundColor: "#ffffff",
  descriptionColor: "#343434",
  titleColor: "#000000",
  textColor: "#000000",
  lineColor: "#F2F2F2",

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
};

const getters = {
  breadcumsObjectValue(state) {
    return state.breadcumsObject;
  },
};

const mutations = {
  setBreadcumsObject(state, data) {
    state.breadcumsObject.continent = data.continent;
    state.breadcumsObject.country = data.country;
    state.breadcumsObject.city = data.city;
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
    const weatherData = JSON.parse(decodeBase64(data));
    if (weatherData) {
      state.weatherWidget = weatherData;
      state.objectWidget.currently = weatherData.currently;
      state.objectWidget.listDaily = weatherData.daily.data.slice(0, 3);
    }
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
