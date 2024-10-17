<template>
  <div class="w-full h-[378px]">
    <!--  -->
    <div class="w-full">
      <vue-horizontal
        responsive
        :displacement="0.7"
        class="w-full h-[calc(100%-60px)] relative horizontal"
      >
        <div>
          <ChartDays></ChartDays>

          <ChartDomainTemps></ChartDomainTemps>
        </div>
      </vue-horizontal>
    </div>
  </div>
</template>
<script>
import ChartDays from "@/components/common/chart/chart-days.vue";
import ChartDomainTemps from "@/components/common/chart/chart-domain-temps.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "chart-temp-rain",

  components: {
    ChartDays,
    ChartDomainTemps,
    VueHorizontal,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss"></style>
