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
          <span>{{ $t(`{city}_Weather`, { city: wardParam?.city }) }}</span>
        </div>
      </template>

      <div class="w-full">
        <HeaderTemp
          :currentlyData="currentlyData"
          :dailyOneData="dailyOneData"
        ></HeaderTemp>
        <!--  -->
        <TabNavigation @onChangeTabChart="onChangeTabChart"></TabNavigation>
        <!--  -->
        <div class="w-auto h-[368px]">
          <ChartTempRain
            :key="indexState + '_temp'"
            v-show="indexChart === 0"
          ></ChartTempRain>
          <UvChartPage :key="indexState + '_uvIndex'" v-show="indexChart === 1">
          </UvChartPage>
          <WindChartPage :key="indexState + '_wind'" v-show="indexChart === 2">
          </WindChartPage>
          <HumidChartPage
            :key="indexState + '_humid'"
            v-show="indexChart === 3"
          ></HumidChartPage>
          <PressureChartPage
            :key="indexState + '_pressure'"
            v-show="indexChart === 4"
          ></PressureChartPage>
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
import { mapGetters, mapMutations } from "vuex";
import UvChartPage from "../uv-chart/uv-chart-page.vue";
import WindChartPage from "../wind-chart/wind-chart-page.vue";
import HumidChartPage from "../humid-chart/humid-chart-page.vue";
import PressureChartPage from "../pressure-chart/pressure-chart-page.vue";

export default {
  name: "temp-page",

  components: {
    BaseComponent,
    HeaderTemp,
    TabNavigation,
    ChartTempRain,
    UvChartPage,
    WindChartPage,
    HumidChartPage,
    PressureChartPage,
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters", "dailyOneGetters"]),

    ...mapGetters("commonModule", ["indexComponentGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },

    dailyOneData() {
      return this.dailyOneGetters;
    },

    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },

    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;
      console.log("resultData", resultData);

      return resultData;
    },
  },

  data() {
    return {
      indexChart: 0,
      indexKey: 0,
    };
  },

  methods: {
    ...mapMutations("commonModule", ["setIndexComponent"]),
    onChangeTabChart(value) {
      this.indexChart = value;
      this.indexKey++;

      this.setIndexComponent(this.indexKey++);
    },
  },
};
</script>
<style lang=""></style>
