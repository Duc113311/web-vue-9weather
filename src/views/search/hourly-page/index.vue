<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-10">
      <div class="header-h h-full">
        <div class="left-hourly">
          <!--  -->
          <ChartAvgWeather> </ChartAvgWeather>
        </div>

        <div class="right-hourly">
          <!--  -->
          <div class="flex justify-end items-center h-full w-full">
            <img
              src="../../../assets/images/png/ic_app_download.png"
              alt=""
              class="h-full pt-10"
            />
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="container">
      <div class="header-h h-full pt-2">
        <div class="left-hourly h-full">
          <!--  -->
          <ItemTime24h></ItemTime24h>
        </div>

        <div class="right-hourly">
          <!--  -->
          <div>
            <img
              src="../../../assets/images/png/ic_app_download.png"
              alt=""
              class="pt-12"
            />
          </div>

          <SunPage></SunPage>
          <MoonPage></MoonPage>
          <UvPage></UvPage>
          <AirQualityPage></AirQualityPage>
        </div>
      </div>
    </div>

    <!--  -->

    <div class="container">
      <div class="header-2 h-full pt-2">
        <div class="left-hourly">
          <ListCountryPage></ListCountryPage>
        </div>

        <div class="right-hourly">
          <RadarPage></RadarPage>
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
import ChartAvgWeather from "@/components/hourly-day/chart-weather/chart-avg-weather.vue";
import ItemTime24h from "@/components/hourly-day/item-card-page.vue/item-time-24h.vue";
import ListCountryPage from "@/components/today/country/list-country-page.vue";
import RadarPage from "@/components/today/radar/radar-page.vue";

export default {
  name: "hourly-weather",

  components: {
    ChartAvgWeather,
    ItemTime24h,
    ListCountryPage,
    RadarPage,
    SunPage,
    MoonPage,
    AirQualityPage,
    UvPage,
  },
  data() {
    return {};
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
.header-h {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 16px;
}

.header-2 {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}
</style>
