<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <IcMoonphase></IcMoonphase>
          <p class="txt_medium_14">{{ $t("moonphase") }}</p>
        </div>
      </template>
      <div class="w-full h-[183px]">
        <!--  -->

        <div class="flex items-center w-full relative h-full">
          <div class="text-left relative h-full w-[50%]">
            <div class="txt_medium_17 text-left">
              <span>{{ moonPhaseName }}</span>
            </div>
            <div class="txt_regular_12 pt-1">
              <p>{{ dateFull }}</p>
            </div>
            <div class="absolute bottom-0 w-full">
              <div
                class="flex w-full justify-between items-center txt_regular_12 pt-2 pb-2"
              >
                <p>{{ $t("moon_illumination") }}:</p>
                <p>{{ moonPhaseInfo.illumination }}</p>
              </div>
              <!--  -->
              <div
                class="flex justify-between items-center txt_regular_12 pt-2 pb-2"
              >
                <p>{{ $t("moonrise") }}:</p>
                <p>{{ convertTime(moonPhaseInfo.moonrise) }}</p>
              </div>
              <!--  -->
              <div
                class="flex justify-between items-center txt_regular_12 pt-2 pb-2"
              >
                <p>{{ $t("next_full_moon") }}:</p>
                <p>{{ moonPhaseInfo.nextFullMoon }} {{ $t("days") }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-center items-center w-[50%]">
            <!-- <GlobalMoonIcon
              :illuminate-percent="illuminate"
              :is-clip-from-start="true"
              :width="100"
              :height="100"
            >
            </GlobalMoonIcon> -->
            <div class="text-center">Coming soon</div>
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
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  getFormattedCurrentDate,
  convertTime12hTimeZoneNotNowUnit,
  convertTime24hTimeZoneNotNow,
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
import IcMoonphase from "@/components/icons/IcMoonphase.vue";

export default {
  name: "moon-page",
  components: {
    BaseComponent,
    IcMoonphase,
    // GlobalMoonIcon,
  },

  data() {
    return {
      numberOfSubChildren: 24,
      illuminate: 50,
      moonPhaseName: this.$t("Full_Moon"),
      dateFull: "Monday, December 16, 2024",
      rotationDegrees: 0,
      moonPhaseInfo: {
        moonPhaseName: "Waning Crescent",
        illumination: "5.57%",
        moonset: "23:23",
        moonrise: Math.floor(Date.now() / 1000),
        nextFullMoon: "7",
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
  },

  watch: {
    renderPosition(newValue) {
      this.calculateNext30DaysMoonPhases(newValue);
    },
  },

  methods: {
    convertTime(val) {
      const offsetValue =
        this.$store.state.weatherModule.locationOffset?.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTime12hTimeZoneNotNowUnit(val, 1, offsetValue);
      } else {
        return convertTime24hTimeZoneNotNow(val, 1, offsetValue);
      }
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
              resultMoonRise = new Date(resultMoonRise).getTime();
              // const formattedHours = resultMoonRise
              //   .getHours()
              //   .toString()
              //   .padStart(2, "0");
              // const formattedMinutes = resultMoonRise
              //   .getMinutes()
              //   .toString()
              //   .padStart(2, "0");
              // resultMoonRise = `${formattedHours}:${formattedMinutes}`;
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

            const formattedDate = date;

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
    this.dateFull = getFormattedCurrentDate();
    this.container = this.$refs.container;
    if (this.renderPosition) {
      this.calculateNext30DaysMoonPhases(this.renderPosition);
    }

    // this.container.addEventListener("mousedown", this.handleMouseDown);
    // this.container.addEventListener("mouseup", this.handleMouseUp);
    // this.container.addEventListener("mousemove", this.handleMouseMove);
    // this.container.addEventListener("mouseleave", this.handleMouseUp); // Để xử lý trường hợp khi chuột ra ngoài phần tử

    // this.$refs.container.addEventListener("scroll", () => {
    //   const middleSubChild = this.getMiddleSubChild();
    //   if (middleSubChild) {
    //     const parts = middleSubChild.id.split("-");
    //     const firstNumber = parseInt(parts[1], 10);
    //     const secondNumber = parseInt(parts[3], 10);
    //     debugger;
    //     this.illuminate =
    //       this.next30DaysMoonPhases[firstNumber][secondNumber].illumination;
    //     this.moonPhaseName =
    //       this.next30DaysMoonPhases[firstNumber][secondNumber].moonPhase;
    //     this.dateFull =
    //       this.next30DaysMoonPhases[firstNumber][secondNumber].dateFull;
    //     this.rotationDegrees =
    //       this.next30DaysMoonPhases[firstNumber][secondNumber].rotation;
    //     this.moonPhaseInfo =
    //       this.next30DaysMoonPhases[firstNumber][secondNumber].moonPhaseInfo;
    //   }
    // });
  },

  beforeUnmount() {
    // this.container.removeEventListener("mousedown", this.handleMouseDown);
    // this.container.removeEventListener("mouseup", this.handleMouseUp);
    // this.container.removeEventListener("mousemove", this.handleMouseMove);
    // this.container.removeEventListener("mouseleave", this.handleMouseUp);
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
