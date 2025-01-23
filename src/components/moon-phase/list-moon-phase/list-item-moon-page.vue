<template>
  <div class="w-full">
    <ItemComponent>
      <template v-slot:header>
        <div class="flex justify-between items-center">
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
            <div class="flex items-center txt_medium_14 text-left">
              <span>List Moon phase</span>
            </div>
          </div>
        </div>
      </template>

      <div class="w-full h-auto">
        <!--  -->
        <transition-group name="fade" tag="div" class="district-list">
          <CardMoonPage
            v-for="(item, index) in displayedItems"
            :key="`district-${index}`"
            :objectLocation="item"
          ></CardMoonPage>
        </transition-group>
        <div class="w-full text-left mt-3">
          <button
            type="button"
            @click="onClickLoadMoreItems"
            class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
          >
            <span class="txt_regular_12">
              {{ showLessButton ? $t("Hide") : $t("See_more") }}</span
            >
          </button>
        </div>
      </div>
    </ItemComponent>
  </div>
</template>
<script>
import CardMoonPage from "@/components/common/card/card-moon-page.vue";
import DistrictCardPage from "@/components/common/card/district-card-page.vue";
import ItemComponent from "@/components/common/itemComponent.vue";
import { capitalizeWords } from "@/utils/converValue";
import {
  decodeBase64,
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
  urlEncodeString,
} from "@/utils/EncoderDecoderUtils";
import { getInfoMoonPhase } from "@/utils/moonPhase";

// import removeAccents from "remove-accents";
import { ElNotification } from "element-plus";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "list-item-moon-page",

  components: {
    ItemComponent,
    // DistrictCardPage,
    CardMoonPage,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showLessButton: false,
      itemsPerPage: 8, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại

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
    };
  },

  setup() {
    const successUnit = () => {
      ElNotification({
        title: "District Ward",
        message: "Coming soon",
        type: "warning",
        position: "bottom-left",
      });
    };
    return {
      successUnit,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "breadcumsObjectGetters",
      "listAlabamaGetters",
      "objectCityByLocationGetters",
    ]),

    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    listCityAllData() {
      const retrievedArray = JSON.parse(sessionStorage.getItem("dataCityAll"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.listCityAllGetters;

      return resultData;
    },

    objectCityByLocationData() {
      const retrievedArray = JSON.parse(sessionStorage.getItem("dataCityLog"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.objectCityByLocationGetters;

      return resultData;
    },

    classThemeBg() {
      const themeValue = this.$store.state.commonModule.themeValue;
      const savedTheme = themeValue
        ? themeValue
        : localStorage.getItem("theme");
      if (savedTheme === "light") {
        return "bg-color-light";
      }
      return "bg-color-dark";
    },

    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.listMoonData.slice(0, end);
    },

    itemSliceCount() {
      if (this.windowWidth <= 567) {
        return 4; // Mobile
      } else if (this.windowWidth < 768) {
        return 4; // Tablet
      } else if (this.windowWidth < 1024) {
        return 6; // Tablet
      } else {
        return 8; // Desktop
      }
    },

    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },
  },

  mounted() {
    this.renderListCityAllGetters();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

    onClickLoadMoreItems() {
      if (this.showLessButton) {
        this.currentPage = 1; // Reset to show the initial items
        this.showLessButton = false;
      } else {
        this.currentPage++;
        this.showLessButton =
          this.currentPage * this.itemsPerPage >= this.listMoonData.length;
      }
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
      this.listMoonData = dayList;
    },

    async onClickShowDetailDistrict(value) {
      this.successUnit();
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
<style lang="scss">
.district-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
@media (max-width: 1024px) {
  .district-list {
    /* Adjust the max-width as needed for tablet */
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  }
}
</style>
