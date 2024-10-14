<template>
  <div class="weather-list">
    <div
      class="weather-item"
      v-for="(item, index) in paramDailyData"
      :key="index"
    >
      <span>{{ renderHourly(item).timestampValue }}</span>
      <img :src="renderHourly(item).iconValue" alt="weather icon" />
    </div>
  </div>
</template>

<script>
import {
  getIconHourlyForecastTheme,
  convertDayOfWeek,
} from "../../../utils/converValue.js";
export default {
  name: "30DayWeatherList",
  data() {
    return {
      weatherData: [
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
        { time: "10", icon: require("../../../assets/images/svg/ic_sun.svg") },
      ],
    };
  },

  computed: {
    paramDailyData() {
      return this.$store.state.getWeather.dailyData;
    },
  },

  methods: {
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

<style scoped>
.weather-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #2c3e50; */
  padding: 10px;
  /* width: 1550px; */
}

.weather-item {
  text-align: center;
  color: #003870;
  /* border: 1px solid; */
}

.weather-item img {
  width: 24px;
  height: 24px;
}
</style>
