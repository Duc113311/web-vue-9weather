<template>
  <div class="w-full">
    <div class="flex items-center flex-hourly h-full">
      <div
        class="left-i"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <BaseComponent>
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
                width="24"
                alt=""
              />
              <span>Today Sumary</span>
            </div>
          </template>

          <div class="w-full gap-4 grid">
            <div class="w-[550px] h-[400px]">
              <ChartTempRain></ChartTempRain>
            </div>

            <!--  -->
          </div>
        </BaseComponent>
      </div>
      <div v-else class="lg:w-[566px] w-full h-[480px]">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

      <div class="right-i">
        <BaseComponent
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
                width="24"
                alt=""
              />
              <span>Today Sumary</span>
            </div>
          </template>

          <div class="w-full gap-4 grid">
            <div class="w-[160px] h-[170px]">
              <div class="flex justify-start items-center text-left">
                <img
                  :src="convertIconCurrently(dailyOneData?.icon)"
                  width="40"
                  height="40"
                  class="object-cover"
                />
              </div>
              <div class="flex items-center pt-1 pb-1">
                <p>
                  {{ renderToCelsius(dailyOneData?.temperatureMin) }}
                  -
                  {{ renderToCelsius(dailyOneData?.temperatureMax) }}
                </p>
              </div>
              <div class="flex justify-start items-center pt-1 pb-1">
                {{ dailyOneData?.summary }}
              </div>

              <div class="flex justify-start items-center pt-1 pb-1">
                <span>Feels like: </span> &nbsp;
                <span>{{ convertFahrenheitToCelsiusAmtp(dailyOneData) }}</span>
              </div>
            </div>

            <!--  -->
          </div>
        </BaseComponent>
        <div v-else class="w-full h-[230px]">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <BaseComponent
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <div class="w-full gap-4 grid">
            <div class="w-[160px] h-[170px]">
              <div class="flex justify-start items-center text-left">
                <img
                  src="../../../assets/images/svg_v2/ic_precititation.svg"
                  width="40"
                  height="40"
                  class="object-cover"
                />
              </div>
              <div class="flex items-center justify-start pt-1 pb-1">
                <p>{{ dailyOneData?.precipProbability * 100 }}%</p>
              </div>
              <div class="flex justify-start items-center pt-1 pb-1">
                <p>Chance of rain</p>
              </div>
              <div class="flex justify-start items-center pt-1 pb-1">
                <p>Precipitation:</p>
              </div>
              <div class="flex justify-start items-center pt-1 pb-1">
                <p>{{ convertPrecipitation(dailyOneData?.precipIntensity) }}</p>
              </div>
            </div>

            <!--  -->
          </div>
        </BaseComponent>
        <div v-else class="w-full h-[230px] mt-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import ChartTempRain from "@/components/today/temperature/chart-temp-rain.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import {
  codeToFind,
  convertCtoF,
  convertFtoC,
  convertMillimet,
  convertMillimetToInch,
  getIconHourlyForecastTheme,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "chart-avg-weather",

  components: {
    BaseComponent,
    ChartTempRain,
    SkeletonLoader,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["dailyOneGetters", "currentlyGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },

    dailyOneData() {
      return this.dailyOneGetters;
    },
  },

  methods: {
    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertPrecipitation(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        return (
          convertMillimet(val) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      } else {
        return (
          convertMillimetToInch(val) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      }
    },

    convertFahrenheitToCelsiusAmtp(value) {
      const tempMin = value.apparentTemperatureMin;
      const tempMax = value.apparentTemperatureMax;
      const avgTemp = (parseInt(tempMax) + parseInt(tempMin)) / 2;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return (
          convertCtoF(avgTemp) + codeToFind(unitSetting.activeTemperature_save)
        );
      } else {
        return (
          convertFtoC(avgTemp) + codeToFind(unitSetting.activeTemperature_save)
        );
      }
    },

    renderToCelsius(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return (
          convertCtoF(value) + codeToFind(unitSetting.activeTemperature_save)
        );
      } else {
        return (
          convertFtoC(value) + codeToFind(unitSetting.activeTemperature_save)
        );
      }
    },
  },
};
</script>
<style lang="scss">
.flex-hourly {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}
</style>
