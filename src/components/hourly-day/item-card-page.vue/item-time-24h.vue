<template>
  <div class="w-full">
    <!--   -->
    <div class="flex items-center text-left gap-2 text-white mt-2">
      <img
        src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
        width="24"
        alt=""
      />
      <span>
        {{ $t(`{city}_weather_by_hour`, { city: breadcumsObject?.city }) }}
      </span>
    </div>
    <div class="w-full h-full overflow-hidden">
      <transition-group name="fade" tag="div">
        <BaseComponent v-for="(item, index) in displayedItems" :key="index">
          <div class="w-full">
            <!--  -->
            <div
              @click="onClickShowDetailCard(index)"
              class="flex justify-between items-center w-full"
            >
              <!--  -->
              <div class="flex items-center">
                <p class="w-[100px] text-left">
                  <span class="txt_medium">
                    {{ convertTime(item?.time) }}
                  </span>
                </p>

                <p>
                  {{
                    item?.summary.charAt(0).toUpperCase() +
                    item?.summary.slice(1)
                  }}
                </p>
              </div>

              <div class="flex items-center">
                <div class="flex items-center gap-2 mr-4">
                  <img :src="renderIcon(item)" alt="" />
                  <p>{{ renderToCelsius(item?.temperature) }}</p>
                </div>
                <div>
                  <img
                    :id="'chevron-' + index"
                    src="../../../assets/images/svg_v2/ic_chevron_right.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              v-if="index === valueChoose"
              class="w-full flex items-center justify-between pt-6 pb-4 pr-11"
            >
              <div class="w-[50%] flex flex-col gap-4 bor-rim-r pr-6">
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_Temp.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("temperature") }}</p>
                  </div>

                  <div class="flex items-center">
                    <div class="flex items-center">
                      <p>{{ renderToCelsius(item?.temperature) }}</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_smile.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("real_feel") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>{{ renderToCelsius(item?.temperature) }}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_UV_index.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("uv") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>{{ item?.uvIndex }}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_precititation.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("precipitation") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>{{ convertPrecipitation(item?.precipIntensity) }}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_droplet.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("chance_of_rain") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>{{ item?.precipProbability * 100 }}%</p>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_Air_quality.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("air_quality") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>165 (Moderate)</p>
                  </div>
                </div>
              </div>

              <!--  -->

              <div class="w-[50%] flex flex-col gap-4 pl-6">
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_wind.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("wind_speed") }}</p>
                  </div>

                  <div class="flex items-center">
                    <p>
                      {{ convertWindSpeed(item.windSpeed) }}
                      {{ convertUnitWindSpeed() }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_wind_flag_svgrepo.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("wind_direction") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>{{ convertWindBearing(item?.windBearing) }}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_cloud_fog.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("cloud_cover") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>{{ Math.round(item.cloudCover * 100) }}%</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_pressure.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("pressure") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>
                      {{ convertPressure(item?.pressure) }}
                      {{ convertUnitPressure() }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_weather_svgrepo_com.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("sunrise") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>
                      {{ convertTimeUnit(dailyOneGettersData?.sunriseTime) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img
                      src="../../../assets/images/svg_v2/ic_weather_svgrepo_com_sunset.svg"
                      alt=""
                      srcset=""
                    />
                    <p>{{ $t("sunset") }}</p>
                  </div>
                  <div class="flex items-center">
                    <p>
                      {{ convertTimeUnit(dailyOneGettersData?.sunsetTime) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseComponent>
      </transition-group>

      <div class="w-full text-left mt-3">
        <button
          type="button"
          @click="onClickLoadMoreItems"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
        >
          <span class="txt_medium_12">
            {{ showLessButton ? $t("Hide") : $t("See_more") }}</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import {
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  getIconHourlyForecastTheme,
  convertCtoF,
  convertFtoC,
  codeToFind,
  convertMillimet,
  convertMillimetToInch,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  getWindDirectionFromDegrees,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertToEnglish,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "item-time-24h",

  components: {
    BaseComponent,
  },
  data() {
    return {
      valueChoose: -1,
      isRotated: false,
      itemsPerPage: 10, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
      showLessButton: false,
    };
  },

  computed: {
    ...mapGetters("weatherModule", ["hourly24hGetters", "dailyOneGetters"]),
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    hourly24hGettersData() {
      return this.hourly24hGetters;
    },

    dailyOneGettersData() {
      return this.dailyOneGetters;
    },

    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.hourly24hGettersData.slice(0, end);
    },

    showSeeMoreButton() {
      return this.displayedItems.length < this.hourly24hGettersData.length;
    },

    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;
      console.log("resultData", resultData);

      return resultData;
    },
  },

  methods: {
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

    convertWindBearing(value) {
      return getWindDirectionFromDegrees(value);
    },

    onClickShowDetailCard(value) {
      const chevron = document.getElementById(`chevron-${value}`);
      if (this.isRotated) {
        chevron.style.transform = "rotate(0deg)"; // Trở về hướng ban đầu
      } else {
        chevron.style.transform = "rotate(90deg)"; // Xoay xuống dưới
      }
      this.isRotated = !this.isRotated; // Đảo ngược trạng thái

      if (this.valueChoose === value) {
        this.valueChoose = -1;
      } else {
        this.valueChoose = value;
      }
    },

    convertTime(val) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
      }
    },

    renderIcon(val) {
      const iconValue = getIconHourlyForecastTheme(val.icon);
      return iconValue;
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

    convertTimeUnit(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(value, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(value, 1, offsetValue);
      }
    },

    onClickLoadMoreItems() {
      if (this.showLessButton) {
        this.currentPage = 1; // Reset to show the initial items
        this.showLessButton = false;
      } else {
        this.currentPage++;
        this.showLessButton =
          this.currentPage * this.itemsPerPage >=
          this.hourly24hGettersData.length;
      }
    },

    convertToEnglishRender(value) {
      return convertToEnglish(value);
    },
  },
};
</script>
<style lang="scss"></style>
