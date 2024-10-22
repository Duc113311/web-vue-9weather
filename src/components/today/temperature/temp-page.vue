<template>
  <div class="w-full">
    <!--  -->
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
        <HeaderTemp></HeaderTemp>
        <!--  -->
        <TabNavigation></TabNavigation>
        <!--  -->
        <div class="w-[550px] h-[368px]">
          <ChartTempRain></ChartTempRain>
        </div>

        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import HeaderTemp from "./header-temp.vue";
import TabNavigation from "./tab-navigation.vue";
import ChartTempRain from "./chart-temp-rain.vue";

export default {
  name: "temp-page",

  components: {
    BaseComponent,
    HeaderTemp,
    TabNavigation,
    ChartTempRain,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang=""></style>
