<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full flex items-center justify-between">
      <div class="flex justify-start items-center">
        <img src="../../../assets/images/svg/svg_ic_uv.xml.svg" alt="" />
        <div class="txt_bold ml-2 txt_color_uv">
          <span>{{ $t("Uv_Index") }}</span>
        </div>
      </div>

      <el-popover ref="popover" placement="right" :width="80" trigger="click">
        <template #reference>
          <img src="../../../assets/images/svg/gg_info.svg" alt="" />
        </template>

        <template #default>
          <div class="w-full h-full">
            <div>{{ $t("Uv_Index") }}</div>
          </div>
        </template>
      </el-popover>
    </div>

    <div class="w-full flex justify-start pad-option">
      <div class="text-left">
        <div class="txt_regular_title" :style="{ color: progressColor }">
          <span>{{ Math.round(paramCurrently?.uvIndex) }}</span>
        </div>
        <div class="txt_light" :style="{ color: progressColor }">
          <span>
            {{ convertUvIndexName(paramCurrently?.uvIndex) }}
          </span>
        </div>
      </div>
    </div>

    <div class="w-full relative">
      <el-progress
        :percentage="Math.round(paramCurrently?.uvIndex)"
        :stroke-width="5"
        :show-text="false"
        class="custom-progress"
      ></el-progress>
      <div class="progress-dot" :style="dotStyle"></div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import { useStore } from "vuex";

import { ref, computed } from "vue";
import { getUvSummaryName } from "../../../utils/converValue.js";
export default {
  name: "uv-total-page",

  data() {
    return {};
  },
  setup() {
    const store = useStore();

    const paramCurrently = computed(() => {
      return store.state.getWeather.currently;
    });
    const dotStyle = computed(() => ({
      left: `calc(${Math.round(paramCurrently.value.uvIndex)}%)`, // Adjust based on the size of the dot
    }));

    return {
      dotStyle,
      paramCurrently,
    };
  },

  computed: {
    progressColor() {
      return this.getColorFromPercentage(
        Math.round(this.paramCurrently?.uvIndex)
      );
    },
  },

  methods: {
    convertUvIndexName(val) {
      return getUvSummaryName(val);
    },

    getColorFromPercentage(percentage) {
      if (percentage <= 2) return "#507a46";
      if (percentage <= 5) return "#cbd956";
      if (percentage <= 7) return "#ecc32b";
      if (percentage <= 10) return "#f9b81d";
      return "#ff0dd3"; // Giá trị phần trăm từ 90 đến 100
    },
  },
};
</script>
<style lang="scss">
.custom-progress .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #507a46,
    #cbd956,
    #ecc32b,
    #f9b81d,
    #ffb317,
    #ff7360,
    #ff6272,
    #ff38a2,
    #ff0dd3
  );
  border-radius: 25px;
  overflow: hidden;
}
.el-progress-bar__inner {
  background-color: transparent !important;
}

.progress-dot {
  position: absolute;
  top: -2px;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transition: left 0.3s;
}
</style>
