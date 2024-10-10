<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="bor-bottom cursor-pointer pad-option-tb-8"
      v-for="(item, index) in currentDailyDataSeven"
      :key="index"
    >
      <div
        class="w-full flex justify-between items-center flex-wrap"
        @click="onClickShowItemChildren(index)"
      >
        <p class="w-[100px] text-left">
          <span class="txt_medium">{{ convertTime(item?.time) }}</span>
          <span class="ml-2">{{
            convertToWeekdayAndDateNumber(item?.time)
          }}</span>
        </p>
        <div class="flex gap-1 items-center">
          <p class="text-right w-[100px] txt_medium">
            {{ convertFahrenheitToCelsiusNot(item) }}°
          </p>
          <div class="w-[50px] flex justify-center">
            <img
              :src="convertIconCurrently(item?.icon)"
              width="40"
              height="40"
              class="object-cover"
            />
          </div>
          <p class="ml-4 txt_regular_14 text-left w-[150px]">
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
          <span class="txt_medium_14">{{ $t("Pressure") }}</span>
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
          <span class="txt_medium_14">{{ $t("Wind_Speed") }}</span>
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
          <span class="txt_medium_14">{{ $t("Humidity") }}</span>
          <p class="txt_regular_14">{{ Math.round(item?.humidity * 100) }}%</p>
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
</template>
<script>
import {
  convertDayOfWeek,
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
  getIconHourlyForecastTheme,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  codeToFind,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertToWeekdayAndDate,
  convertCtoF,
  convertFtoC,
  getUvSummaryName,
} from "../../../utils/converValue.js";
export default {
  name: "form-seven-day-page",
  data() {
    return {
      valueChoose: -1,
    };
  },

  computed: {
    currentDailyDataSeven() {
      console.log(
        "dailyDataSeven",
        this.$store.state.getWeather.dailyDataSeven
      );

      return this.$store.state.getWeather.dailyDataSeven;
    },
  },

  methods: {
    convertUvIndexName(val) {
      return getUvSummaryName(val);
    },
    convertTime(value) {
      return convertDayOfWeek(value);
    },
    convertToWeekdayAndDateNumber(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      return convertToWeekdayAndDate(value, offsetValue).date;
    },

    convertFahrenheitToCelsiusNot(value) {
      const tempMin = value.temperatureMin;
      const tempMax = value.temperatureMax;
      const avgTemp = (parseInt(tempMax) + parseInt(tempMin)) / 2;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(avgTemp);
      } else {
        return convertFtoC(avgTemp);
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

    onClickShowItemChildren(value) {
      if (this.valueChoose === value) {
        this.valueChoose = -1;
      } else {
        this.valueChoose = value;
      }
    },
  },
};
</script>
<style lang="scss"></style>
