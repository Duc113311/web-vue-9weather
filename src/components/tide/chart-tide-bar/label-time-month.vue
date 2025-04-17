<template>
  <div
    class="chart-container-tempt flex p-chart-avg w-[1550px] pt-4 pb-4 pl-10"
  >
    <div
      class="w-[100px] flex items-center gap-2"
      v-for="(item, index) in extremesDataRenderTimeRender"
      :key="index"
    >
      <!-- <el-tooltip effect="dark" placement="bottom-end">
        <template #content>
          <div class="w-[200px]">
            <div>Hello</div>
          </div>
        </template>
        <div class="txt_regular_12">
          {{ convertDateTime(item) }}
        </div>
      </el-tooltip> -->

      <div class="txt_regular_12">
        {{ convertDateTime(item) }}
      </div>
    </div>
  </div>
</template>
<script>
import {
  formatDateToDayMonth,
  formatTo12HourTimeTide,
  formatTo24HourTimeTide,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "label-time-month",

  data() {
    return {
      shownDates: new Set(),
    };
  },

  computed: {
    ...mapGetters("tideModule", [
      "extremesDataFullGetters",
      "extremesDataGetters",
      "tideDataGetters",
    ]),
    extremesDataRenderTimeRender() {
      const data = this.extremesDataFullGetters;
      const objectClone = { ...data[0] };

      const timeClone = objectClone.datetime;
      const listDataTime = data.map((el) => {
        return el.datetime;
      });

      console.log("timeClone", [timeClone, ...listDataTime]);

      return [timeClone, ...listDataTime] || [];
    },

    extremesDataRenderTime() {
      const data = this.extremesDataFullGetters;
      const objectClone = { ...data[0] };
      console.log("data-extreme", data);

      return [objectClone, ...data] || [];
    },
  },

  methods: {
    convertDateTime(value) {
      // const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return formatDateToDayMonth(value);
    },
  },
};
</script>
<style lang=""></style>
