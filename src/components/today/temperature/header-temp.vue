<template>
  <div class="w-full border-b pad-l-r-20 pad-t">
    <!--  -->
    <div class="c-temp text-left">
      <div class="flex items-center text-start gap-2">
        <component
          :is="renderIcon(currentlyDataRender)"
          :width="40"
          :height="40"
        ></component>
        <div class="flex items-start text-start">
          <p class="txt_poppins_87">
            {{ renderToCelsius(currentlyDataRender?.temperature) }}
          </p>
          <p class="txt_poppins_40">
            °
            <!-- {{ renderUnit(currentlyDataRender?.temperature) }} -->
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-1.5 pt-2 pb-2">
        <div class="txt_regular_17 text-start">
          {{
            convertCapitalizeWords(
              $t(`${currentlyDataRender?.summary.replace(/\s+/g, "_")}`)
            )
          }}
        </div>
        <div class="txt_regular_12 text-start">
          {{ $t("real_feel") }}
          {{ renderToCelsiusAndUnit(currentlyDataRender?.apparentTemperature) }}
        </div>
      </div>
    </div>

    <!--  -->
    <div class="c-temp-row w-full flex items-center mt-2">
      <div class="temp-section temp-max-min w-auto b-flex bor-rim-r pad-l-r">
        <div
          class="h-flex flex items-center justify-center pb-14 txt_regular_14"
        >
          <p>{{ $t("temperature") }}</p>
        </div>
        <div class="flex justify-center items-center">
          <div class="text-left flex txt_medium gap-1">
            <IcTemptMin></IcTemptMin>
            <span class="txt_medium_17">{{
              renderToCelsiusAndUnit(dailyOneDataRender?.temperatureMin)
            }}</span>
          </div>

          <div class="text-right flex txt_medium gap-1">
            <IcTemptMax></IcTemptMax>
            <span class="txt_medium_17">
              {{ renderToCelsiusAndUnit(dailyOneDataRender?.temperatureMax) }}
            </span>
          </div>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center txt_regular_14">
          <p>{{ $t("precipitation") }}</p>
        </div>
        <div class="icon-c flex justify-center p-4">
          <IcPrecipitation></IcPrecipitation>
        </div>
        <div class="text-c text-center items-center txt_medium_17">
          <p>
            {{ convertPrecipitation(currentlyDataRender?.precipIntensity) }}
          </p>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center txt_regular_14">
          <p>{{ $t("Chance_of_rain") }}</p>
        </div>
        <div class="icon-c flex justify-center p-4">
          <IcChanceOfRain></IcChanceOfRain>
        </div>
        <div class="text-c text-center items-center txt_medium_17">
          <p>{{ Math.round(currentlyDataRender?.precipProbability * 100) }}%</p>
        </div>
      </div>
    </div>

    <!--  -->

    <div class="text-left w-full pt-6 pb-3 txt_regular_14">
      <p>
        {{ $t("weather_description") }}
      </p>
    </div>
  </div>
</template>
<script>
import IcChanceOfRain from "@/components/icons/IcChanceOfRain.vue";
import IcPrecipitation from "@/components/icons/IcPrecipitation.vue";
import IcTemptMax from "@/components/icons/IcTemptMax.vue";
import IcTemptMin from "@/components/icons/IcTemptMin.vue";
import {
  codeToFind,
  convertCtoF,
  convertFtoC,
  convertMillimet,
  convertMillimetToInch,
  capitalizeWords,
  getIconHourlyForecastTheme,
} from "@/utils/converValue";

export default {
  name: "header-temp",
  components: {
    IcTemptMax,
    IcTemptMin,
    IcPrecipitation,
    IcChanceOfRain,
  },

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
      console.log("this.currentlyData;", this.currentlyData);
      return this.currentlyData;
    },

    dailyOneDataRender() {
      console.log("this.dailyOneData;", this.dailyOneData);
      debugger;
      return this.dailyOneData;
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
    renderToCelsius(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },

    renderToCelsiusAndUnit(value) {
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

    renderUnit(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activeTemperature_save);
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
