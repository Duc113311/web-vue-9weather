<template>
  <div class="w-full h-full">
    <router-view />
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

export default {
  name: "dash-page",

  data() {
    return {};
  },

  mounted() {
    debugger;
    this.getLocationBrowser();
  },

  computed: {
    ...mapGetters("airQualityModule", [
      "airKeyObjectGetters",
      "airObjectGetters",
    ]),
  },

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather"]),
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setBreadcumsAllowLocation",
    ]),

    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getWeatherDataIp",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("idFindModule", ["getIpLocation"]),
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
      debugger;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      const keyLanguageStorage = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}&accept-language=${keyLanguageStorage}`;
      const responsive = await axios.get(url); // Lấy thành phố và quốc gia theo map

      console.log("responsive", responsive.data);
      // Xét giá trị để lưu Recent
      const objectPosition = {
        latitude: this.latitude,
        longitude: this.longitude,
        objectLocation: responsive.data.address,
      };

      this.setBreadcumsAllowLocation(objectPosition);

      console.log("responsive.data", responsive.data);

      this.setCityWeather(objectPosition);
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${this.latitude},${this.longitude}?lang=en`;

      // map url by lat,long
      const resultAir = getAqiDataFromLocation(this.latitude, this.longitude);

      const encodeDataWeather = encodeBase64(param);
      // API Get Weather Current
      await this.getWeatherDataCurrent(encodeDataWeather);

      // Lưu lại ở Storage để cache
      localStorage.setItem("keyCurrent", JSON.stringify(encodeDataWeather));

      const encodeKeyAir = encodeBase64(resultAir);
      // API Get Air Quality By Key
      await this.getAirQualityByKey(encodeKeyAir);

      const airCode = getParamAirByCode(this.airObjectGetters?.key);
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
          debugger;
          const valueNew = decodeBase64(data);
          console.log("valueNew", valueNew);
          debugger;
          // API Lấy vị trí
          await this.getIpLocation(valueNew).then(async (data) => {
            console.log("data-loc", data);
            // Xét Breadcum
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

            const airCode = getParamAirByCode(this.airObjectGetters?.key);
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
      debugger;

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
<style lang="scss"></style>
