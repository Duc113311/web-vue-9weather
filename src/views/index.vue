<template>
  <div class="">
    <!-- header -->

    <div class="basic-header menu-open">
      <HeaderPage
        @onChangeShowHeaderMenu="onChangeShowHeaderMenu"
        :isShowHeaderMenu="isShowHeaderMenu"
      ></HeaderPage>
      <HeaderMenu
        v-show="isShowHeaderMenu"
        @onChangeCloseMenu="onChangeShowHeaderMenu"
      ></HeaderMenu>
    </div>
    <div class="header-placeholder"></div>

    <div class="body-app relative body-n">
      <NavBottom></NavBottom>

      <div class="w-full pad-big">
        <router-view />
        <!--  -->
      </div>
    </div>

    <FooterPage></FooterPage>

    <!-- Header menu -->
  </div>
</template>
<script>
import axios from "axios";
import {
  encodeBase64,
  decodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils.js";

import { mapActions, mapGetters, mapMutations } from "vuex";
import HeaderPage from "@/layout/header/header_page.vue";
import NavBottom from "@/layout/tabbar-bottom/nav-bottom.vue";
import FooterPage from "@/layout/footer/footer-page.vue";
import HeaderMenu from "@/layout/header/header-menu.vue";

export default {
  name: "dash-page",

  components: {
    HeaderPage,
    NavBottom,
    FooterPage,
    HeaderMenu,
    // NavTabbar,
  },
  data() {
    return {
      suggestionsTop100: [],
      provinces: [],
      isShowHeaderMenu: false,
      provinceData: null,
    };
  },

  mounted() {
    this.loadProvince();

    this.loadAllFileJson();
    const objectBread = localStorage.getItem("objectBread");
    debugger;
    if (!objectBread) {
      this.getLocationBrowser();
    } else {
      const objectBreadValue = JSON.parse(objectBread);
      this.handleLocation(objectBreadValue);
    }
    // this.loadDataTop100();
  },

  computed: {
    ...mapGetters("airQualityModule", [
      "airKeyObjectGetters",
      "airObjectGetters",
    ]),
  },

  created() {},

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setBreadcumsAllowLocation",
      "setObjectCityByLocation",
      "setListDetailCityAll",
    ]),

    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getWeatherDataIp",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("idFindModule", ["getIpLocation"]),

    onChangeShowHeaderMenu(value) {
      this.isShowHeaderMenu = value;
    },

    async loadProvince() {
      try {
        const response = await fetch("./file-txt/city.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        debugger;
        const data = await response.json(); // Parse JSON data
        console.log("data", data);
        this.provinceData = data;
        this.setObjectCityByLocation(this.provinceData);
      } catch (error) {
        console.error("Error loading file:", error);
      }
    },

    async loadAllFileJson() {
      let provinces = [];
      const context = require.context("/public/json/vietnam", false, /\.json$/);
      debugger;
      // context.keys() trả về danh sách các file, duyệt qua và import dữ liệu của từng file
      const provincesData = context.keys().map((key) => {
        const provinceData = context(key); // Load dữ liệu từ file

        provinces.push(provinceData);
      });
      console.log("provinces", provinces);
      this.setListDetailCityAll(provinces);
      console.log("provincesData", provincesData);
    },

    async handleLocation(dataValue) {
      let latitude = dataValue.latitude;
      let longitude = dataValue.longitude;

      const objectLatLong = {
        latitude: latitude,
        longitude: longitude,
      };
      localStorage.setItem("locationLatLong", JSON.stringify(objectLatLong));

      const keyLanguageStorage = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${keyLanguageStorage}`;
      const responsive = await axios.get(url); // Lấy thành phố và quốc gia theo map

      debugger;
      console.log("responsive", responsive.data);
      // Xét giá trị để lưu Recent
      const objectPosition = {
        latitude: latitude,
        longitude: longitude,
        objectLocation: responsive.data.address,
      };

      this.setBreadcumsAllowLocation(objectPosition);

      console.log("responsive.data", responsive.data);

      this.setCityWeather(objectPosition);
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${latitude},${longitude}?lang=en`;

      // map url by lat,long
      const resultAir = getAqiDataFromLocation(latitude, longitude);

      const encodeDataWeather = encodeBase64(param);
      // API Get Weather Current
      await this.getWeatherDataCurrent(encodeDataWeather);

      // Lưu lại ở Storage để cache
      localStorage.setItem("keyCurrent", JSON.stringify(encodeDataWeather));

      const encodeKeyAir = encodeBase64(resultAir);
      // API Get Air Quality By Key
      await this.getAirQualityByKey(encodeKeyAir);

      const airCode = getParamAirByCode(this.airKeyObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);
      // API Get Air Quality Data
      await this.getAirQuality(encodeAirCode);
    },
    /**
     * Connect vị trí trên trình duyệt
     */
    getLocationBrowser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setPosition.bind(this),
          this.showError.bind(this)
        );
      } else {
        this.error = "Geolocation is not supported by this browser.";
      }
    },

    /**
     * Có lấy cho phép lấy location trình duyệt
     * @param position
     */
    async setPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      const objectLatLong = {
        latitude: latitude,
        longitude: longitude,
      };
      localStorage.setItem("locationLatLong", JSON.stringify(objectLatLong));

      const keyLanguageStorage = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${keyLanguageStorage}`;
      const responsive = await axios.get(url); // Lấy thành phố và quốc gia theo map
      debugger;

      console.log("responsive", responsive.data);
      // Xét giá trị để lưu Recent
      const objectPosition = {
        latitude: latitude,
        longitude: longitude,
        objectLocation: responsive.data.address,
      };
      debugger;
      // localStorage.setItem("objectBread", JSON.stringify(objectPosition));
      this.setBreadcumsAllowLocation(objectPosition);

      console.log("responsive.data", responsive.data);

      this.setCityWeather(objectPosition);
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${latitude},${longitude}?lang=en`;

      // map url by lat,long
      const resultAir = getAqiDataFromLocation(latitude, longitude);

      const encodeDataWeather = encodeBase64(param);
      // API Get Weather Current
      await this.getWeatherDataCurrent(encodeDataWeather);

      // Lưu lại ở Storage để cache
      localStorage.setItem("keyCurrent", JSON.stringify(encodeDataWeather));

      const encodeKeyAir = encodeBase64(resultAir);
      // API Get Air Quality By Key
      await this.getAirQualityByKey(encodeKeyAir);

      const airCode = getParamAirByCode(this.airKeyObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);
      // API Get Air Quality Data
      await this.getAirQuality(encodeAirCode);
    },

    /**
     * Handle hàm để lấy location request
     * @param value
     */
    async getIpLocationHandle(value) {
      try {
        const codeLocation = encodeBase64(value);
        await this.getWeatherDataIp(codeLocation).then(async (data) => {
          const valueNew = decodeBase64(data);
          console.log("valueNew", valueNew);

          // API Lấy vị trí
          await this.getIpLocation(valueNew).then(async (data) => {
            console.log("data-loc", data);
            // Xét Breadcum
            debugger;

            const objectLatLong = {
              latitude: data.latitude,
              longitude: data.longitude,
            };
            localStorage.setItem(
              "locationLatLong",
              JSON.stringify(objectLatLong)
            );

            this.setBreadcumsNotAllowLocation(data);
            const objectPosition = {
              latitude: data.latitude,
              longitude: data.longitude,
              code: data.region_code,
              city: data.city,
              country: data.country,
            };
            this.setCityWeather(objectPosition);
            const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${data.latitude},${data.longitude}?lang=en`;
            const resultAir = getAqiDataFromLocation(
              data.latitude,
              data.longitude
            );

            const encodeDataWeather = encodeBase64(param);
            // API Get Weather Current
            await this.getWeatherDataCurrent(encodeDataWeather);

            localStorage.setItem(
              "keyCurrent",
              JSON.stringify(encodeDataWeather)
            );

            const valueNewAir = encodeBase64(resultAir);
            // Call API getAirQualityByKey
            await this.getAirQualityByKey(valueNewAir);

            const airCode = getParamAirByCode(this.airKeyObjectGetters?.key);
            const encodeAirCode = encodeBase64(airCode);

            // API Get Air Quality Data
            await this.getAirQuality(encodeAirCode);
          });
        });
      } catch (error) {
        this.error = "Unable to retrieve location via IP.";
      }
    },

    /**
     * Không cho phép lấy location trình duyêt
     * @param error
     */
    async showError(error) {
      let param =
        "version=1&type=1&app_id=amobi.weather.forecast.storm.radar&request=https://ipfind.co/me?auth=TOH_KEY";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.error = "User denied the request for Geolocation.";
          await this.getIpLocationHandle(param);
          break;
        case error.POSITION_UNAVAILABLE:
          this.error = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.error = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.error = "An unknown error occurred.";
          break;
      }
    },
  },
};
</script>
<style lang="scss">
.body-n {
  z-index: 99;
}

.basic-header {
  color: #fff;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  visibility: visible !important;
  z-index: 2147483647;
}
@media (min-width: 768px) {
  .header-placeholder {
    height: 62px;
  }
}

.header-placeholder {
  height: 78px;
}
</style>
