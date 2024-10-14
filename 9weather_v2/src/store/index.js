import { createStore } from "vuex";
import aqiModule from "./getApi/aqiModule";
import ipFindModule from "./getApi/ipFindModule";
import radarModule from "./getApi/radarModule";
import weatherModule from "./getApi/weatherModule";
import CommonModule from "./common/commonModule";
export default createStore({
  modules: {
    getAqi: aqiModule,
    getIpFind: ipFindModule,
    getRadar: radarModule,
    getWeather: weatherModule,
    commonModule: CommonModule,
  },
});
