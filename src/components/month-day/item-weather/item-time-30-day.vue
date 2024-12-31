<template>
  <div class="w-full">
    <!--   -->
    <div class="flex items-center text-left gap-2 pad-t-b text-white">
      <img
        src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
        width="24"
        alt=""
      />
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
                    <img :src="renderIcon(item)" alt="" />
                    <p class="txt_medium_15">
                      {{ renderToCelsius(item?.temperatureMin) }} /
                      {{ renderToCelsius(item?.temperatureMax) }}
                    </p>
                  </div>
                  <div>
                    <img
                      :id="'chevron-' + index"
                      src="../../../assets/images/svg_v2/ic_chevron_right.png"
                      alt=""
                      width="28"
                    />
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
                      <img
                        src="../../../assets/images/svg_v2/ic_Temp.svg"
                        alt=""
                        srcset=""
                      />
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
                          <img
                            src="../../../assets/images/svg_v2/ic_temperature_min.svg"
                            width="24"
                            alt=""
                          />
                          <p class="txt_medium_15">
                            {{
                              convertFahrenheitToCelsiusNot(
                                item?.apparentTemperatureMin
                              )
                            }}
                          </p>
                        </div>
                        <div class="flex items-center">
                          <img
                            src="../../../assets/images/svg_v2/ic_temperature_max.svg"
                            alt=""
                            width="24"
                          />
                          <p class="txt_medium_15">
                            {{
                              convertFahrenheitToCelsiusNot(
                                item?.apparentTemperatureMax
                              )
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <img
                        src="../../../assets/images/svg_v2/ic_smile.svg"
                        alt=""
                        srcset=""
                      />
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
                      <img
                        src="../../../assets/images/svg_v2/ic_UV_index.svg"
                        alt=""
                        srcset=""
                      />
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
                      <img
                        src="../../../assets/images/svg_v2/ic_precititation.svg"
                        alt=""
                        srcset=""
                      />
                      <p class="txt_regular_14">{{ $t("precipitation") }}</p>
                    </div>
                    <div class="flex items-center txt_medium_15">
                      <p>{{ convertPrecipitation(item?.precipIntensity) }}</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <img
                        src="../../../assets/images/svg_v2/ic_droplet.svg"
                        alt=""
                        srcset=""
                      />
                      <p class="txt_regular_14">{{ $t("Chance_of_rain") }}</p>
                    </div>
                    <div class="flex items-center txt_medium_15">
                      <p>{{ item?.precipProbability * 100 }}%</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <img
                        src="../../../assets/images/svg_v2/ic_Air_quality.svg"
                        alt=""
                        srcset=""
                      />
                      <p class="txt_regular_14">{{ $t("air_quality") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="txt_medium_15">{{
                        Math.round(item?.uvIndex)
                      }}</span>

                      <span class="txt_regular_14"
                        >({{ convertAirIndexName(paramAirModule) }})</span
                      >
                    </div>
                  </div>
                </div>

                <!--  -->

                <div class="w-[50%] flex flex-col gap-4 pl-6">
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                      <img
                        src="../../../assets/images/svg_v2/ic_wind.svg"
                        alt=""
                        srcset=""
                      />
                      <p class="txt_regular_14">{{ $t("wind_speed") }}</p>
                    </div>

                    <div class="flex items-center gap-2">
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
                      <img
                        src="../../../assets/images/svg_v2/ic_wind_flag_svgrepo.svg"
                        alt=""
                        srcset=""
                      />
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
                      <img
                        src="../../../assets/images/svg_v2/ic_cloud_fog.svg"
                        alt=""
                        srcset=""
                      />
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
                      <img
                        src="../../../assets/images/svg_v2/ic_pressure.svg"
                        alt=""
                        srcset=""
                      />
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
                      <img
                        src="../../../assets/images/svg_v2/weather-icons-34-svgrepo-com 2.svg"
                        alt=""
                        srcset=""
                      />
                      <p class="txt_regular_14">{{ $t("sunrise") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <p class="txt_medium_15">
                        {{ convertTimeUnit(dailyOneGettersData?.sunriseTime) }}
                      </p>
                      <span class="txt_regular_14"
                        >({{
                          convertTimeUnit12(dailyOneGettersData?.sunriseTime)
                        }})</span
                      >
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <img
                        src="../../../assets/images/svg_v2/weather-icons-34-svgrepo-com 1.svg"
                        alt=""
                        srcset=""
                      />
                      <p class="txt_regular_14">{{ $t("sunset") }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <p class="txt_medium_15">
                        {{ convertTimeUnit(dailyOneGettersData?.sunsetTime) }}
                      </p>
                      <span class="txt_regular_14"
                        >({{
                          convertTimeUnit12(dailyOneGettersData?.sunriseTime)
                        }})</span
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
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
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

export default {
  name: "item-time-30-day",

  components: {
    BaseList,
  },
  data() {
    return {
      valueChoose: -1,
      isRotated: false,
      itemsPerPage: 10, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
      showLessButton: false,
    };
  },

  computed: {
    ...mapGetters("weatherModule", [
      "listDaily30DayGetters",
      "dailyOneGetters",
    ]),
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    ...mapGetters("airQualityModule", ["airObjectGetters"]),

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
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);

        const decodeAirObject = JSON.parse(airObject);

        return decodeAirObject.aqi ? decodeAirObject.aqi : 0;
      }
      return this.airObjectGetters?.aqi ? this.airObjectGetters?.aqi : 0;
    },
  },

  methods: {
    convertToShortDay(value) {
      return convertTimestampToDayMonth(value);
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
      const chevron = document.getElementById(`chevron-${value}`);
      if (this.isRotated) {
        chevron.style.transform = "rotate(0deg)"; // Trở về hướng ban đầu
      } else {
        chevron.style.transform = "rotate(90deg)"; // Xoay xuống dưới
      }
      this.isRotated = !this.isRotated; // Đảo ngược trạng thái

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
