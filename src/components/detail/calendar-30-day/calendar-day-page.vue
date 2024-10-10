<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="w-full h-full">
      <div class="w-full h-full">
        <div class="w-full h-full flex gap-4">
          <!--  -->
          <div class="w-full">
            <!--  -->
            <div class="w-full flex justify-between items-center gap-2">
              <p class="txt_bold txt-v2">
                {{ $t("Temperature_{name}", { name: renderCityName }) }}
                {{ convertMonthYear(renderCurrently.time) }}
              </p>
            </div>
            <div class="flex justify-center items-center gap-4 pad-option-tb-8">
              <div class="flex items-center gap-2">
                <div
                  class="p-2 border w-[30px] h-[30px] flex justify-center items-center"
                >
                  <img
                    src="../../../assets/images/svg/v2/ic_temperature_v2_dark.svg"
                    alt=""
                    class="size-img"
                  />
                </div>
                <p class="txt_regular_14">{{ $t("Low") }}/{{ $t("High") }}</p>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="p-2 border w-[30px] h-[30px] flex justify-center items-center"
                >
                  <img
                    src="../../../assets/images/svg/ic_chance_of_rain.svg"
                    alt=""
                    class="size-img"
                  />
                </div>
                <p class="txt_regular_14">{{ $t("Humidity") }}</p>
              </div>
            </div>
            <div class="calendar">
              <ul class="weeks bor-bottom txt_regular_12 pt-2 pb-2">
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
                  v-for="(day, index) in adjustedCalendar"
                  :key="index"
                  :style="getStyle(day?.time)"
                >
                  <el-popover
                    ref="popover"
                    placement="right"
                    :width="400"
                    trigger="click"
                    v-if="day && day.time"
                  >
                    <template #reference>
                      <div
                        class="flex flex-col justify-center items-center gap-0.5 txt_light_14 rounded-xl"
                      >
                        <span class="txt_regular_14">{{
                          convertToShortDay(day.time)
                        }}</span>
                        <div>
                          <!-- <img :src="convertIcon(day.icon)" alt="" /> -->
                        </div>
                        <div class="flex items-center gap-1">
                          <img
                            src="../../../assets/images/svg/v2/ic_temperature_v2_dark.svg"
                            class="size-img"
                            alt=""
                          />
                          <p class="txt_regular_14">
                            {{ convertTemperature(day.temperatureMax) }}° /
                            {{ convertTemperature(day.temperatureMin) }}°
                          </p>
                        </div>

                        <div class="flex items-center gap-1">
                          <img
                            src="../../../assets/images/svg/ic_chance_of_rain_24.svg"
                            alt=""
                            class="size-img"
                          />
                          <p class="weekend txt_regular_14">
                            {{ Math.round(day.precipProbability * 100) }}%
                          </p>
                        </div>
                      </div>
                    </template>
                    <template #default>
                      <FormTemperature :objTemperature="day"></FormTemperature>
                    </template>
                  </el-popover>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTemperature from "@/components/popover/form-temperature.vue";
import {
  getIconHourlyForecastTheme,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  convertCtoF,
  convertFtoC,
} from "../../../utils/converValue.js";
export default {
  name: "calendar-day-page",

  components: {
    FormTemperature,
  },
  data() {
    return {
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

    adjustedCalendar() {
      if (!this.renderCalendar.length) return [];

      // Lấy ngày đầu tiên trong mảng dữ liệu
      const firstDay = new Date(this.renderCalendar[0].time).getDay();

      // Xác định số lượng ô trống cần thêm trước ngày đầu tiên
      const placeholders = Array.from({
        length: firstDay === 0 ? 6 : firstDay - 1,
      }).map(() => ({}));
      console.log("renderCalendar", [...placeholders, ...this.renderCalendar]);

      // Kết hợp các ô trống với dữ liệu hiện tại
      return [...placeholders, ...this.renderCalendar];
      // Trả về mảng đã được điều chỉnh
    },
  },

  mounted() {},

  methods: {
    convertIcon(value) {
      return getIconHourlyForecastTheme(value);
    },
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
    convertMonthYear(value) {
      const date = new Date(value * 1000);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${this.$t("month")} ${month} ${year}`;
    },

    getStyle(value) {
      if (this.convertToShortDay(value) === this.convertToShortToDay()) {
        return { backgroundColor: "rgba(148, 148, 148, 0.4)" };
      } else {
        return { backgroundColor: "transparent" };
      }
    },

    convertTemperature(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  color: rgb(36, 107, 212);
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
  background-color: rgb(195 190 221 / 40%);
}

.days li:not(.active):hover::before {
  background: rgba(78, 140, 232, 0.5);
}
</style>
