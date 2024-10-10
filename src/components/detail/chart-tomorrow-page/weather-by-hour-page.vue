<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
    <div class="w-full h-full p-4 overflow-hidden">
      <div class="text-left h-[30px] pl-1 pr-1">
        <a href="#" class="feature-location d-flex mb-3">
          <p class="txt_bold txt-v2">
            {{ $t("Weather_{name}_tomorrow_hourly", { name: renderCityName }) }}
          </p>
        </a>
      </div>
      <div class="w-full h-[calc(100%-50px)] mt-4">
        <div class="w-full flex text-left txt_bold_14 pl-1 pr-1">
          <p>{{ convertTimestampToDateTitle(paramDailyOne?.time) }}</p>
        </div>
        <div class="w-full h-full overflow-hidden">
          <transition-group name="fade" tag="div">
            <div
              class="w-full pt-2 pb-2 bor-bottom cursor-pointer"
              v-for="(item, index) in displayedItems"
              :key="index"
            >
              <div class="w-full">
                <div
                  class="w-full flex justify-between items-center flex-wrap"
                  @click="onClickShowItemChildren(index)"
                >
                  <p class="txt_medium w-[80px] text-left">
                    {{ convertTimeNew(item?.time) }}
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
                        src="../../../assets/images/svg/v2/ic_humidity-xl_dark.svg"
                        class="size-img"
                      />
                      <p class="txt_regular_14">
                        {{ Math.round(item?.humidity * 100) }}%
                      </p>
                    </div>

                    <div class="flex items-center gap-2 flex-wrap">
                      <img
                        src="../../../assets/images/svg/v2/ic_ph-wind_dark.svg"
                        alt="Tốc độ gió"
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
                    <span class="txt_medium_14">{{ $t("Pressure") }}</span>
                    <p class="txt_regular_14">
                      {{ convertPressure(paramCurrently.pressure) }}
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
                    <span class="txt_medium_14">{{ $t("Wind_Speed") }}</span>
                    <p class="txt_regular_14">
                      {{ convertWindSpeed(paramCurrently.windSpeed) }}
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
                    <span class="txt_medium_14">{{ $t("Humidity") }}</span>
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
                    <span class="txt_medium_14">{{ $t("Uv_Index") }}</span>
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
              <span class="txt_medium_12">
                {{ showLessButton ? $t("Hide") : $t("See_more") }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  codeToFind,
  getIconHourlyForecastTheme,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertTimestampToDate,
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertTimeNew,
  convertCtoF,
  getUvSummaryName,
  convertFtoC,
} from "../../../utils/converValue.js";
export default {
  name: "weather-by-hour-page",

  data() {
    return {
      itemsPerPage: 5, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
      valueChoose: -1,
      showLessButton: false,
    };
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
    paramDailyOne() {
      console.log("dailyData-tor", this.$store.state.getWeather.dailyData);
      console.log("dailyData-tor", this.$store.state.getWeather.dailyData[2]);

      return this.$store.state.getWeather.dailyData[1];
    },

    paramTomorrowData() {
      return this.$store.state.getWeather.tomorrowData;
    },

    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.paramTomorrowData.slice(0, end);
    },

    showSeeMoreButton() {
      return this.displayedItems.length < this.paramTomorrowData.length;
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
          this.currentPage * this.itemsPerPage >= this.paramTomorrowData.length;
      }
    },
    convertTimestampToDateTitle(value) {
      return convertTimestampToDate(value);
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

    convertTimeNew(val) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 0, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 0, offsetValue);
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

.btn-see-more {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-see-more:hover {
  background-color: #45a049;
}
</style>
