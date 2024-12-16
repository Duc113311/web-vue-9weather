<template>
  <div class="w-full">
    <!--  -->
    <div class="c-temp text-left">
      <h2 class="txt_title_temp">
        {{ convertFahrenheitToCelsiusNot(dataDayNightRender) }}
      </h2>
      <div class="txt_regular">
        {{
          convertCapitalizeWords(
            $t(`${currentlyData?.summary.replace(/\s+/g, "_")}`)
          )
        }}
      </div>
      <div class="txt_regular_des">
        {{ $t("real_feel") }}
        {{ convertFahrenheitToCelsiusNot(currentlyData?.apparentTemperature) }}
      </div>
    </div>

    <!--  -->

    <div class="pt-2 pb-2 gap-2 flex-col flex">
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("uv") }}</p>
        </div>
        <p class="txt_medium_des">
          {{ Math.round(currentlyData?.uvIndex) }}
          {{ convertUvIndexName(currentlyData?.uvIndex) }}
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
            src="../../../assets/images/svg_v2/ic_precititation.svg"
            width="24"
            alt=""
          />
          <p>{{ $t("Chance_of_rain") }}</p>
        </div>
        <p class="txt_medium_des">
          {{ Math.round(currentlyData?.precipProbability * 100) }}%
        </p>
      </div>
    </div>

    <div class="text-left w-full txt_regular_des_12">
      <p>
        {{ $t("Cloudy_skies") }}
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
  getUvSummaryName,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "infor-common",

  data() {
    return {};
  },

  props: {
    isShowDayNightData: {
      type: Boolean,
      default: true,
    },

    renderTempoDay: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },
    dataDayNightRender() {
      return this.convertDataDayNight(
        this.renderTempoDay,
        this.isShowDayNightData
      );
    },
  },

  methods: {
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },

    convertDataDayNight(valueData, isDayNight) {
      let tempAvg = 0;

      if (isDayNight === true) {
        tempAvg =
          (valueData.maxTempDataDay?.temperature +
            valueData.minTempDataDay?.temperature) /
          2;
      } else {
        tempAvg =
          (valueData.minTempDataNight?.temperature +
            valueData.maxTempDataNight?.temperature) /
          2;
      }

      return tempAvg;
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
