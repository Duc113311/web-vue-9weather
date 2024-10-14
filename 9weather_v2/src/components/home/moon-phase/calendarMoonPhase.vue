<template>
  <div class="wrapper w-full h-full">
    <header>
      <div class="txt_medium">{{ currentDate }}</div>
      <div class="icons">
        <span @click="changeMonth('prev')" class="material-symbols-rounded"
          >chevron_left</span
        >
        <span @click="changeMonth('next')" class="material-symbols-rounded"
          >chevron_right</span
        >
      </div>
    </header>
    <div class="calendar txt_light_summer">
      <ul class="weeks bor-bottom">
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
          v-for="(day, index) in days"
          :key="index"
          :class="{
            active: day.active,
            inactive: day.inactive,
            weekend: day.weekend,
          }"
        >
          <el-popover
            ref="popover"
            placement="right"
            :width="400"
            trigger="click"
            popper-style="background-color:#111533"
          >
            <template #reference>
              <div class="flex flex-col justify-center items-center gap-0.5">
                <span>{{ day.date }}</span>
                <MoonPhaseIconCanvas
                  :illuminate-percent="day.moonPhasePercentage"
                  :is-clip-from-start="true"
                  class="w-6 h-6 mb-1"
                />
                <span class="text-xs w-11/12 text-white">{{
                  day.moonPhase
                }}</span>

                <!-- details moonPhaseDetails -->
              </div>
            </template>
            <template #default>
              <div class="w-full h-full text-white">
                <div class="w-full h-full">
                  <h1 class="font-bold">DETAILS</h1>
                  <div class="w-full my-1 px-4">
                    <div class="bor-bottom"></div>
                  </div>
                  <!-- {{ day.infoMoonPhaseDay.moonPhaseName }} -->
                  <p>{{ converDateToString(day.infoMoonPhaseDay.date) }}</p>
                  <div class="w-full justify-center flex p-2">
                    <MoonPhaseIconCanvas
                      :illuminate-percent="
                        day.infoMoonPhaseDay.moonPhasePercentage
                      "
                      :is-clip-from-start="true"
                      :canvasWidth="80"
                      :canvasHeight="80"
                      class="my-1"
                    />
                  </div>
                  <div class="pb-2">
                    <table class="data">
                      <tr>
                        <th></th>
                        <th>
                          <div class="flex items-center justify-center gap-1">
                            <img
                              src="../../../assets/images/svg/ic_moon_top.svg"
                              alt=""
                              width="20"
                            />
                            <p>Sun rise</p>
                          </div>
                        </th>
                        <th>
                          <div class="flex items-center justify-center gap-1">
                            <img
                              src="../../../assets/images/svg/ic_moon_bottom.svg"
                              alt=""
                              width="20"
                            />
                            <p>Sun rise</p>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>{{ day.infoMoonPhaseDay.moonset }}</td>
                        <td>{{ day.infoMoonPhaseDay.moonrise }}</td>
                      </tr>
                      <tr>
                        <td>Altitude</td>
                        <td>{{ day.infoMoonPhaseDay.altitudeMoonRise }}°</td>
                        <td>{{ day.infoMoonPhaseDay.altitudeMoonSet }}°</td>
                      </tr>
                      <tr>
                        <td>Azimuth</td>
                        <td>
                          {{ day.infoMoonPhaseDay.azimuthMoonRise }}°
                          {{
                            getWindDirectionEmoji(
                              day.infoMoonPhaseDay.azimuthMoonRise
                            )
                          }}
                        </td>
                        <td>
                          {{ day.infoMoonPhaseDay.azimuthMoonSet }}°
                          {{
                            getWindDirectionEmoji(
                              day.infoMoonPhaseDay.azimuthMoonSet
                            )
                          }}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="w-full txt_light_summer">
                    <div class="flex justify-between w-full">
                      <div>Moon Sign:</div>
                      <div>{{ day.infoMoonPhaseDay.moonSign }}</div>
                    </div>
                    <div class="flex justify-between w-full">
                      <div>Next New Moon:</div>
                      <div>{{ day.infoMoonPhaseDay.nextNewMoon }} days</div>
                    </div>
                    <div class="flex justify-between w-full">
                      <div>{{ $t("Next_Full_Moon") }}:</div>
                      <div>{{ day.infoMoonPhaseDay.nextFullMoon }} days</div>
                    </div>
                    <div class="flex justify-between w-full">
                      <div>{{ $t("Illumination") }}:</div>
                      <div>{{ day.infoMoonPhaseDay.illumination }}%</div>
                    </div>
                    <div class="flex justify-between w-full">
                      <div>{{ $t("Distance") }}:</div>
                      <div>{{ day.infoMoonPhaseDay.distance }} km</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-popover>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MoonPhaseIconCanvas from "./MoonPhaseIconCanvas.vue";
import { getMoonPhase, getInfoMoonPhase } from "../../../utils/moonPhase";
import {
  getWindDirectionEmojiFromDegrees,
  getWindDirectionFromDegrees,
  formatDate,
} from "../../../utils/converValue";

export default {
  components: {
    MoonPhaseIconCanvas,
  },
  setup() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = ref(new Date());
    const currentDate = ref("");
    const days = ref([]);
    const dayDetailsIndex = ref(null);

    const renderCalendar = () => {
      const currYear = date.value.getFullYear();
      const currMonth = date.value.getMonth();

      const firstDayofMonth =
        (new Date(currYear, currMonth, 1).getDay() + 6) % 7;
      const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
      const lastDayofMonth = new Date(
        currYear,
        currMonth,
        lastDateofMonth
      ).getDay();
      const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

      let dayList = [];
      const infoMoonPhaseDay = getInfoMoonPhase(new Date(), 80, -90);
      for (let i = firstDayofMonth; i > 0; i--) {
        dayList.push({
          date: lastDateofLastMonth - i + 1,
          inactive: true,
          weekend: false,
          moonPhase: "full moon",
          moonPhasePercentage: 0,
          infoMoonPhaseDay: infoMoonPhaseDay,
        });
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        const isToday =
          i === new Date().getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear();
        const isWeekend =
          new Date(currYear, currMonth, i).getDay() === 0 ||
          new Date(currYear, currMonth, i).getDay() === 6;

        const infoMoonPhaseDay = getInfoMoonPhase(
          new Date(currYear, currMonth, i),
          80,
          -90
        );
        dayList.push({
          date: i,
          active: isToday,
          weekend: isWeekend,
          moonPhase: infoMoonPhaseDay.moonPhaseName,
          moonPhasePercentage: infoMoonPhaseDay.moonPhasePercentage,
          infoMoonPhaseDay: infoMoonPhaseDay,
        });
      }
      for (let i = lastDayofMonth; i < 6; i++) {
        dayList.push({
          date: i - lastDayofMonth + 1,
          inactive: true,
          weekend: false,
          moonPhase: "full moon",
          moonPhasePercentage: 0,
          infoMoonPhaseDay: infoMoonPhaseDay,
        });
      }

      currentDate.value = `${months[currMonth]} ${currYear}`;
      days.value = dayList;
    };

    const changeMonth = (direction) => {
      date.value = new Date(
        date.value.setMonth(
          date.value.getMonth() + (direction === "prev" ? -1 : 1)
        )
      );
      renderCalendar();
    };

    const showDetails = (index) => {
      dayDetailsIndex.value = index;
    };

    const hideDetails = () => {
      dayDetailsIndex.value = null;
    };
    const getWindDirectionEmoji = (azimuth) => {
      // Ensure correct type
      return `${getWindDirectionFromDegrees(azimuth)} 
        ${getWindDirectionEmojiFromDegrees(azimuth)}`;
    };
    const converDateToString = (date) => {
      return formatDate(date);
    };
    onMounted(() => {
      renderCalendar();
    });

    return {
      currentDate,
      days,
      changeMonth,
      dayDetailsIndex,
      showDetails,
      hideDetails,
      getWindDirectionEmoji,
      converDateToString,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

.wrapper {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.weeks li {
  padding: 6px;
}
.wrapper header {
  display: flex;
  align-items: center;
  padding: 0 12px;
  justify-content: space-between;
}

header .icons {
  display: flex;
}

header .icons span {
  height: 38px;
  width: 38px;
  margin: 0 1px;
  cursor: pointer;
  color: #878787;
  text-align: center;
  line-height: 38px;
  font-size: 1.9rem;
  user-select: none;
  border-radius: 50%;
}

.icons span:last-child {
  margin-right: -10px;
}

header .icons span:hover {
  background: #f2f2f2;
}

header .current-date {
  font-size: 1.45rem;
  font-weight: 500;
}

.calendar {
  padding: 12px;
}

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
  position: relative; /* Make sure tooltip is positioned correctly */
}

.calendar .weeks li {
  font-weight: 500;
  cursor: default;
}

.calendar .days li {
  cursor: pointer;
  position: relative;
  margin-top: 8px;
  padding: 6px;
}

.days li.inactive {
  color: #ae8f8f;
  opacity: 0;
}

.days li.active {
  color: #a086dd;
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
  background: rgba(114, 149, 202, 0.5);
}

.details-tooltip {
  position: absolute;
  /* bottom: -94px; */
  /* left: -106%; */
  transform: translateX(-65%);
  background-color: rgba(92, 92, 92, 1);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  z-index: 20;
  white-space: nowrap; /* Prevent text from wrapping */
}
/* ================================================================ */
.tableMoonPhase {
  background-color: #969696;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: white;
  overflow: hidden;
}
table {
  width: 100%;
  border-collapse: collapse;
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
</style>
