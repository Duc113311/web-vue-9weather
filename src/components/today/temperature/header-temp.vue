<template>
  <div class="w-full">
    <!--  -->
    <div class="c-temp text-left">
      <h2 class="txt_title_temp">
        {{ renderToCelsius(currentlyDataRender?.temperature) }}
      </h2>
      <div class="txt_regular">
        {{
          currentlyDataRender?.summary
            ? currentlyDataRender.summary.charAt(0).toUpperCase() +
              currentlyDataRender.summary.slice(1)
            : "No summary available"
        }}
      </div>
      <div class="txt_regular_des">
        {{ $t("real_feel") }}
        {{ renderToCelsius(currentlyDataRender?.apparentTemperature) }}
      </div>
    </div>

    <!--  -->
    <div class="c-temp-row w-full flex justify-between items-center">
      <div class="temp-section temp-max-min w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center pb-14">
          <p>{{ $t("temperature") }}</p>
        </div>
        <div class="flex justify-center items-center">
          <div class="text-left flex txt_medium gap-1">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_min.svg"
              alt=""
              srcset=""
            />
            <span>{{
              renderToCelsius(dailyOneDataRender?.apparentTemperatureMin)
            }}</span>
          </div>

          <div class="text-right flex txt_medium gap-1">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_max.svg"
              alt=""
              srcset=""
            />
            <span>
              {{ renderToCelsius(dailyOneDataRender?.apparentTemperatureMax) }}
            </span>
          </div>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center">
          <p>{{ $t("precipitation") }}</p>
        </div>
        <div class="icon-c flex justify-center p-4">
          <img
            src="../../../assets/images/svg_v2/ic_precititation.svg"
            width="24"
          />
        </div>
        <div class="text-c text-center items-center txt_medium">
          <p>
            {{ convertPrecipitation(currentlyDataRender?.precipIntensity) }}
          </p>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center">
          <p>{{ $t("chance_of_rain") }}</p>
        </div>
        <div class="icon-c flex justify-center p-4">
          <img
            src="../../../assets/images/svg_v2/ic_droplet_blue.svg"
            width="24"
          />
        </div>
        <div class="text-c text-center items-center txt_medium">
          <p>{{ Math.round(currentlyDataRender?.precipProbability * 100) }}%</p>
        </div>
      </div>
    </div>

    <!--  -->

    <div class="text-left w-full pt-4 pb-4 txt_regular_des">
      <p>
        {{ $t("weather_description") }}
      </p>
    </div>
  </div>
</template>
<script>
import {
  codeToFind,
  convertCtoF,
  convertFtoC,
  convertMillimet,
  convertMillimetToInch,
} from "@/utils/converValue";

export default {
  name: "header-temp",

  data() {
    return {};
  },

  props: {
    currentlyData: {
      type: Object,
      default: () => {},
    },

    dailyOneData: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    currentlyDataRender() {
      return this.currentlyData;
    },

    dailyOneDataRender() {
      return this.dailyOneData;
    },
  },

  methods: {
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
<style lang="scss">
.temp-section {
  flex: 1;
  min-width: 0; // This prevents flex items from overflowing
  border-right: 1px solid #ccc; // Adjust color as needed

  &:last-child {
    border-right: none; // Remove border from the last item
  }
}
</style>
