<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <vue-horizontal
          :displacement="1"
          @slide="onSlide"
          class="w-full h-full relative horizontals pl-2 pr-6 pt-4"
        >
          <div class="w-full relative">
            <ChartDays></ChartDays>

            <div class="relative">
              <ChartTemperatureBar
                class="absolute top-0 z-20"
              ></ChartTemperatureBar>

              <ChartChanceOfRainBar
                class="absolute z-20 top-chance-rain-hourly"
              ></ChartChanceOfRainBar>

              <ChartPrecipitationBar
                class="absolute top-chart-pre-hourly z-10"
              ></ChartPrecipitationBar>
            </div>
          </div>
        </vue-horizontal>

        <div
          class="absolute w-full bottom-0 left-0 flex justify-between pad-t-b-10 pad-r-l-10"
        >
          <div class="flex items-center text-left gap-2">
            <div class="bg-temp-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_12">{{ $t("temperature") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rain-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_12">{{ $t("Chance_of_rain") }}</span>
          </div>
          <div class="flex items-center text-left gap-2">
            <div class="bg-rainfall-c rounded-full w-[15px] h-[15px]"></div>
            <span class="txt_regular_12">{{ $t("precipitation") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartChanceOfRainBar from "@/components/common/chart/chart-chance-of-rain-bar.vue";
import ChartDays from "@/components/common/chart/chart-days.vue";
import ChartPrecipitationBar from "@/components/common/chart/chart-precipitation-bar.vue";
import ChartTemperatureBar from "@/components/common/chart/chart-temperature-bar.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "chart-synthetic-hourly",

  components: {
    VueHorizontal,
    ChartChanceOfRainBar,
    ChartTemperatureBar,
    ChartDays,
    ChartPrecipitationBar,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    onSlide(index) {},
  },
};
</script>

<style scoped>
.horizontals >>> .v-hl-btn-prev {
  display: none !important;
  left: 10px !important;
}
.horizontals >>> .v-hl-btn-next {
  display: none !important;

  right: 10px !important;
}
.horizontals:hover >>> .v-hl-btn-prev {
  display: flex !important;
  left: 24px !important;
  opacity: 0.5;
}

.horizontals:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 24px !important;
  opacity: 0.5;
}

.bg-temp-c {
  background-color: #ffa60d;
}

.bg-rain-c {
  background-color: var(--bg-radio-chance-of-rain);
}

.bg-rainfall-c {
  background-color: #327cee;
}

.top-chance-rain-hourly {
  top: 158px;
}
.top-chart-pre-hourly {
  top: 170px;
}
</style>
