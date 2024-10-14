<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-full flex flex-col lg:flex-row justify-between mb-6">
      <!--  -->

      <!--  -->
      <div class="w-full h-full">
        <div class="w-full flex justify-center items-center">
          <!--  -->

          <div class="w-full">
            <div class="flex flex-wrap gap-4">
              <div class="h-[410px] w-full flex gap-4 card">
                <!--  -->
                <div class="pad-form-radios bg-from w-full h-full">
                  <!--  -->

                  <div
                    class="flex justify-center relative items-start pad-border-bottom"
                  >
                    <div class="flex w-full justify-between bg-white">
                      <p class="txt_medium txt-v2">
                        {{ renderCityName }} Weather 30 day
                      </p>
                      <el-popover
                        ref="popover"
                        placement="left"
                        :width="500"
                        trigger="click"
                      >
                        <template #reference>
                          <img
                            src="../../../assets/images/svg/gg_info.svg"
                            width="20"
                            alt=""
                          />
                        </template>

                        <template #default>
                          <div class="w-[480px] h-full">
                            <div class="txt_medium">
                              {{ renderCityName }} weather 30 day
                            </div>
                            <p class="txt_light_14">
                              weather 30 day map shows the location of
                              precipitation, its type (rain, snow, and ice) and
                              its recent movement to help you plan your day.
                              Simulated radar displayed over oceans, Central and
                              South American countries is generated from
                              satellite data, which is provided up to the
                              current time and may not be updated as frequently
                              as other regions.
                            </p>
                          </div>
                        </template>
                      </el-popover>
                    </div>
                  </div>
                  <vue-horizontal
                    responsive
                    :displacement="0.7"
                    class="w-full h-[calc(100%-62px)] relative horizontal pt-2"
                  >
                    <div>
                      <WeatherList30day></WeatherList30day>
                      <LineChartTemp30day class="pt-10"></LineChartTemp30day>
                      <LineChartRain30day></LineChartRain30day>
                    </div>
                  </vue-horizontal>
                  <div
                    class="flex justify-between items-center w-full bor-top-end p-2 pad-option-hourly"
                  >
                    <div class="flex items-center">
                      <div>
                        <img
                          src="../../../assets/images/svg/ic_chance_of_rain.svg"
                          alt=""
                        />
                      </div>
                      <div class="txt_light_summer ml-2 color-rain">
                        <span>{{ $t("Chance_of_rain") }}</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div>
                        <img
                          src="../../../assets/images/svg/ic_chance_of_snow.svg"
                          alt=""
                        />
                      </div>
                      <div class="txt_light_summer ml-2 color-snow">
                        <span>{{ $t("Chance_of_snow") }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="w-full h-[980px] flex flex-wrap gap-4">
                <div class="w-[832px] h-full">
                  <div class="w-full h-[815px] flex gap-4 card">
                    <!--  -->
                    <div class="pad-form-radios bg-from w-full">
                      <!--  -->
                      <div
                        class="w-full flex justify-between items-center gap-2"
                      >
                        <p class="txt_medium">
                          {{ renderCityName }}
                          {{ convertMonthYear(renderCurrently.time) }}
                        </p>
                      </div>
                      <div class="calendar">
                        <ul class="weeks bor-bottom txt_light_summer pt-2 pb-2">
                          <li>{{ $t("Mon") }}</li>
                          <li>{{ $t("Tue") }}</li>
                          <li>{{ $t("Wed") }}</li>
                          <li>{{ $t("Thu") }}</li>
                          <li>{{ $t("Fri") }}</li>
                          <li class="weekend">{{ $t("Sat") }}</li>
                          <li class="weekend">{{ $t("Sun") }}</li>
                        </ul>
                        <ul class="days">
                          <li
                            v-for="(day, index) in renderCalendar"
                            :key="index"
                            :style="getStyle(day.time)"
                          >
                            <el-popover
                              ref="popover"
                              placement="right"
                              :width="400"
                              trigger="click"
                              popper-style="background-color:#111533"
                            >
                              <template #reference>
                                <div
                                  class="flex flex-col justify-center items-center gap-0.5 txt_light_14 rounded-xl"
                                >
                                  <span>{{ convertToShortDay(day.time) }}</span>
                                  <div>
                                    <img :src="convertIcon(day.icon)" alt="" />
                                  </div>
                                  <div>
                                    {{ convertTemperature(day.temperatureMax) }}
                                  </div>
                                  <div>
                                    {{ convertTemperature(day.temperatureMin) }}
                                  </div>
                                  <div class="flex items-center gap-1">
                                    <img
                                      src="../../../assets/images/svg/ic_chance_of_rain_24.svg"
                                      alt=""
                                      width="16"
                                    />
                                    <p class="weekend">
                                      {{
                                        Math.round(day.precipProbability * 100)
                                      }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                              <template #default>
                                <FormTemperature
                                  :objTemperature="day"
                                ></FormTemperature>
                              </template>
                            </el-popover>
                          </li>
                        </ul>
                      </div>
                      <div
                        class="flex justify-between items-center w-full bor-top-end p-2 pad-option-hourly"
                      >
                        <div class="flex items-center">
                          <div>
                            <img
                              src="../../../assets/images/svg/ic_chance_of_rain.svg"
                              alt=""
                            />
                          </div>
                          <div class="txt_light_summer ml-2 color-rain">
                            <span>{{ $t("Chance_of_rain") }}</span>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div>
                            <img
                              src="../../../assets/images/svg/ic_chance_of_snow.svg"
                              alt=""
                            />
                          </div>
                          <div class="txt_light_summer ml-2 color-snow">
                            <span>{{ $t("Chance_of_snow") }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-full h-[calc(100%-831px)] bg-ads mt-4"></div>
                </div>

                <div class="w-[300px] h-full bg-ads"></div>
              </div>
              <div class="h-[380px] w-full flex gap-4">
                <!--  -->
                <div class="pad-form-radios bg-from w-full">
                  <!--  -->

                  <div
                    class="flex justify-center relative items-start pad-border-bottom"
                  >
                    <div class="flex w-full justify-between bg-white">
                      <p class="txt_medium txt-v2">
                        {{ renderCityName }} Weather Weekend
                      </p>
                      <el-popover
                        ref="popover"
                        placement="left"
                        :width="500"
                        trigger="click"
                      >
                        <template #reference>
                          <img
                            src="../../../assets/images/svg/gg_info.svg"
                            width="20"
                            alt=""
                          />
                        </template>

                        <template #default>
                          <div class="w-[480px] h-full">
                            <div class="txt_medium">
                              {{ renderCityName }} weather weekend
                            </div>
                            <p class="txt_light_14">
                              weather weekend map shows the location of
                              precipitation, its type (rain, snow, and ice) and
                              its recent movement to help you plan your day.
                              Simulated radar displayed over oceans, Central and
                              South American countries is generated from
                              satellite data, which is provided up to the
                              current time and may not be updated as frequently
                              as other regions.
                            </p>
                          </div>
                        </template>
                      </el-popover>
                    </div>
                  </div>
                  <!-- <div class="relative overflow-hidden w-full">
                    <WeatherList></WeatherList>
                    <LineChartTemp></LineChartTemp>
                    <LineChartRain></LineChartRain>
                  </div> -->
                  <div
                    class="flex justify-between items-center w-full bor-top-end p-2 pad-option-hourly"
                  >
                    <div class="flex items-center">
                      <div>
                        <img
                          src="../../../assets/images/svg/ic_chance_of_rain.svg"
                          alt=""
                        />
                      </div>
                      <div class="txt_light_summer ml-2 color-rain">
                        <span>{{ $t("Chance_of_rain") }}</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div>
                        <img
                          src="../../../assets/images/svg/ic_chance_of_snow.svg"
                          alt=""
                        />
                      </div>
                      <div class="txt_light_summer ml-2 color-snow">
                        <span>{{ $t("Chance_of_snow") }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BhDialogCancelRight from "@/control-ui/dialog/bh-dialog-cancel-right.vue";
import FormTemperature from "@/components/popover/form-temperature.vue";

//
// import LineChartRain from "@/components/home/30-day-forecast/LineChartRain.vue";
// import LineChartTemp from "@/components/home/30-day-forecast/LineChartTemp.vue";
// import WeatherList from "@/components/home/30-day-forecast/WeatherList.vue";

//
import VueHorizontal from "vue-horizontal";
//
import LineChartRain30day from "@/components/home/30-day-forecast/chartWeath30day/LineChartRain30day.vue";
import LineChartTemp30day from "@/components/home/30-day-forecast/chartWeath30day/LineChartTemp30day.vue";
import WeatherList30day from "@/components/home/30-day-forecast/chartWeath30day/WeatherList30day.vue";

import {
  getIconHourlyForecastTheme,
  fahrenheitToCelsius,
} from "../../../utils/converValue.js";
export default {
  name: "day-full-page",

  components: {
    // LineChartRain,
    // LineChartTemp,
    // WeatherList,
    // BhDialogCancelRight,
    FormTemperature,
    LineChartRain30day,
    LineChartTemp30day,
    WeatherList30day,
    VueHorizontal,
  },
  data() {
    return {
      days: [],
      stringName: "Chi tiết",
      isShowDialog: false,
      objTemperature: {},
    };
  },

  computed: {
    renderCalendar() {
      return this.$store.state.getWeather.listDaily30Day;
    },
    renderCurrently() {
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
  },

  mounted() {},

  methods: {
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();

      return day;
    },
    convertToShortToDay() {
      const today = new Date();

      return today.getDate();
    },

    getStyle(value) {
      if (this.convertToShortDay(value) === this.convertToShortToDay()) {
        return { backgroundColor: "rgba(148, 148, 148, 0.4)" };
      } else {
        return { backgroundColor: "transparent" };
      }
    },

    convertMonthYear(value) {
      const date = new Date(value * 1000);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${this.$t("month")} ${month} ${year}`;
    },

    convertIcon(value) {
      return getIconHourlyForecastTheme(value);
    },

    convertTemperature(value) {
      return fahrenheitToCelsius(value);
    },

    onClickViewDetailCalendar(value) {
      this.isShowDialog = true;
      this.objTemperature = value;
    },

    onCancelModel(value) {
      this.isShowDialog = value;
    },

    onHideModel(value) {
      this.isShowDialog = value;
    },
  },
};
</script>
<style lang="scss">
.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
}

.calendar .days {
  margin-bottom: 12px;
}

.calendar li {
  width: calc(100% / 7);
  font-size: 1.07rem;
}

.calendar .weeks li {
  font-weight: 500;
  cursor: default;
}

.calendar .days li {
  z-index: 1;
  cursor: pointer;
  position: relative;
  margin-top: 8px;
  padding: 6px;
  border-radius: 10px;
}

.days li.inactive {
  color: #aaa;
  opacity: 0;
}

.days li.active {
  color: #fff;
}

.days li.weekend {
  color: rgb(135 183 255);
}

.weekend {
  color: rgb(135 183 255);
}
.days li::before {
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  z-index: -1;
  border-radius: 10px;
  transform: translate(-50%, -50%);
}

.days li.active::before {
  background-color: rgba(148, 148, 148, 0.4);
}

.days li:not(.active):hover::before {
  background: rgba(78, 140, 232, 0.5);
}
</style>
