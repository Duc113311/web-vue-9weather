<template>
  <div class="w-full h-[60px] bg-nav flex items-center">
    <div class="container">
      <div class="flex justify-between items-center pad-b-t text-white">
        <!-- left -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 cursor-pointer">
            <img
              src="../../assets/images/svg_v2/ic_city.svg"
              width="24"
              alt=""
              srcset=""
            />
            <span>District/City</span>
            <img
              src="../../assets/images/svg_v2/ic_chevron_up.svg"
              width="24"
              alt=""
            />
          </div>
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="onClickShowWidget()"
          >
            <img
              src="../../assets/images/svg_v2/ic_widget_tab.svg"
              width="24"
              alt=""
              srcset=""
            />
            <span>Widget</span>
          </div>
        </div>
        <!-- right -->
        <div class="flex items-center gap-2">
          <img
            src="../../assets/images/svg_v2/ic_locate_fixed.svg"
            alt=""
            srcset=""
          />

          <div class="flex items-center mr-4 gap-2">
            <span class=" ">Your current location:</span>
            <span class="txt_medium" v-if="breadcumsObject?.city">{{
              breadcumsObject?.city
            }}</span>
          </div>

          <button
            class="bg-bth hover:bg-blue-700 txt_regular tex- pad-small rounded-xl"
            @click="onClickRechange()"
          >
            Rechange
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "nav-bottom",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    renderLanguage() {
      return this.$route.params.language ? this.$route.params.language : "en";
    },

    breadcumsObject() {
      return this.breadcumsObjectGetters;
    },
  },

  methods: {
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

    async onClickShowWidget() {
      await this.$router.push({
        path: `/${this.renderLanguage}/create-widget`,
      });
    },

    async onClickRechange() {
      debugger;
      this.valueSearch = "";

      localStorage.removeItem("cityName");
      localStorage.removeItem("objectBread");

      // Lấy thông tin vị trí và thành phố
      const cityCountryNow =
        // Chuyển hướng đến router trước
        this.$router.push({ path: "/" }).then(() => {
          window.location.reload();
        });
      // Xử lý tiếp các tác vụ API trong nền

      const keyLanguage = this.$route.params.language;

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${cityCountryNow.latitude},${cityCountryNow.longitude}?lang=${keyLanguage}`;
      const resultAir = getAqiDataFromLocation(
        cityCountryNow.latitude,
        cityCountryNow.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);
      const objectPosition = {
        latitude: cityCountryNow.latitude,
        longitude: cityCountryNow.longitude,
        city: cityCountryNow.city,
        country: cityCountryNow.city,
      };
      const airCode = getParamAirByCode(this.airObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherDataCurrent(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      this.setCityWeather(objectPosition);
      document.title = "originalTitle;";
    },
  },
};
</script>
<style lang="scss">
//
.bg-nav {
  background-color: #43546c; /* Màu đen với opacity 5% */
}

.bg-bth {
  background-color: #e3eefb;
  color: #0d2952;
}
</style>
