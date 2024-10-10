<template>
  <div class="w-full h-full">
    <div class="weather-main-sidebar h-auto w-full">
      <div class="pad-form-radios">
        <div class="text-left">
          <a href="#" class="feature-location d-flex mb-3">
            <p class="txt_bold">
              {{ $t("Weather_{name}", { name: renderCityName }) }}
            </p>
          </a>
        </div>
        <div class="weather-main-hero">
          <div class="flex-wrap justify-center gap-1 flex pt-4 pb-4">
            <img
              :src="convertIconCurrently(paramCurrently?.icon)"
              width="78"
              height="78"
              class="object-cover"
            />
            <p class="temp txt-v2">
              {{ convertFahrenheitToCelsiusNot(paramCurrently?.temperature) }}
            </p>
            <p class="unit-temp txt-v2">{{ renderTemperature() }}</p>
          </div>
          <div class="desc text-center">
            <p class="txt_bold">
              {{ capitalizeWords(paramCurrently?.summary) }}
            </p>
            <span class="txt_regular_14"
              >{{ $t("Real_Feel") }}
              <span>
                {{
                  convertFahrenheitToCelsius(
                    paramCurrently?.apparentTemperature
                  )
                }}</span
              ></span
            >
          </div>
        </div>
        <div class="weather-main-desc">
          <div
            class="item flex justify-between items-center pt-4 pb-4 bor-bottom"
          >
            <div class="icon flex items-center gap-2">
              <img
                src="../../../assets/images/svg/v2/ic_dawn_dark.svg"
                alt="Bình minh - Hoàng hôn"
                class="size-img"
              />
              <span class="txt_medium_14"
                >{{ $t("Sunrise") }}/{{ $t("Sunset") }}
              </span>
            </div>

            <div class="temp">
              <p>
                {{ convertTime(paramDailyOne?.sunriseTime) }} /
                {{ convertTime(paramDailyOne?.sunsetTime) }}
              </p>
            </div>
          </div>
          <div
            class="item flex justify-between items-center pt-4 pb-4 bor-bottom"
          >
            <div class="icon flex items-center gap-3">
              <img
                src="../../../assets/images/svg/v2/ic_temperature_v2_dark.svg"
                alt="Nhiệt độ thời tiết ở Hà Nội"
                class="size-img"
              />
              <span class="txt_medium_14"
                >{{ $t("Low") }}/{{ $t("High") }}
              </span>
            </div>

            <div class="temp">
              <p>
                {{
                  convertFahrenheitToCelsiusNot(paramDailyOne?.temperatureMin)
                }}° /
                {{
                  convertFahrenheitToCelsiusNot(paramDailyOne?.temperatureMax)
                }}°
              </p>
            </div>
          </div>
          <div
            class="item flex justify-between items-center pt-4 pb-4 bor-bottom"
          >
            <div class="icon flex items-center gap-3">
              <img
                src="../../../assets/images/svg/v2/ic_humidity-xl_dark.svg"
                alt="Độ ẩm hiện tại ở Hà Nội"
                class="size-img"
              />
              <span class="txt_medium_14">{{ $t("Humidity") }}</span>
            </div>

            <div class="temp">
              <p>{{ Math.round(paramDailyOne?.humidity * 100) }}%</p>
            </div>
          </div>
          <div
            class="item flex justify-between items-center pt-4 pb-4 bor-bottom"
          >
            <div class="icon flex items-center gap-3">
              <img
                src="../../../assets/images/svg/v2/pressure.svg"
                alt="Áp suất không khí"
                class="size-img"
              />
              <span class="txt_medium_14">{{ $t("Pressure") }}</span>
            </div>

            <div class="temp">
              <p>
                {{ convertPressure(paramCurrently?.pressure) }}
                {{ convertUnitPressure() }}
              </p>
            </div>
          </div>
          <div class="item flex justify-between items-center pt-4 pb-4">
            <div class="icon flex items-center gap-2">
              <img
                src="https://thoitiet.app/assets/images/icon-1/ph-wind.svg"
                alt="Tốc độ gió hiện tại"
                class="size-img"
              />
              <span class="txt_medium_14">{{ $t("Wind_Speed") }}</span>
            </div>

            <div class="temp">
              <p>
                {{ convertWindSpeed(paramCurrently?.windSpeed) }}
                {{ convertUnitWindSpeed() }}
              </p>
            </div>
          </div>
          <div class="item flex justify-between items-center pt-4 pb-4">
            <div class="icon flex items-center gap-2">
              <img
                src="../../../assets/images/svg/svg_ic_uv.xml.svg"
                alt="Tốc độ gió hiện tại"
                width="24"
                height=""
              />
              <span class="txt_medium_14">{{ $t("Uv_Index") }}</span>
            </div>

            <div class="temp">
              <p>
                {{ Math.round(paramCurrently.uvIndex) }}
                <span class="txt_regular_14">
                  {{ convertUvIndexName(paramCurrently?.uvIndex) }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getIconHourlyForecastTheme,
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  codeToFind,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  getUvSummaryName,
  convertFtoC,
  convertCtoF,
} from "../../../utils/converValue";
export default {
  name: "weather-main-sidebar-page",
  data() {
    return {};
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
    paramDailyOne() {
      return this.$store.state.getWeather.dailyOne;
    },

    paramLocationOffset() {
      return this.$store.state.getWeather.locationOffset;
    },
  },

  methods: {
    convertUvIndexName(val) {
      return getUvSummaryName(val);
    },

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

    convertTime(val) {
      const offsetValue = this.paramLocationOffset.offset;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
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
  },
};
</script>
<style lang="scss">
.weather-main-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
}

.weather-main-hero .temp {
  font-weight: 600;
  font-size: 60.75px;
  line-height: 74px;
  //   color: #003870;
}

.weather-main-desc .item .temp {
  font-size: 14px;
  line-height: 20px;
  //   color: #003870;
  display: flex;
  justify-content: center;
}

.unit-temp {
  font-weight: 200;
  font-size: 50.75px;
  line-height: 74px;
}
</style>
