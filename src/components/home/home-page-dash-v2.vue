<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="w-full h-auto flex justify-center items-center pad-form-tb md:pl-0 md:pr-0 pl-4 pr-4"
    >
      <!--  -->
      <div class="container h-full w-full">
        <div class="lg:flex lg:justify-between block w-full h-full flex-wrap">
          <div
            v-if="paramCurrently"
            class="xl:w-[582px] lg:w-[515px] w-full pad-form-radios h-auto bg-body-v2 card mar-r"
            :class="drawerClass"
          >
            <div class="text-left w-full">
              <p
                class="txt_bold cursor-pointer"
                @click="onClickWeatherHome(renderCountry)"
              >
                {{
                  $t("Weather_forecast_{name}", { name: renderCountry?.city })
                }}
              </p>
            </div>
            <!--  -->
            <div class="w-full h-full">
              <DayPage
                :paramDaily="paramDailyOne"
                :paramCurrentlyDay="paramCurrentlyDay"
                :key="indexKey"
              ></DayPage>
            </div>
          </div>
          <div v-else class="w-[582px] h-full card mar-r">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <div
            class="xl:w-[calc(100%-600px)] lg:w-[calc(100%-531px)] w-full lg:mt-0 mt-4 flex xl:gap-0 gap-4 justify-between h-full"
            v-if="paramDaily.length !== 0"
          >
            <div
              v-for="(item, index) in paramDaily"
              :key="index"
              class="xl:w-[171px] w-full pad-form-radios pad-form-radios-active bg-from bg-white h-auto text-center card"
            >
              <!--  -->

              <div
                class="flex flex-col justify-center items-center w-full h-full"
              >
                <div>
                  <p class="txt_medium">
                    {{ convertTime(item?.time).weekday }}
                    {{ convertTime(item?.time).date }}
                  </p>
                </div>
                <div
                  class="flex justify-center items-center weather-sub mt-4 mb-8"
                >
                  <img :src="convertIconCurrently(item?.icon)" alt="" />
                </div>
                <div class="desc">
                  <div class="flex items-center justify-center gap-1 mb-4">
                    <img
                      width="16"
                      src="@/assets/images/svg/ic_symbols_water-drop-outline.svg"
                      alt=""
                    />
                    <span class="txt_light_desc_regular">{{
                      convertPrecipitation(item?.precipIntensity)
                    }}</span>
                  </div>
                  <p class="txt_light_desc_medium">
                    {{ convertSummary(item?.summary) }}
                  </p>
                  <div class="txt_light_desc_temp p-1">
                    <span>{{ convertTemperature(item?.temperatureMin) }}°</span
                    >/<span
                      >{{ convertTemperature(item?.temperatureMax) }}°</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="w-[calc(100%-600px)] card h-full">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <div
      class="w-full h-full flex justify-center items-center md:pl-0 md:pr-0 pl-4 pr-4"
    >
      <!--  -->
      <div class="container h-full w-full">
        <div class="w-full h-full flex flex-wrap gap-4">
          <!--  -->
          <div class="md:w-[800px] w-full h-auto">
            <!--  -->
            <div
              v-if="paramCurrently"
              class="2xl:w-[800px] w-full h-auto mar-b card md:mar-r"
            >
              <div class="pad-form-radios bg-from w-full h-full">
                <!-- <HourlyPage></HourlyPage> -->
                <CityProvincePage></CityProvincePage>
              </div>
            </div>
            <div
              class="2xl:w-[794px] xl:w-[640px] lg:w-[640px] w-full h-[502px] card mar-b"
              v-else
            >
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>
            <!-- Radar -->
            <div
              v-if="paramCurrently"
              class="2xl:w-[800px] w-full h-auto mar-b card md:mar-r"
            >
              <div class="bg-from w-full h-full">
                <!-- <HourlyPage></HourlyPage> -->
                <div class="w-full h-full">
                  <RadarPage></RadarPage>
                </div>
              </div>
            </div>
            <div v-else class="w-full h-full md:h-[522px] card">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>
            <!--  -->
          </div>
          <div class="w-[333px] h-auto lg:block justify-between hidden">
            <!--  -->
            <div class="w-full h-[300px] bg-ads mar-b"></div>
            <!--  -->
            <div class="w-full h-[600px] bg-ads"></div>
          </div>

          <!--  -->
        </div>
      </div>
    </div>

    <!--  -->
    <div
      class="w-full h-auto flex justify-center items-center md:pl-0 md:pr-0 pl-4 pr-4"
    >
      <div
        class="w-full flex h-[200px] justify-center items-center mar-b pad-form-radios bg-from"
      >
        <div class="img-ads-ngang w-full h-full"></div>
      </div>
    </div>
  </div>
</template>
<!--  -->
<script>
import {
  convertMillimet,
  convertMillimetToInch,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  codeToFind,
  getIconHourlyForecastTheme,
  convertToWeekdayAndDate,
  convertCtoF,
  convertFtoC,
} from "@/utils/converValue.js";
import {
  getAqiDataFromLocation,
  getParamAirByCode,
  encodeBase64,
  decodeBase64,
} from "../../utils/EncoderDecoderUtils.js";
import DayPage from "@/components/home/clear-day/day-page.vue";
import RadarPage from "@/components/home/radar/radar-page.vue";
import SkeletonLoader from "../../control-ui/SkeletonLoader/SkeletonLoader.vue";
import CityProvincePage from "../../components/home/v2/provinces-city/city-province-page";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "home-page-dash-v2.vue",

  components: {
    DayPage,
    RadarPage,
    SkeletonLoader,
    CityProvincePage,
  },
  data() {
    return {};
  },

  computed: {
    renderCountry() {
      return this.$store.state.getWeather.cityCountry;
    },
    paramCurrentlyDay() {
      return this.$store.state.getWeather.currently;
    },
    paramDailyOne() {
      return this.$store.state.getWeather.dailyOne;
    },
    paramCurrently() {
      return this.$store.state.getWeather.currently.time;
    },
    paramDaily() {
      console.log(
        "dailyDataThreeNext",
        this.$store.state.getWeather.dailyDataThreeNext
      );
      return this.$store.state.getWeather.dailyDataThreeNext;
    },

    indexKey() {
      return this.$store.state.commonModule.indexKey;
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

  async mounted() {},

  methods: {
    ...mapMutations(["setCountryFilter", "setWeatherRecentData"]),
    ...mapActions([
      "getWeatherData",
      "getAirQualityByKey",
      "getAirQuality",
      "getWeatherRecentData",
    ]),
    convertTemperature(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },

    convertSummary(str) {
      if (str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      }
    },

    convertPrecipitation(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        return (
          convertMillimet(value) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      } else {
        return (
          convertMillimetToInch(value) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      }
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertTime(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      return convertToWeekdayAndDate(value, offsetValue);
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

    async onClickWeatherHome(item) {
      debugger;

      const dataLocation = {
        city: item.city,
        code: item.code,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
      };

      localStorage.setItem("country", JSON.stringify(dataLocation));
      localStorage.setItem("cityName", JSON.stringify(dataLocation.city));
      this.setCountryFilter(dataLocation);

      let language = localStorage.getItem("language") || "en";
      await this.$router.push({
        path: `/${language}/${item.country}/${item.city}/${item.code}/current-weather`,
      });
      window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.latitude},${item.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(item.latitude, item.longitude);
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );

      this.saveToLocalStorage("recent_key", dataLocation);
      const arrayStorage = this.getFromLocalStorage("recent_key");
      this.getValueWeatherByRecent(arrayStorage);
      const encodeAirCode = encodeBase64(airCode);

      await Promise.all([
        await this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
    },
    saveToLocalStorage(key, value) {
      let storedData = JSON.parse(localStorage.getItem(key)) || [];
      debugger;
      // Nếu mảng đã đủ 3 phần tử, xóa phần tử đầu tiên
      if (storedData.length === 3) {
        storedData.pop();
      }

      // Thêm phần tử mới vào mảng
      if (storedData.length !== 0) {
        const findData = storedData.find(
          (x) =>
            x.latitude === value.latitude && x.longitude === value.longitude
        );
        if (!findData) {
          storedData.unshift(value);
        }
      } else {
        storedData.unshift(value);
      }

      // Lưu lại mảng mới vào localStorage
      localStorage.setItem(key, JSON.stringify(storedData));
    },
    getFromLocalStorage(key) {
      // Trả về mảng các object từ localStorage
      return JSON.parse(localStorage.getItem(key)) || [];
    },

    async getValueWeatherByRecent(value) {
      const objectLocation = value;

      debugger;
      for (let index = 0; index < objectLocation.length; index++) {
        const element = objectLocation[index];
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${element.latitude},${element.longitude}?lang=en`;
        const value = encodeBase64(param);
        let resultArray = [];
        await this.getWeatherRecentData(value).then((data) => {
          const decodeData = JSON.parse(decodeBase64(data));
          const objectRecent = {
            countryValue: element,
            dataValue: decodeData.currently,
          };
          resultArray.push(objectRecent);
          this.setWeatherRecentData(objectRecent);
        });
      }
    },
  },
};
</script>
<style lang="scss">
.weather-sub img {
  width: 100%;
  height: 135px;
  object-fit: contain;
  max-width: 80%;
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

.img-ads-doc {
  background-image: url(../../assets/images/png/ads_doc.jpg);
}
.img-ads-vuong {
  background-image: url(../../assets/images/png/ads_vuong.jpg);
}
.img-ads-ngang {
  background-image: url(../../assets/images/png/ads_ngang.jpg);
}
</style>
