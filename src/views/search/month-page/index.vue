<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-10">
      <div class="header-m h-full">
        <div class="left-hourly">
          <!--  -->
          <CalendarPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></CalendarPage>
          <div v-else class="w-full h-full">
            <SkeletonLoader class="w-[820px] h-[600px]"> </SkeletonLoader>
          </div>
        </div>

        <div class="right-hourly">
          <!--  -->
          <TempFullCard
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
            :title="title"
          ></TempFullCard>

          <div v-else class="w-full h-full">
            <SkeletonLoader class="w-full h-[600px]"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header-b h-full">
        <div class="left-hourly">
          <!--  -->
          <ChartMonthPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></ChartMonthPage>
          <div v-else class="w-full h-full mt-6">
            <SkeletonLoader class="w-[820px] h-[460px]"> </SkeletonLoader>
          </div>
        </div>

        <div class="right-hourly h-[430px]">
          <!--  -->
          <RadarPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></RadarPage>
          <div v-else class="w-full h-full mt-6">
            <SkeletonLoader class="w-full h-[460px]"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header-b h-full">
        <div class="left-hourly">
          <!--  -->
          <ItemTime24h
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></ItemTime24h>
          <div v-else class="w-full h-full mt-6">
            <SkeletonLoader class="w-[820px] h-[960px]"> </SkeletonLoader>
          </div>
        </div>

        <div class="right-hourly">
          <!--  -->
          <SunPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></SunPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!--  -->
          <MoonPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></MoonPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!--  -->
          <UvPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></UvPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!--  -->
          <AirQualityPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></AirQualityPage>
          <div v-else class="w-full h-[200px] mt-5">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>

    <div class="container local-c mt-4">
      <div
        class="left-location"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <ListNearbyLocation></ListNearbyLocation>
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
import CalendarPage from "@/components/month-day/calendar/calendar-page.vue";
import ChartMonthPage from "@/components/month-day/chart-weather/chart-month-page.vue";
import ListCountryPage from "@/components/today/country/list-country-page.vue";
import ListNearbyLocation from "@/components/today/nearby-location/list-nearby-location.vue";
import RadarPage from "@/components/today/radar/radar-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { encodeBase64 } from "@/utils/EncoderDecoderUtils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "month-weather",

  components: {
    CalendarPage,
    TempFullCard,
    ChartMonthPage,
    RadarPage,
    ItemTime24h,
    SunPage,
    MoonPage,
    UvPage,
    AirQualityPage,
    SkeletonLoader,
    ListNearbyLocation,
    ListCountryPage,
  },
  data() {
    return {
      title: "Today Sumary",
    };
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    ...mapGetters("weatherModule", ["currentlyGetters"]),

    breadcumsObject() {
      return this.breadcumsObjectGetters;
    },

    currentlyData() {
      return this.currentlyGetters;
    },
  },

  mounted() {
    debugger;
    this.getWeather30Day();
  },

  methods: {
    ...mapActions("weatherModule", ["getWeather30DayData"]),

    async getWeather30Day() {
      debugger;
      const objectBread = localStorage.getItem("objectBread");
      if (objectBread) {
        const objectBreadValue = JSON.parse(objectBread);
        // const position = this.$route.params.coordinates;
        // const [latitude, longitude] = position.split(", ").map(Number);
        const param = `version=1&type=10&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBreadValue.latitude},${objectBreadValue.longitude}?lang=en`;
        const value = encodeBase64(param);
        await this.getWeather30DayData(value);
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>

<style lang="scss">
.header-m {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}

.header-b {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 16px;
}
</style>
