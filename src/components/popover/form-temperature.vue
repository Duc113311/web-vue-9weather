<template>
  <div class="w-full h-full txt_light_summer p-2">
    <!--  -->
    <div class="w-full flex justify-center items-center p-2">
      <p class="txt_regular_14">
        {{ convertTimeDayMonth(renderObjTemperature?.time) }}
      </p>
    </div>
    <div class="flex w-full items-center justify-center">
      <img :src="convertIcon(renderObjTemperature?.icon)" width="40" alt="" />
    </div>
    <div class="flex items-center gap-1 p-2 justify-center w-full">
      <img
        src="../../assets/images/svg/v2/ic_temperature_v2_dark.svg"
        class="size-img"
        alt=""
      />
      <p class="txt_regular_14">
        {{ convertTemperature(renderObjTemperature.temperatureMin) }}° /
        {{ convertTemperature(renderObjTemperature.temperatureMax) }}°
      </p>
    </div>

    <div class="flex items-center p-2 justify-center w-full">
      <!--  -->
      <div class="w-[50%] flex flex-col gap-1">
        <div class="flex items-center gap-1">
          <span class="txt_light_14"> {{ $t("Humidity") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ Math.round(renderObjTemperature.humidity * 100) }}%
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">
            {{ $t("Precip_Probability") }}:&nbsp;</span
          >
          <p class="txt_regular_14">
            {{ Math.round(renderObjTemperature.precipProbability * 100) }}%
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">{{ $t("Sunrise") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertTimeUnit(renderObjTemperature?.sunriseTime) }}
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">{{ $t("Sunset") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertTimeUnit(renderObjTemperature?.sunsetTime) }}
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">{{ $t("Wind_Speed") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertWindSpeed(renderObjTemperature?.windSpeed) }}
            {{ convertUnitWindSpeed() }}
          </p>
        </div>
      </div>

      <div class="w-[50%] flex flex-col">
        <div class="flex items-center">
          <span class="txt_light_14"> {{ $t("Dew_point") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertTemperature(renderObjTemperature.dewPoint) }}
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">{{ $t("Cloud_cover") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ Math.round(renderObjTemperature.cloudCover * 100) }}%
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">{{ $t("Pressure") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertPressure(renderObjTemperature.pressure) }}
            {{ convertUnitPressure() }}
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">
            {{ $t("Precip_Intensity") }}:&nbsp;
          </span>
          <p class="txt_regular_14">
            {{ convertPrecipitation(renderObjTemperature.precipIntensity) }}
          </p>
        </div>
        <div class="flex items-center">
          <span class="txt_light_14">{{ $t("Wind_direction") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertWindBearing(renderObjTemperature.windBearing) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getIconHourlyForecastTheme,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  inchToMm,
  getWindDirectionFromDegrees,
  convertDayOfWeek,
  formatTimestampDay,
  formatTimestamp,
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
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
  convertMillimet,
  convertMillimetToInch,
  convertFtoC,
  convertCtoF,
} from "../../utils/converValue.js";
export default {
  name: "form-temperature",

  data() {
    return {};
  },

  props: {
    objTemperature: {
      type: Object,
      required: {},
    },
  },

  computed: {
    renderObjTemperature() {
      console.log("objTemperature", this.objTemperature);

      return this.objTemperature;
    },
  },

  methods: {
    convertTime(val) {
      return convertDayOfWeek(val);
    },

    convertIcon(value) {
      return getIconHourlyForecastTheme(value);
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

    convertWindBearing(value) {
      return getWindDirectionFromDegrees(value);
    },
    convertTimeDayMonth(value) {
      return formatTimestampDay(value) + " " + "," + formatTimestamp(value);
    },

    convertTemperature(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },

    convertTimeUnit(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(value, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(value, 1, offsetValue);
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

    convertPrecipitation(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        return (
          convertMillimet(value) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      } else {
        return (
          convertMillimetToInch(value) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      }
    },
  },
};
</script>
<style lang="scss"></style>
