<template>
  <div class="w-full h-full">
    <BaseComponent :height="heightAuto" :is-show-pad="false">
      <template v-slot:header>
        <div class="flex items-center justify-between text-left gap-2">
          <div class="flex items-center gap-2">
            <img
              src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
              width="24"
              alt=""
            />
            <span class="txt_medium_14">{{ $t("Calendar") }}</span>
          </div>

          <div class="txt_regular_17">
            {{ onvertToShortMonth(renderCalendar[0]?.time) }}
          </div>
        </div>
      </template>

      <div class="w-full gap-4 grid">
        <div class="w-full">
          <div class="calendar">
            <ul class="weeks bor-bottom bg-title-calender p-2">
              <li class="txt_regular_14">{{ $t("Monday") }}</li>
              <li class="txt_regular_14">{{ $t("Tuesday") }}</li>
              <li class="txt_regular_14">{{ $t("Wednesday") }}</li>
              <li class="txt_regular_14">{{ $t("Thursday") }}</li>
              <li class="txt_regular_14">{{ $t("Friday") }}</li>
              <li class="weekend txt_regular_14">{{ $t("Saturday") }}</li>
              <li class="weekend txt_regular_14">{{ $t("Sunday") }}</li>
            </ul>
            <ul class="days p-4">
              <li
                v-for="(day, index) in adjustedCalendar"
                :key="index"
                :style="getStyle(day?.time)"
              >
                <el-popover
                  ref="popover"
                  placement="right"
                  :width="400"
                  trigger="none"
                  v-if="day && day.time"
                >
                  <template #reference>
                    <div
                      class="flex flex-col p-1 justify-start gap-1 txt_light_14 rounded-xl"
                    >
                      <span class="txt_regular_12 text-right">{{
                        convertToShortDay(day.time)
                      }}</span>
                      <div class="flex justify-between">
                        <img
                          :src="convertIconCurrently(day?.icon)"
                          width="20"
                          height="20"
                          class="object-cover"
                        />
                      </div>
                      <div>
                        <!-- <img :src="convertIcon(day.icon)" alt="" /> -->
                      </div>
                      <div class="flex justify-start items-center gap-1">
                        <!-- <img
                          src="../../../assets/images/svg/v2/ic_temperature_v2_dark.svg"
                          class="size-img"
                          alt=""
                        /> -->
                        <p class="txt_regular_12">
                          {{ convertTemperature(day.temperatureMax) }}° /
                          {{ convertTemperature(day.temperatureMin) }}°
                        </p>
                      </div>

                      <div class="flex items-center gap-0.5">
                        <img
                          src="../../../assets/images/svg_v2/ic_chance_of_rain_24.svg"
                          alt=""
                          width="14"
                        />
                        <p class="weekend txt_regular_12">
                          {{ Math.round(day.precipProbability * 100) }}%
                        </p>
                      </div>
                    </div>
                  </template>
                  <!-- <template #default>
                    <FormTemperature :objTemperature="day"></FormTemperature>
                  </template> -->
                </el-popover>
              </li>
            </ul>
          </div>
        </div>

        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import {
  convertCtoF,
  convertFtoC,
  convertTimestampToMonthYear,
  getIconHourlyForecastTheme,
} from "@/utils/converValue";

export default {
  name: "calendar-page",

  components: {
    BaseComponent,
  },
  data() {
    return {
      heightAuto: "auto",
    };
  },
  computed: {
    renderCalendar() {
      return this.$store.state.weatherModule.listDaily30Day;
    },

    adjustedCalendar() {
      if (!this.renderCalendar.length) return [];

      // Lấy ngày đầu tiên trong mảng dữ liệu
      const firstDay = new Date(this.renderCalendar[0].time).getDay();

      // Xác định số lượng ô trống cần thêm trước ngày đầu tiên
      const placeholders = Array.from({
        length: firstDay === 0 ? 6 : firstDay - 1,
      }).map(() => ({}));

      // Kết hợp các ô trống với dữ liệu hiện tại

      return [...placeholders, ...this.renderCalendar];
      // Trả về mảng đã được điều chỉnh
    },
  },

  methods: {
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

      return day;
    },
    onvertToShortMonth(value) {
      return convertTimestampToMonthYear(value);
    },

    convertToShortToDay() {
      const today = new Date();

      return today.getDate();
    },

    getStyle(value) {
      if (this.convertToShortDay(value) === this.convertToShortToDay()) {
        return {
          backgroundColor: "rgba(0, 98, 245, 0.25)",
          border: "2px solid #0062F5",
        };
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
<style lang="scss">
.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
}

// .calendar .days {
//   margin-bottom: 12px;
// }

.calendar li {
  width: calc(100% / 7);
  position: relative; /* Make sure tooltip is positioned correctly */
  border-radius: 10px;
}

.calendar .weeks li {
  cursor: default;
}

.calendar .days li {
  cursor: pointer;
  position: relative;
  // margin-top: 8px;
}

.days li.inactive {
  color: #ae8f8f;
  opacity: 0;
}

.days li.active {
  color: #a086dd;
}

.days li.weekend {
  color: #35d1de;
}

.weekend {
  color: #00e3f5;
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
  border-radius: 10px;
}

.days li:not(.active):hover::before {
  background: rgba(114, 149, 202, 0.5);
}

.bg-title-calender {
  background-color: #5b6c84;
}
</style>
