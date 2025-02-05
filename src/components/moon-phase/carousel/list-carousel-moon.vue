<template>
  <div class="w-full h-full flex gap-20-px">
    <div class="lg:w-[68%]">
      <div class="flex items-center text-left gap-2 pad-t-b">
        <IcMoonphase></IcMoonphase>
        <span class="txt_medium_14">{{ $t("Moon_phase_s") }}</span>
      </div>

      <el-carousel
        :interval="0"
        loop="false"
        type="card"
        height="230px"
        @change="onChangeMoon"
      >
        <el-carousel-item v-for="item in listMoonData" :key="item">
          <div class="text-center w-full">
            <p class="txt_medium_15">{{ item.moonPhase }}</p>
            <p class="txt_regular_14">{{ item.date }}/{{ item.monthDay }}</p>
          </div>
          <div class="flex justify-center items-center w-full h-full">
            <component
              :is="convertStringMoonIcon(item.moonPhase)"
              width="130"
              height="130"
            ></component>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="right-hourly w-[30%]">
      <div class="w-full">
        <FormMoonPage :objectMoonNew="objectMoon"></FormMoonPage>
      </div>
    </div>
  </div>
</template>
<script>
import IcFirstQuarter from "@/components/icons/moon-phase/IcFirstQuarter.vue";
import IcFullMoon from "@/components/icons/moon-phase/IcFullMoon.vue";
import IcNewMoon from "@/components/icons/moon-phase/IcNewMoon.vue";
import IcThirdQuarter from "@/components/icons/moon-phase/IcThirdQuarter.vue";
import IcWaningGibbous from "@/components/icons/moon-phase/IcWaningGibbous.vue";
import IcWaxingCrescent from "@/components/icons/moon-phase/IcWaxingCrescent.vue";
import { markRaw } from "vue";
import FormMoonPage from "../form-infor/form-moon-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { mapGetters } from "vuex";
import { getInfoMoonPhase } from "@/utils/moonPhase";
import IcWaxingGibbous from "@/components/icons/moon-phase/IcWaxingGibbous.vue";
import IcMoonphase from "@/components/icons/IcMoonphase.vue";

export default {
  name: "list-carousel-moon",

  components: {
    FormMoonPage,
    IcMoonphase,
  },

  data() {
    return {
      IcFullMoon: markRaw(IcFullMoon),
      IcFirstQuarter: markRaw(IcFirstQuarter),
      IcNewMoon: markRaw(IcNewMoon),
      IcThirdQuarter: markRaw(IcThirdQuarter),
      IcWaningGibbous: markRaw(IcWaningGibbous),
      IcWaxingCrescent: markRaw(IcWaxingCrescent),
      IcWaxingGibbous: markRaw(IcWaxingGibbous),

      currentDate: "",
      listMoonData: [],
      months: [
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
      ],

      objectMoon: {},
    };
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    currentlyData() {
      return this.currentlyGetters;
    },
  },

  methods: {
    convertStringMoonIcon(value) {
      const valueName = value.toString();

      switch (valueName) {
        case "Full Moon":
          return this.IcFullMoon;
        case "First Quarter":
          return this.IcFirstQuarter;
        case "New Moon":
          return this.IcNewMoon;
        case "Third Quarter":
          return this.IcThirdQuarter;
        case "Waning Gibbous":
          return this.IcWaningGibbous;
        case "Waxing Crescent":
          return this.IcWaxingCrescent;
        case "Waxing Gibbous":
          return this.IcWaxingGibbous;
        default:
          return this.IcFullMoon;
      }
    },

    rearrangeArray(arr, date, monthDay) {
      // Tìm vị trí của `number` trong mảng
      const index = arr.findIndex(
        (item) => item.date === date && item.monthDay === monthDay
      );

      if (index === -1) {
        return arr;
      }

      // Cắt mảng thành hai phần
      const part1 = arr.slice(index); // Từ `number + 1` đến cuối
      const part2 = arr.slice(0, index); // Từ đầu đến `number`

      // Ghép lại theo thứ tự mới
      return [...part1, ...part2];
    },
    renderListCityAllGetters() {
      const dateNew = new Date();
      const currYear = dateNew.getFullYear();
      const currMonth = dateNew.getMonth();
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

      // Ngày cuối của tháng trước
      for (let i = firstDayofMonth; i > 0; i--) {
        const monthDay = currMonth === 0 ? 12 : currMonth; // Tháng trước (1-12)

        dayList.push({
          date: lastDateofLastMonth - i + 1,
          inactive: true,
          monthDay: monthDay,
          weekend: false,
          moonPhase: "Full Moon",
          moonPhasePercentage: 0,
          infoMoonPhaseDay: infoMoonPhaseDay,
        });
      }
      // Ngày trong tháng hiện tại
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
        const monthDay = currMonth + 1; // Tháng hiện tại (1-12)

        dayList.push({
          date: i,
          monthDay: monthDay,
          active: isToday,
          weekend: isWeekend,
          moonPhase: infoMoonPhaseDay.moonPhaseName,
          moonPhasePercentage: infoMoonPhaseDay.moonPhasePercentage,
          infoMoonPhaseDay: infoMoonPhaseDay,
        });
      }

      // Ngày đầu của tháng sau
      for (let i = lastDayofMonth; i < 6; i++) {
        const monthDay = currMonth === 11 ? 1 : currMonth + 2; // Tháng sau (1-12)
        dayList.push({
          date: i - lastDayofMonth + 1,
          monthDay: monthDay,
          inactive: true,
          weekend: false,
          moonPhase: "Full Moon",
          moonPhasePercentage: 0,
          infoMoonPhaseDay: infoMoonPhaseDay,
        });
      }
      this.currentDate = `${this.months[currMonth]} ${currYear}`;

      const dateNow = new Date();
      const day = dateNow.getDate(); // 4
      const month = dateNow.getMonth() + 1;
      debugger;
      const findNumber = this.rearrangeArray(dayList, day, month);

      this.listMoonData = findNumber;
    },

    onChangeMoon(value) {
      debugger;
      this.objectMoon = this.listMoonData[value];
    },
  },

  async mounted() {
    // const date = new Date();
    // const day = date.getDate(); // Lấy ngày hiện tại
    // const month = date.getMonth() + 1; // Lấy tháng hiện tại (tháng bắt đầu từ 0)
    // const dateNow = day + "/" + month;
    await this.renderListCityAllGetters();

    // const findData = this.listMoonData.find(
    //   (x) => x.date === day && x.monthDay === month
    // );
    // if (findData) {
    //   this.objectMoon = findData;
    // }
    this.objectMoon = this.listMoonData[0];
  },
};
</script>
<style scoped>
.el-carousel__item {
  opacity: 0.4;
  transition: opacity 0.4s ease;
}

/* Hình ở giữa sẽ sáng */
.el-carousel__item.is-active {
  opacity: 1 !important;
}

/* Tùy chỉnh kích thước của carousel item */
:deep(.el-carousel__item) {
  background: none !important;
}

/* Tùy chỉnh khoảng cách giữa các items */
:deep(.el-carousel__container) {
  gap: 20px;
}

/* Bỏ background cho các item không active */
:deep(.el-carousel__item:not(.is-active)) {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* Xóa bỏ các style không cần thiết */
.el-carousel__item h3 {
  display: none;
}
</style>
