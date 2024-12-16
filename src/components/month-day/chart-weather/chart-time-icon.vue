<template>
  <div class="w-[89rem] flex justify-between items-center">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->
      <div class="text-sm pb-1">{{ renderHourly(item).timestampValue }}</div>
      <div class="text-xs pb-1">{{ convertToShortDay(item.time) }}</div>

      <div class="flex justify-center items-center">
        <img :src="renderHourly(item).iconValue" alt="weather icon" />
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
<style lang="scss"></style>
