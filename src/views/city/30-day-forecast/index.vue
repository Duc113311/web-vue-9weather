<template>
  <div class="w-full h-full">
    <!--  -->
    <DayMonthAllClone></DayMonthAllClone>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { encodeBase64 } from "../../../utils/EncoderDecoderUtils.js";
import DayMonthAllClone from "@/components/home/30-day-clone/day-month-all-clone.vue";
export default {
  name: "30-day-forecast-view",

  components: {
    DayMonthAllClone,
  },
  data() {
    return {};
  },

  computed: {
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName;
      }
      return "";
    },
  },

  async mounted() {
    await this.getWeather30Day();
    const paramRouter = this.$route.params;
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, 30 Days Weather | 9Weather`;
  },

  methods: {
    ...mapActions(["getWeather30DayData"]),

    async getWeather30Day() {
      const position = this.renderCityName;
      console.log("position", position);

      const param = `version=1&type=10&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${position.latitude},${position.longitude}?lang=en`;
      const value = encodeBase64(param);
      await this.getWeather30DayData(value);
    },
  },
  beforeRouteLeave(to, from, next) {
    debugger;
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>
<style lang="scss"></style>
