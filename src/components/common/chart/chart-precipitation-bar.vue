<template>
  <div class="w-[89rem] flex justify-between items-center pl-2">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->
      <div class="flex justify-center items-center">
        <component :is="renderHourlyIcon(item.precipIntensity)"></component>
      </div>
      <el-tooltip placement="top" popper-class="dark-tooltip">
        <template #content>
          <div class="cursor-pointer">
            <p>{{ convertTime(item?.time) }}</p>
            <div class="flex items-center gap-1">
              <div class="w-[10px] h-[10px] bg-precit"></div>
              <p>
                Precipitation:
                {{ item.precipIntensity === 0 ? "0.00" : item.precipIntensity }}
                {{ unitPrecipitation }}
              </p>
            </div>
          </div>
        </template>
        <div class="mt-1">
          <p class="txt_regular_14">
            {{ item.precipIntensity === 0 ? "0.00" : item.precipIntensity }}
          </p>
          <p class="txt_regular_12">{{ unitPrecipitation }}</p>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import {
  codeToFind,
  convertTimestamp12hSun,
  convertTimestamp24hSun,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  getIconChartPrecipIntensity,
  getIconHourlyForecastTheme,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "chart-precipitation",

  computed: {
    ...mapGetters("weatherModule", ["hourly24hGetters"]),
    paramHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    convertTimeMonth() {
      return this.paramHourly.map((item) => {
        const date = item.time;
        return this.convertTime(date);
      });
    },

    unitPrecipitation() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activePrecipitation_save);
    },
  },

  methods: {
    renderHourlyIcon(value) {
      const iconValue = getIconChartPrecipIntensity(value);

      return iconValue;
    },

    convertTime(val) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTime_save === "12h") {
        return convertTimestamp12hSun(val, 1, offsetValue, timezoneValue);
      } else {
        return convertTimestamp24hSun(val, 1, offsetValue);
      }
    },

    renderHourlyTime(value) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;

      //   const iconValue = getIconHourlyForecastTheme(value.icon);
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
      return timestampValue;
    },
  },
};
</script>
<style lang="scss">
.p-chart-avg-new {
  padding-left: 10x;
  padding-right: 10px;
}
</style>
