<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-full pad-form-radios overflow-hidden">
      <!--  -->
      <div class="text-left">
        <a href="#" class="flex">
          <p class="txt_bold txt-v2">
            {{ $t("Hourly_weather_forecast_{name}", { name: renderCityName }) }}
          </p>
        </a>
      </div>
      <!--  -->

      <div class="w-full h-full overflow-hidden">
        <!--  -->
        <transition-group name="fade" tag="div">
          <div
            v-for="(item, index) in displayedItems"
            :key="index"
            class="w-full pt-2 pb-2 bor-bottom cursor-pointer"
          >
            <!--  -->
            <div class="w-full">
              <div
                @click="onClickShowItemChildren(index)"
                class="w-full flex justify-between items-center flex-wrap"
              >
                <!--  -->
                <p class="w-[80px] text-left txt_medium">
                  {{ convertTime(item?.time) }}
                </p>
                <div class="flex gap-1 items-center">
                  <p class="w-[50px] text-right txt_medium">
                    {{ convertFahrenheitToCelsiusNot(item?.temperature) }}°
                  </p>
                  <div class="w-[50px] flex justify-center items-center">
                    <img
                      :src="convertIconCurrently(item?.icon)"
                      width="40"
                      height="40"
                      class="object-cover"
                    />
                  </div>
                  <p class="w-[150px] text-left ml-4 txt_regular_14">
                    {{ capitalizeWords(item?.summary) }}
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 mr-2">
                    <img
                      src="https://thoitiet.app/assets/images/icon-1/humidity-xl.svg"
                      class="size-img"
                    />
                    <p class="txt_regular_14">
                      {{ Math.round(item?.humidity * 100) }}%
                    </p>
                  </div>

                  <div class="flex items-center gap-2 flex-wrap">
                    <img
                      src="https://thoitiet.app/assets/images/icon-1/ph-wind.svg"
                      alt="Độ ẩm hiện tại ở Hà Nội"
                      class="size-img"
                    />
                    <p class="w-[80px] txt_regular_14">
                      {{ convertWindSpeed(item?.windSpeed) }}
                      {{ convertUnitWindSpeed() }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-if="index === valueChoose"
                class="w-full justify-between flex items-start pt-2 pl-6 pr-6 trn-it"
              >
                <div class="items-center flex flex-col gap-1">
                  <div class="flex justify-center">
                    <img
                      src="../../../assets/images/svg/v2/pressure.svg"
                      alt="Áp suất không khí"
                      class="size-img"
                    />
                  </div>
                  <span class="txt_medium">{{ $t("Pressure") }}</span>
                  <p class="txt_regular_14">
                    {{ convertPressure(item?.pressure) }}
                    {{ convertUnitPressure() }}
                  </p>
                </div>
                <div class="items-center flex flex-col gap-1">
                  <div class="flex justify-center">
                    <img
                      src="../../../assets/images/svg/v2/ic_ph-wind_dark.svg"
                      alt="Áp suất không khí"
                      class="size-img"
                    />
                  </div>
                  <span class="txt_medium">{{ $t("Wind_Speed") }} </span>
                  <p class="txt_regular_14">
                    {{ convertWindSpeed(item?.windSpeed) }}
                    {{ convertUnitWindSpeed() }}
                  </p>
                </div>
                <div class="items-center flex flex-col gap-1">
                  <div class="flex justify-center">
                    <img
                      src="../../../assets/images/svg/v2/ic_humidity-xl_dark.svg"
                      alt="Áp suất không khí"
                      class="size-img"
                    />
                  </div>
                  <span class="txt_medium">{{ $t("Humidity") }}</span>
                  <p class="txt_regular_14">
                    {{ Math.round(item?.humidity * 100) }}%
                  </p>
                </div>
                <div class="items-center flex flex-col gap-1">
                  <div class="flex justify-center">
                    <img
                      src="../../../assets/images/svg/svg_ic_uv.xml.svg"
                      alt="Áp suất không khí"
                      class="size-img"
                    />
                  </div>
                  <span class="txt_medium">{{ $t("Uv_Index") }}</span>
                  <p class="txt_regular_14">
                    {{ Math.round(item?.uvIndex) }}
                    {{ convertUvIndexName(item?.uvIndex) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="w-full text-left mt-3">
          <button
            type="button"
            @click="onClickLoadMoreItems"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
          >
            <span class="txt_medium">
              {{ showLessButton ? $t("Hide") : $t("See_more") }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  getIconHourlyForecastTheme,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  codeToFind,
  convertFtoC,
  convertCtoF,
  getUvSummaryName,
} from "../../../utils/converValue.js";
export default {
  name: "hour-next-page",
  data() {
    return {
      itemsPerPage: 6,
      currentPage: 1,
      valueChoose: -1,
      showLessButton: false,
    };
  },

  computed: {
    paramHourly() {
      console.log("hourly", this.$store.state.getWeather.hourly);

      return this.$store.state.getWeather.hourly;
    },
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },

    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.paramHourly.slice(0, end);
    },

    showSeeMoreButton() {
      return this.displayedItems.length < this.paramHourly.length;
    },
  },

  methods: {
    convertUvIndexName(val) {
      return getUvSummaryName(val);
    },
    onClickShowItemChildren(value) {
      if (this.valueChoose === value) {
        this.valueChoose = -1;
      } else {
        this.valueChoose = value;
      }
    },
    onClickLoadMoreItems() {
      if (this.showLessButton) {
        this.currentPage = 1; // Reset to show the initial items
        this.showLessButton = false;
      } else {
        this.currentPage++;
        this.showLessButton =
          this.currentPage * this.itemsPerPage >= this.paramHourly.length;
      }
    },
    convertTime(val) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
      }
    },

    convertFahrenheitToCelsiusNot(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    capitalizeWords(str) {
      if (str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* Tạo hiệu ứng trượt lên */
}
</style>
