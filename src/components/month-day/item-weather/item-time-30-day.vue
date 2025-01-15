<template>
  <div class="w-full">
    <!--   -->
    <div class="flex items-center text-left gap-2 pad-t-b">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.167 2V4M5.09717 4.92993L6.50717 6.33993M20.167 12H22.167M19.2371 4.92993L17.8271 6.33993M16.114 12.6501C16.237 11.9046 16.1464 11.1395 15.8527 10.4433C15.5589 9.74717 15.0739 9.14847 14.454 8.71654C13.834 8.28461 13.1044 8.03711 12.3496 8.00269C11.5948 7.96827 10.8457 8.14835 10.189 8.52206M13.167 22H7.16695C6.22092 21.9998 5.29436 21.7312 4.49487 21.2255C3.69539 20.7197 3.0558 19.9975 2.65038 19.1427C2.24496 18.288 2.09035 17.3358 2.20451 16.3966C2.31867 15.4575 2.69691 14.5701 3.29531 13.8373C3.89371 13.1046 4.6877 12.5567 5.58507 12.2572C6.48244 11.9577 7.44637 11.9189 8.36489 12.1454C9.28342 12.3718 10.1188 12.8542 10.7742 13.5366C11.4295 14.2189 11.8777 15.0731 12.067 16H13.167C13.9626 16 14.7257 16.3161 15.2883 16.8787C15.8509 17.4413 16.167 18.2044 16.167 19C16.167 19.7956 15.8509 20.5587 15.2883 21.1213C14.7257 21.6839 13.9626 22 13.167 22Z"
          stroke="var(--color-icon-df)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="txt_medium_14" v-if="breadcumsObject.country_key === 'vn'">
        <span v-if="breadcumsObject?.city && !breadcumsObject?.district">
          {{
            $t(`{city}_weather_forecast_next_30_days`, {
              city: $t(
                `city.city_${languageParam}.${breadcumsObject?.city_key}`
              ),
            })
          }}
        </span>

        <span
          v-if="
            breadcumsObject?.city &&
            breadcumsObject?.district &&
            !breadcumsObject?.ward
          "
        >
          {{
            convertCapitalizeWords(
              $t(`{city}_weather_forecast_next_30_days`, {
                city: $t(
                  `${convertToSlugCity(
                    breadcumsObject?.city
                  )}.${convertToSlugCity(
                    breadcumsObject?.city
                  )}_${languageParam}.${convertToLowCase(
                    breadcumsObject?.district_key
                  )}`
                ),
              })
            )
          }}
        </span>

        <span
          v-if="
            breadcumsObject?.city &&
            breadcumsObject?.district &&
            breadcumsObject?.ward
          "
          >{{
            convertCapitalizeWords(
              $t(`{city}_weather_forecast_next_30_days`, {
                city: $t(
                  `${convertToSlugCity(
                    breadcumsObject?.city
                  )}.${convertToSlugCity(
                    breadcumsObject?.city
                  )}_${languageParam}.${convertToLowCase(
                    breadcumsObject?.ward_key
                  )}`
                ),
              })
            )
          }}</span
        >
      </div>
    </div>
    <div class="w-full h-full overflow-hidden">
      <transition-group name="fade" tag="div">
        <div class="gap-4 flex flex-col cursor-pointer">
          <BaseList v-for="(item, index) in displayedItems" :key="index">
            <div class="w-full">
              <!--  -->
              <div
                @click="onClickShowDetailCard(index)"
                class="flex justify-between items-center w-full"
              >
                <!--  -->
                <div class="flex items-center">
                  <p class="w-[100px] text-left">
                    <span class="txt_regular_14">
                      {{ renderHourly(item).timestampValue }}
                    </span>

                    <span class="txt_regular_12 absolute ml-1">
                      {{ convertToShortDay(item.time) }}
                    </span>
                  </p>

                  <p class="txt_regular_14">
                    {{
                      convertCapitalizeWords(
                        $t(`${item?.summary.replace(/\s+/g, "_")}`)
                      )
                    }}
                  </p>
                </div>

                <div class="flex items-center">
                  <div class="flex items-center gap-2 mr-4">
                    <component :is="renderIcon(item)"></component>
                    <p class="txt_medium_15">
                      {{ renderToCelsius(item?.temperatureMin) }} /
                      {{ renderToCelsius(item?.temperatureMax) }}
                    </p>
                  </div>
                  <div>
                    <svg
                      :id="'chevron-' + index"
                      :class="{ 'rotate-180': activeIndex === index }"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 9L12 15L6 9"
                        stroke="var(--color-icon-df)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                v-if="index === valueChoose"
                class="w-full flex items-center justify-between pt-6 pb-4 pr-11"
              >
                <div class="w-[50%] flex flex-col gap-4 bor-rim-r pr-6">
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                      <IcTempt></IcTempt>
                      <p class="txt_regular_14">{{ $t("temperature") }}</p>
                    </div>

                    <div class="flex items-center">
                      <!-- <p>
                        {{
                          convertFahrenheitToCelsiusNot(
                            (item?.temperatureMin + item?.temperatureMax) / 2
                          )
                        }}
                      </p> -->
                      <div class="flex items-center">
                        <div class="flex items-center">
                          <IcTemptMin></IcTemptMin>
                          <p class="txt_medium_15">
                            {{
                              convertFahrenheitToCelsiusNot(
                                item?.temperatureMin
                              )
                            }}
                          </p>
                        </div>
                        <div class="flex items-center">
                          <IcTemptMax></IcTemptMax>
                          <p class="txt_medium_15">
                            {{
                              convertFahrenheitToCelsiusNot(
                                item?.temperatureMax
                              )
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcTitleReadFeel></IcTitleReadFeel>
                      <p class="txt_regular_14">{{ $t("real_feel") }}</p>
                    </div>
                    <div class="flex items-center txt_medium_15">
                      <p>
                        {{
                          convertFahrenheitToCelsiusNot(
                            (item?.apparentTemperatureMin +
                              item?.apparentTemperatureMax) /
                              2
                          )
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcUvIndex></IcUvIndex>
                      <p class="txt_regular_14">{{ $t("uv") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="txt_medium_15">
                        {{ item?.uvIndex }}
                      </span>
                      <span class="txt_regular_14"
                        >({{ convertUvIndexName(item?.uvIndex) }})</span
                      >
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcPrecipitation></IcPrecipitation>
                      <p class="txt_regular_14">{{ $t("precipitation") }}</p>
                    </div>
                    <div class="flex items-center txt_medium_15">
                      <p>{{ convertPrecipitation(item?.precipIntensity) }}</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcChanceOfRain></IcChanceOfRain>
                      <p class="txt_regular_14">{{ $t("Chance_of_rain") }}</p>
                    </div>
                    <div class="flex items-center txt_medium_15">
                      <p>{{ Math.round(item?.precipProbability * 100) }}%</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcTitleAir></IcTitleAir>
                      <p class="txt_regular_14">Dew point</p>
                    </div>
                    <div class="flex items-center">
                      <span class="txt_regular_14">{{
                        convertFahrenheitToCelsiusNot(item?.dewPoint)
                      }}</span>
                    </div>
                  </div>
                </div>

                <!--  -->

                <div class="w-[50%] flex flex-col gap-4 pl-6">
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                      <IcTitleWindSpeed></IcTitleWindSpeed>
                      <p class="txt_regular_14">{{ $t("wind_speed") }}</p>
                    </div>

                    <div class="flex items-center gap-1">
                      <p class="txt_medium_15">
                        {{ convertWindSpeed(item.windSpeed) }}
                      </p>
                      <span class="txt_regular_14">{{
                        convertUnitWindSpeed()
                      }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcTitleWindDirection></IcTitleWindDirection>
                      <p class="txt_regular_14">{{ $t("wind_direction") }}</p>
                    </div>
                    <div class="flex items-center">
                      <p class="txt_medium_15">
                        {{ convertWindBearing(item?.windBearing) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcTitleCloudCover></IcTitleCloudCover>
                      <p class="txt_regular_14">{{ $t("cloud_cover") }}</p>
                    </div>
                    <div class="flex items-center">
                      <p class="txt_medium_15">
                        {{ Math.round(item.cloudCover * 100) }}%
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcTitlePressure></IcTitlePressure>
                      <p class="txt_regular_14">{{ $t("pressure") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <p class="txt_medium_15">
                        {{ convertPressure(item?.pressure) }}
                      </p>
                      <span class="txt_regular_14">{{
                        convertUnitPressure()
                      }}</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1">
                      <IcTitleSunrise></IcTitleSunrise>
                      <p class="txt_regular_14">{{ $t("sunrise") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <p class="txt_medium_15">
                        {{ convertTimeUnit(item?.sunriseTime).split(" ")[0] }}
                      </p>
                      <span
                        class="txt_regular_14"
                        v-if="timePeriodSunriseTime(item?.sunriseTime)"
                        >({{ timePeriodSunriseTime(item?.sunriseTime) }})</span
                      >
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <IcTitleSunset></IcTitleSunset>
                      <p class="txt_regular_14">{{ $t("sunset") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <p class="txt_medium_15">
                        {{ convertTimeUnit(item?.sunsetTime).split(" ")[0] }}
                      </p>
                      <span
                        class="txt_regular_14"
                        v-if="timePeriodSunsetTime(item?.sunriseTime)"
                        >({{ timePeriodSunsetTime(item?.sunriseTime) }})</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseList>
        </div>
      </transition-group>

      <div class="w-full text-left mt-3">
        <button
          type="button"
          @click="onClickLoadMoreItems"
          class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
        >
          <span class="txt_medium_12">
            {{ showLessButton ? $t("Hide") : $t("See_more") }}</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseList from "@/components/common/baseList.vue";
import {
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  getIconHourlyForecastTheme,
  convertCtoF,
  convertFtoC,
  codeToFind,
  convertMillimet,
  convertMillimetToInch,
  convertMPHtoMetPS,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  getWindDirectionFromDegrees,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  convertToEnglish,
  getUvSummaryName,
  capitalizeWords,
  getAirSummaryName,
  convertDayOfWeek,
  convertTimestampToDayMonth,
  convertTime12h,
  convertTime12hTimeZoneNotNow,
  convertTime24hTimeZoneNotNow,
  convertTime12hTimeZoneNotNowUnit,
  convertTimestampUnit12,
} from "@/utils/converValue";
import { decodeBase64 } from "@/utils/EncoderDecoderUtils";
import { mapGetters } from "vuex";
import removeAccents from "remove-accents";
import IcTempt from "@/components/icons/IcTempt.vue";
import IcTemptMin from "@/components/icons/IcTemptMin.vue";
import IcTemptMax from "@/components/icons/IcTemptMax.vue";
import IcTitleReadFeel from "@/components/icons/IcTitleReadFeel.vue";
import IcUvIndex from "@/components/icons/IcUvIndex.vue";
import IcChanceOfRain from "@/components/icons/IcChanceOfRain.vue";
import IcTitleAir from "@/components/icons/IcTitleAir.vue";
import IcTitleWindSpeed from "@/components/icons/IcTitleWindSpeed.vue";
import IcTitleWindDirection from "@/components/icons/IcTitleWindDirection.vue";
import IcTitleCloudCover from "@/components/icons/IcTitleCloudCover.vue";
import IcTitlePressure from "@/components/icons/IcTitlePressure.vue";
import IcTitleSunrise from "@/components/icons/IcTitleSunrise.vue";
import IcTitleSunset from "@/components/icons/IcTitleSunset.vue";
import IcPrecipitation from "@/components/icons/IcPrecipitation.vue";

export default {
  name: "item-time-30-day",

  components: {
    BaseList,
    IcTempt,
    IcTemptMin,
    IcTemptMax,
    IcTitleReadFeel,
    IcUvIndex,
    IcChanceOfRain,
    IcTitleAir,
    IcTitleWindSpeed,
    IcTitleWindDirection,
    IcTitleCloudCover,
    IcTitlePressure,
    IcTitleSunrise,
    IcTitleSunset,
    IcPrecipitation,
  },
  data() {
    return {
      valueChoose: -1,
      isRotated: false,
      itemsPerPage: 10, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
      showLessButton: false,
      activeIndex: null, // Lưu trạng thái mục đang mở
    };
  },

  computed: {
    ...mapGetters("weatherModule", [
      "listDaily30DayGetters",
      "dailyOneGetters",
    ]),
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    ...mapGetters("airQualityModule", ["airObjectGetters"]),

    // timePeriodSunsetTime() {
    //   const timeString = this.convertTimeUnit(
    //     this.dailyOneGettersData?.sunsetTime
    //   );
    //   return timeString.split(" ")[1]; // Lấy phần AM/PM
    // },
    hourly30DayhGettersData() {
      return this.listDaily30DayGetters;
    },

    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    dailyOneGettersData() {
      return this.dailyOneGetters;
    },

    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.hourly30DayhGettersData.slice(0, end);
    },

    showSeeMoreButton() {
      return this.displayedItems.length < this.hourly30DayhGettersData.length;
    },

    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },

    paramAirModule() {
      const storageAir = this.$store.state.airQualityModule.apiValue;

      return storageAir;
    },
  },

  methods: {
    convertToShortDay(value) {
      return convertTimestampToDayMonth(value);
    },

    timePeriodSunsetTime(value) {
      const timeString = this.convertTimeUnit(value);
      return timeString.split(" ")[1]; // Lấy phần AM/PM
    },

    timePeriodSunriseTime(value) {
      const timeString = this.convertTimeUnit(value);
      return timeString.split(" ")[1]; // Lấy phần AM/PM
    },

    renderHourly(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      const timestampValue = convertDayOfWeek(value.time);

      return {
        timestampValue: timestampValue,
      };
    },
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
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

    convertWindBearing(value) {
      return getWindDirectionFromDegrees(value);
    },

    onClickShowDetailCard(value) {
      if (this.activeIndex === value) {
        this.activeIndex = null; // Đóng mục nếu đã mở
      } else {
        this.activeIndex = value; // Mở mục mới
      }

      if (this.valueChoose === value) {
        this.valueChoose = -1;
      } else {
        this.valueChoose = value;
      }
    },

    convertTime(val) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
      }
    },

    renderIcon(val) {
      const iconValue = getIconHourlyForecastTheme(val.icon);
      return iconValue;
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

    convertTimeUnit(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTime12hTimeZoneNotNowUnit(
          value,
          1,
          offsetValue,
          timezoneValue
        );
      } else {
        return convertTime24hTimeZoneNotNow(value, 1, offsetValue);
      }
    },

    convertTimeUnit12(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampUnit12(value, 1, offsetValue);
      } else {
        return "";
      }
    },

    onClickLoadMoreItems() {
      if (this.showLessButton) {
        this.currentPage = 1; // Reset to show the initial items
        this.showLessButton = false;
      } else {
        this.currentPage++;
        this.showLessButton =
          this.currentPage * this.itemsPerPage >=
          this.hourly30DayhGettersData.length;
      }
    },

    convertToEnglishRender(value) {
      return convertToEnglish(value);
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

    convertAirIndexName(val) {
      return getAirSummaryName(val);
    },

    convertToSlugCity(str) {
      const slug = removeAccents(str);
      debugger;
      return slug
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng
    },

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
  },
};
</script>
<style lang="scss"></style>
