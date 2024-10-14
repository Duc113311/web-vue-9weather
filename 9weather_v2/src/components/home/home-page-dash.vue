<template>
  <div class="w-full h-full">
    <div class="w-full lg:h-[350px] h-auto">
      <!--  -->
      <div class="w-full h-full lg:flex justify-between">
        <!-- Left -->
        <div
          v-if="paramCurrently"
          class="lg:w-[566px] w-full h-full bg-white card lg:mr-4 mr-0 lg:mb-0 mb-4"
        >
          <!--  -->
          <CityPageV2></CityPageV2>
        </div>
        <div v-else class="lg:w-[566px] w-full h-full">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <div
          v-if="paramCurrently"
          class="lg:w-[566px] w-full h-full bg-white card"
        >
          <!--  -->
          <SunrisePageV2></SunrisePageV2>
        </div>
        <div v-else class="lg:w-[566px] w-full h-full">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <!-- Center -->
      </div>
    </div>

    <!-- Form -->
    <div class="w-full h-full pad-form-tb">
      <div class="w-full h-full flex flex-col lg:flex-row justify-between">
        <!-- left -->

        <!-- Center -->
        <div class="w-full h-full pl-0 pr-0">
          <div class="h-full w-full">
            <!-- 01 -->
            <div class="w-full justify-between lg:flex pad-b-b">
              <!-- left -->
              <div
                v-if="paramCurrently"
                class="2xl:w-[790px] xl:w-[640px] lg:w-[640px] w-full h-[329px] mb-3 lg:mb-0 card"
              >
                <div class="pad-form-radios bg-from w-full h-full">
                  <div class="w-full h-full">
                    <HourlyPage :key="indexKey"></HourlyPage>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="2xl:w-[790px] xl:w-[640px] lg:w-[640px] w-full h-[329px] mb-3 lg:mb-0 card"
              >
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>

              <!-- right -->
              <div
                v-if="paramCurrently"
                class="card 2xl:w-[calc(100%-808px)] xl:w-[calc(100%-655px)] lg:w-[calc(100%-650px)] h-[329px]"
              >
                <div class="bg-from w-full h-full">
                  <!--  -->
                  <div class="w-full h-full">
                    <RadarPage></RadarPage>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="card 2xl:w-[calc(100%-808px)] xl:w-[calc(100%-655px)] lg:w-[calc(100%-650px)] h-[329px]"
              >
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
            </div>

            <div class="w-full justify-between lg:flex mar-b h-auto">
              <!--  -->
              <div
                class="2xl:w-[790px] xl:w-[640px] lg:w-[640px] w-full mb-3 lg:mb-0"
              >
                <!-- 01 -->
                <div class="w-full md:h-[362px] h-auto md:flex mar-b">
                  <!-- Form -->
                  <div
                    v-if="paramCurrently"
                    class="2xl:w-[320px] xl:w-[257px] lg:w-[257px] w-full h-full mb-3 lg:mb-0 mar-r card"
                  >
                    <div class="bg-from w-full h-full">
                      <!-- <NowPage></NowPage> -->
                      <div class="w-full h-full">
                        <NowPage :key="indexKey"></NowPage>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="2xl:w-[320px] xl:w-[257px] lg:w-[257px] w-full h-full mar-r lg:mb-0 mr-3"
                  >
                    <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                  </div>
                  <!--  -->
                  <div class="h-full">
                    <!-- Form -->
                    <div
                      class="flex justify-between w-full mar-b gap-4 h-[173px]"
                    >
                      <div
                        v-if="paramCurrently"
                        class="2xl:w-[228px] xl:w-[152px] lg:w-[155px] w-full h-full card"
                      >
                        <div class="pad-form-radios bg-from w-full h-full">
                          <!-- <UvTotalPage></UvTotalPage> -->
                          <div class="w-full h-full">
                            <UvTotalPage :key="indexKey"></UvTotalPage>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="2xl:w-[228px] xl:w-[152px] lg:w-[155px] w-full h-[176px] card"
                      >
                        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                      </div>
                      <div
                        v-if="paramCurrently"
                        class="2xl:w-[228px] xl:w-[152px] lg:w-[155px] w-full h-full card"
                      >
                        <div class="pad-form-radios bg-from w-full h-full">
                          <!-- <HumidityPage></HumidityPage> -->
                          <div class="w-full h-full">
                            <HumidityPage :key="indexKey"></HumidityPage>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="2xl:w-[228px] xl:w-[152px] lg:w-[155px] w-full h-full card"
                      >
                        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                      </div>
                    </div>
                    <!-- Form -->
                    <div class="flex justify-between w-full gap-4 h-[173px]">
                      <div
                        v-if="paramCurrently"
                        class="2xl:w-[228px] xl:w-[152px] lg:w-[155px] w-full h-[172px] card"
                      >
                        <div class="pad-form-radios bg-from w-full h-full">
                          <!-- <AirQualityPage></AirQualityPage> -->
                          <div class="w-full h-full">
                            <AirQualityPage :key="indexKey"></AirQualityPage>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="2xl:w-[228px] xl:w-[152px] lg:w-[155px] w-full h-[172px] card"
                      >
                        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                      </div>
                      <div
                        v-if="paramCurrently"
                        class="2xl:w-[228px] xl:w -[152px] lg:w-[155px] w-full h-[172px] card"
                      >
                        <div class="pad-form-radios bg-from w-full h-full">
                          <!-- <ChangeOfRainPage></ChangeOfRainPage> -->

                          <div class="w-full h-full">
                            <ChangeOfRainPage
                              :key="indexKey"
                            ></ChangeOfRainPage>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="2xl:w-[228px] xl:w -[152px] lg:w-[155px] w-full h-[172px] card"
                      >
                        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                      </div>
                    </div>
                    <!--  -->
                  </div>
                </div>
                <!-- 02 -->
                <div v-if="paramCurrently" class="w-full h-[164px] mar-b card">
                  <div class="pad-form-radios bg-from w-full h-full">
                    <div class="w-full h-full">
                      <UvIndexSummerPage :key="indexKey"></UvIndexSummerPage>
                    </div>
                  </div>
                </div>
                <div v-else class="w-full h-[164px] mar-b">
                  <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                </div>
                <!-- 03 -->
                <div v-if="paramCurrently" class="w-full h-[184px] card">
                  <div class="pad-form-radios bg-from w-full h-full">
                    <div class="w-full h-full">
                      <MoonPhasePage :key="indexKey"></MoonPhasePage>
                    </div>
                  </div>
                </div>
                <div v-else class="w-full h-[184px]">
                  <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                </div>
              </div>

              <div
                class="2xl:w-[calc(100%-808px)] xl:w-[calc(100%-655px)] lg:w-[calc(100%-650px)] bg-ads"
              >
                <!-- ads -->
              </div>
            </div>

            <!-- 02 -->

            <!-- 03 -->
            <div class="w-full lg:flex justify-between">
              <!-- right -->
              <div class="w-full h-[400px] card" v-if="paramCurrently">
                <div class="pad-form-radios bg-from w-full h-full">
                  <!-- <MonthForecast /> -->
                  <div class="w-full h-full">
                    <!-- <MonthForecast :key="indexKey" /> -->
                    <WeekedPage :key="indexKey"></WeekedPage>
                  </div>
                </div>
              </div>
              <div v-else class="w-full h-[400px]">
                <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
              </div>
            </div>
          </div>
        </div>
        <!-- end-center -->

        <!-- right -->
      </div>
    </div>
    <!--  -->
  </div>
</template>
<!--  -->
<script>
// import DayPage from "@/components/home/clear-day/day-page.vue";
import RadarPage from "@/components/home/radar/radar-page.vue";
import HourlyPage from "@/components/home/hourly-forecast/hourly-page.vue";
import CityPageV2 from "@/components/home/v2/weather-city/city-page-v2.vue";
import SunrisePageV2 from "@/components/home/v2/weather-city/sunrise-page-v2.vue";
import NowPage from "./now/now-page.vue";
import UvTotalPage from "./uv-index/uv-total-page.vue";
import HumidityPage from "./humidity/humidity-page.vue";
import AirQualityPage from "./air-quality/air-quality-page.vue";
import ChangeOfRainPage from "./change-of-rain/change-of-rain-page.vue";
import UvIndexSummerPage from "./uv-index-summer/uv-index-summer-page.vue";
import MoonPhasePage from "./moon-phase/moon-phase-page.vue";
import { mapActions } from "vuex";
// import MonthForecast from "./30-day-forecast/30-day-forecast.vue";
import SkeletonLoader from "../../control-ui/SkeletonLoader/SkeletonLoader.vue";
import HorizontalScrollMoonPhase from "../home/moon-phase/HorizontalScrollMoonPhase.vue";
import CalendarMoonPhase from "../home/moon-phase/calendarMoonPhase.vue";
import AqiWeather from "./uv-index/AqiWeather.vue";
import WeekedPage from "../detail/weeked-list/weeked-page.vue";

export default {
  name: "home-page-dash",

  components: {
    HourlyPage,
    // DayPage,
    RadarPage,
    NowPage,
    UvTotalPage,
    HumidityPage,
    AirQualityPage,
    ChangeOfRainPage,
    UvIndexSummerPage,
    MoonPhasePage,
    // MonthForecast,
    SkeletonLoader,
    CityPageV2,
    SunrisePageV2,
    WeekedPage,
    // AqiWeather,
    // HorizontalScrollMoonPhase,
    // CalendarMoonPhase,
  },
  data() {
    return {};
  },

  async mounted() {
    // await this.getWeatherData(value);
  },
  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently?.time;
    },

    indexKey() {
      return this.$store.state.commonModule.indexKey;
    },
  },

  methods: {
    ...mapActions(["getWeatherData"]),
  },
};
</script>
<style lang="scss">
.img-ads-ngang {
  background-image: url(../../assets/images/png/ads_ngang.jpg);
}

.bg-moon {
  background-color: #412f63;
}
</style>
