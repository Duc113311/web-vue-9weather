<template>
  <div class="w-full h-full">
    <!--  -->
    <BreadcumsPage></BreadcumsPage>

    <!--  -->
    <NavTabbar></NavTabbar>
    <!--  -->

    <div class="container mt-5">
      <div class="header h-full w-full lg:flex gap-4">
        <div
          class="left-today lg:w-3/6 w-full h-full"
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <TempPage></TempPage>
        </div>
        <div v-else class="lg:w-[566px] w-full h-[850px] mb-4 lg:mb-0">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div class="right-today lg:w-3/6 w-full">
          <div class="main-top">
            <div
              class="left-main h-full"
              v-if="currentlyData && Object.keys(currentlyData).length > 0"
            >
              <TempDayNightPage :title="dayTime"></TempDayNightPage>
            </div>
            <div v-else class="w-full h-full">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>

            <div
              class="right-main"
              v-if="currentlyData && Object.keys(currentlyData).length > 0"
            >
              <TempDayNightPage :title="nightTime"></TempDayNightPage>
            </div>
            <div v-else class="w-full h-[444px]">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>
          </div>
          <div
            class="main-bottom lg:h-[358px] mt-2"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <RadarPage></RadarPage>
          </div>
          <div v-else class="w-full h-[380px] mt-6">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <div class="container local-d lg:flex block w-full justify-between gap-4">
      <!--  -->
      <div class="md:flex block justify-between lg:w-[70%] w-full gap-4">
        <div class="left-c md:w-[50%] w-full">
          <!--  -->
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <SunPage></SunPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length < 0"
          >
            <MoonPage></MoonPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>

        <div class="center-c md:w-[50%] w-full">
          <!--  -->
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <UvPage></UvPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>

          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <AirQualityPage></AirQualityPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>

      <div class="right-c pt-12 h-auto lg:w-[30%] w-full">
        <!--  -->
        <div class="flex justify-center items-center h-auto">
          <img
            src="../../assets/images/png/ic_app_download.png"
            alt=""
            class="img-logo"
          />
        </div>
      </div>
    </div>

    <div class="container local-c w-full flex gap-4">
      <div
        class="left-location lg:w-[70%] w-[60%]"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <!--  -->
        <ListNearbyLocation></ListNearbyLocation>
      </div>
      <div v-else class="w-full h-[380px] mt-4">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

      <div
        class="right-country lg:w-[30%] w-[40%]"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <!--  -->
        <ListCountryPage></ListCountryPage>
      </div>
      <div v-else class="w-full h-[380px] mt-4">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>
    </div>
  </div>
</template>
<script>
import AirQualityPage from "@/components/common/air-quality/air-quality-page.vue";
import MoonPage from "@/components/common/moon-phase/moon-page.vue";
import SunPage from "@/components/common/sun/sun-page.vue";
import UvPage from "@/components/common/uv-index/uv-page.vue";
import ListCountryPage from "@/components/today/country/list-country-page.vue";
import ListNearbyLocation from "@/components/today/nearby-location/list-nearby-location.vue";
import RadarPage from "@/components/today/radar/radar-page.vue";
import TempDayNightPage from "@/components/today/temp-day-night/temp-day-night-page.vue";
import TempPage from "@/components/today/temperature/temp-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import BreadcumsPage from "@/layout/breadcums/breadcums-page.vue";
import NavTabbar from "@/layout/tab-menu/nav-tabbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "home-page",

  components: {
    BreadcumsPage,
    NavTabbar,
    TempPage,
    TempDayNightPage,
    RadarPage,
    ListNearbyLocation,
    ListCountryPage,
    SunPage,
    MoonPage,
    UvPage,
    AirQualityPage,
    SkeletonLoader,
  },

  data() {
    return {
      dayTime: this.$t("Daytime"),
      nightTime: this.$t("Nighttime"),
    };
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "breadcumsObjectGetters",
    ]),
    currentlyData() {
      return this.currentlyGetters;
    },
  },

  methods: {},
};
</script>
<style lang="scss">
.main-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.img-logo {
  width: 360px;
  height: auto;
}
</style>
