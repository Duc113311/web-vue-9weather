<template>
  <div class="w-full">
    <div class="flex items-center flex-hourly h-full">
      <div class="left-i">
        <BaseComponent>
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
                width="24"
                alt=""
              />
              <span>Today Sumary</span>
            </div>
          </template>

          <div class="w-full gap-4 grid">
            <div class="w-[550px] h-[400px]">
              <!-- <ChartTempRain></ChartTempRain> -->
            </div>

            <!--  -->
          </div>
        </BaseComponent>
      </div>

      <div class="right-i">
        <BaseComponent>
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
                width="24"
                alt=""
              />
              <span>Today Sumary</span>
            </div>
          </template>

          <div class="w-full gap-4 grid">
            <div class="w-[160px] h-[160px]"></div>

            <!--  -->
          </div>
        </BaseComponent>

        <BaseComponent>
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
                width="24"
                alt=""
              />
              <span>Today Sumary</span>
            </div>
          </template>

          <div class="w-full gap-4 grid">
            <div class="w-[160px] h-[160px]"></div>

            <!--  -->
          </div>
        </BaseComponent>
      </div>
    </div>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import ChartTempRain from "@/components/today/temperature/chart-temp-rain.vue";

export default {
  name: "chart-avg-weather",

  components: {
    BaseComponent,
    // ChartTempRain,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss">
.flex-hourly {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}
</style>
