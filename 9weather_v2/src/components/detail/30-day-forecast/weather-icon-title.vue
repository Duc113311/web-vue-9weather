<template>
  <div class="h-[60px] w-[1550px] flex justify-between items-center">
    <div
      class="weather-item"
      v-for="(item, index) in paramDailyData"
      :key="index"
    >
      <span class="txt">{{ renderHourly(item).timestampValue }}</span>
      <div class="text-xs pb-1">{{ convertToShortDay(item.time) }}</div>
      <div class="flex w-[40px] justify-center items-center">
        <img :src="renderHourly(item).iconValue" alt="weather icon" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getIconHourlyForecastTheme,
  convertDayOfWeek,
} from "../../../utils/converValue";
export default {
  name: "weather-icon-title",

  data() {
    return {};
  },

  computed: {
    paramDailyData() {
      return this.$store.state.getWeather.listDaily30Day;
    },
  },

  mounted() {},

  methods: {
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();

      return day;
    },
    renderHourly(value) {
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
