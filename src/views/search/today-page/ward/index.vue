<template>
  <div class="w-full h-full">
    <div class="container mt-10">
      <div class="header h-full">
        <div
          class="left-today h-full"
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <TempPage></TempPage>
        </div>
        <div v-else class="lg:w-[566px] w-full h-[850px]">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div class="right-today">
          <div class="main-top">
            <div
              class="left-main h-full"
              v-if="currentlyData && Object.keys(currentlyData).length > 0"
            >
              <TempDayNightPage
                :title="dayTime"
                :isShowDayNight="true"
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
                :isShowDayNight="false"
              ></TempDayNightPage>
            </div>

            <div v-else class="w-full h-[444px]">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>
          </div>
          <div
            class="main-bottom h-[362px] mt-2"
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

    <div class="container local-c">
      <div
        class="left-location"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <!-- <ListNearbyLocation></ListNearbyLocation> -->
        <!-- <ListWardByCity></ListWardByCity> -->
        <ListWardRandomByCity></ListWardRandomByCity>
      </div>
      <div v-else class="w-full h-[380px] mt-4">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

      <div
        class="right-country"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <!--  -->
        <ListCountryPage></ListCountryPage>
      </div>

      <div v-else class="w-full h-[380px] mt-4">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>
    </div>

    <div class="container local-d">
      <!--  -->
      <div class="left-c">
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
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <MoonPage></MoonPage>
        </div>
        <div v-else class="w-full h-[230px] mt-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>

      <div class="center-c">
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

      <div class="right-c pt-12 h-auto">
        <!--  -->
        <div class="flex justify-center items-center h-auto">
          <img
            src="../../../../assets/images/png/ic_app_download.png"
            alt=""
            class="img-logo"
          />
        </div>
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
import ListWardByCity from "@/components/today/nearby-location/list-ward-by-city.vue";
import ListWardRandomByCity from "@/components/today/nearby-location/list-ward-random-by-city.vue";
import RadarPage from "@/components/today/radar/radar-page.vue";
import TempDayNightPage from "@/components/today/temp-day-night/temp-day-night-page.vue";
import TempPage from "@/components/today/temperature/temp-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "today-weather-ward",
  components: {
    TempPage,
    TempDayNightPage,
    RadarPage,
    // ListNearbyLocation,
    // ListWardByCity,
    ListWardRandomByCity,
    ListCountryPage,
    SunPage,
    MoonPage,
    UvPage,
    AirQualityPage,
    SkeletonLoader,
  },
  data() {
    return {
      dayTime: "Day Time",
      nightTime: "Night Time",
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
  },

  mounted() {
    const keyLanguage = this.$route.params.language;

    localStorage.setItem("language", keyLanguage); // Lưu lại
  },

  methods: {},

  beforeRouteLeave(to, from, next) {
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>

<style lang="scss">
.header {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}

.main-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.local-c {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
}

.local-d {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 16px;
}

.img-logo {
  width: 360px;
  height: 443px;
}
</style>
