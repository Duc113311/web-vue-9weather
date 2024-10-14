<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full flex items-center justify-between pad-border-bottom">
      <div class="flex justify-start items-center">
        <img src="../../../assets/images/svg/moon-phase.svg" alt="" />
        <div class="txt_bold ml-2 txt-v2">
          <span>{{ $t("Moonphase") }}</span>
        </div>
      </div>
      <div @click="onClickDetailMoonPhase()" class="cursor-pointer">
        <img
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          width="20"
          alt=""
        />
      </div>
    </div>

    <!--  -->
    <div class="flex pad-option-summer">
      <div class="w-full flex justify-between items-center">
        <!-- 2 -->
        <div
          v-for="(dayInfo, index) in next7DaysMoonPhases"
          :key="index"
          class="flex flex-col gap-2 items-center w-[100px]"
        >
          <div class="txt_medium_14">
            <span>{{ dayInfo.date }}</span>
          </div>
          <div class="flex justify-center bg-radios-moon">
            <!-- <img src="../../../assets/images/svg/ic_moon_phase_1.svg" alt="" /> -->
            <MoonPhaseIconCanvas
              :illuminate-percent="dayInfo.percentage"
              :is-clip-from-start="true"
            />
          </div>
          <div class="txt_regular_12">
            <span> {{ dayInfo.moonPhase }}</span>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>
<script>
import { getMoonPhase } from "../../../utils/moonPhase";
import MoonPhaseIconCanvas from "./MoonPhaseIconCanvas.vue";

export default {
  name: "moon-phase-page",
  components: {
    // LineChart,
    MoonPhaseIconCanvas,
  },
  data() {
    return {
      next7DaysMoonPhases: [],
      currentDate: new Date(),
    };
  },

  mounted() {
    this.calculateNext7DaysMoonPhases();
  },
  methods: {
    onClickDetailMoonPhase() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "moonphase-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
    getMoonPhase2() {
      const desiredDate = new Date(2024, 6, 22);
      // desiredDate = new Date('2024-07-20');
      // const desiredDate = ref(LocalDate.now());
      const result = getMoonPhase(desiredDate);
      // console.log(result);
    },
    isToday(date) {
      const today = new Date(); // Ngày hiện tại

      // So sánh ngày, tháng và năm của date với ngày hiện tại
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    async calculateNext7DaysMoonPhases() {
      try {
        const next7Days = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(this.currentDate);
          date.setDate(date.getDate() + i); // Calculate the date for each day in the next 7 days

          // Fetch moon phase information for the calculated date
          const moonPhaseInfo = await getMoonPhase(date);
          let formattedDate = "";
          if (this.isToday(date)) {
            formattedDate = this.$t("Today");
          } else {
            // Format the date to display as a short weekday name
            formattedDate = date.toLocaleDateString("en-US", {
              weekday: "short", // Display short weekday names like "Mon", "Tue", etc.
            });
          }

          // Push the formatted date and moon phase info into next7Days array
          next7Days.push({
            date: this.$t(formattedDate),
            moonPhase: moonPhaseInfo.moonPhase,
            percentage: moonPhaseInfo.percentage,
            isLightFromStart: moonPhaseInfo.isLightFromStart,
          });
        }

        // Assign the populated next7Days array to component property
        this.next7DaysMoonPhases = next7Days;

        // Log the populated next7DaysMoonPhases array to console
        // console.log("Next 7 Days Moon Phases:", this.next7DaysMoonPhases);
      } catch (error) {
        // Handle any errors that occur during moon phase calculation
        console.error("Error calculating moon phases:", error);
      }
    },
  },
};
</script>
<style lang="scss">
.bg-radios-moon {
  background-color: #412f63;
  border-radius: 16px;
}
</style>
