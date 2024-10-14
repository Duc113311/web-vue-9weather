<template>
  <div class="w-full h-full pad-form-radios">
    <!-- Title -->
    <div
      class="title-regular flex justify-between items-center pad-border-bottom"
    >
      <div class="flex justify-center">
        <img
          src="../../../assets/images/svg/ic_rain_thunder.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />

        <div class="txt_bold ml-2">
          <span>{{ $t("Now") }}</span>
        </div>
      </div>
      <div class="cursor-pointer" @click="onClickDetailNow()">
        <img
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          width="20"
          alt=""
        />
      </div>
    </div>
    <!-- Precipitation -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_precipitation.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Precipitation") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{
            convertPrecipitation(paramCurrently?.precipIntensity)
          }}</span>
        </div>
      </div>
    </div>
    <!-- Wind speed -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_wind_speed.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Wind_Speed") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{ convertWindSpeed(paramCurrently?.windSpeed) }}</span>
        </div>
      </div>
    </div>
    <!-- Chance of rain -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_chance_rain.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Chance_of_rain") }}</span>
        </div>
        <div class="txt_medium_14">
          <span
            >{{ Math.round(paramCurrently?.precipProbability * 100) }}%</span
          >
        </div>
      </div>
    </div>
    <!-- Feels like -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_feel_like.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Feels_like") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{
            convertCelsiusToFahrenheit(paramCurrently?.apparentTemperature)
          }}</span>
        </div>
      </div>
    </div>
    <!-- Cloud cover -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_cloud_cover.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Cloud_cover") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{ Math.round(paramCurrently?.cloudCover * 100) }}%</span>
        </div>
      </div>
    </div>
    <!-- Pressure -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_pressure.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Pressure") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{ convertPressure(paramCurrently?.pressure) }}</span>
        </div>
      </div>
    </div>
    <!-- Sunrise -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_sunrise.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center bor-bottom pad-border-item"
      >
        <div>
          <span>{{ $t("Sunrise") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{ convertTimestamp(paramDailyOne?.sunriseTime) }}</span>
        </div>
      </div>
    </div>
    <!-- Sunset -->
    <div class="title-regular flex justify-start items-center pad-border-fit">
      <div>
        <img
          src="../../../assets/images/svg/ic_sunset.svg"
          alt=""
          width="24"
          height="24"
          srcset=""
        />
      </div>
      <div
        class="txt_regular_14 ml-2 w-full flex justify-between items-center pad-border-item"
      >
        <div>
          <span>{{ $t("Sunset") }}</span>
        </div>
        <div class="txt_medium_14">
          <span>{{ convertTimestamp(paramDailyOne?.sunsetTime) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  inchToMm,
  mbarToAtm,
  convertMPHtoMetPS,
  celsiusToFahrenheit,
  convertMillimetToInch,
  convertMillimet,
  fahrenheitToCelsius,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  mphToMs,
  codeToFind,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  formatHpa,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertCtoF,
  convertFtoC,
} from "../../../utils/converValue.js";
export default {
  name: "now-page",

  data() {
    return {};
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },
    paramDailyOne() {
      return this.$store.state.getWeather.dailyOne;
    },
  },

  mounted() {},

  methods: {
    /**
     * Convert Precipitation
     * @param val
     */
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

    convertWindSpeed(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeWindSpeed_save === "m/s") {
        return (
          convertMPHtoMetPS(value) +
          " " +
          codeToFind(unitSetting.activeWindSpeed_save)
        );
      }
      if (unitSetting.activeWindSpeed_save === "km/h") {
        return (
          convertMiToKm(value) +
          " " +
          codeToFind(unitSetting.activeWindSpeed_save)
        );
      }
      if (unitSetting.activeWindSpeed_save === "Knot") {
        return (
          convertMiToKnot(value) +
          " " +
          codeToFind(unitSetting.activeWindSpeed_save)
        );
      }
      if (unitSetting.activeWindSpeed_save === "bft") {
        return (
          convertMiToBeaufortScale(value) +
          " " +
          codeToFind(unitSetting.activeWindSpeed_save)
        );
      }
      return value + " " + codeToFind(unitSetting.activeWindSpeed_save);
    },

    /**
     * Convert Feels like
     * @param val
     */
    convertCelsiusToFahrenheit(value) {
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

    /**
     * Convert Pressure
     * @param val
     */
    convertPressure(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePressure_save === "hPa") {
        return (
          formatHpa(val) + " " + codeToFind(unitSetting.activePressure_save)
        );
      }
      if (unitSetting.activePressure_save === "mmHg") {
        return (
          convertHpaToMmHg(val) +
          " " +
          codeToFind(unitSetting.activePressure_save)
        );
      }
      if (unitSetting.activePressure_save === "atm") {
        return (
          convertHpaToAtm(val) +
          " " +
          codeToFind(unitSetting.activePressure_save)
        );
      }
      if (unitSetting.activePressure_save === "inHg") {
        return (
          convertHpaToInHg(val) +
          " " +
          codeToFind(unitSetting.activePressure_save)
        );
      }
      if (unitSetting.activePressure_save === "mBar") {
        return (
          convertHpaToMbar(val) +
          " " +
          codeToFind(unitSetting.activePressure_save)
        );
      }
      if (unitSetting.activePressure_save === "kPa") {
        return (
          convertHpaToKpa(val) +
          " " +
          codeToFind(unitSetting.activePressure_save)
        );
      }
    },

    /**
     * Convert Timestamp
     * @param val
     */
    convertTimestamp(val) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
      }
    },

    onClickDetailNow() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "now-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
  },
};
</script>
