<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <ChartDays></ChartDays>

        <!--  -->
        <ChartDomainTemps></ChartDomainTemps>

        <!--  -->
        <ChartDomainRain></ChartDomainRain>

        <!--  -->

        <ChartBarRain></ChartBarRain>

        <!-- <ChartColumnRainfall></ChartColumnRainfall> -->

        <div class="absolute w-full bottom-0 left-0 flex justify-between">
          <div class="flex items-center text-left gap-2">
            <div class="bg-temp-c rounded-full w-[15px] h-[15px]"></div>
            <p>Temperature</p>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rain-c rounded-full w-[15px] h-[15px]"></div>
            <p>Change of rain</p>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rainfall-c rounded-full w-[15px] h-[15px]"></div>
            <p>Rainfall</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartBarRain from "@/components/common/chart/chart-bar-rain.vue";
import ChartColumnRainfall from "@/components/common/chart/chart-column-rainfall.vue";
import ChartDays from "@/components/common/chart/chart-days.vue";
import ChartDomainRain from "@/components/common/chart/chart-domain-rain.vue";
import ChartDomainTemps from "@/components/common/chart/chart-domain-temps.vue";

export default {
  name: "chart-temp-rain",

  components: {
    ChartDays,
    ChartDomainTemps,
    ChartDomainRain,
    ChartBarRain,
    // ChartColumnRainfall,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss">
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
