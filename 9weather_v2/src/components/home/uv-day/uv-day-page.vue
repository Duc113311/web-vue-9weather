<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="w-full h-full flex flex-wrap gap-4">
      <div class="w-[750px] h-auto">
        <!--  -->
        <div
          v-if="currentDataIndex.length !== 0"
          class="w-full h-auto mar-b pad-form-radios card bg-white"
        >
          <!--  -->
          <ChartUvIndex></ChartUvIndex>
        </div>
        <div v-else class="w-full h-[430px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div
          v-if="currentDataIndex.length !== 0"
          class="w-full h-auto mar-b pad-form-radios card bg-white"
        >
          <!--  -->
          <ChartUvSevenDay></ChartUvSevenDay>
        </div>
        <div v-else class="w-full h-[430px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>

      <!--  -->

      <div class="w-[384px] h-auto">
        <div v-if="paramCurrently" class="w-full h-auto mb-4 card bg-white">
          <WeatherMainSidebarPage></WeatherMainSidebarPage>
        </div>
        <div v-else class="w-full h-[488px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div v-if="paramCurrently" class="w-full h-[430px] mb-4 card bg-white">
          <RadarPage></RadarPage>
        </div>
        <div v-else class="w-full h-[430px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherMainSidebarPage from "@/components/detail/chart-tomorrow-page/weather-main-sidebar-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import RadarPage from "../radar/radar-page.vue";
import ChartUvIndex from "@/components/detail/uv-index/chart-uv-index.vue";
import ChartUvSevenDay from "@/components/detail/uv-index/chart-uv-seven-day.vue";

export default {
  name: "uv-day-page",

  components: {
    SkeletonLoader,
    WeatherMainSidebarPage,
    RadarPage,
    ChartUvIndex,
    ChartUvSevenDay,
  },
  data() {
    return {};
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently?.time;
    },

    currentDataIndex() {
      return this.$store.state.getWeather.dailyDataSeven;
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
