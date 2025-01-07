<template>
  <div class="w-[78rem] flex justify-between items-center p-chart-avg">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->
      <div class="txt_regular_14 pt-2 pb-1">
        {{ renderHourly(item).timestampValue }}
      </div>
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
  name: "chart-days",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["hourly24hGetters"]),
    paramHourly() {
      return this.hourly24hGetters;
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
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const timestampValue =
        unitSetting.activeTime_save === "12h"
          ? convertTimestampToHoursMinutes12(
              value.time,
              1,
              offsetValue,
              timezoneValue
            )
          : convertTimestampToHoursMinutes(value.time, 1, offsetValue);
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
.p-chart-avg {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
