<template>
  <div class="w-[89rem] flex justify-between items-center">
    <div class="weather-item" v-for="(item, index) in paramHourly" :key="index">
      <!-- <span class="txt">{{ renderHourly(item).timestampValue }}</span> -->
      <div class="txt_regular_time text-center pb-4">
        {{ convertDirectionEmoji(item?.windBearing) }}
      </div>
      <div class="flex justify-center items-center">
        <div class="txt_regular_time pb-1">
          {{ renderHourly(item) }}
        </div>
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

      //   const iconValue = getIconHourlyForecastTheme(value.icon);
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const timestampValue =
        unitSetting.activeTime_save === "12h"
          ? convertTimestampToHoursMinutes12(value.time, 1, offsetValue)
          : convertTimestampToHoursMinutes(value.time, 1, offsetValue);
      return timestampValue;
    },
  },
};
</script>
