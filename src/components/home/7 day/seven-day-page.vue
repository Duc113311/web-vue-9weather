<template>
  <div class="w-full h-full">
    <div class="w-full h-full flex flex-wrap gap-4">
      <!--  -->
      <div class="w-[750px] h-auto">
        <!--  -->
        <div
          v-if="paramDailyDataSeven.length !== 0"
          class="w-full h-auto mar-b pad-form-radios card bg-white"
        >
          <div class="text-left w-full">
            <p class="txt-v2 txt_bold">
              {{
                $t("Weather_forecast_{name}_for_the_next_7_days.", {
                  name: renderCityName,
                })
              }}
            </p>
          </div>
          <div class="w-full">
            <FormSevenDayPage></FormSevenDayPage>
          </div>
        </div>
        <div v-else class="w-full h-[300px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div
          v-if="paramCurrently"
          class="w-full h-auto pad-form-radios mar-b card bg-white"
        >
          <!--  -->
          <DaySevenPage></DaySevenPage>
        </div>
        <div v-else class="w-full h-[400px]">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <!--  -->
        <div
          v-if="paramDailyDataSeven.length !== 0"
          class="w-full h-auto mar-b card bg-white"
        >
          <!--  -->
          <ChartSevenRainPage></ChartSevenRainPage>
        </div>
        <div v-else class="w-full h-[400px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div
          v-if="paramDailyDataSeven.length !== 0"
          class="w-full h-auto mar-b card bg-white"
        >
          <!--  -->
          <ChartSevenTempPage></ChartSevenTempPage>
        </div>
        <div v-else class="w-full h-[400px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div
          v-if="paramDailyDataSeven.length !== 0"
          class="w-full h-auto mar-b card bg-white"
        >
          <ChartSevenUvPage></ChartSevenUvPage>
        </div>
        <div v-else class="w-full h-[400px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>

      <!--  -->
      <div class="w-[384px] h-auto">
        <!--  -->
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

        <div class="w-full h-[600px] bg-ads"></div>
      </div>
    </div>
  </div>
</template>
<script>
import WeatherMainSidebarPage from "@/components/detail/chart-tomorrow-page/weather-main-sidebar-page.vue";
import RadarPage from "../radar/radar-page.vue";
import FormSevenDayPage from "@/components/detail/seven-day/form-seven-day-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import ChartSevenRainPage from "@/components/detail/seven-day/chart-seven-rain-page.vue";
import ChartSevenTempPage from "@/components/detail/seven-day/chart-seven-temp-page.vue";
import DaySevenPage from "@/components/detail/7-day-forecast/day-seven-page.vue";
import ChartSevenUvPage from "@/components/detail/seven-day/chart-seven-uv-page.vue";

export default {
  name: "seven-day-page",

  components: {
    WeatherMainSidebarPage,
    RadarPage,
    FormSevenDayPage,
    SkeletonLoader,
    ChartSevenRainPage,
    ChartSevenTempPage,
    DaySevenPage,
    ChartSevenUvPage,
  },
  data() {
    return {};
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently?.time;
    },

    paramDailyDataSeven() {
      return this.$store.state.getWeather.dailyDataSeven;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  methods: {},
};
</script>
<style lang="scss"></style>
