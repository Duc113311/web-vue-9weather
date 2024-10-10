<template>
  <div class="w-full h-full mb-6">
    <div class="w-full text-left pt-2 pb-2">
      <p class="txt_bold txt-v2">
        Weather forecast {{ renderCityName }} for the next 3 days.
      </p>
    </div>
    <div class="w-full h-full flex flex-wrap gap-4">
      <!--  -->
      <div class="w-[750px] h-auto" v-if="paramDailyDataThree.length !== 0">
        <!--  -->
        <div
          class="w-full mb-4 card bg-white"
          v-for="(item, index) in paramDailyDataThree"
          :key="index"
        >
          <div
            :class="{
              'h-300px overflow-hidden transition-height':
                numberChoose !== index,
            }"
          >
            <FormThreeDayPage :currentDailyDataThree="item"></FormThreeDayPage>
          </div>
          <div class="w-full mb-4 mt-6" v-if="numberChoose === index">
            <!--  -->
            <!-- <WeatherChartRain></WeatherChartRain> -->
          </div>

          <div class="w-full text-left pl-4 pb-4">
            <button
              type="button"
              @click="onClickLoadMoreItems(index)"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
            >
              <span class="txt_medium">{{
                numberChoose === index ? "Hide" : "See more"
              }}</span>
            </button>
          </div>
        </div>
        <!--  -->
        <div class="w-full h-auto mb-4 card bg-white">
          <!--  -->
          <!-- <WeatherThreeAllPage></WeatherThreeAllPage> -->
        </div>
      </div>
      <div v-else class="w-[750px] h-[488px] mar-b">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

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
        <!--  -->
      </div>
    </div>
  </div>
</template>
<script>
import WeatherMainSidebarPage from "@/components/detail/chart-tomorrow-page/weather-main-sidebar-page.vue";
import RadarPage from "../radar/radar-page.vue";
import FormThreeDayPage from "@/components/detail/three-day/form-three-day-page.vue";
import WeatherChartRain from "@/components/detail/chart-tomorrow-page/weather-chart-rain-tow.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import WeatherThreeAllPage from "@/components/detail/three-day/weather-three-all-page.vue";

export default {
  name: "three-day-page",

  components: {
    WeatherMainSidebarPage,
    RadarPage,
    FormThreeDayPage,
    // WeatherChartRain,
    // WeatherThreeAllPage,
    SkeletonLoader,
  },
  data() {
    return {
      numberChoose: null,
    };
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently.time;
    },
    paramDailyDataThree() {
      return this.$store.state.getWeather.dailyDataThree;
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

  methods: {
    onClickLoadMoreItems(index) {
      if (this.numberChoose === index) {
        this.numberChoose = null;
      } else {
        this.numberChoose = index;
      }
    },
  },
};
</script>
<style lang="scss">
.h-200px {
  height: 200px;
}

.overflow-hidden {
  overflow: hidden;
}

.transition-height {
  transition: height 0.3s ease; /* Thời gian và kiểu chuyển đổi */
}
</style>
