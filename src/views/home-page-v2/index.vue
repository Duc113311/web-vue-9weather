<template>
  <div class="w-full h-full">
    <!--  -->
    <HomePageDashV2></HomePageDashV2>
  </div>
</template>
<script>
import HomePageDashV2 from "@/components/home/home-page-dash-v2.vue";
import axios from "axios";
import {
  encodeBase64,
  decodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils.js";

import { mapActions, mapMutations } from "vuex";

export default {
  name: "home-page-v2",
  components: {
    HomePageDashV2,
  },
  data() {
    return {};
  },

  mounted() {
    debugger;
    this.getLocation();
    localStorage.removeItem("country");
    localStorage.removeItem("cityName");
    debugger;
  },

  methods: {
    ...mapMutations([
      "setCityWeather",
      "setObjectSettingNotLocal",
      "setObjectSetting",
      "setWeatherRecentData",
      "setBreadcumsObject",
    ]),
    ...mapActions([
      "getWeatherData",
      "getWeatherDataIp",
      "getIpLocation",
      "getAirQualityByKey",
      "getAirQuality",
      "getWeatherDataCurrent",
      "getWeatherRecentData",
    ]),

    /**
     * Lấy dữ liệu localStorage
     * @param key
     */
    getFromLocalStorage(key) {
      // Trả về mảng các object từ localStorage
      return JSON.parse(localStorage.getItem(key)) || [];
    },

    async getValueWeatherByRecent(value) {
      const objectLocation = value;

      debugger;
      for (let index = 0; index < objectLocation.length; index++) {
        const element = objectLocation[index];
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${element.latitude},${element.longitude}?lang=en`;
        const value = encodeBase64(param);
        let resultArray = [];
        await this.getWeatherRecentData(value).then((data) => {
          const decodeData = JSON.parse(decodeBase64(data));
          const objectRecent = {
            countryValue: element,
            dataValue: decodeData.currently,
          };
          resultArray.push(objectRecent);
          this.setWeatherRecentData(objectRecent);
        });
      }
    },

    getLocation() {
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
     * Trường hợp lấy được location từ trình duyệt
     * @param position
     */
    async setPosition(position) {
      debugger;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}`;
      const responsive = await axios.get(url); // Lấy thành phố và quốc gia theo map

      console.log("responsive", responsive.data);
      // Xét giá trị để lưu Recent
      const objectPosition = {
        latitude: this.latitude,
        longitude: this.longitude,
        code: responsive.data.address.postcode,
        city: responsive.data.address.city,
        country: responsive.data.address.country,
      };

      console.log("responsive.data", responsive.data);
      this.saveToLocalStorage("recent_key", objectPosition);
      const arrayStorage = this.getFromLocalStorage("recent_key");
      this.getValueWeatherByRecent(arrayStorage);

      this.setCityWeather(objectPosition);
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${this.latitude},${this.longitude}?lang=en`;

      const resultAir = getAqiDataFromLocation(this.latitude, this.longitude);

      const value = encodeBase64(param);
      await this.getWeatherData(value);
      localStorage.setItem("keyCurrent", JSON.stringify(value));
      await this.getWeatherDataCurrent(value);
      const valueNewAir = encodeBase64(resultAir);
      await this.getAirQualityByKey(valueNewAir);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );
      const encodeAirCode = encodeBase64(airCode);

      await this.getAirQuality(encodeAirCode);
    },

    async getIpLocationHandle(value) {
      try {
        const codeLocation = encodeBase64(value);
        // const response = this.getIpLocation(codeLocation);
        await this.getWeatherDataIp(codeLocation).then(async (data) => {
          const valueNew = decodeBase64(data);
          console.log("valueNew", valueNew);
          debugger;
          await this.getIpLocation(valueNew).then(async (data) => {
            console.log("data-loc", data);
            this.setBreadcumsObject(data);
            const objectPosition = {
              latitude: data.latitude,
              longitude: data.longitude,
              code: data.region_code,
              city: data.city,
              country: data.country,
            };
            debugger;
            this.saveToLocalStorage("recent_key", objectPosition);
            const arrayStorage = this.getFromLocalStorage("recent_key");
            this.getValueWeatherByRecent(arrayStorage);
            console.log("responsive-v2", data);

            this.setCityWeather(objectPosition);
            const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${data.latitude},${data.longitude}?lang=en`;
            const resultAir = getAqiDataFromLocation(
              data.latitude,
              data.longitude
            );

            const value = encodeBase64(param);
            await this.getWeatherData(value);
            localStorage.setItem("keyCurrent", JSON.stringify(value));
            await this.getWeatherDataCurrent(value);
            const valueNewAir = encodeBase64(resultAir);
            // Call API getAirQualityByKey
            await this.getAirQualityByKey(valueNewAir);

            const airCode = getParamAirByCode(
              this.$store.state.getAqi.airKeyObject.key
            );
            const encodeAirCode = encodeBase64(airCode);

            await this.getAirQuality(encodeAirCode);
          });
        });
      } catch (error) {
        this.error = "Unable to retrieve location via IP.";
      }
    },

    saveToLocalStorage(key, value) {
      // Lấy dữ liệu hiện tại từ localStorage
      let storedData = JSON.parse(localStorage.getItem(key)) || [];
      debugger;
      // Nếu mảng đã đủ 3 phần tử, xóa phần tử đầu tiên
      if (storedData.length > 3) {
        storedData.pop();
      }

      // Thêm phần tử mới vào mảng
      if (storedData.length !== 0) {
        const findData = storedData.find(
          (x) =>
            x.latitude === value.latitude && x.longitude === value.longitude
        );
        if (!findData) {
          storedData.unshift(value);
        }
      } else {
        storedData.unshift(value);
      }

      // Lưu lại mảng mới vào localStorage
      localStorage.setItem(key, JSON.stringify(storedData));
    },

    async showError(error) {
      debugger;

      console.log("error");

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
