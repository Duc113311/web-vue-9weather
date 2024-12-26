<template>
  <div class="w-full">
    <!--  -->
    <div class="c-temp text-left">
      <div class="flex items-center justify-center text-center gap-2">
        <img width="50" :src="renderIcon(currentlyData)" alt="" />
        <h2 class="txt_title_temp">
          {{ convertFahrenheitToCelsiusNot(currentlyData?.temperature) }}
        </h2>
      </div>
      <div class="txt_regular text-center">
        {{
          convertCapitalizeWords(
            $t(`${currentlyData?.summary.replace(/\s+/g, "_")}`)
          )
        }}
      </div>
      <div class="txt_regular_des text-center">
        {{ $t("real_feel") }}
        {{ convertFahrenheitToCelsiusNot(currentlyData?.apparentTemperature) }}
      </div>
    </div>

    <!--  -->

    <div class="pt-2 pb-2 gap-2 flex-col flex">
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_Temp_db.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("temperature") }}</p>
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_min.svg"
              alt=""
            />
            <p>
              {{
                convertFahrenheitToCelsiusNot(
                  dailyOneData?.apparentTemperatureMin
                )
              }}
            </p>
          </div>
          <div class="flex items-center">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_max.svg"
              alt=""
            />
            <p>
              {{
                convertFahrenheitToCelsiusNot(
                  dailyOneData?.apparentTemperatureMax
                )
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index_db.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("uv") }}</p>
        </div>
        <p class="txt_medium_des">
          {{ Math.round(currentlyData?.uvIndex) }}
          ({{ convertUvIndexName(currentlyData?.uvIndex) }})
        </p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_droplet_blue.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("precipitation") }}</p>
        </div>
        <p class="txt_medium_des">
          {{ convertPrecipitation(currentlyData?.precipIntensity) }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_Precititation_db.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("Chance_of_rain") }}</p>
        </div>
        <p class="txt_medium_des">
          {{ Math.round(currentlyData?.precipProbability * 100) }}%
        </p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_Air_quality.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("air_quality") }}</p>
        </div>
        <p class="txt_medium_des">
          {{ paramAirModule }}
          ({{ convertAirIndexName(paramAirModule) }})
        </p>
      </div>
    </div>

    <div class="text-left w-full txt_regular_des_12">
      <p>
        {{ $t("weather_description") }}
      </p>
    </div>
  </div>
</template>
<script>
import {
  capitalizeWords,
  codeToFind,
  convertCtoF,
  convertFtoC,
  convertMillimet,
  convertMillimetToInch,
  getAirSummaryName,
  getIconHourlyForecastTheme,
  getUvSummaryName,
} from "@/utils/converValue";
import { decodeBase64 } from "@/utils/EncoderDecoderUtils";
import { mapGetters } from "vuex";

export default {
  name: "infor-full-card",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters", "dailyOneGetters"]),
    ...mapGetters("airQualityModule", ["airObjectGetters"]),
    currentlyData() {
      return this.currentlyGetters;
    },

    dailyOneData() {
      return this.dailyOneGetters;
    },

    paramAirModule() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);

        const decodeAirObject = JSON.parse(airObject);

        return decodeAirObject.aqi ? decodeAirObject.aqi : 0;
      }
      return this.airObjectGetters?.aqi ? this.airObjectGetters?.aqi : 0;
    },
  },

  methods: {
    renderIcon(val) {
      const iconValue = getIconHourlyForecastTheme(val.icon);
      return iconValue;
    },
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },
    convertAirIndexName(val) {
      return getAirSummaryName(val);
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
  },
};
</script>
<style lang="scss"></style>
