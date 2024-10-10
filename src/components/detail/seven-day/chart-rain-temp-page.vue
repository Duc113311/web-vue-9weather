<template>
  <div class="w-full h-full">
    <div class="flex justify-center relative items-start pad-border-bottom">
      <div class="txt_bold text-left w-full txt-v2">
        <span>7 Days Forecast</span>
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
import LineChartRain from "@/components/home/30-day-forecast/LineChartRain.vue";
import LineChartTemp from "@/components/home/30-day-forecast/LineChartTemp.vue";
import WeatherList from "@/components/home/30-day-forecast/WeatherList.vue";

export default {
  name: "chart-rain-temp-page",

  components: {
    LineChartRain,
    LineChartTemp,
    WeatherList,
  },

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>
<style lang="scss"></style>
