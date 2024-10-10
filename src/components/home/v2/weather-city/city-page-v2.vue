<template>
  <div
    class="w-full h-full md:p-10 p-5 bg-body-v2 txt-form"
    :class="drawerClass"
  >
    <a href="" class="flex mb-3">
      <p class="txt_bold">
        {{ $t("Weather_forecast_{name}", { name: renderCityName }) }}
      </p>
    </a>
    <div class="weather-main-hero flex items-center pb-4 pt-4 bor-bottom mb-6">
      <img
        :src="convertIconCurrently(paramCurrently?.icon)"
        width="78"
        height="78"
      />
      <p class="temp ml-1">
        {{ convertFahrenheitToCelsiusNot(paramCurrently?.temperature) }}
      </p>
      <p class="unit-temp">{{ renderTemperature() }}</p>
      <div class="desc text-left mt-6 ml-2">
        <p>{{ capitalizeWords(paramCurrently?.summary) }}</p>
        <span
          >{{ $t("Real_Feel") }}
          <span>
            {{
              convertFahrenheitToCelsius(paramCurrently?.apparentTemperature)
            }}</span
          ></span
        >
      </div>
    </div>
    <div class="weather-main-desc flex justify-between items-center">
      <div class="item">
        <div class="w-full justify-center items-center flex">
          <img
            src="../../../../assets/images/svg/v2/ic_temperature_v2.svg"
            alt="Nhiệt độ thời tiết"
            class="object-cover size-img"
          />
        </div>
        <div class="item-title">{{ $t("Low") }}/{{ $t("High") }}</div>
        <div class="temp">
          <p>
            {{ convertFahrenheitToCelsiusNot(paramDailyOne?.temperatureMin) }}°
            /
            {{ convertFahrenheitToCelsiusNot(paramDailyOne?.temperatureMax) }}°
          </p>
        </div>
      </div>
      <div class="item">
        <div class="w-full justify-center items-center flex">
          <img
            src="../../../../assets/images/svg/v2/ic_humidity-xl.svg"
            alt="Độ ẩm"
            class="object-cover size-img"
          />
        </div>
        <div class="item-title">{{ $t("Humidity") }}</div>
        <div class="temp">
          <p>{{ Math.round(paramDailyOne?.humidity * 100) }}%</p>
        </div>
      </div>

      <div class="item">
        <div class="w-full justify-center items-center flex">
          <img
            src="../../../../assets/images/svg/v2/ic_ph-wind.svg"
            alt="Dự báo tốc độ gió"
            class="object-cover size-img"
          />
        </div>
        <div class="item-title">{{ $t("Pressure") }}</div>
        <div class="temp">
          <p>
            {{ convertPressure(paramCurrently?.pressure) }}
            {{ convertUnitPressure() }}
          </p>
        </div>
      </div>

      <div class="item">
        <div class="w-full justify-center items-center flex">
          <img
            src="../../../../assets/images/svg/v2/ic_dawn.svg"
            alt="Bình minh - Hoàng hôn"
            class="object-cover size-img"
          />
        </div>
        <div class="item-title">{{ $t("Sunrise") }}/{{ $t("Sunset") }}</div>
        <div class="temp">
          <p>
            {{ convertTime(paramDailyOne?.sunriseTime) }} /
            {{ convertTime(paramDailyOne?.sunsetTime) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  celsiusToFahrenheit,
  codeToFind,
  fahrenheitToCelsius,
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
  getIconHourlyForecastTheme,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertFtoC,
  convertCtoF,
} from "../../../../utils/converValue.js";
export default {
  name: "city-page-v2",
  data() {
    return {};
  },

  computed: {
    drawerClass() {
      const iconName = this.$store.state.getWeather.currently;
      const dailyOneName = this.$store.state.getWeather.dailyOne;
      const isDay = this.convertTimeDayNight(dailyOneName);
      switch (iconName.icon) {
        case "rain":
          if (isDay) {
            return "bg_main_rain";
          } else {
            return "bg_main_rain_night";
          }
        case "partly-cloudy-day":
          return "bg_main_partlycloudyday";
        case "partly-cloudy-night":
          return "bg_main_partlycloudynight";
        case "clear-day":
          return "bg_main_clearday";
        case "clear-night":
          return "bg_main_clearnight";
        case "sleet":
          if (isDay) {
            return "bg_main_sleet";
          } else {
            return "bg_main_sleet_night";
          }
        case "fog":
          if (isDay) {
            return "bg_main_fog";
          } else {
            return "bg_main_fog_night";
          }
        case "wind":
          if (isDay) {
            return "bg_main_wind";
          } else {
            return "bg_main_wind_night";
          }
        case "snow":
          if (isDay) {
            return "bg_main_snow";
          } else {
            return "bg_main_snow_night";
          }
        case ("thunderstorm", "tornado"):
          if (isDay) {
            return "bg_main_thunderstorm_day";
          } else {
            return "bg_main_thunderstorm_night";
          }
        case "cloudy":
          if (isDay) {
            return "bg_main_cloudyday";
          } else {
            return "bg_main_cloudynight";
          }
        default:
          return "number-1";
      }
    },

    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },

    paramDailyOne() {
      return this.$store.state.getWeather.dailyOne;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  methods: {
    capitalizeWords(str) {
      if (str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      }
    },
    convertTimeDayNight(value) {
      const sunrise = value.sunriseTime;
      const sunset = value.sunsetTime;
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > sunrise && currentTime < sunset) {
        return true;
      } else {
        return false;
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

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
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

      console.log("offsetValue", offsetValue);

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
  },
};
</script>
<style lang="scss">
.weather-main-t {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}
.weather-main-hero .temp {
  font-weight: 600;
  font-size: 60.75px;
  line-height: 74px;
  //   color: #003870;
}

.unit-temp {
  font-weight: 200;
  font-size: 50.75px;
  line-height: 74px;
  padding-bottom: 8px;
}

.weather-main-hero .desc p {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  //   color: #003870;
  margin-bottom: 0;
  text-transform: capitalize;
}
.weather-main-hero .desc span {
  font-size: 14px;
  line-height: 24px;
  //   color: #385878;
}

.weather-main-desc .item {
  //   color: #003870;
  text-align: center;
}

.weather-main-desc .item .item-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  margin-bottom: 4px;
}

.weather-main-desc .item .temp {
  font-size: 14px;
  line-height: 20px;
  //   color: #003870;
  display: flex;
  justify-content: center;
}

.number-1 {
  background-image: url(@/assets/images/png/new_york.png);
}
.bg_main_clearday {
  background-image: url(@/assets/images/bg_main_clearday.imageset/bg_main_clearday.png);
}
.bg_main_clearnight {
  background-image: url(@/assets/images/bg_main_clearnight.imageset/bg_main_clearnight.png);
}
.bg_main_cloudyday {
  background-image: url(@/assets/images/bg_main_cloudyday.imageset/bg_main_cloudyday.png);
}
.bg_main_cloudynight {
  background-image: url(@/assets/images/bg_main_cloudynight.imageset/bg_main_cloudynight.png);
}
.bg_main_fog {
  background-image: url(@/assets/images/bg_main_fog.imageset/bg_main_fog.png);
}
.bg_main_fog_night {
  background-image: url(@/assets/images/bg_main_fog_night.imageset/bg_main_fog_night.png);
}
.bg_main_partlycloudyday {
  background-image: url(@/assets/images/bg_main_partlycloudyday.imageset/bg_main_partlycloudyday.png);
}
.bg_main_partlycloudynight {
  background-image: url(@/assets/images/bg_main_partlycloudynight.imageset/bg_main_partlycloudynight.png);
}
.bg_main_rain {
  background-image: url(@/assets/images/bg_main_rain.imageset/bg_main_rain.png);
}
.bg_main_rain_night {
  background-image: url(@/assets/images/bg_main_rain_night.imageset/bg_main_rain_night.png);
}
.bg_main_sleet {
  background-image: url(@/assets/images/bg_main_sleet.imageset/bg_main_sleet.png);
}
.bg_main_sleet_night {
  background-image: url(@/assets/images/bg_main_sleet_night.imageset/bg_main_sleet_night.png);
}
.bg_main_snow {
  background-image: url(@/assets/images/bg_main_snow.imageset/bg_main_snow.png);
}
.bg_main_snow_night {
  background-image: url(@/assets/images/bg_main_snow_night.imageset/bg_main_snow_night.png);
}
.bg_main_start {
  background-image: url(@/assets/images/bg_main_start.imageset/bg_main_start.png);
}
.bg_main_thunderstorm_day {
  background-image: url(@/assets/images/bg_main_thunderstorm_day.imageset/bg_main_thunderstorm_day.png);
}
.bg_main_thunderstorm_night {
  background-image: url(@/assets/images/bg_main_thunderstorm_night.imageset/bg_main_thunderstorm_night.png);
}
.bg_main_variant_a {
  background-image: url(@/assets/images/bg_main_variant_a.imageset/bg_main_variant_a.png);
}
.bg_main_variant_b {
  background-image: url(@/assets/images/bg_main_variant_b.imageset/bg_main_variant_b.png);
}
.bg_main_variant_c {
  background-image: url(@/assets/images/bg_main_variant_c.imageset/bg_main_variant_c.png);
}
.bg_main_wind {
  background-image: url(@/assets/images/bg_main_wind.imageset/bg_main_wind.png);
}
.bg_main_wind_night {
  background-image: url(@/assets/images/bg_main_wind_night.imageset/bg_main_wind_night.png);
}
</style>
