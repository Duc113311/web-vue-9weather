<template>
  <div class="w-full h-full pl-2 pr-2">
    <!-- -->
    <div class="container mt-5">
      <!--  -->
      <div class="header-m flex w-full gap-20-px h-full">
        <!--  -->
        <div class="left-hourly lg:w-[68%] w-full">
          <!--  -->
          <TodayChartTide></TodayChartTide>
        </div>

        <!--  -->

        <div
          class="right-hourly lg:w-[32%] w-full md:grid md:grid-cols-2 gap-5 lg:block"
        >
          <!--  -->
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <SunPage :key="indexState + Math.random()"></SunPage>
          </div>
          <div v-else class="w-full h-[230px] md:mt-4 mt-2">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <MoonPage :key="indexState + Math.random()"></MoonPage>
          </div>
          <div v-else class="w-full h-[230px] md:mt-1">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="container mt-5">
      <div class="header-m flex w-full gap-20-px h-full">
        <MonthDayChartTide></MonthDayChartTide>
      </div>
    </div>

    <!--  -->

    <div class="container mt-5">
      <div class="header-m flex w-full gap-20-px h-full">
        <div class="left-hourly lg:w-[40%] w-full">
          <DatumTide></DatumTide>
        </div>

        <div
          class="right-hourly lg:w-[60%] w-full md:grid md:grid-cols-2 gap-5 lg:block"
        >
          <StationTide></StationTide>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MoonPage from "@/components/common/moon-phase/moon-page.vue";
import SunPage from "@/components/common/sun/sun-page.vue";
import MonthDayChartTide from "@/components/tide/30-day/month-day-chart-tide.vue";
import DatumTide from "@/components/tide/datum/datum-tide.vue";
import StationTide from "@/components/tide/station/station-tide.vue";
import TodayChartTide from "@/components/tide/today/today-chart-tide.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "tide-page",

  components: {
    TodayChartTide,
    SunPage,
    SkeletonLoader,
    MoonPage,
    MonthDayChartTide,
    StationTide,
    DatumTide,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    currentlyData() {
      return this.currentlyGetters;
    },
  },

  methods: {
    ...mapActions("tideModule", ["getTidesData"]),
  },

  async mounted() {
    const params = {
      keyPrivate: "AMOBI_SOFT",
      duration: 44640,
      interval: 1440,
      timestamp: 1742724047,
      station_id: "GESLA3:c1028eb231",
      datum: "MLLW",
    };

    await this.getTidesData(params);
  },
};
</script>
<style lang=""></style>
