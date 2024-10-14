<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="flex justify-center relative items-start pad-border-bottom">
      <div class="txt_bold text-left w-full txt-v2">
        <span>
          {{
            $t(
              "Temperature_and_chance_of_rain_in_{name}_the_next_{number}_days",
              {
                name: renderCityName,
                number: 30,
              }
            )
          }}
        </span>
      </div>
      <div
        @click="onClickDetailForecast30Day()"
        class="cursor-pointer absolute right-0"
      >
        <img
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          width="20"
          alt=""
        />
      </div>
    </div>

    <div class="w-full h-[calc(100%-62px)] relative" style="overflow: hidden">
      <!--  -->
      <WeatherList />
      <LineChartTemp />
      <LineChartRain />
    </div>

    <div
      class="flex justify-between items-center w-full bor-top-end pad-option-hourly"
    >
      <div class="flex items-center">
        <div>
          <img src="../../../assets/images/svg/ic_chance_of_rain.svg" alt="" />
        </div>
        <div class="txt_regular_12 ml-2 color-rain">
          <span>{{ $t("Chance_of_rain") }}</span>
        </div>
      </div>
      <div class="flex items-center">
        <div>
          <img src="../../../assets/images/svg/ic_chance_of_snow.svg" alt="" />
        </div>
        <div class="txt_regular_12 ml-2 color-snow">
          <span>{{ $t("Chance_of_snow") }}</span>
        </div>
      </div>
    </div>
    <!--  -->

    <!--  -->
  </div>
</template>
<script>
// import LineChart from "./LineChart.vue";
import LineChartRain from "./LineChartRain.vue";
import LineChartTemp from "./LineChartTemp.vue";
import WeatherList from "./WeatherList.vue";

export default {
  name: "hourly-page",
  components: {
    // LineChart,
    LineChartRain,
    LineChartTemp,
    WeatherList,
  },
  data() {
    return {};
  },

  computed: {
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  methods: {
    onClickDetailForecast30Day() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "30-day-forecast-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss"></style>
