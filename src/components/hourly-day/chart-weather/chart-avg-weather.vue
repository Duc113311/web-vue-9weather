<template>
  <div class="w-full">
    <div class="lg:flex items-center gap-20-px w-full h-full">
      <div
        class="left-i w-full"
        v-if="currentlyData && Object.keys(currentlyData).length > 0"
      >
        <BaseComponent :isShowPad="false">
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
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
              <div class="txt_medium_14" v-if="wardParam.country_key === 'vn'">
                <span v-if="wardParam?.city && !wardParam?.district">
                  {{
                    $t(`Temperature_and_chance_of_rain_{city}_hour`, {
                      city: $t(
                        `city.city_${languageParam}.${wardParam?.city_key}`
                      ),
                    })
                  }}
                </span>

                <span
                  v-if="
                    wardParam?.city && wardParam?.district && !wardParam?.ward
                  "
                >
                  {{
                    convertCapitalizeWords(
                      $t(`Temperature_and_chance_of_rain_{city}_hour`, {
                        city: $t(
                          `${convertToSlugCity(
                            wardParam?.city
                          )}.${convertToSlugCity(
                            wardParam?.city
                          )}_${languageParam}.${convertToLowCase(
                            wardParam?.district_key
                          )}`
                        ),
                      })
                    )
                  }}
                </span>

                <span
                  v-if="
                    wardParam?.city && wardParam?.district && wardParam?.ward
                  "
                  >{{
                    convertCapitalizeWords(
                      $t(`Temperature_and_chance_of_rain_{city}_hour`, {
                        city: $t(
                          `${convertToSlugCity(
                            wardParam?.city
                          )}.${convertToSlugCity(
                            wardParam?.city
                          )}_${languageParam}.${convertToLowCase(
                            wardParam?.ward_key
                          )}`
                        ),
                      })
                    )
                  }}</span
                >
              </div>
              <div v-else class="txt_medium_14">
                <span v-if="wardParam?.state && !wardParam?.county">
                  {{
                    $t(`Temperature_and_chance_of_rain_{city}_hour`, {
                      city: $t(`${wardParam?.state}`),
                    })
                  }}
                </span>
                <span
                  v-if="
                    wardParam?.state && wardParam?.county && !wardParam?.cities
                  "
                >
                  {{
                    $t(`Temperature_and_chance_of_rain_{city}_hour`, {
                      city: $t(`${wardParam?.state}`),
                    })
                  }}
                </span>
                <span
                  v-if="
                    wardParam?.state && wardParam?.county && wardParam?.cities
                  "
                >
                  {{
                    $t(`Temperature_and_chance_of_rain_{city}_hour`, {
                      city: $t(`${wardParam?.state}`),
                    })
                  }}
                </span>
              </div>
            </div>
          </template>

          <div class="w-full">
            <div class="w-auto h-[422px]">
              <!-- <ChartTempRain></ChartTempRain> -->
              <ChartSyntheticHourly></ChartSyntheticHourly>
            </div>

            <!--  -->
          </div>
        </BaseComponent>
      </div>
      <div v-else class="lg:w-[566px] w-full h-[480px]">
        <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
      </div>

      <!-- <div class="right-i lg:w-[30%] w-full lg:block flex gap-4">
        <BaseComponent
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <template v-slot:header>
            <div class="flex items-center text-left gap-2">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
                width="24"
                alt=""
              />
              <span>{{ convertCapitalizeWords($t("Current_weather")) }}</span>
            </div>
          </template>

          <div class="w-full gap-4 grid">
            <div class="w-[160px] h-[163px]">
              <div class="flex gap-2 justify-center items-center text-left">
                <img
                  :src="convertIconCurrently(currentlyData?.icon)"
                  width="40"
                  height="40"
                  class="object-cover"
                />
                <div>
                  <p class="txt_medium_30">
                    {{ renderToCelsius(currentlyData?.temperature) }}
                  </p>
                </div>
              </div>
              <div
                class="flex justify-start items-center pt-1 pb-1 txt_regular_des_12"
              >
                {{
                  convertCapitalizeWords(
                    $t(`${dailyOneData?.summary.replace(/\s+/g, "_")}`)
                  )
                }}
              </div>

              <div class="flex justify-start items-center pt-1 pb-1">
                <span class="text-left">{{ $t("real_feel") }}:</span>&nbsp;
                <span class="txt_regular_des_12">{{
                  convertFahrenheitToCelsiusAmtp(currentlyData)
                }}</span>
              </div>
            </div>
          </div>
        </BaseComponent>
        <div v-else class="w-full h-[230px]">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>

        <BaseComponent
          v-if="currentlyData && Object.keys(currentlyData).length > 0"
        >
          <div class="w-full gap-4 grid">
            <div class="w-[160px] h-[163px]">
              <div class="flex justify-start items-center text-left">
                <img
                  src="../../../assets/images/svg_v2/ic_precititation.svg"
                  width="40"
                  height="40"
                  class="object-cover"
                />
              </div>
              <div class="flex items-center justify-start pt-1 pb-1">
                <span>{{ $t("Chance_of_rain") }}:</span>&nbsp;

                <span class="txt_regular_des_12"
                  >{{
                    Math.round(currentlyData?.precipProbability * 100)
                  }}%</span
                >
              </div>
              <div class="flex justify-start items-center pt-1 pb-1">
                <p>{{ $t("precipitation") }}</p>
              </div>
              <div class="flex justify-start items-center pt-1 pb-1">
                <span class="txt_regular_des_12">
                  {{ convertPrecipitation(currentlyData?.precipIntensity) }}
                </span>
              </div>
            </div>
          </div>
        </BaseComponent>
        <div v-else class="w-full h-[230px] mt-4">
          <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import ChartTempRain from "@/components/today/temperature/chart-temp-rain.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import {
  capitalizeWords,
  codeToFind,
  convertCtoF,
  convertFtoC,
  convertMillimet,
  convertMillimetToInch,
  getIconHourlyForecastTheme,
} from "@/utils/converValue";
import { mapGetters } from "vuex";
import removeAccents from "remove-accents";
import ChartSyntheticHourly from "../chart-tempt-hourly/chart-synthetic-hourly.vue";

export default {
  name: "chart-avg-weather",

  components: {
    BaseComponent,
    // ChartTempRain,
    SkeletonLoader,
    ChartSyntheticHourly,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    ...mapGetters("weatherModule", ["dailyOneGetters", "currentlyGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },

    dailyOneData() {
      return this.dailyOneGetters;
    },

    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    wardParam() {
      debugger;

      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },
  },

  methods: {
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },
    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertToSlugCity(str) {
      const slug = removeAccents(str);
      debugger;
      return slug
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng
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

    convertFahrenheitToCelsiusAmtp(value) {
      const temp = value.apparentTemperature;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return (
          convertCtoF(temp) + codeToFind(unitSetting.activeTemperature_save)
        );
      } else {
        return (
          convertFtoC(temp) + codeToFind(unitSetting.activeTemperature_save)
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

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
  },
};
</script>
<style lang="scss">
.flex-hourly {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 16px;
}
</style>
