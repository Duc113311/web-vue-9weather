<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-full flex flex-col lg:flex-row justify-between">
      <!--  -->

      <div class="w-[750px] h-auto">
        <div
          v-if="paramCurrently"
          class="pad-form-radios bg-from w-full h-[326px] mar-b card"
        >
          <!--  -->
          <HourlyPage :isShowBtn="true"></HourlyPage>
          <!--  -->
        </div>
        <div v-else class="w-full h-[326px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div v-if="paramCurrently" class="w-full h-auto mar-b card bg-white">
          <!--  -->
          <HourNextPage></HourNextPage>
        </div>
        <div v-else class="w-full h-[400px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
        <!--  -->
        <transition-group name="fade" tag="div">
          <div
            class="text-left w-full txt_bold txt-v2 pad-option-lr-8 pad-b-title"
          >
            {{
              $t("Weather_information_for_{name}_in_the_coming_hours", {
                name: renderCityName,
              })
            }}
          </div>
          <div
            v-if="displayedItems.length !== 0"
            class="w-full flex flex-wrap gap-bh"
          >
            <div
              class="pad-form-radios item-pad bg-from h-[250px] card"
              v-for="(item, index) in displayedItems"
              :key="index"
            >
              <div class="w-full h-full">
                <!--  -->
                <div
                  class="w-full justify-between flex items-center pb-1 bor_bottom_color"
                >
                  <div class="flex items-center gap-4">
                    <img :src="renderHourly(item)?.iconValue" alt="" />
                    <div class="text-left">
                      <div>{{ renderHourly(item)?.timestampValue }}</div>
                      <div class="txt_light_14">
                        {{ renderHourly(item)?.datetimeValue }}
                      </div>
                    </div>
                  </div>
                  <div class="txt_medium_16">
                    {{ renderToCelsius(item.temperature) }}
                  </div>
                </div>
                <!--  -->

                <div class="w-full flex items-center justify-between pt-2 pb-2">
                  <div class="w-[50%] text-left">
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Humidity") }}:</p>
                      <p class="txt_regular_14">
                        {{ Math.round(item?.humidity * 100) }}%
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Precipitation") }}:</p>
                      <p class="txt_regular_14">
                        {{ convertPrecipitation(item?.precipIntensity) }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Chance_of_rain") }}:</p>
                      <p class="txt_regular_14">
                        {{ Math.round(item?.precipProbability * 100) }}%
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Feels_like") }}:</p>
                      <p class="txt_regular_14">
                        {{ renderToCelsius(item?.apparentTemperature) }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Wind_Speed") }}:</p>
                      <p class="txt_regular_14">
                        {{ convertWindSpeed(item.windSpeed) }}
                        {{ convertUnitWindSpeed() }}
                      </p>
                    </div>
                  </div>
                  <div class="w-[50%]">
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Dew_point") }}:</p>
                      <p class="txt_regular_14">
                        {{ renderToCelsius(item.dewPoint) }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Cloud_cover") }}:</p>
                      <p class="txt_regular_14">
                        {{ Math.round(item.cloudCover * 100) }}%
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Pressure") }}:</p>
                      <p class="txt_regular_14">
                        {{ convertPressure(item.pressure) }}
                        {{ convertUnitPressure() }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Uv_Index") }}:</p>
                      <p class="txt_regular_14">{{ item.uvIndex }}</p>
                    </div>
                    <div class="flex items-center gap-1 w-full pt-1 pb-1">
                      <p class="txt_light_14">{{ $t("Wind_direction") }}:</p>
                      <p class="txt_regular_14">
                        {{ convertWindBearing(item.windBearing) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="w-full h-[300px] gap-bh">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </transition-group>
        <div class="w-full text-left pad-b-t">
          <button
            v-if="showSeeMoreButton || showAllItems"
            type="button"
            @click="onClickLoadMoreItems"
            class="text-white cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
          >
            <span class="txt_medium">{{
              showAllItems ? $t("Hide") : $t("See_more")
            }}</span>
          </button>
        </div>
      </div>
      <!--  -->
      <div class="w-[384px] h-auto">
        <!--  -->
        <div v-if="paramCurrently" class="w-full h-auto mar-b card bg-white">
          <!--  -->
          <WeatherMainSidebarPage></WeatherMainSidebarPage>
        </div>

        <div v-else class="w-full h-[488px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <div class="w-full h-[430px] mar-b bg-ads"></div>
        <div v-if="paramCurrently" class="w-full h-[430px] mb-4 card bg-white">
          <RadarPage></RadarPage>
        </div>
        <div v-else class="w-full h-[430px] mar-b">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div>
    </div>

    <div class="w-full h-[200px] flex justify-center items-center mb-6 mt-6">
      <div class="bg-ads-1 bg-ads w-full h-full">
        <!-- Ads -->
      </div>
    </div>
  </div>
</template>
<script>
import HourlyPage from "@/components/home/hourly-forecast/hourly-page.vue";
import {
  convertTimestampToHoursMinutes,
  fahrenheitToCelsius,
  formatTimestamp,
  getIconHourlyForecastTheme,
  getWindDirectionFromDegrees,
  inchToMm,
  celsiusToFahrenheit,
  codeToFind,
  mphToMs,
  convertMillimetToInch,
  convertTimestampToHoursMinutes12,
  convertMillimet,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertCtoF,
  convertFtoC,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
} from "../../../utils/converValue";
import WeatherMainSidebarPage from "../chart-tomorrow-page/weather-main-sidebar-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import HourNextPage from "./hour-next-page.vue";
import RadarPage from "@/components/home/radar/radar-page.vue";
export default {
  name: "hourly-24-page.vue",

  components: {
    HourlyPage,
    WeatherMainSidebarPage,
    SkeletonLoader,
    HourNextPage,
    RadarPage,
  },
  data() {
    return {
      itemsPerPage: 4, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
      showAllItems: false,
    };
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently.time;
    },

    renderWeatherHourly() {
      return this.$store.state.getWeather.hourly;
    },

    displayedItems() {
      if (this.showAllItems) {
        return this.renderWeatherHourly;
      }
      const end = this.currentPage * this.itemsPerPage;
      return this.renderWeatherHourly.slice(0, end);
    },
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },

    showSeeMoreButton() {
      return (
        !this.showAllItems &&
        this.displayedItems.length < this.renderWeatherHourly.length
      );
    },
  },

  methods: {
    renderHourly(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      let timestampValue = "";
      if (unitSetting.activeTemperature_save === "12h") {
        timestampValue = convertTimestampToHoursMinutes12(
          value.time,
          1,
          offsetValue
        );
      } else {
        timestampValue = convertTimestampToHoursMinutes(
          value.time,
          1,
          offsetValue
        );
      }

      const iconValue = getIconHourlyForecastTheme(value.icon);
      const datetimeValue = formatTimestamp(value.time);
      return {
        timestampValue: timestampValue,
        iconValue: iconValue,
        datetimeValue: datetimeValue,
      };
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

    convertWindBering(value) {
      return mphToMs(value);
    },

    convertWindBearing(value) {
      return getWindDirectionFromDegrees(value);
    },

    onClickLoadMoreItems() {
      if (this.showAllItems) {
        // Reset to initial state (first page)
        this.currentPage = 1;
        this.showAllItems = false;
      } else {
        // Show more items
        this.currentPage++;
        if (
          this.currentPage * this.itemsPerPage >=
          this.renderWeatherHourly.length
        ) {
          this.showAllItems = true; // Set to show all items if at the end
        }
      }
    },

    convertWindSpeed(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeWindSpeed_save === "m/s") {
        return convertMPHtoMetPS(value);
      }
      if (unitSetting.activeWindSpeed_save === "km/h") {
        return convertMiToKm(value);
      }
      if (unitSetting.activeWindSpeed_save === "mi/h") {
        return value;
      }
      if (unitSetting.activeWindSpeed_save === "Knot") {
        return convertMiToKnot(value);
      }
      if (unitSetting.activeWindSpeed_save === "bft") {
        return convertMiToBeaufortScale(value);
      }
    },

    convertUnitWindSpeed() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activeWindSpeed_save);
    },

    convertPressure(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePressure_save === "hPa") {
        return val;
      }
      if (unitSetting.activePressure_save === "mmHg") {
        return convertHpaToMmHg(val);
      }
      if (unitSetting.activePressure_save === "atm") {
        return convertHpaToAtm(val);
      }
      if (unitSetting.activePressure_save === "inHg") {
        return convertHpaToInHg(val);
      }
      if (unitSetting.activePressure_save === "mBar") {
        return convertHpaToMbar(val);
      }
      if (unitSetting.activePressure_save === "kPa") {
        return convertHpaToKpa(val);
      }
    },

    convertUnitPressure() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activePressure_save);
    },
  },
};
</script>
<style lang="scss">
.item-pad {
  flex: 0 1 calc(50% - 8px); /* mỗi phần tử chiếm 50% chiều rộng trừ đi khoảng cách */
}

.gap-bh {
  gap: 16px;
}

.bg-ads-1 {
  background-image: url("../../../assets/images/png/photo_2024-08-20_15-46-47.jpg");
}
</style>
