<template>
  <div class="w-full h-full">
    <div class="w-full h-full">
      <div class="w-full h-[185px]">
        <div class="w-full h-full">
          <!-- title -->
          <div
            class="flex justify-center items-center txt_regular pt-5 md:pt-2"
          >
            <span>{{ capitalizeWords(paramCurrently?.summary) }}</span>
            <!-- <span>{{ paramCurrently?.summary }}</span> -->
          </div>
          <!-- number nhiệt độ -->
          <div class="flex justify-center h-[80px] items-center">
            <div class="txt_light_100">
              <span>{{
                convertFahrenheitToCelsiusNot(paramCurrently?.temperature)
              }}</span>
            </div>
            <div
              class="ml-1 h-full flex flex-col justify-between items-center pt-2 pb-2"
            >
              <div class="txt_light_30 w-full flex justify-start items-center">
                {{ renderTemperature() }}
              </div>
              <div class="flex justify-center w-full items-center">
                <img
                  :src="convertIconCurrently(paramCurrently?.icon)"
                  width="35"
                  alt=""
                />
              </div>
            </div>
          </div>
          <!--  -->
          <div class="flex justify-center items-center w-full pad_4">
            <div class="flex justify-between items-center w-[200px] gap-1.5">
              <div class="flex items-center gap-1">
                <div>
                  <img
                    src="../../../assets/images/svg/ic_temperature.svg"
                    alt=""
                  />
                </div>
                <div class="txt_regular">
                  <span>{{
                    convertFahrenheitToCelsius(paramDailyOne?.temperatureMin)
                  }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <div>
                  <img
                    src="../../../assets/images/svg/ic_temperature1.svg"
                    alt=""
                  />
                </div>
                <div class="txt_regular">
                  <span>{{
                    convertFahrenheitToCelsius(paramDailyOne?.temperatureMax)
                  }}</span>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <div>
                  <img
                    src="../../../assets/images/svg/ic_chance_of_rain_24.svg"
                    alt=""
                  />
                </div>
                <div class="txt_regular">
                  <span>{{ Math.round(paramDailyOne?.humidity * 100) }}%</span>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="flex items-center justify-center pad_4 mt-2">
            <div class="txt_light_summer">
              <span
                >{{ $t("Real_Feel") }}
                {{
                  convertFahrenheitToCelsius(
                    paramCurrently?.apparentTemperature
                  )
                }}</span
              >
            </div>
          </div>
          <!-- <div class="w-full flex justify-center items-center pad_4">
            <div
              class="flex justify-between items-center gap-1 bg-from pad-option-hourly pad-option-lr-8 border-radios"
            >
              <div>
                <img
                  src="../../../assets/images/svg/ic_fluent_warning-24_filled.svg"
                  alt=""
                />
              </div>
              <div class="txt_regular_12">
                <span>Severe Thunderstorm Watch: Be Prepared!</span>
              </div>
              <div>
                <img
                  src="../../../assets/images/svg/ic_material_symbols_expand_more_rounded.svg"
                  alt=""
                />
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <div
        class="h-[calc(100%-210px)] flex justify-center items-end md:gap-4 gap-3"
      >
        <!-- Image -->
        <div class="flex flex-col gap-2 items-center w-[70px]">
          <img
            class="md:w-[30px] w-[25px]"
            src="../../../assets/images/svg/ic_time_start.svg"
            alt=""
          />
          <span class="txt_light_summer">{{
            convertTime(paramDailyOne?.sunriseTime)
          }}</span>
        </div>

        <div
          class="flex justify-center items-center md:h-[70%] h-[55%] md:w-[400px] w-full"
        >
          <!-- <SunPathGraph :renderCurrently="paramCurrently" /> -->
          <SunPathPage :renderCurrently="paramCurrently"></SunPathPage>
        </div>

        <!-- Image -->
        <div class="flex flex-col gap-2 items-center w-[70px]">
          <img
            class="md:w-[30px] w-[25px]"
            src="../../../assets/images/svg/ic_time_end.svg"
            alt=""
          />
          <span class="txt_light_summer">{{
            convertTime(paramDailyOne?.sunsetTime)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<!--  -->
<script>
import {
  celsiusToFahrenheit,
  celsiusToFahrenheitNot,
  codeToFind,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  fahrenheitToCelsius,
  fahrenheitToCelsiusNot,
  getIconHourlyForecastTheme,
  convertCtoF,
  convertFtoC,
} from "../../../utils/converValue.js";
import SunPathPage from "./sun-path-page.vue";
// import SunPathGraph from "./SunPathGraph.vue";

export default {
  name: "day-page",
  components: {
    // SunPathGraph,
    SunPathPage,
  },

  props: {
    paramCurrentlyDay: {
      type: Object,
      required: () => {},
    },

    paramDaily: {
      type: Array,
      required: () => {},
    },
  },

  computed: {
    paramCurrently() {
      return this.paramCurrentlyDay;
    },

    paramDailyOne() {
      return this.paramDaily;
    },
  },
  methods: {
    capitalizeWords(str) {
      if (str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      }
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertFahrenheitToCelsius(value) {
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

    convertFahrenheitToCelsiusNot(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },

    renderTemperature() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return codeToFind(unitSetting.activeTemperature_save);
      } else {
        return codeToFind(unitSetting.activeTemperature_save);
      }
    },

    convertTime(val) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
      }
    },
  },
  mounted() {},
};
</script>
<!--  -->
<style lang="scss"></style>
