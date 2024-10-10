<template>
  <div class="flex justify-between w-full h-full">
    <div
      class="w-[49%] txt_light_summer h-full pad-form-radios bg-from mar-r card"
    >
      <div
        class="w-full txt_medium flex justify-between txt-v2 pt-2 pb-2 text-left"
      >
        <p>{{ $t("Moon_phase_infor") }}</p>
        <el-popover ref="popover" placement="left" :width="500" trigger="click">
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
                {{ renderCityName }} {{ $t("Moonphase") }}
              </div>
              <p class="txt_light_14">
                Weather radar map shows the location of precipitation, its type
                (rain, snow, and ice) and its recent movement to help you plan
                your day. Simulated radar displayed over oceans, Central and
                South American countries is generated from satellite data, which
                is provided up to the current time and may not be updated as
                frequently as other regions.
              </p>
            </div>
          </template>
        </el-popover>
      </div>
      <div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Illumination") }}</span>
          <span>{{ moonPhaseInfo.illumination }} %</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Moonset") }}</span>
          <span>{{ moonPhaseInfo.moonset }}</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Moonrise") }}</span>
          <span>{{ moonPhaseInfo.moonrise }}</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Next_Full_Moon") }}</span>
          <span>{{ moonPhaseInfo.nextFullMoon }}</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Next_New_Moon") }}</span>
          <span>{{ moonPhaseInfo.nextNewMoon }}</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Distance") }}</span>
          <span>{{ moonPhaseInfo.distance }}</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Altitude") }}</span>
          <span>{{ moonPhaseInfo.altitude }}°</span>
        </div>
        <div class="flex justify-between pt-1.5 pb-1.5">
          <span class="txt_regular">{{ $t("Azimuth") }}</span>
          <span
            >{{ moonPhaseInfo.azimuth }}° {{ getWindDirectionEmoji() }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="w-[50%] h-full p-4 flex justify-center items-center text-white bg-body-v2"
      :class="drawerClass"
    >
      <div class="flex flex-col justify-center items-center w-full pt-2">
        <div
          class="pb-4"
          :style="{ transform: `rotate(${rotationDegrees}deg)` }"
        >
          <MoonPhaseIconCanvas
            :illuminate-percent="illuminate"
            :is-clip-from-start="true"
            :width="200"
            :height="200"
          />
        </div>
        <div class="pb-4 txt_light_summer">
          <p>{{ moonPhaseName }}</p>
          <p>{{ dateFull }}</p>
        </div>
        <div class="wrapper">
          <div class="arrow">↓</div>
          <div class="container hover:cursor-pointer" ref="container">
            <div
              class="flex flex-row"
              v-for="(dayData, index0) in next30DaysMoonPhases"
              :key="index0"
              :id="'child-' + index0"
            >
              <div class="flex flex-col">
                <div class="child">
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
                    <div v-else class="border border-white h-3 opacity-0"></div>
                  </div>
                </div>
                {{ convertDayFull(dayData[0].dateFull) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MoonPhaseIconCanvas from "./MoonPhaseIconCanvas.vue";
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
  name: "HorizontalScroll",
  components: {
    MoonPhaseIconCanvas,
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
      return this.$store.state.getWeather.cityCountry;
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
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.container {
  display: flex;
  overflow-x: hidden;
  width: 100%;
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
</style>
