<template>
  <div class="w-full h-full">
    <div class="container">
      <div class="header h-full w-full lg:flex gap-20-px">
        <div
          class="left-today lg:w-3/6 w-full h-full"
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <TempPage :key="indexState + Math.random()"></TempPage>
        </div>
        <div v-else class="lg:w-[566px] w-full h-[850px]">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div class="right-today lg:w-3/6 w-full">
          <div class="main-top">
            <div
              class="left-main h-full"
              v-if="currentlyData && Object.keys(currentlyData).length > 0"
            >
              <TempDayNightPage
                :key="indexState + Math.random()"
                :title="dayTime"
                :srcDayNight="srcDaytime"
              ></TempDayNightPage>
            </div>
            <div v-else class="w-full h-full">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>

            <div
              class="right-main"
              v-if="currentlyData && Object.keys(currentlyData).length > 0"
            >
              <TempDayNightPage
                :title="nightTime"
                :srcDayNight="srcNighttime"
                :isShowDayNight="isShowDayNight"
                :key="indexState + Math.random()"
              ></TempDayNightPage>
            </div>
            <div v-else class="w-full h-[444px]">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>
          </div>
          <div
            class="main-bottom lg:h-[344px] mt-2"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <RadarPage :key="indexState + Math.random()"></RadarPage>
          </div>
          <div v-else class="w-full h-[380px] mt-6">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <div
      class="container local-d lg:flex block w-full justify-between gap-20-px pt-4 pb-4"
    >
      <!--  -->
      <div class="md:flex block justify-between lg:w-[70%] w-full gap-20-px">
        <div class="left-c md:w-[50%] w-full flex flex-col gap-20-px">
          <!--  -->
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <SunPage :key="indexState + Math.random()"></SunPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <MoonPage :key="indexState + Math.random()"></MoonPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>

        <div class="center-c md:w-[50%] w-full flex flex-col gap-20-px">
          <!--  -->
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <UvPage :key="indexState + Math.random()"></UvPage>
          </div>
          <div v-else class="w-full h-[230px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>

          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          >
            <AirQualityPage :key="indexState + Math.random()"></AirQualityPage>
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
            src="../../../assets/images/png/ic_app_download.png"
            alt=""
            class="img-logo"
          />
        </div>
      </div>
    </div>

    <div class="container local-c w-full flex gap-20-px">
      <div
        class="left-location lg:w-[70%] w-[60%]"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <!--  -->
        <ListNearbyLocation
          :key="indexState + Math.random()"
        ></ListNearbyLocation>
      </div>
      <div v-else class="w-full h-[300px] mt-4">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

      <div
        class="right-country lg:w-[30%] w-[40%]"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <!--  -->
        <ListCountryPage :key="indexState + Math.random()"></ListCountryPage>
      </div>
      <div v-else class="w-full h-[300px] mt-4">
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
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "today-weather",
  components: {
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
      isShowDayNight: false,
      srcDaytime: require("../../../assets/images/svg_v2/ic_sun_daytime.svg"),
      srcNighttime: require("../../../assets/images/svg_v2/ic_nighttime.svg"),
      descriptDaytime: this.$t("Lorem_ipsum"),
      descriptNighttime: this.$t("Lorem_ipsum"),
    };
  },

  computed: {
    ...mapGetters("weatherModule", [
      "currentlyGetters",
      "dailyOneGetters",
      "suggestionsTop100Getters",
    ]),

    currentlyData() {
      return this.currentlyGetters;
    },

    suggestionsTop100Data() {
      return this.suggestionsTop100Getters;
    },

    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },
  },

  mounted() {
    const keyLanguage = this.$route.params.language;
    if (keyLanguage) {
      localStorage.setItem("language", keyLanguage); // Lưu lại
    }
    this.setActiveTab(0);
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
.img-logo {
  width: 360px;
  height: auto;
}
</style>
