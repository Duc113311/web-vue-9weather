<template>
  <div class="w-full h-full">
    <!--  -->
    <BreadcumsPage></BreadcumsPage>

    <!--  -->
    <NavTabbar></NavTabbar>
    <!--  -->

    <div class="container mt-10">
      <div class="header h-full">
        <div class="left-today h-full">
          <TempPage></TempPage>
        </div>
        <div class="right-today">
          <div class="main-top">
            <div class="left-main h-full">
              <TempDayNightPage :title="dayTime"></TempDayNightPage>
            </div>

            <div class="right-main">
              <TempDayNightPage :title="nightTime"></TempDayNightPage>
            </div>
          </div>
          <div class="main-bottom">
            <RadarPage></RadarPage>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <div class="container local-c mt-4">
      <div class="left-location">
        <!--  -->
        <ListNearbyLocation></ListNearbyLocation>
      </div>

      <div class="right-country">
        <!--  -->
        <ListCountryPage></ListCountryPage>
      </div>
    </div>

    <div class="container local-d mt-4">
      <!--  -->
      <div class="left-c">
        <!--  -->
        <div class="w-full">
          <SunPage></SunPage>
        </div>
        <div class="w-full">
          <MoonPage></MoonPage>
        </div>
      </div>

      <div class="center-c">
        <!--  -->
        <div class="w-full">
          <UvPage></UvPage>
        </div>

        <div class="w-full">
          <AirQualityPage></AirQualityPage>
        </div>
      </div>

      <div class="right-c pt-12 h-auto">
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
import BreadcumsPage from "@/layout/breadcums/breadcums-page.vue";
import NavTabbar from "@/layout/tab-menu/nav-tabbar.vue";

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
  },

  data() {
    return {
      dayTime: "Day Time",
      nightTime: "Night Time",
    };
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
