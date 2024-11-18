<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_moon.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Moonphase</p>
        </div>
      </template>
      <div class="w-full">
        <!--  -->

        <div class="flex items-center w-full">
          <div class="text-left w-[182px]">
            <div class="txt_medium">
              <span>{{ moonPhaseName }}</span>
            </div>
            <div class="txt_regular_des_moon_12 pt-1">
              <p v-html="formattedDate"></p>
            </div>
            <div class="mt-10">
              <div
                class="flex justify-between items-center txt_regular_des_moon_12 pt-1 pb-1"
              >
                <p>Illumination:</p>
                <p>{{ moonPhaseInfo.illumination }} %</p>
              </div>
              <!--  -->
              <div
                class="flex justify-between items-center txt_regular_des_moon_12 pt-1 pb-1"
              >
                <p>Moon rise:</p>
                <p>{{ moonPhaseInfo.moonrise }}</p>
              </div>
              <!--  -->
              <div
                class="flex justify-between items-center txt_regular_des_moon_12 pt-1 pb-1"
              >
                <p>Next full moon:</p>
                <p>{{ moonPhaseInfo.nextFullMoon }}</p>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col w-[calc(100%-182px)] justify-center items-center"
          >
            <div
              class="pb-5"
              :style="{ transform: `rotate(${rotationDegrees}deg)` }"
            >
              <GlobalMoonIcon
                :illuminate-percent="illuminate"
                :is-clip-from-start="true"
                :width="80"
                :height="80"
              >
              </GlobalMoonIcon>
            </div>
            <div class="wrapper">
              <div class="arrow">↓</div>
              <div class="container-moon hover:cursor-pointer" ref="container">
                <div
                  class="flex flex-row"
                  v-for="(dayData, index0) in next30DaysMoonPhases"
                  :key="index0"
                  :id="'child-' + index0"
                >
                  <div class="flex flex-col txt_regular_des_moon_12 mt-2">
                    <div class="child pt-1 pb-1">
                      <div
                        v-for="(item, index) in numberOfSubChildren"
                        :key="'child-' + index0 + '-sub-' + index"
                        :id="'child-' + index0 + '-sub-' + index"
                        class="sub-child"
                      >
                        <div
                          v-if="index % 24 === 0"
                          class="border border-white h-4"
                        ></div>
                        <div
                          v-else-if="index % 4 === 0"
                          class="border border-gray-500 h-3 opacity-70"
                        ></div>
                        <div
                          v-else
                          class="border border-white h-3 opacity-0"
                        ></div>
                      </div>
                    </div>
                    <!-- <p>{{ convertDayFull(dayData[0].dateFull) }}</p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";
import GlobalMoonIcon from "./global-moon-icon.vue";
import { getMoonPhase } from "../../../utils/moonPhase";
import {
  getWindDirectionEmojiFromDegrees,
  getWindDirectionFromDegrees,
  convertToShortDay,
} from "../../../utils/converValue";
import {
  Illumination,
  Body,
  Libration,
  EclipticGeoMoon,
  SearchRiseSet,
  Observer,
  Equator,
  Horizon,
  SearchMoonPhase,
} from "astronomy-engine";

export default {
  name: "moon-page",
  components: {
    BaseComponent,
    GlobalMoonIcon,
  },

  data() {
    return {
      numberOfSubChildren: 24,
      illuminate: 50,
      moonPhaseName: "Full Moon",
      dateFull: "Friday, August 2, 2024 06:00",
      rotationDegrees: 0,
      moonPhaseInfo: {
        moonPhaseName: "Waning Crescent",
        illumination: "5.57%",
        moonset: "23:23",
        moonrise: "--",
        nextFullMoon: "7 days",
        nextNewMoon: "21 days",
        distance: "403,253 km",
        altitude: "4.7°",
        azimuth: "90°",
      },
      next30DaysMoonPhases: [],
      currentDate: new Date(),
      isMouseDown: false,
      startX: 0,
      scrollLeft: 0,
    };
  },

  computed: {
    renderPosition() {
      return this.$store.state.weatherModule.cityCountry;
    },

    formattedDate() {
      const [date, time] = this.dateFull.split(" at ");
      return `${date}<br>At ${time}`;
    },
  },

  watch: {
    renderPosition(newValue) {
      this.calculateNext30DaysMoonPhases(newValue);
    },
  },

  methods: {
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
    convertDayFull(value) {
      return convertToShortDay(value);
    },
    getWindDirectionEmoji() {
      const azimuth = parseFloat(this.moonPhaseInfo.azimuth); // Ensure correct type
      return `${getWindDirectionFromDegrees(azimuth)} 
        ${getWindDirectionEmojiFromDegrees(azimuth)}`;
    },
    handleMouseDown(event) {
      this.isMouseDown = true;
      this.startX = event.pageX - this.$refs.container.offsetLeft;
      this.scrollLeft = this.$refs.container.scrollLeft;
    },
    handleMouseUp() {
      this.isMouseDown = false;
    },
    handleMouseMove(event) {
      if (!this.isMouseDown) return;
      const x = event.pageX - this.$refs.container.offsetLeft;
      const walk = x - this.startX;
      this.$refs.container.scrollLeft = this.scrollLeft - walk;
    },
    getMiddleSubChild() {
      const wrapperRect =
        this.$refs.container.parentElement.getBoundingClientRect();
      const middleX = wrapperRect.left + wrapperRect.width / 2;
      const children = this.$refs.container.querySelectorAll(".sub-child");

      for (let subChild of children) {
        const subChildRect = subChild.getBoundingClientRect();
        if (middleX >= subChildRect.left && middleX <= subChildRect.right) {
          return subChild;
        }
      }
      return null;
    },
    async calculateNext30DaysMoonPhases(value) {
      try {
        const dayDataList = [];
        for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
          const dayData = [];
          for (let hour = 0; hour < 24; hour++) {
            const date = new Date(this.currentDate);
            date.setDate(date.getDate() + dayOffset);
            date.setHours(hour, 0, 0, 0);

            const moonPhase = await getMoonPhase(date);

            const illum = Illumination(Body.Moon, date);
            let illumination = (illum.phase_fraction * 100).toFixed(2);

            const diamDeg = Libration(date).diam_deg;
            const midDiamDeg = (0.5383 + 0.4924) / 2;
            const rotation = 720 * (diamDeg - midDiamDeg);

            const moonDistance = EclipticGeoMoon(date).dist * 149600000;

            const latitude = value.latitude;
            const longitude = value.longitude;
            // const latitude = 80;
            // const longitude = -90;
            let observer = new Observer(latitude, longitude, 0.0);
            let resultMoonRise = SearchRiseSet(
              Body.Moon,
              observer,
              +1,
              date,
              1,
              0
            );

            if (resultMoonRise == null) {
              resultMoonRise = "--";
            } else {
              resultMoonRise = resultMoonRise.date;
              const formattedHours = resultMoonRise
                .getHours()
                .toString()
                .padStart(2, "0");
              const formattedMinutes = resultMoonRise
                .getMinutes()
                .toString()
                .padStart(2, "0");
              resultMoonRise = `${formattedHours}:${formattedMinutes}`;
            }

            let resultMoonSet = SearchRiseSet(
              Body.Moon,
              observer,
              -1,
              date,
              1,
              0
            );

            if (resultMoonSet == null) {
              resultMoonSet = "--";
            } else {
              resultMoonSet = resultMoonSet.date;

              const formattedHours = resultMoonSet
                .getHours()
                .toString()
                .padStart(2, "0");
              const formattedMinutes = resultMoonSet
                .getMinutes()
                .toString()
                .padStart(2, "0");
              resultMoonSet = `${formattedHours}:${formattedMinutes}`;
            }

            let equ_ofdate = Equator(Body.Moon, date, observer, true, true);
            let hor = Horizon(
              date,
              observer,
              equ_ofdate.ra,
              equ_ofdate.dec,
              "normal"
            );

            // Giả sử nextNewMoon là ngày mà bạn đã nhận được từ hàm SearchMoonPhase
            const nextFullMoon = SearchMoonPhase(180, date, 31);
            const nextNewMoon = SearchMoonPhase(0, date, 31);

            // Tính số ngày giữa ngày hiện tại và nextNewMoon
            const diffTimeNewMoon = nextNewMoon.date - date; // Sự khác biệt tính bằng mili giây
            const diffDaysNewMoon = Math.ceil(
              diffTimeNewMoon / (1000 * 60 * 60 * 24)
            ); // Chuyển đổi từ mili giây thành ngày

            // Tính số ngày giữa ngày hiện tại và nextNewMoon
            const diffTimeFullMoon = nextFullMoon.date - date; // Sự khác biệt tính bằng mili giây
            const diffDaysFullMoon = Math.ceil(
              diffTimeFullMoon / (1000 * 60 * 60 * 24)
            ); // Chuyển đổi từ mili giây thành ngày

            this.illuminate = illumination;
            this.moonPhaseInfo = {
              moonPhaseName: moonPhase.moonPhase,
              illumination: illumination,
              moonset: resultMoonSet,
              moonrise: resultMoonRise,
              nextFullMoon: diffDaysFullMoon - 1,
              nextNewMoon: diffDaysNewMoon - 1,
              distance: moonDistance.toFixed(3),
              altitude: hor.altitude.toFixed(1),
              azimuth: hor.azimuth.toFixed(0),
            };

            const formatterFull = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            const dateFull = formatterFull.format(date);

            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "short",
            });

            dayData.push({
              date: formattedDate,
              dateFull: dateFull,
              hour: date.getHours(),
              moonPhase: moonPhase.moonPhase,
              percentage: moonPhase.percentage,
              isLightFromStart: moonPhase.isLightFromStart,
              illumination: illumination,
              rotation: rotation,
              moonPhaseInfo: this.moonPhaseInfo,
            });
          }
          dayDataList.push(dayData);
        }
        this.next30DaysMoonPhases = dayDataList;
      } catch (error) {
        console.error("Lỗi khi tính toán pha mặt trăng:", error);
      }
    },
  },

  mounted() {
    this.container = this.$refs.container;
    if (this.renderPosition) {
      this.calculateNext30DaysMoonPhases(this.renderPosition);
    }

    this.container.addEventListener("mousedown", this.handleMouseDown);
    this.container.addEventListener("mouseup", this.handleMouseUp);
    this.container.addEventListener("mousemove", this.handleMouseMove);
    this.container.addEventListener("mouseleave", this.handleMouseUp); // Để xử lý trường hợp khi chuột ra ngoài phần tử

    this.$refs.container.addEventListener("scroll", () => {
      const middleSubChild = this.getMiddleSubChild();
      if (middleSubChild) {
        const parts = middleSubChild.id.split("-");
        const firstNumber = parseInt(parts[1], 10);
        const secondNumber = parseInt(parts[3], 10);
        this.illuminate =
          this.next30DaysMoonPhases[firstNumber][secondNumber].illumination;
        this.moonPhaseName =
          this.next30DaysMoonPhases[firstNumber][secondNumber].moonPhase;
        this.dateFull =
          this.next30DaysMoonPhases[firstNumber][secondNumber].dateFull;
        this.rotationDegrees =
          this.next30DaysMoonPhases[firstNumber][secondNumber].rotation;
        this.moonPhaseInfo =
          this.next30DaysMoonPhases[firstNumber][secondNumber].moonPhaseInfo;
      }
    });
  },

  beforeUnmount() {
    this.container.removeEventListener("mousedown", this.handleMouseDown);
    this.container.removeEventListener("mouseup", this.handleMouseUp);
    this.container.removeEventListener("mousemove", this.handleMouseMove);
    this.container.removeEventListener("mouseleave", this.handleMouseUp);
  },
};
</script>
<style lang="scss">
.wrapper {
  position: relative;
  width: 150px;
}

.container-moon {
  display: flex;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-left: calc(50%);
  padding-right: calc(50%);
}

.child {
  display: flex;
  width: 80px;
  justify-content: space-between;
}

.arrow {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  pointer-events: none;
  color: aqua;
}

.bg-moon {
  background-color: #190839;
}
</style>
