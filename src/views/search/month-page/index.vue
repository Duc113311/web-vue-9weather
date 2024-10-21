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

    <div class="container h-[28rem]">
      <div class="header-m">
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
      <div class="header-b">
        <div class="left-hourly">
          <!--  -->
          <ItemTime24h></ItemTime24h>
        </div>

        <div class="right-hourly">
          <!--  -->
          <SunPage></SunPage>
          <!--  -->
          <MoonPage></MoonPage>
          <!--  -->
          <UvPage></UvPage>
          <!--  -->
          <AirQualityPage></AirQualityPage>
        </div>
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
import ItemTime24h from "@/components/hourly-day/item-card-page.vue/item-time-24h.vue";
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
    ItemTime24h,
    SunPage,
    MoonPage,
    UvPage,
    AirQualityPage,
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

.header-b {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 16px;
}
</style>
