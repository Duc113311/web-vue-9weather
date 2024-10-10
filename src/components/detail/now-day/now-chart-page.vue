<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-full flex flex-col lg:flex-row justify-between mb-6">
      <!--  -->

      <div class="w-full h-full">
        <!--  -->
        <div class="w-full flex justify-center items-center">
          <div class="w-full">
            <div class="flex flex-wrap gap-4">
              <!-- Tốc độ gió -->
              <div
                v-if="objectCurrently && objectCurrently.time"
                class="pad-form-radios bg-from h-auto w-[565px] card overflow-hidden"
              >
                <WindSpeed></WindSpeed>
              </div>
              <div v-else class="h-[510px] w-[565px] card overflow-hidden">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
              <!-- Cloud cover -->
              <div
                v-if="objectCurrently && objectCurrently.time"
                class="pad-form-radios bg-from h-auto w-[565px] card"
              >
                <PageHumidity></PageHumidity>
              </div>
              <div v-else class="h-[510px] w-[565px] card overflow-hidden">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
              <!-- FeelsLike -->
              <div
                v-if="objectCurrently && objectCurrently.time"
                class="pad-form-radios bg-from h-auto w-[565px] card"
              >
                <PageCloudCover></PageCloudCover>
              </div>
              <div v-else class="h-[510px] w-[565px] card overflow-hidden">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
              <!-- Pressure -->
              <div
                v-if="objectCurrently && objectCurrently.time"
                class="pad-form-radios bg-from h-auto w-[565px] card"
              >
                <PagePressure></PagePressure>
              </div>
              <div v-else class="h-[510px] w-[565px] card overflow-hidden">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
              <!--  -->
              <div
                v-if="objectCurrently && objectCurrently.time"
                class="pad-form-radios bg-from h-auto w-[565px] card"
              >
                <PageSunriseSunset></PageSunriseSunset>
              </div>
              <div v-else class="h-[510px] w-[565px] card overflow-hidden">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
              <!--  -->
              <div
                v-if="objectCurrently && objectCurrently.time"
                class="pad-form-radios bg-from h-auto w-[565px] card"
              >
                <PagePrecipitation></PagePrecipitation>
              </div>
              <div v-else class="h-[510px] w-[565px] card overflow-hidden">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import PageCloudCover from "./compoment-page-weather-now/page-cloud-cover.vue";
// import PageFeelsLike from "./compoment-page-weather-now/page-feels-like.vue";
import PageHumidity from "./compoment-page-weather-now/page-humidity.vue";
import PagePrecipitation from "./compoment-page-weather-now/page-precipitation.vue";
import PagePressure from "./compoment-page-weather-now/page-pressure.vue";
import PageSunriseSunset from "./compoment-page-weather-now/page-sunrise-sunset.vue";
import WindSpeed from "./compoment-page-weather-now/wind-speed.vue";

export default {
  name: "now-chart-page",
  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    WindSpeed,
    PagePrecipitation,
    PageHumidity,
    // PageFeelsLike,
    PagePressure,
    PageSunriseSunset,
    PageCloudCover,
    SkeletonLoader,
  },
  data() {
    return {};
  },

  computed: {
    objectCurrently() {
      return this.$store.state.getWeather.currently;
    },
  },

  created() {},

  methods: {},
};
</script>
<style lang="scss"></style>
