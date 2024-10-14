<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="w-full h-full flex flex-wrap gap-4">
      <!--  -->
      <div class="w-[750px] h-auto">
        <div
          v-if="paramDailyData.length !== 0"
          class="w-full h-auto mar-b pad-form-radios card bg-white"
        >
          <!--  -->
          <List30DayPageNext></List30DayPageNext>
        </div>
        <div v-else class="w-full h-[370px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <!--  -->
        <div
          v-if="paramDailyData.length !== 0"
          class="w-full h-[370px] mar-b pad-form-radios card bg-white"
        >
          <!--  -->
          <FullDayMonthPage></FullDayMonthPage>
        </div>
        <div v-else class="w-full h-[370px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div
          v-if="paramDailyData.length !== 0"
          class="w-full h-auto mar-b pad-form-radios card bg-white"
        >
          <!--  -->
          <CalendarDayPage></CalendarDayPage>
        </div>
        <div v-else class="w-full h-[450px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div
          v-if="paramDailyData.length !== 0"
          class="w-full h-auto mar-b pad-form-radios card bg-white"
        >
          <!--  -->
          <ChartUv30Day></ChartUv30Day>
        </div>
        <div v-else class="w-full h-[450px] mar-b">
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
      </div>
    </div>
  </div>
</template>

<script>
import WeatherMainSidebarPage from "@/components/detail/chart-tomorrow-page/weather-main-sidebar-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import RadarPage from "../radar/radar-page.vue";
import FullDayMonthPage from "@/components/detail/30-day-forecast/full-day-month-page.vue";
import CalendarDayPage from "@/components/detail/calendar-30-day/calendar-day-page.vue";
import List30DayPageNext from "@/components/detail/calendar-30-day/list-30-day-page-next.vue";
import ChartUv30Day from "@/components/detail/calendar-30-day/chart-uv-30-day.vue";

export default {
  name: "day-month-all-clone",

  components: {
    WeatherMainSidebarPage,
    SkeletonLoader,
    RadarPage,
    FullDayMonthPage,
    CalendarDayPage,
    List30DayPageNext,
    ChartUv30Day,
  },
  data() {
    return {};
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently?.time;
    },

    paramDailyData() {
      console.log(
        "listDaily30Day",
        this.$store.state.getWeather.listDaily30Day
      );

      return this.$store.state.getWeather.listDaily30Day;
    },
  },

  mounted() {},

  methods: {},
};
</script>
