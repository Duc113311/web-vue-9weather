<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <vue-horizontal
          responsive
          :displacement="0.8"
          class="w-full h-full relative horizontal pl-2 pr-2"
        >
          <div class="w-full">
            <ChartDays></ChartDays>

            <!--  -->
            <div class="relative w-full h-full">
              <ChartPrecipitationBar
                class="absolute top-chart-pre z-10"
              ></ChartPrecipitationBar>

              <!-- <ChartDomainRain
                class="z-30 absolute top-chart-rain"
              ></ChartDomainRain> -->

              <ChartTemperatureBar
                class="absolute top-tempt"
              ></ChartTemperatureBar>

              <ChartChanceOfRainBar
                class="absolute z-30 top-chance-rain"
              ></ChartChanceOfRainBar>

              <!-- <ChartDomainTemps
                class="z-20 absolute"
                :heightValue="heightValue"
              ></ChartDomainTemps> -->
            </div>
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
          class="absolute w-full bottom-0 left-0 flex justify-between pad-t-b-10 pad-r-l-10"
        >
          <div class="flex items-center text-left gap-2">
            <div class="bg-temp-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_12">{{ $t("temperature") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rain-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_12">{{ $t("Chance_of_rain") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rainfall-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_12">{{ $t("precipitation") }}</span>
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
  bottom: 90px !important;
  left: 24px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  bottom: 90px !important;
  right: 24px !important;
  opacity: 0.5;
}

.bg-temp-c {
  background-color: #ffa60d;
}

.bg-rain-c {
  background-color: var(--bg-radio-chance-of-rain);
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
