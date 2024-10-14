<template>
  <div class="h-[60px] w-[1550px] flex justify-between items-center">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <span class="txt">{{ renderHourly(item).timestampValue }}</span>
      <div class="flex w-[40px] justify-center items-center">
        <img :src="renderHourly(item).iconValue" alt="weather icon" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  convertTimestampToHoursMinutes,
  getIconHourlyForecastTheme,
  convertTimestampToHoursMinutes12,
} from "../../../utils/converValue";
export default {
  name: "WeatherList",
  data() {
    return {};
  },

  computed: {
    paramHourly() {
      return this.$store.state.getWeather.hourly;
    },
  },

  methods: {
    renderHourly(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const timestampValue =
        unitSetting.activeTime_save === "12h"
          ? convertTimestampToHoursMinutes12(value.time, 1, offsetValue)
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

<style scoped>
.weather-item {
  text-align: center;
  color: #003870;
}

.weather-item img {
  width: 24px;
  height: 24px;
}
</style>
