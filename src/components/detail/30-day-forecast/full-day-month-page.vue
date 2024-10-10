<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="flex justify-between items-start pad-border-bottom">
      <div class="txt_bold txt_color_uv">
        <span>
          {{
            $t(
              "Temperature_and_chance_of_rain_in_{name}_the_next_{number}_days",
              { name: renderCityName, number: 30 }
            )
          }}
        </span>
      </div>
    </div>
    <!--  -->
    <vue-horizontal
      responsive
      :displacement="0.7"
      class="w-full h-[calc(100%-60px)] relative horizontal"
    >
      <div>
        <WeatherIconTitle></WeatherIconTitle>
        <WeatherChartTmpMaxMin></WeatherChartTmpMaxMin>
        <WeatherChartRain></WeatherChartRain>
      </div>
    </vue-horizontal>
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
  </div>
</template>

<script>
import WeatherChartRain from "./weather-chart-rain.vue";
import WeatherChartTmpMaxMin from "./weather-chart-tmp-max-min.vue";
import WeatherIconTitle from "./weather-icon-title.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "full-day-month-page",

  components: {
    VueHorizontal,
    WeatherIconTitle,
    WeatherChartTmpMaxMin,
    WeatherChartRain,
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

  mounted() {},

  methods: {},
};
</script>
