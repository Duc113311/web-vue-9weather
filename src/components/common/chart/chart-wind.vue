<template>
  <div class="w-[89rem] flex justify-between items-center p-chart">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->

      <div class="txt_regular_17 pt-2 pb-1">
        {{ renderHourly(item) }}
      </div>
      <div class="txt_regular_17 text-center">
        {{ convertDirectionEmoji(item?.windBearing) }}
      </div>
    </div>
  </div>
</template>
<script>
import {
  convertTimestampNow12,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  getIconHourlyForecastTheme,
  getWindDirectionEmojiFromDegrees,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "chart-wind",

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
    convertDirectionEmoji(windBearing) {
      return getWindDirectionEmojiFromDegrees(windBearing);
    },

    renderHourly(value) {
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
.p-chart {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
