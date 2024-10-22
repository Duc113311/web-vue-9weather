<template>
  <div class="w-full h-auto">
    <!--  -->
    <div class="w-full">
      <div>
        <ChartDays></ChartDays>

        <!--  -->
        <ChartDomainTemps></ChartDomainTemps>

        <!--  -->
        <ChartDomainRain></ChartDomainRain>

        <!--  -->

        <ChartColumnRainfall></ChartColumnRainfall>
      </div>
    </div>
  </div>
</template>
<script>
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
    ChartColumnRainfall,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss"></style>
