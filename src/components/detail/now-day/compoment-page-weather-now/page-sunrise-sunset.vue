<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="w-full flex justify-start items-center gap-2 pb-2 bor_bottom_color"
    >
      <div class="flex items-center gap-2">
        <img
          width="24"
          height="24"
          src="../../../../assets/images/svg/ic_sunrise_not_bg.svg"
          alt=""
        />
        <p class="txt_bold txt-v2">
          {{
            $t("Sun_rise_&_sun_set_in_the_coming_hours_in_{name}", {
              name: renderCountry.city,
            })
          }}
        </p>
      </div>
    </div>
    <!--  -->
    <div class="w-full flex justify-between items-center gap-2 p-2 mb-2">
      <p class="txt_regular_14">
        {{ convertToShortDay(objectCurrently?.time) }}
      </p>
      <p class="txt_regular_14">
        {{ convertToShortDayTime(objectCurrently?.time) }}
      </p>
    </div>
    <!--  -->

    <div
      class="w-full items-center gap-2 p-2 h-[200px] bg-body-v2"
      :class="drawerClass"
    >
      <div class="w-full h-full flex justify-center items-center">
        <div>
          <div
            class="flex w-full justify-between h-[90px] gap-1 items-center pl-4 pr-4"
          >
            <div class="flex items-center">
              <div class="flex justify-center items-center">
                <img
                  :src="convertIconCurrently(objectCurrently?.icon)"
                  width="50"
                  alt=""
                />
              </div>
              <div class="txt_light_40 flex">
                <span
                  >{{
                    convertFahrenheitToCelsiusNot(objectCurrently?.temperature)
                  }}°
                </span>
              </div>
              <div>
                <div class="txt_medium_14">
                  {{ capitalizeWords(objectCurrently?.summary) }}
                </div>
                <div class="flex items-center justify-center">
                  <div class="txt_light_14">
                    <span
                      >{{ $t("Real_Feel") }}
                      {{
                        convertFahrenheitToCelsius(
                          objectCurrently?.apparentTemperature
                        )
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center txt_light_14 gap-1">
              <div class="icon">
                <img
                  src="../../../../assets/images/svg/v2/line-md-paint_light.svg"
                  alt="Lượng mưa"
                  class="size-img"
                />
              </div>
              <div>{{ $t("Chance_of_rain") }}:</div>
              <div class="temp">
                <p>{{ Math.round(objectCurrently?.humidity * 100) }}%</p>
              </div>
            </div>
          </div>
          <div class="flex items-end justify-between pt-4">
            <!--  -->
            <div class="flex flex-col gap-2 items-center w-[70px]">
              <img
                class="w-[25px]"
                src="../../../../assets/images/svg/ic_time_start.svg"
                alt=""
              />
              <span class="txt_light_summer">
                {{ convertTime(paramDailyOne?.sunriseTime) }}</span
              >
            </div>
            <!--  -->
            <div class="w-[380px]">
              <SunPathPage :renderCurrently="objectCurrently"></SunPathPage>
            </div>
            <!--  -->

            <div class="flex flex-col gap-2 items-center w-[70px]">
              <img
                class="w-[25px]"
                src="../../../../assets/images/svg/ic_time_end.svg"
                alt=""
              />
              <span class="txt_light_summer">
                {{ convertTime(paramDailyOne?.sunsetTime) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="w-full flex justify-between items-center gap-2 h-[180px]">
      <!--  -->

      <div class="w-full txt_light_summer">
        <table class="data">
          <tr>
            <th></th>
            <th>
              <div class="flex items-center justify-center txt_regular_14">
                <img
                  src="../../../../assets/images/svg/ic_sunrise_not_bg.svg"
                  alt=""
                  width="24"
                />
                <p>{{ $t("Sunrise") }}</p>
              </div>
            </th>
            <th>
              <div class="flex items-center justify-center txt_regular_14">
                <img
                  src="../../../../assets/images/svg/ic_sunrise_not_bg.svg"
                  alt=""
                  width="24"
                />
                <p>{{ $t("Sunset") }}</p>
              </div>
            </th>
          </tr>
          <tr>
            <td class="txt_regular_14">{{ $t("Time") }}</td>
            <td>{{ convertTime(paramDailyOne?.sunriseTime) }}</td>
            <td>{{ convertTime(paramDailyOne?.sunsetTime) }}</td>
          </tr>
          <tr>
            <td class="txt_regular_14">{{ $t("Altitude") }}</td>

            <td>{{ altitudeMoonRise?.toFixed(1) }}°</td>
            <td>{{ altitudeMoonSet?.toFixed(1) }}°</td>
          </tr>
          <tr>
            <td class="txt_regular_14">{{ $t("Azimuth") }}</td>
            <td>
              <div class="flex items-center justify-center gap-2">
                <p>{{ azimuthMoonRise?.toFixed(1) }}°</p>
                <p>{{ convertWindDirectionFromDegrees(azimuthMoonRise) }}</p>
                <p>
                  {{ convertWindDirectionEmojiFromDegrees(azimuthMoonRise) }}
                </p>
              </div>
            </td>
            <td>
              <div class="flex items-center justify-center gap-2">
                <p>{{ azimuthMoonSet?.toFixed(1) }}°</p>
                <p>{{ convertWindDirectionFromDegrees(azimuthMoonSet) }}</p>
                <p>
                  {{ convertWindDirectionEmojiFromDegrees(azimuthMoonSet) }}
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <!--  -->
    </div>
    <!--  -->
    <div class="w-full text-left items-center gap-2 txt_light_summer">
      <!--  -->
      <div class="text-left flex txt_light_14">
        <p>{{ $t("Current_altitude") }}: {{ altitudeSunSetNow }}°</p>
      </div>
      <div class="flex items-center gap-1 txt_light_14">
        <p>{{ $t("Current_Azimuth") }}:</p>
        <p>{{ azimuthSunSetNow }}°</p>
        <p>
          {{ convertWindDirectionFromDegrees(objectCurrently?.windBearing) }}
        </p>
        <p>
          {{
            convertWindDirectionEmojiFromDegrees(objectCurrently?.windBearing)
          }}
        </p>
      </div>
      <div class="flex items-center gap-1 txt_regular_wind">
        <p>{{ $t("Total_daylight") }}:</p>
        <p>
          {{
            convertTimeValue(
              parseInt(paramDailyOne?.sunsetTime) -
                parseInt(paramDailyOne?.sunriseTime)
            )
          }}
        </p>
      </div>
      <div>
        <p class="txt_light_10">
          {{ renderCountry?.city }}, {{ renderCountry?.country }}
        </p>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import {
  convertTimestampToHoursMinutes,
  getWindDirectionFromDegrees,
  getWindDirectionEmojiFromDegrees,
  convertTimeNew,
  convertTimestampNow12,
  convertTimestampNow24,
  convertTimestampToHoursMinutes12,
  convertCtoF,
  convertFtoC,
  codeToFind,
  getIconHourlyForecastTheme,
} from "../../../../utils/converValue.js";
import { convertAltitude } from "../../../../utils/moonPhase.js";
import SunPathPage from "@/components/home/clear-day/sun-path-page.vue";
export default {
  name: "page-sunrise-sunset",

  components: {
    SunPathPage,
  },

  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      altitudeMoonRise: 0,
      altitudeMoonSet: 0,
      azimuthMoonRise: 0,
      azimuthMoonSet: 0,

      altitudeSunSetNow: 0,
      azimuthSunSetNow: 0,
    };
  },
  computed: {
    objectCurrently() {
      return this.$store.state.getWeather.currently;
    },

    paramDailyOne() {
      return this.$store.state.getWeather.dailyOne;
    },

    renderCountry() {
      return this.$store.state.getWeather.countryFilter;
    },

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
  },
  watch: {
    paramDailyOne(newData) {
      this.convertAltitudeSunrise();
      this.convertAltitudeSunset();
      this.convertAltitudeSunsetCurrently;
    },
  },

  async mounted() {
    if (this.paramDailyOne) {
      this.convertAltitudeSunrise();
      this.convertAltitudeSunset();
      this.convertAltitudeSunsetCurrently;
    }
  },

  methods: {
    capitalizeWords(str) {
      if (str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
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

    renderTemperature() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return codeToFind(unitSetting.activeTemperature_save);
      } else {
        return codeToFind(unitSetting.activeTemperature_save);
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
    convertTimeValue(value) {
      return convertTimeNew(value);
    },
    convertWindDirectionEmojiFromDegrees(value) {
      return getWindDirectionEmojiFromDegrees(value);
    },
    convertWindDirectionFromDegrees(value) {
      return getWindDirectionFromDegrees(value);
    },
    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day} ${this.$t("month")} ${month}, ${year}`;
    },
    convertToShortDayTime(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampNow12(new Date(), 0, offsetValue);
      } else {
        return convertTimestampNow24(new Date(), 0, offsetValue);
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

    async convertAltitudeSunrise(value) {
      const location = this.$store.state.getWeather.cityCountry;
      const paramDailyOneValue = this.$store.state.getWeather.dailyOne;
      if (paramDailyOneValue) {
        const altitudeResult = await convertAltitude(
          paramDailyOneValue.sunriseTime * 1000,
          location.latitude,
          location.longitude
        );
        this.altitudeMoonRise = altitudeResult.altitudeMoonRise;
        this.azimuthMoonRise = altitudeResult.azimuthMoonRise;
      }
    },
    async convertAltitudeSunset(value) {
      const location = this.$store.state.getWeather.cityCountry;
      const paramDailyOneValue = this.$store.state.getWeather.dailyOne;
      if (paramDailyOneValue) {
        const altitudeResult = await convertAltitude(
          paramDailyOneValue.sunsetTime * 1000,
          location.latitude,
          location.longitude
        );
        this.altitudeMoonSet = altitudeResult.altitudeMoonSet;
        this.azimuthMoonSet = altitudeResult.azimuthMoonSet;
      }
    },

    async convertAltitudeSunsetCurrently(value) {
      const location = this.$store.state.getWeather.cityCountry;
      const paramDailyOneValue = this.$store.state.getWeather.currently;
      if (paramDailyOneValue) {
        const altitudeResult = await convertAltitude(
          paramDailyOneValue.time * 1000,
          location.latitude,
          location.longitude
        );
        this.altitudeSunSetNow = altitudeResult.altitudeMoonSet;
        this.azimuthSunSetNow = altitudeResult.azimuthMoonSet;
      }
    },
  },
};
</script>
<style lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid white;
}

table,
th,
td {
  border: 1px solid;
  padding: 6px;
}
.bg-sunset-sunrise {
  background-color: #9aaed1;
  border-radius: 4px;
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
