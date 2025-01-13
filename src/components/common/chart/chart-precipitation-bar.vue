<template>
  <div class="w-[89rem] flex justify-between items-center p-chart-avg">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->
      <div class="flex justify-center items-center">
        <el-tooltip placement="top">
          <template #content>
            <div>
              <p>Custom Tooltip Content</p>
            </div>
          </template>
          <component :is="renderHourlyIcon(index)"></component>
        </el-tooltip>
      </div>
      <div class="txt_regular_14 pt-2 pb-1">
        {{ Math.round(item.precipIntensity) }} {{ unitPrecipitation }}
      </div>
    </div>
  </div>
</template>
<script>
import {
  codeToFind,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  getIconChartPrecipIntensity,
  getIconHourlyForecastTheme,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "chart-precipitation-bar",

  computed: {
    ...mapGetters("weatherModule", ["hourly24hGetters"]),
    paramHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    unitPrecipitation() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activePrecipitation_save);
    },
  },

  methods: {
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();

      return day;
    },
    renderHourlyIcon(value) {
      const iconValue = getIconChartPrecipIntensity(value);

      return iconValue;
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
.p-chart-avg {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
