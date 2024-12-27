<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-5">
      <div class="header-h h-full w-full flex gap-4">
        <div class="left-hourly lg:w-[68%] w-full">
          <!--  -->
          <ChartAvgWeather :key="indexState + Math.random()"> </ChartAvgWeather>
        </div>

        <div class="right-hourly w-[30%] md:block hidden">
          <!--  -->
          <!-- <div class="flex justify-end items-center h-full w-full">
            <img src="../../../assets/images/png/ic_app_download.png" alt="" />
          </div> -->
          <TempFullCard
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></TempFullCard>
          <div v-else class="w-full h-full">
            <SkeletonLoader class="w-full h-[600px]"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="container">
      <div class="lg:flex w-full h-full pt-2 gap-4">
        <div class="left-hourly h-full lg:w-[68%] w-full">
          <!--  -->
          <ItemTime24h
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></ItemTime24h>
          <div v-else class="w-full h-[860px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>

        <div class="right-hourly lg:w-[30%] w-full">
          <SunPage
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></SunPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <MoonPage
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length < 0"
          ></MoonPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <UvPage
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></UvPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <AirQualityPage
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></AirQualityPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>

    <!--  -->

    <div class="container w-full flex gap-4">
      <div
        class="left-hourly lg:w-[68%] w-[60%]"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <ListNearbyLocation
          :key="indexState + Math.random()"
        ></ListNearbyLocation>
      </div>
      <div v-else class="w-full h-[380px] mt-5">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

      <div
        class="right-hourly h-[280px] lg:w-[30%] w-[40%]"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <RadarPage :key="indexState + Math.random()"></RadarPage>
      </div>
      <div v-else class="w-full h-[380px] mt-5">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>
    </div>
  </div>
</template>

<script>
import AirQualityPage from "@/components/common/air-quality/air-quality-page.vue";
import MoonPage from "@/components/common/moon-phase/moon-page.vue";
import SunPage from "@/components/common/sun/sun-page.vue";
import TempFullCard from "@/components/common/temp-full/temp-full-card.vue";
import UvPage from "@/components/common/uv-index/uv-page.vue";
import ChartAvgWeather from "@/components/hourly-day/chart-weather/chart-avg-weather.vue";
import ItemTime24h from "@/components/hourly-day/item-card-page.vue/item-time-24h.vue";
import ListNearbyLocation from "@/components/today/nearby-location/list-nearby-location.vue";
import RadarPage from "@/components/today/radar/radar-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "hourly-weather",

  components: {
    ChartAvgWeather,
    ItemTime24h,
    RadarPage,
    SunPage,
    MoonPage,
    AirQualityPage,
    SkeletonLoader,
    ListNearbyLocation,
    UvPage,
    TempFullCard,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    currentlyData() {
      return this.currentlyGetters;
    },

    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },
  },

  mounted() {
    this.setActiveTab(1);
  },

  methods: {
    ...mapMutations("commonModule", ["setActiveTab"]),
  },
  // beforeRouteLeave(to, from, next) {
  //   window.location.replace(to.fullPath);
  //   next(); // Cho phép chuyển route
  // },
};
</script>

<style lang="scss">
.header-2 {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}
</style>
