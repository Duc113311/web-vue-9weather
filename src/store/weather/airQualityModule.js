import { httpAqi } from "../../configs/http-weather";
import { decodeBase64 } from "../../utils/EncoderDecoderUtils";

/**
 * State
 */
const state = {
  airObject: {},
  airKeyObject: {},
  apiValue: 0,
};

/**
 * Getters
 */
const getters = {
  airObjectGetters(state) {
    return state.airObject;
  },

  airKeyObjectGetters(state) {
    return state.airKeyObject;
  },

  apiValueGetters(state) {
    return state.apiValue;
  },
};

/**
 * Mutations
 */
const mutations = {
  /**
   * Xét giá trị air quality
   * @param {*} state
   * @param {*} data
   */
  setAirQuality(state, data) {
    const newDataAir = JSON.parse(decodeBase64(data));

    console.log("newDataAir", newDataAir);
    localStorage.setItem("airObject", newDataAir);
    state.airObject = newDataAir;
    state.apiValue = newDataAir.aqi;
    console.log("state.apiValue", state.apiValue);
  },

  /**
   * Xét giá trị air quality by key
   * @param {*} state
   * @param {*} data
   */
  setAirQualityByKey(state, data) {
    const newDataAir = JSON.parse(decodeBase64(data));
    if (newDataAir) {
      state.airKeyObject = newDataAir.d[0];
    }
  },
};

/**
 * Actions
 */
const actions = {
  /**
   * API Get Air Quality (Chất lượng không khí)
   * @param {*} param0
   * @param {*} param
   * @returns
   */
  async getAirQuality({ commit }, param) {
    try {
      const response = await httpAqi.get(`airquality.php?param=${param}`, {
        timeout: 30000, // Thêm timeout 10 giây
      });

      if (response.status === 200) {
        commit("setAirQuality", response.data);
        return response.data;
      } else {
        console.error("Error: API returned non-200 status");
        return null; // Hoặc xử lý giá trị trả về nếu cần
      }
    } catch (error) {
      // Xử lý lỗi ngầm (silent fail)
      console.error("Error fetching air quality data:", error.message || error);
      return null; // Hoặc giá trị mặc định khác nếu cần
    }
  },

  /**
   * API Get Air Quality by Key
   * @param {*} param0
   * @param {*} param
   * @returns
   */
  async getAirQualityByKey({ commit }, param) {
    try {
      const response = await httpAqi.get(`airquality.php?param=${param}`, {
        timeout: 30000, // Thêm timeout 10 giây
      });

      if (response.status === 200) {
        commit("setAirQualityByKey", response.data);
        return response.data;
      } else {
        console.error("Error: API returned non-200 status");
        return null; // Hoặc xử lý giá trị trả về nếu cần
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error.message || error);
      return null;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
