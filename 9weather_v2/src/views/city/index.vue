<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-[160px] flex justify-center items-center mb-4">
      <div class="img-ads bg-ads w-full h-full">
        <!-- Ads -->
      </div>
    </div>
    <!-- title -->
    <div class="w-full">
      <div class="page-title-box flex items-center justify-between">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">
            <a href="">{{ $t("Home_Page") }}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="">{{ renderCityName }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- option -->

    <div class="weather-menu-overlay mt-2 overflow-hidden">
      <vue-horizontal
        responsive
        :displacement="1"
        class="pad-b-title horizontal"
      >
        <div
          class="weather-menu-inner w-max flex justify-between items-center mt-2 pt-1"
        >
          <div
            v-for="menu in menuItems"
            :key="menu.path"
            class="weather-menu-item mr-4"
            :class="{ active: isActive(menu) }"
          >
            <router-link
              :to="{ name: menu.name, params: { city: renderCityName } }"
              class="weather-menu-link"
            >
              {{ menu.label }}
            </router-link>
          </div>
        </div>
      </vue-horizontal>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import VueHorizontal from "vue-horizontal";
import { mapActions, mapMutations } from "vuex";
import axios from "axios";
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "../../utils/EncoderDecoderUtils";

export default {
  name: "city-Page",

  components: {
    VueHorizontal,
  },

  data() {
    return {};
  },

  computed: {
    menuItems() {
      return [
        { name: "dash-city", label: this.$t("Present") },
        { name: "hourly-forecast-view", label: this.$t("Hourly") },
        // { name: "now-view", label: this.$t("Current_parameters") },
        { name: "tomorrow-view", label: this.$t("Tomorrow") },
        { name: "next-7-day-view", label: this.$t("Next_7_days") },
        { name: "30-day-forecast-view", label: this.$t("Next_30_days") },
        { name: "radar-view", label: this.$t("Radar") },
        { name: "air-quality-view", label: this.$t("Air_quality") },
        { name: "moonphase-view", label: this.$t("Moon_phase") },
        // { name: "uv-index-view", label: this.$t("Uv_Index") },
        { name: "", label: "Health & Activities" },
      ];
    },
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  async mounted() {
    debugger;
    const storageCountry = localStorage.getItem("country");
    if (storageCountry) {
      const storageCountryObject = JSON.parse(storageCountry);
      this.setCountryFilter(storageCountryObject);
      if (
        !localStorage.getItem("apiCalled") ||
        localStorage.getItem("apiCalled") === "false"
      ) {
        console.log("Vào rồi à");

        this.handleDataCurrent();
        await this.handleSearch(storageCountryObject);
        localStorage.setItem("apiCalled", false);
      }
    }
    localStorage.removeItem("cityName");
    debugger;
    localStorage.setItem("apiCalled", false);
    this.isActive(this.$route);
  },

  methods: {
    ...mapMutations(["setCityCountry", "setCountryFilter"]),
    ...mapActions([
      "getAirQualityByKey",
      "getWeatherData",
      "getAirQuality",
      "getWeatherDataCurrent",
    ]),
    isActive(menu) {
      return this.$route.name === menu.name;
    },

    async handleSearch(value) {
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${value.latitude},${value.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(value.latitude, value.longitude);
      const valueData = encodeBase64(param);
      await this.getWeatherData(valueData);
      const valueNewAir = encodeBase64(resultAir);
      // this.$router.push({ path: `/${value.city}` });
      await this.getAirQualityByKey(valueNewAir);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );
      const encodeAirCode = encodeBase64(airCode);

      await this.getAirQuality(encodeAirCode);
    },

    async handleDataCurrent() {
      const keyCurrentValue = localStorage.getItem("keyCurrent");
      if (keyCurrentValue) {
        const keyCurrent = JSON.parse(keyCurrentValue);

        await this.getWeatherDataCurrent(keyCurrent);
        const weatherCurrentValue = this.$store.state.getWeather.weatherCurrent;
        if (weatherCurrentValue) {
          const positionValue = this.$store.state.getWeather.position;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${positionValue.latitude}&lon=${positionValue.longitude}`;
          const responsive = await axios.get(url);
          const objectPosition = {
            latitude: positionValue.latitude,
            longitude: positionValue.longitude,
            city: responsive.data.address.city,
            country: responsive.data.address.country,
          };
          console.log("responsive.data", responsive.data);

          this.setCityCountry(objectPosition);
        }
      }
    },
  },
};
</script>

<style scoped>
.weather-menu-item.active .weather-menu-link {
  color: #fff;
  background: #1c84ee;
}
.weather-menu-inner {
}
.weather-menu-item {
  width: max-content;
  padding: 10px 0px;
}
.weather-menu-link {
  border-radius: 4px;
  background-color: #fff;
  color: #003576;
  padding: 5px 20px;
}

.horizontal >>> .v-hl-btn-prev {
  display: none !important;
  left: 10px !important;
}
.horizontal >>> .v-hl-btn-next {
  display: none !important;

  right: 10px !important;
}
.horizontal:hover >>> .v-hl-btn-prev {
  display: flex !important;
  left: 10px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 10px !important;
  opacity: 0.5;
}
</style>
