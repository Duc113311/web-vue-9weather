<template>
  <div class="w-[1550px] flex justify-between items-center">
    <div
      class="weather-item w-[44px]"
      v-for="(item, index) in paramHourly"
      :key="index"
    >
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->
      <div class="txt_regular_12">
        {{ renderHourly(item).timestampValue }}
      </div>
      <div class="txt_regular_12">{{ convertToShortDay(item.time) }}</div>

      <div class="flex justify-center items-center">
        <component :is="renderHourly(item).iconValue" width="18"></component>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getIconHourlyForecastTheme,
  convertDayOfWeek,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertTimestampNow12,
} from "../../../utils/converValue";
export default {
  name: "chart-time-icon",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["listDaily30DayGetters"]),
    paramHourly() {
      return this.listDaily30DayGetters;
    },
  },

  methods: {
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();

      return day;
    },
    renderHourly(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      const timestampValue = convertDayOfWeek(value.time);
      const iconValue = getIconHourlyForecastTheme(value.icon);

      return {
        timestampValue: timestampValue,
        iconValue: iconValue,
      };
    },
  },
};
</script>
<style lang="scss">
.p-chart-avg-new {
  padding-left: 20x;
  padding-right: 20px;
}
</style>
