<template>
  <div class="w-full h-full mb-6">
    <!--  -->
    <div class="w-full h-full flex flex-wrap gap-4">
      <div class="w-[750px] h-auto">
        <!--  -->
        <div v-if="paramDailyOne" class="w-full h-[400px] mb-4 card bg-white">
          <!--  -->
          <div class="w-full h-full text-white" :class="drawerClass">
            <div class="text-left p-4 w-full">
              <p class="txt_bold">
                {{
                  $t("Weather_forecast_{name}_tomorrow", {
                    name: renderCityName,
                  })
                }}
              </p>
            </div>

            <ChartCanvasTomorrowPage
              :paramDaily="paramDailyOne"
              :paramCurrentlyDay="paramCurrentlyDay"
            ></ChartCanvasTomorrowPage>
          </div>
        </div>
        <div v-else class="h-[400px] w-full mb-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <!--  -->

        <div
          v-if="paramTomorrowData.length"
          class="w-full h-auto mb-4 card bg-white"
        >
          <!--  -->
          <WeatherByHourPage></WeatherByHourPage>
        </div>
        <div v-else class="h-[300px] w-full mb-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <!-- Chart -->

        <div
          v-if="paramTomorrowData.length !== 0"
          class="w-full h-auto mb-4 card bg-white"
        >
          <!--  -->
          <WeatherChartRainTow></WeatherChartRainTow>
        </div>
        <div v-else class="h-[400px] w-full mb-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <!--  -->
        <div
          v-if="paramTomorrowData.length !== 0"
          class="w-full h-auto card bg-white mb-4"
        >
          <!--  -->
          <WeatherChartTemperature></WeatherChartTemperature>
        </div>
        <div v-else class="h-[400px] w-full mb-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div
          v-if="paramTomorrowData.length !== 0"
          class="w-full h-auto card bg-white"
        >
          <!--  -->
          <WeatherChartUv></WeatherChartUv>
        </div>
        <div v-else class="h-[400px] w-full mb-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>
      <div class="w-[384px] h-auto">
        <!--  -->
        <div v-if="paramCurrently" class="w-full h-auto mb-4 card bg-white">
          <!--  -->
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
import WeatherByHourPage from "@/components/detail/chart-tomorrow-page/weather-by-hour-page.vue";
import WeatherChartTemperature from "@/components/detail/chart-tomorrow-page/weather-chart-temperature.vue";
import WeatherMainSidebarPage from "@/components/detail/chart-tomorrow-page/weather-main-sidebar-page.vue";
import RadarPage from "../radar/radar-page.vue";
import ChartCanvasTomorrowPage from "@/components/detail/chart-tomorrow-page/chart-canvas-tomorrow-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import WeatherChartRainTow from "@/components/detail/chart-tomorrow-page/weather-chart-rain-tow.vue";
import WeatherChartUv from "@/components/detail/chart-tomorrow-page/weather-chart-uv.vue";

export default {
  name: "tomorrow-page",
  components: {
    WeatherMainSidebarPage,
    WeatherByHourPage,
    WeatherChartTemperature,
    RadarPage,
    ChartCanvasTomorrowPage,
    SkeletonLoader,
    WeatherChartRainTow,
    WeatherChartUv,
  },
  data() {
    return {};
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently.time;
    },

    paramDailyOne() {
      return this.$store.state.getWeather.tomorrowData[1];
    },

    paramCurrentlyDay() {
      console.log("dailyData1", this.$store.state.getWeather.dailyData[1]);

      return this.$store.state.getWeather.dailyData[1];
    },

    paramTomorrowData() {
      return this.$store.state.getWeather.tomorrowData;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },

    drawerClass() {
      const iconName = this.$store.state.getWeather.tomorrowData[1];
      const dailyOneName = this.$store.state.getWeather.dailyData[1];
      console.log("dailyOneName", dailyOneName);
      console.log("iconName", iconName);
      if (!dailyOneName || !iconName) {
        return "number-1"; // Trả về class mặc định nếu chưa có dữ liệu
      }
      const isDay = this.convertTimeDayNight(dailyOneName);
      switch (iconName.icon) {
        case "rain":
          if (isDay) {
            return "bg_main_rain";
          } else {
            return "bg_main_rain_night";
          }
        case "partly-cloudy-day":
          return "bg_main_partlycloudyday";
        case "partly-cloudy-night":
          return "bg_main_partlycloudynight";
        case "clear-day":
          return "bg_main_clearday";
        case "clear-night":
          return "bg_main_clearnight";
        case "sleet":
          if (isDay) {
            return "bg_main_sleet";
          } else {
            return "bg_main_sleet_night";
          }
        case "fog":
          if (isDay) {
            return "bg_main_fog";
          } else {
            return "bg_main_fog_night";
          }
        case "wind":
          if (isDay) {
            return "bg_main_wind";
          } else {
            return "bg_main_wind_night";
          }
        case "snow":
          if (isDay) {
            return "bg_main_snow";
          } else {
            return "bg_main_snow_night";
          }
        case ("thunderstorm", "tornado"):
          if (isDay) {
            return "bg_main_thunderstorm_day";
          } else {
            return "bg_main_thunderstorm_night";
          }
        case "cloudy":
          if (isDay) {
            return "bg_main_cloudyday";
          } else {
            return "bg_main_cloudynight";
          }
        default:
          return "number-1";
      }
    },
  },

  methods: {
    convertTimeDayNight(value) {
      if (!value || !value.sunriseTime || !value.sunsetTime) {
        // Kiểm tra nếu giá trị chưa có đủ dữ liệu
        return false; // Trả về giá trị mặc định, hoặc xử lý theo cách khác
      }
      const sunrise = value.sunriseTime;
      const sunset = value.sunsetTime;
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > sunrise && currentTime < sunset) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
.number-1 {
  background-image: url(@/assets/images/png/new_york.png);
}
.bg_main_clearday {
  background-image: url(@/assets/images/bg_main_clearday.imageset/bg_main_clearday.png);
}
.bg_main_clearnight {
  background-image: url(@/assets/images/bg_main_clearnight.imageset/bg_main_clearnight.png);
}
.bg_main_cloudyday {
  background-image: url(@/assets/images/bg_main_cloudyday.imageset/bg_main_cloudyday.png);
}
.bg_main_cloudynight {
  background-image: url(@/assets/images/bg_main_cloudynight.imageset/bg_main_cloudynight.png);
}
.bg_main_fog {
  background-image: url(@/assets/images/bg_main_fog.imageset/bg_main_fog.png);
}
.bg_main_fog_night {
  background-image: url(@/assets/images/bg_main_fog_night.imageset/bg_main_fog_night.png);
}
.bg_main_partlycloudyday {
  background-image: url(@/assets/images/bg_main_partlycloudyday.imageset/bg_main_partlycloudyday.png);
}
.bg_main_partlycloudynight {
  background-image: url(@/assets/images/bg_main_partlycloudynight.imageset/bg_main_partlycloudynight.png);
}
.bg_main_rain {
  background-image: url(@/assets/images/bg_main_rain.imageset/bg_main_rain.png);
}
.bg_main_rain_night {
  background-image: url(@/assets/images/bg_main_rain_night.imageset/bg_main_rain_night.png);
}
.bg_main_sleet {
  background-image: url(@/assets/images/bg_main_sleet.imageset/bg_main_sleet.png);
}
.bg_main_sleet_night {
  background-image: url(@/assets/images/bg_main_sleet_night.imageset/bg_main_sleet_night.png);
}
.bg_main_snow {
  background-image: url(@/assets/images/bg_main_snow.imageset/bg_main_snow.png);
}
.bg_main_snow_night {
  background-image: url(@/assets/images/bg_main_snow_night.imageset/bg_main_snow_night.png);
}
.bg_main_start {
  background-image: url(@/assets/images/bg_main_start.imageset/bg_main_start.png);
}
.bg_main_thunderstorm_day {
  background-image: url(@/assets/images/bg_main_thunderstorm_day.imageset/bg_main_thunderstorm_day.png);
}
.bg_main_thunderstorm_night {
  background-image: url(@/assets/images/bg_main_thunderstorm_night.imageset/bg_main_thunderstorm_night.png);
}
.bg_main_variant_a {
  background-image: url(@/assets/images/bg_main_variant_a.imageset/bg_main_variant_a.png);
}
.bg_main_variant_b {
  background-image: url(@/assets/images/bg_main_variant_b.imageset/bg_main_variant_b.png);
}
.bg_main_variant_c {
  background-image: url(@/assets/images/bg_main_variant_c.imageset/bg_main_variant_c.png);
}
.bg_main_wind {
  background-image: url(@/assets/images/bg_main_wind.imageset/bg_main_wind.png);
}
.bg_main_wind_night {
  background-image: url(@/assets/images/bg_main_wind_night.imageset/bg_main_wind_night.png);
}
</style>
