<template>
  <div class="w-full txt_medium_20 text-center flex justify-center">
    <!-- Riêng Việt nam -->
    <div
      class="flex items-center"
      v-if="breadcumsObject?.country_key?.toLowerCase() === 'vn'"
    >
      <div class="flex items-center" v-if="breadcumsObject?.ward">
        <div class="cursor-pointer">
          {{
            convertCapitalizeWords(
              $t(
                `${convertToSlugCity(
                  breadcumsObject?.city
                )}.${convertToSlugCity(
                  breadcumsObject?.city
                )}_${languageParam}.${convertToLowCase(
                  breadcumsObject?.ward_key
                )}`
              )
            )
          }},&nbsp;
        </div>
      </div>
      <div class="flex items-center" v-if="breadcumsObject?.district">
        <div class="cursor-pointer">
          {{
            convertCapitalizeWords(
              $t(
                `${convertToSlugCity(
                  breadcumsObject?.city
                )}.${convertToSlugCity(
                  breadcumsObject?.city
                )}_${languageParam}.${convertToLowCase(
                  breadcumsObject?.district_key
                )}`
              )
            )
          }},&nbsp;
        </div>
      </div>
      <div class="flex items-center" v-if="breadcumsObject?.city">
        <div class="cursor-pointer">
          {{
            $t(
              `city.city_${languageParam}.${convertToLowCase(
                breadcumsObject?.city_key
              )}`
            )
          }},&nbsp;
        </div>
      </div>
      <div class="flex items-center" v-if="breadcumsObject?.country">
        <div class="cursor-pointer">
          {{ breadcumsObject?.country }}
        </div>
      </div>
    </div>
    <!-- End -->
    <!-- Trên thế giới -->
    <div v-else class="flex items-center">
      <div class="flex items-center" v-if="breadcumsObject?.cities">
        <div class="cursor-pointer">{{ breadcumsObject?.cities }},&nbsp;</div>
      </div>
      <div class="flex items-center" v-if="breadcumsObject?.state">
        <div class="cursor-pointer">{{ breadcumsObject?.state }},&nbsp;</div>
      </div>
      <div class="flex items-center" v-if="breadcumsObject?.country">
        <div class="cursor-pointer">
          {{ breadcumsObject?.country }}
        </div>
      </div>
    </div>
    <!-- End -->
  </div>
  <div class="w-full flex items-center justify-between md:pr-11 container">
    <div class="w-[30%]">
      {{ convertToShortDay(objTemperature.time) }}
    </div>
    <div class="flex items-center justify-center w-[30%]">
      <div class="flex items-center">
        <IcTemptMin class="icon-svg"></IcTemptMin>
        <p class="txt_medium_24">
          {{ convertFahrenheitToCelsiusNot(objTemperature?.temperatureMin) }}
        </p>
      </div>
      <div class="flex items-center">
        <IcTemptMax class="icon-svg"></IcTemptMax>
        <p class="txt_medium_24">
          {{ convertFahrenheitToCelsiusNot(objTemperature?.temperatureMax) }}
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-4 w-[30%]">
      <component
        :width="40"
        :height="40"
        :is="convertIconCurrently(objTemperature?.icon)"
      ></component>
      <div class="txt_regular_17 text-start">
        {{
          convertCapitalizeWords(
            $t(`${objTemperature?.summary.replace(/\s+/g, "_")}`)
          )
        }}
      </div>
    </div>
  </div>
  <div
    class="w-full flex items-center justify-between pt-6 pb-4 md:pr-11 container"
  >
    <div class="w-[50%] flex flex-col gap-4 bor-rim-r md:pr-6 pr-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleReadFeel class="icon-svg"></IcTitleReadFeel>
          <p class="txt_regular_14">{{ $t("Real_feel") }}</p>
        </div>
        <div class="flex items-center txt_medium_15">
          <p>
            {{
              convertFahrenheitToCelsiusNot(
                (objTemperature?.apparentTemperatureMin +
                  objTemperature?.apparentTemperatureMax) /
                  2
              )
            }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcHumidity class="icon-svg"></IcHumidity>
          <p class="txt_regular_14">{{ $t("Humidity") }}</p>
        </div>
        <div class="flex items-center txt_medium_15">
          <p>{{ Math.round(objTemperature?.humidity * 100) }}%</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcUvIndex class="icon-svg"></IcUvIndex>
          <p class="txt_regular_14">{{ $t("UV") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <span class="txt_medium_15">
            {{ Math.round(objTemperature?.uvIndex) }}
          </span>
          <span class="txt_regular_14"
            >({{ convertUvIndexName(objTemperature?.uvIndex) }})</span
          >
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcPrecipitation class="icon-svg"></IcPrecipitation>
          <p class="txt_regular_14">{{ $t("Precipitation") }}</p>
        </div>
        <div class="flex items-center txt_medium_15">
          <p>{{ convertPrecipitation(objTemperature?.precipIntensity) }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div
          class="flex items-center gap-2"
          v-if="objTemperature?.precipType === 'Snow'"
        >
          <IcChanceOfRainSnow class="icon-svg"></IcChanceOfRainSnow>
          <p class="txt_regular_14">{{ $t("Chance_of_snow") }}</p>
        </div>
        <div class="flex items-center gap-2" v-else>
          <IcChanceOfRain class="icon-svg"></IcChanceOfRain>
          <p class="txt_regular_14">{{ $t("Chance_of_rain") }}</p>
        </div>
        <div class="flex items-center txt_medium_15">
          <p>{{ Math.round(objTemperature?.precipProbability * 100) }}%</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleAir class="icon-svg"></IcTitleAir>
          <p class="txt_regular_14">{{ $t("Dew_point") }}</p>
        </div>
        <div class="flex items-center">
          <span class="txt_regular_14">{{
            convertFahrenheitToCelsiusNot(objTemperature?.dewPoint)
          }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleOzone3 class="icon-svg"></IcTitleOzone3>
          <p class="txt_regular_14">{{ $t("Ozone") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <span class="txt_medium_15">
            {{ objTemperature?.ozone }}
          </span>
          <!-- <span class="txt_regular_14" v-if="timePeriodSunriseTime">
                      ({{ timePeriodSunriseTime }})
                    </span> -->
        </div>
      </div>
    </div>

    <!--  -->

    <div class="w-[50%] flex flex-col gap-4 md:pl-6 pl-2">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <IcTitleWindSpeed class="icon-svg"></IcTitleWindSpeed>
          <p class="txt_regular_14">{{ $t("Wind_speed") }}</p>
        </div>

        <div class="flex items-center gap-1">
          <p class="txt_medium_15">
            {{ convertWindSpeed(objTemperature.windSpeed) }}
          </p>
          <span class="txt_regular_14">{{ convertUnitWindSpeed() }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleWindDirection class="icon-svg"></IcTitleWindDirection>
          <p class="txt_regular_14">{{ $t("Wind_direction") }}</p>
        </div>
        <div class="flex items-center">
          <p class="txt_medium_15">
            {{ convertWindBearing(objTemperature?.windBearing) }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleCloudCover class="icon-svg"></IcTitleCloudCover>
          <p class="txt_regular_14">{{ $t("Cloud_cover") }}</p>
        </div>
        <div class="flex items-center">
          <p class="txt_medium_15">
            {{ Math.round(objTemperature.cloudCover * 100) }}%
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitlePressure class="icon-svg"></IcTitlePressure>
          <p class="txt_regular_14">{{ $t("Pressure") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <p class="txt_medium_15">
            {{ convertPressure(objTemperature?.pressure) }}
          </p>
          <span class="txt_regular_14">{{ convertUnitPressure() }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleWindGust class="icon-svg"></IcTitleWindGust>
          <p class="txt_regular_14">{{ $t("Wind_gust") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <p class="txt_medium_15">
            {{ convertWindSpeed(objTemperature.windGust) }}
          </p>
          <span class="txt_regular_14">{{ convertUnitWindSpeed() }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <IcTitleSunrise class="icon-svg"></IcTitleSunrise>
          <p class="txt_regular_14">{{ $t("Sunrise") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <p class="txt_medium_15">
            {{ convertTimeUnit(objTemperature?.sunriseTime).split(" ")[0] }}
          </p>
          <span
            class="txt_regular_14"
            v-if="convertTimeUnit(objTemperature?.sunriseTime)"
            >{{
              convertTimeUnit(objTemperature?.sunriseTime).split(" ")[1]
            }}</span
          >
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <IcTitleSunset class="icon-svg"></IcTitleSunset>
          <p class="txt_regular_14">{{ $t("Sunset") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <p class="txt_medium_15">
            {{ convertTimeUnit(objTemperature?.sunsetTime).split(" ")[0] }}
          </p>
          <span
            class="txt_regular_14"
            v-if="convertTimeUnit(objTemperature?.sunsetTime)"
            >{{
              convertTimeUnit(objTemperature?.sunsetTime).split(" ")[1]
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IcChanceOfRain from "@/components/icons/IcChanceOfRain.vue";
import IcChanceOfRainSnow from "@/components/icons/IcChanceOfRainSnow.vue";
import IcHumidity from "@/components/icons/IcHumidity.vue";
import IcPrecipitation from "@/components/icons/IcPrecipitation.vue";
import IcTempt from "@/components/icons/IcTempt.vue";
import IcTemptMax from "@/components/icons/IcTemptMax.vue";
import IcTemptMin from "@/components/icons/IcTemptMin.vue";
import IcTitleAir from "@/components/icons/IcTitleAir.vue";
import IcTitleCloudCover from "@/components/icons/IcTitleCloudCover.vue";
import IcTitlePressure from "@/components/icons/IcTitlePressure.vue";
import IcTitleReadFeel from "@/components/icons/IcTitleReadFeel.vue";
import IcTitleSunrise from "@/components/icons/IcTitleSunrise.vue";
import IcTitleSunset from "@/components/icons/IcTitleSunset.vue";
import IcTitleWindDirection from "@/components/icons/IcTitleWindDirection.vue";
import IcTitleWindSpeed from "@/components/icons/IcTitleWindSpeed.vue";
import IcUvIndex from "@/components/icons/IcUvIndex.vue";
import {
  capitalizeWords,
  codeToFind,
  convertAMPMFromTimestamp,
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
import { mapGetters } from "vuex";
import removeAccents from "remove-accents";
import { convertToLowCase, convertToSlugCity } from "@/utils/coverTextSystem";
import IcTitleOzone3 from "@/components/icons/IcTitleOzone3.vue";
import IcTitleWindGust from "@/components/icons/IcTitleWindGust.vue";

export default {
  name: "popup-calendar-detail",
  components: {
    // IcTempt,
    IcTemptMin,
    IcTemptMax,
    IcTitleReadFeel,
    IcUvIndex,
    IcChanceOfRain,
    IcTitleAir,
    IcTitleWindSpeed,
    IcTitleWindDirection,
    IcTitleCloudCover,
    IcTitlePressure,
    IcTitleSunrise,
    IcTitleSunset,
    IcPrecipitation,
    IcHumidity,
    IcChanceOfRainSnow,
    IcTitleWindGust,
    IcTitleOzone3,
  },
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
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "listCityAllGetters",
    ]),
    renderObjTemperature() {
      return this.objTemperature;
    },

    paramAirModule() {
      const storageAir = this.$store.state.airQualityModule.apiValue;

      return storageAir;
    },

    languageParam() {
      const languageRouter = this.$route.params;
      debugger;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language !== "en" && languageRouter.language !== "vi"
          ? "en"
          : languageRouter.language
        : this.$i18n.locale !== "en" && this.$i18n.locale !== "vi"
        ? "en"
        : this.$i18n.locale;
    },

    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },
    locationOffsetValue() {
      return this.$store.state.weatherModule.locationOffset.offset;
    },
  },

  methods: {
    convertToShortDay(value) {
      // Kiểm tra nếu value không hợp lệ (null, undefined, NaN)
      if (!value || isNaN(value)) {
        console.error("Invalid timestamp:", value);
        return "Invalid Date";
      }
      // Chuyển timestamp Unix thành Date (value là giây)
      const adjustedTimestamp = value + this.locationOffsetValue * 60; // offset từ phút sang giây

      const date = new Date(adjustedTimestamp * 1000);

      const timezone =
        this.$store.state.weatherModule?.locationOffset?.timezone;

      // Lấy tên ngày viết tắt theo timezone
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "long", // Trả về thứ viết tắt (Mon, Tue, Wed,...)
        day: "2-digit", // Ngày (DD)
        month: "2-digit", // Tháng (MM)
      });

      // Format lại thành mảng [weekday, day, month]
      const formattedDate = formatter.formatToParts(date);

      // Lấy thông tin ngày, tháng, thứ từ phần đã format
      let day = "";
      let month = "";
      let weekday = "";

      formattedDate.forEach(({ type, value }) => {
        if (type === "day") day = value;
        if (type === "month") month = value;
        if (type === "weekday") weekday = value;
      });

      console.log("weekday", weekday);

      // Trả về định dạng "Thu DD/MM" (VD: "Fri 21/02")
      return `${this.$t(`${weekday}`)}, ${day}/${month}`;
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },
    convertToLowCase(value) {
      return convertToLowCase(value);
    },

    convertToSlugCity(str) {
      return convertToSlugCity(str);
    },
    convertTime(val) {
      const offsetValue =
        this.$store.state.weatherModule.locationOffset?.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestamp12hSun(val, 1, offsetValue, timezoneValue);
      } else {
        return convertTimestamp24hSun(val, 1, offsetValue, timezoneValue);
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
        return convertTime24hTimeZoneNotNow(
          value,
          1,
          offsetValue,
          timezoneValue
        );
      }
    },

    convertAMPMFromTimestampData(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;
      return convertAMPMFromTimestamp(value, offsetValue, timezoneValue);
    },
    timePeriodSunriseTime(value) {
      const timeString = this.convertAMPMFromTimestampData(value);
      return timeString.split(" ")[1]; // Lấy phần AM/PM
    },

    timePeriodSunsetTime(value) {
      const timeString = this.convertAMPMFromTimestampData(value);
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
