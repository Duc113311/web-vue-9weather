<template>
  <div class="w-full h-full txt_light_summer">
    <div>
      <p>Weather Detail</p>
    </div>
  </div>
  <div class="w-full h-full txt_light_summer">
    <!--  -->
    <div class="w-full flex justify-center items-center p-2">
      <p class="txt_regular_14">
        <!-- {{ convertTimeFormatDateFull(renderObjTemperature?.time) }} -->
      </p>
    </div>
    <div class="flex w-full items-center justify-center">
      <component
        :is="convertIconCurrently(renderObjTemperature?.icon)"
        :width="100"
      ></component>
    </div>
    <div class="flex items-center gap-1 p-2 justify-center w-full">
      <p class="txt_regular_14">
        {{
          convertCapitalizeWords(
            $t(`${renderObjTemperature?.summary.replace(/\s+/g, "_")}`)
          )
        }}
      </p>
    </div>

    <div class="flex items-center w-full gap-2">
      <!--  -->
      <div class="flex flex-col gap-1 w-[49.5%] pr-3">
        <div class="flex items-center justify-between gap-1">
          <span class="txt_light_14"> {{ $t("temperature") }}:&nbsp;</span>
          <div class="flex items-center">
            <div class="flex items-center">
              <p class="txt_medium_15">
                {{
                  convertFahrenheitToCelsiusNot(
                    renderObjTemperature?.temperatureMin
                  )
                }}
                /
                {{
                  convertFahrenheitToCelsiusNot(
                    renderObjTemperature?.temperatureMax
                  )
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between gap-1">
          <span class="txt_light_14"> {{ $t("real_feel") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{
              convertFahrenheitToCelsiusNot(
                (renderObjTemperature?.apparentTemperatureMin +
                  renderObjTemperature?.apparentTemperatureMax) /
                  2
              )
            }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14"> {{ $t("uv") }}:&nbsp;</span>
          <div class="flex items-center gap-1">
            <span class="txt_medium_15">
              {{ renderObjTemperature?.uvIndex }}
            </span>
            <span class="txt_regular_12"
              >({{ convertUvIndexName(renderObjTemperature?.uvIndex) }})</span
            >
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">{{ $t("precipitation") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertPrecipitation(renderObjTemperature?.precipIntensity) }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">{{ $t("Chance_of_rain") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ Math.round(renderObjTemperature?.precipProbability * 100) }}%
          </p>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">Dew point:&nbsp;</span>
          <div class="flex items-center gap-1">
            <p class="txt_medium_15">
              {{
                convertFahrenheitToCelsiusNot(renderObjTemperature?.dewPoint)
              }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1 w-[49.5%] pl-1">
        <div class="flex items-center justify-between">
          <span class="txt_light_14"> {{ $t("wind_speed") }}:&nbsp;</span>
          <div class="flex items-center gap-1">
            <p class="txt_medium_15">
              {{ convertWindSpeed(renderObjTemperature.windSpeed) }}
            </p>
            <span class="txt_regular_14">{{ convertUnitWindSpeed() }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">{{ $t("wind_direction") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ convertWindBearing(renderObjTemperature?.windBearing) }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">{{ $t("cloud_cover") }}:&nbsp;</span>
          <p class="txt_regular_14">
            {{ Math.round(renderObjTemperature.cloudCover * 100) }}%
          </p>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14"> {{ $t("pressure") }}:&nbsp; </span>
          <div class="flex items-center gap-1">
            <p class="txt_medium_15">
              {{ convertPressure(renderObjTemperature?.pressure) }}
            </p>
            <span class="txt_regular_12">{{ convertUnitPressure() }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">{{ $t("sunrise") }}:&nbsp;</span>
          <div class="flex items-center gap-1">
            <p class="txt_medium_15">
              {{
                convertTimeUnit(renderObjTemperature?.sunriseTime).split(" ")[0]
              }}
            </p>
            <span
              class="txt_regular_12"
              v-if="timePeriodSunriseTime(renderObjTemperature?.sunriseTime)"
              >({{
                timePeriodSunriseTime(renderObjTemperature?.sunriseTime)
              }})</span
            >
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="txt_light_14">{{ $t("sunset") }}:&nbsp;</span>
          <div class="flex items-center gap-1">
            <p class="txt_medium_15">
              {{
                convertTimeUnit(renderObjTemperature?.sunsetTime).split(" ")[0]
              }}
            </p>
            <span
              class="txt_regular_12"
              v-if="timePeriodSunsetTime(renderObjTemperature?.sunsetTime)"
              >({{
                timePeriodSunsetTime(renderObjTemperature?.sunsetTime)
              }})</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  capitalizeWords,
  codeToFind,
  convertCtoF,
  convertFtoC,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToKpa,
  convertHpaToMbar,
  convertHpaToMmHg,
  convertMillimet,
  convertMillimetToInch,
  convertMiToBeaufortScale,
  convertMiToKm,
  convertMiToKnot,
  convertMPHtoMetPS,
  convertTime12hTimeZoneNotNowUnit,
  convertTime24hTimeZoneNotNow,
  convertTimestamp12hSun,
  convertTimestamp24hSun,
  getAirSummaryName,
  getIconHourlyForecastTheme,
  getUvSummaryName,
  getWindDirectionFromDegrees,
} from "@/utils/converValue";

export default {
  name: "popup-calendar-detail",

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
      return this.objTemperature;
    },

    paramAirModule() {
      const storageAir = this.$store.state.airQualityModule.apiValue;

      return storageAir;
    },
  },

  methods: {
    convertTime(val) {
      const offsetValue =
        this.$store.state.weatherModule.locationOffset?.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestamp12hSun(val, 1, offsetValue, timezoneValue);
      } else {
        return convertTimestamp24hSun(val, 1, offsetValue);
      }
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertFahrenheitToCelsiusNot(value) {
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

    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },

    convertUvIndexName(val) {
      return getUvSummaryName(val);
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

    convertAirIndexName(val) {
      return getAirSummaryName(val);
    },

    convertUnitWindSpeed() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activeWindSpeed_save);
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

    convertWindBearing(value) {
      return getWindDirectionFromDegrees(value);
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
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTime12hTimeZoneNotNowUnit(
          value,
          1,
          offsetValue,
          timezoneValue
        );
      } else {
        return convertTime24hTimeZoneNotNow(value, 1, offsetValue);
      }
    },
    timePeriodSunriseTime(value) {
      const timeString = this.convertTimeUnit(value);
      return timeString.split(" ")[1]; // Lấy phần AM/PM
    },

    timePeriodSunsetTime(value) {
      const timeString = this.convertTimeUnit(value);
      return timeString.split(" ")[1]; // Lấy phần AM/PM
    },

    convertTimeFormatDateFull(timestamp) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      return this.convertTimeFormatDateFull(timestamp, offsetValue);
    },
  },
};
</script>
<style lang="scss"></style>
