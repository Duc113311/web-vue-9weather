<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-full pt-8 pl-6 pr-6" v-if="renderDailyDataThree">
      <div class="w-full h-full mb-4">
        <div class="w-full flex items-center weather-main-hero-t">
          <div class="w-[20px] mr-6 desc">
            <p>{{ convertDayMonth(renderDailyDataThree?.time) }}</p>
            <span>{{
              convertToWeekdayAndDateNumber(renderDailyDataThree?.time)
            }}</span>
          </div>
          <div class="w-[85px]">
            <img
              :src="convertIconCurrently(renderDailyDataThree?.icon)"
              alt="Thời tiết Hà Nội Thứ 4 - 21/08"
              width="78"
              height="78"
              class="object-cover"
            />
          </div>
          <p class="temp">
            {{ convertFahrenheitToCelsiusNotAvg(renderDailyDataThree) }}°
          </p>
          <div class="desc text-left ml-2">
            <p>{{ capitalizeWords(renderDailyDataThree?.summary) }}</p>
            <span
              >Feels like

              <span
                >{{
                  convertFahrenheitToCelsiusAmtp(renderDailyDataThree)
                }}°</span
              ></span
            >
          </div>
          <div class="extra">
            <div class="item">
              <div class="icon">
                <img
                  src="../../../assets/images/svg/v2/line-md-paint.svg"
                  alt="Lượng mưa"
                  class="size-img"
                />
              </div>
              <div>Chance of rain:</div>
              <div class="temp">
                <p>{{ renderDailyDataThree?.precipProbability * 100 }}%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="weather-main-desc flex items-center justify-between">
          <div class="item">
            <div class="flex justify-center">
              <img
                src="../../../assets/images/svg/v2/ic_temperature_v2_dark.svg"
                alt="Nhiệt độ thời tiết"
                class="size-img"
              />
            </div>
            <div class="item-title">Low/Cao</div>
            <div class="temp">
              <p>
                {{
                  convertFahrenheitToCelsiusNot(
                    renderDailyDataThree?.temperatureMin
                  )
                }}° /
                {{
                  convertFahrenheitToCelsiusNot(
                    renderDailyDataThree?.temperatureMax
                  )
                }}°
              </p>
            </div>
          </div>
          <div class="item">
            <div class="flex justify-center">
              <img
                src="../../../assets/images/svg/v2/ic_humidity-xl_dark.svg"
                alt="Dự báo độ ẩm thời tiết Hà Nội"
                class="size-img"
              />
            </div>
            <div class="item-title">Humidity</div>
            <div class="temp">
              <p>{{ Math.round(renderDailyDataThree?.humidity * 100) }}%</p>
            </div>
          </div>

          <div class="item">
            <div class="flex justify-center">
              <img
                src="../../../assets/images/svg/v2/ic_ph-wind_dark.svg"
                alt="Dự báo tốc độ gió"
                class="size-img"
              />
            </div>
            <div class="item-title">Wind speed</div>
            <div class="temp">
              <p>
                {{ convertWindSpeed(renderDailyDataThree?.windSpeed) }}
                {{ convertUnitWindSpeed() }}
              </p>
            </div>
          </div>
          <div class="item">
            <div class="flex justify-center">
              <img
                src="../../../assets/images/svg/v2/pressure.svg"
                alt="Áp suất không khí"
                class="size-img"
              />
            </div>
            <div class="item-title">Pressure</div>
            <div class="temp">
              <p>
                {{ convertPressure(renderDailyDataThree.pressure) }}
                {{ convertUnitPressure() }}
              </p>
            </div>
          </div>
          <div class="item">
            <div class="flex justify-center">
              <img
                src="../../../assets/images/svg/v2/ic_dawn_dark.svg"
                alt="Thời gian Bình minh và Hoàng hôn"
                class="size-img"
              />
            </div>
            <div class="item-title">Sunrise/Sunset</div>
            <div class="temp">
              <p>
                {{ convertTime(renderDailyDataThree?.sunriseTime) }} /
                {{ convertTime(renderDailyDataThree?.sunsetTime) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full mar-b">
      <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
    </div>
  </div>
</template>
<script>
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import {
  convertDayOfWeek,
  convertToWeekdayAndDate,
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
  getIconHourlyForecastTheme,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  codeToFind,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertCtoF,
  convertFtoC,
} from "../../../utils/converValue.js";
export default {
  name: "form-three-day-page",

  components: { SkeletonLoader },
  data() {
    return {};
  },

  props: {
    currentDailyDataThree: {
      type: Object,
      required: () => {},
    },
  },

  computed: {
    renderDailyDataThree() {
      console.log("this.currentDailyDataThree", this.currentDailyDataThree);

      return this.currentDailyDataThree;
    },
  },

  methods: {
    convertDayMonth(value) {
      return convertDayOfWeek(value);
    },
    convertToWeekdayAndDateNumber(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      return convertToWeekdayAndDate(value, offsetValue).date;
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertFahrenheitToCelsiusNotAvg(value) {
      const tempMin = value.temperatureMin;
      const tempMax = value.temperatureMax;
      const avgTemp = (parseInt(tempMax) + parseInt(tempMin)) / 2;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(avgTemp);
      } else {
        return convertFtoC(avgTemp);
      }
    },
    convertFahrenheitToCelsiusAmtp(value) {
      const tempMin = value.apparentTemperatureMin;
      const tempMax = value.apparentTemperatureMax;
      const avgTemp = (parseInt(tempMax) + parseInt(tempMin)) / 2;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(avgTemp);
      } else {
        return convertFtoC(avgTemp);
      }
    },

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
};
</script>
<style lang="scss">
.weather-main-hero-t {
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #f3f1ef;
}
.weather-main-hero-t .temp {
  font-weight: 600;
  font-size: 60.75px;
  line-height: 74px;
  color: #003870;
}

.weather-main-hero-t .desc p {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  color: #003870;
  margin-bottom: 0;
  text-transform: capitalize;
}

.weather-main-hero-t .desc span {
  font-size: 14px;
  line-height: 24px;
}

.weather-main-hero-t .extra {
  display: block;
  margin-left: 110px;
  margin-top: -15px;
}

.weather-main-hero-t .extra .item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 5px;
}

.weather-main-hero-t .extra .item .temp {
  margin-left: 5px;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  font-weight: normal;
}
.weather-main-desc .item {
  text-align: center;
}

.weather-main-desc .item .item-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  margin-bottom: 4px;
}
</style>
