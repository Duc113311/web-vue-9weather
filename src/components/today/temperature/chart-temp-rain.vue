<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <vue-horizontal
          responsive
          :displacement="0.7"
          class="w-full h-full relative horizontal"
        >
          <div>
            <ChartDays></ChartDays>

            <!--  -->
            <ChartDomainTemps></ChartDomainTemps>

            <!--  -->
            <ChartDomainRain></ChartDomainRain>

            <!-- <ChartApexRain></ChartApexRain> -->
            <ChartColumnRainfall></ChartColumnRainfall>
          </div>
        </vue-horizontal>

        <!--  -->

        <!-- <ChartBarRain></ChartBarRain> -->

        <!-- <ChartColumnRainfall></ChartColumnRainfall> -->

        <div class="absolute w-full bottom-0 left-0 flex justify-between">
          <div class="flex items-center text-left gap-2">
            <div class="bg-temp-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_des">{{ $t("temperature") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rain-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_des">{{ $t("Chance_of_rain") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rainfall-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_des">{{ $t("precipitation") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartApexRain from "@/components/common/chart/chart-apex-rain.vue";
import ChartBarRain from "@/components/common/chart/chart-bar-rain.vue";
import ChartColumnRainfall from "@/components/common/chart/chart-column-rainfall.vue";
import ChartDays from "@/components/common/chart/chart-days.vue";
import ChartDomainRain from "@/components/common/chart/chart-domain-rain.vue";
import ChartDomainTemps from "@/components/common/chart/chart-domain-temps.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "chart-temp-rain",

  components: {
    ChartDays,
    ChartDomainTemps,
    ChartDomainRain,
    VueHorizontal,
    ChartColumnRainfall,
    // ChartApexRain,
    // ChartBarRain,
    // ChartColumnRainfall,
  },
  data() {
    return {};
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
  background-color: #ec9d00;
}

.bg-rain-c {
  background-color: #39e4f2;
}

.bg-rainfall-c {
  background-color: #327cee;
}
</style>
