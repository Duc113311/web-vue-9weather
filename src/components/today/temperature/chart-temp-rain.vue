<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <vue-horizontal
          v-if="paramHourly.length > 0"
          responsive
          :displacement="0.8"
          class="w-full h-[calc(100%-40px)] relative horizontal"
        >
          <div class="w-full h-full relative">
            <ChartDays class="h-[40px]"></ChartDays>

            <!--  -->
            <ChartTemperatureBar
              class="h-[120px] absolute top-10"
            ></ChartTemperatureBar>

            <ChartPrecipitationBar
              class="h-[150px] absolute bottom-0 z-10"
            ></ChartPrecipitationBar>

            <ChartChanceOfRainBar
              class="h-[150px] absolute bottom-6 z-20"
            ></ChartChanceOfRainBar>

            <!-- <ChartDomainTemps
                class="z-20 absolute"
                :heightValue="heightValue"
              ></ChartDomainTemps> -->
            <!--  -->
            <!-- <ChartDomainRain class="absolute inset-0"></ChartDomainRain> -->

            <!-- <ChartApexRain></ChartApexRain> -->
            <!-- <ChartColumnRainfall></ChartColumnRainfall> -->
          </div>
        </vue-horizontal>

        <!--  -->

        <!-- <ChartBarRain></ChartBarRain> -->

        <!-- <ChartColumnRainfall></ChartColumnRainfall> -->

        <div
          class="w-full h-[40px] md:flex grid grid-cols-2 justify-between pad-t-b-10 pad-r-l-10"
        >
          <div class="flex items-center text-left gap-2">
            <div class="bg-temp-c rounded-full w-[10px] h-[10px]"></div>
            <span class="txt_regular_12">{{ $t("Temperature") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rain-c rounded-full w-[10px] h-[10px]"></div>
            <span class="txt_regular_12">{{ $t("Chance_of_rain") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-snow-c rounded-full w-[10px] h-[10px]"></div>
            <span class="txt_regular_12">{{ $t("Chance_of_snow") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rainfall-c rounded-full w-[10px] h-[10px]"></div>
            <span class="txt_regular_12">{{ $t("Precipitation") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartApexRain from "@/components/common/chart/chart-apex-rain.vue";
import ChartBarRain from "@/components/common/chart/chart-bar-rain.vue";
import ChartChanceOfRainBar from "@/components/common/chart/chart-chance-of-rain-bar.vue";
import ChartColumnRainfall from "@/components/common/chart/chart-column-rainfall.vue";
import ChartDays from "@/components/common/chart/chart-days.vue";
import ChartDomainRain from "@/components/common/chart/chart-domain-rain.vue";
import ChartDomainTemps from "@/components/common/chart/chart-domain-temps.vue";
import ChartPrecipitationBar from "@/components/common/chart/chart-precipitation-bar.vue";
import ChartTemperatureBar from "@/components/common/chart/chart-temperature-bar.vue";
import ChartPrecipitation from "@/components/month-day/chart-weather/chart-precipitation.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "chart-temp-rain",

  components: {
    ChartDays,
    // ChartDomainTemps,
    ChartPrecipitationBar,
    ChartChanceOfRainBar,
    ChartTemperatureBar,
    // ChartDomainRain,
    VueHorizontal,

    // ChartColumnRainfall,
    // ChartApexRain,
    // ChartBarRain,
    // ChartColumnRainfall,
  },
  data() {
    return {
      heightValue: "90",
    };
  },

  computed: {
    paramHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },
  },

  methods: {},
};
</script>
<style scoped>
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

.bg-temp-c {
  background-color: #ffa60d;
}

.bg-rain-c {
  background-color: var(--bg-radio-chance-of-rain);
}

.bg-snow-c {
  background-color: var(--bg-radio-chance-of-snow);
}

.bg-rainfall-c {
  background-color: #327cee;
}
.top-chart-pre {
  top: 148px;
}
.top-chart-rain {
  top: 126px;
}
.top-chance-rain {
  top: 134px;
}

.top-tempt {
  top: 2px;
}
</style>
