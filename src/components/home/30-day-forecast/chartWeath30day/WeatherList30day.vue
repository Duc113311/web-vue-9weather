<template>
  <div class="h-[60px] w-[4500px] flex justify-between items-center">
    <div
      class="weather-item"
      v-for="(item, index) in paramDailyData"
      :key="index"
    >
      <span class="underline">{{ renderHourly(item).timestampValue }}</span>
      <div class="text-xs pb-1">{{ convertToShortDay(item.time) }}</div>
      <img :src="renderHourly(item).iconValue" alt="weather icon" />
    </div>
  </div>
</template>

<script>
import {
  getIconHourlyForecastTheme,
  convertDayOfWeek,
} from "../../../../utils/converValue.js";
export default {
  name: "30DayWeatherList",
  data() {
    return {
      weatherData: [
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
        {
          time: "10",
          icon: require("../../../../assets/images/svg/ic_sun.svg"),
        },
      ],
    };
  },

  computed: {
    paramDailyData() {
      //   return this.$store.state.getWeather.dailyData;
      return this.$store.state.getWeather.listDaily30Day;
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
