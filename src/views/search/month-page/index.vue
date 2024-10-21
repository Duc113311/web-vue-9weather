<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-10">
      <div class="header-m h-full">
        <div class="left-hourly h-[460px]">
          <!--  -->
          <CalendarPage></CalendarPage>
        </div>

        <div class="right-hourly">
          <!--  -->
          <TempFullCard :title="title"></TempFullCard>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header-m h-full">
        <div class="left-hourly w-[810px] h-[400px]">
          <!--  -->
          <ChartMonthPage></ChartMonthPage>
        </div>

        <div class="right-hourly h-[400px]">
          <!--  -->
          <RadarPage></RadarPage>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header-m h-full">
        <div class="left-hourly">
          <!--  -->
        </div>

        <div class="right-hourly">
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TempFullCard from "@/components/common/temp-full/temp-full-card.vue";
import CalendarPage from "@/components/month-day/calendar/calendar-page.vue";
import ChartMonthPage from "@/components/month-day/chart-weather/chart-month-page.vue";
import RadarPage from "@/components/today/radar/radar-page.vue";

export default {
  name: "month-weather",

  components: {
    CalendarPage,
    TempFullCard,
    ChartMonthPage,
    RadarPage,
  },
  data() {
    return {
      title: "Today Sumary",
    };
  },

  mounted() {},

  methods: {},

  beforeRouteLeave(to, from, next) {
    debugger;
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
</style>
