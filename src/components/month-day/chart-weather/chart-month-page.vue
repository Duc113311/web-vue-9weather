<template>
  <div class="w-full h-full">
    <BaseComponent :height="heightAuto">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
            width="24"
            alt=""
          />
          <span>Temperation</span>
        </div>
      </template>

      <div class="w-full gap-4 grid">
        <div class="w-[780px] h-[400px]">
          <!-- <ChartTempRain></ChartTempRain> -->
          <ChartTempRain></ChartTempRain>
        </div>

        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import ChartTempRain from "@/components/today/temperature/chart-temp-rain.vue";

export default {
  name: "chart-month-page",

  components: {
    ChartTempRain,
    BaseComponent,
  },
  data() {
    return {
      heightAuto: "auto",
    };
  },

  methods: {},
};
</script>
<style lang="scss"></style>
