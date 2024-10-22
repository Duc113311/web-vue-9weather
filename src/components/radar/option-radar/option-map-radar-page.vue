<template>
  <div class="w-full h-full">
    <!--  -->
    <vue-horizontal
      responsive
      :displacement="0.7"
      class="w-full relative horizontal"
    >
      <div
        class="w-full flex gap-3 h-auto mb-4 overflow-x-auto"
        style="scrollbar-width: thin"
      >
        <div
          class="w-[114px] h-[114px] bg-img bor-radios-big relative"
          v-for="(item, index) in listMap"
          :key="index"
          :style="{ 'background-image': `url(${item.urlImg})` }"
          @click="onClickActiveShowRadar(item, index)"
          :class="{ 'active-bg': isShowActive === index }"
        >
          <!--   -->
          <div class="text-center absolute top-0 left-0 bg-color-title">
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </vue-horizontal>

    <!--  -->

    <ListCountryPage></ListCountryPage>
  </div>
</template>
<script>
import ListCountryPage from "@/components/today/country/list-country-page.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "option-map-radar-page",

  components: {
    ListCountryPage,
    VueHorizontal,
  },
  data() {
    return {
      isShowActive: 0,
      listMap: [
        {
          title: "Temperature",
          codeOverlay: "temp",
          urlImg: require("../../../assets/images/svg_v2/ic_temp_radar.svg"),
        },
        {
          title: "Humidity",
          codeOverlay: "humidity",
          urlImg: require("../../../assets/images/svg_v2/ic_humid_radar.svg"),
        },
        {
          title: "Rain",
          codeOverlay: "rain",
          urlImg: require("../../../assets/images/svg_v2/ic_rain_radar.svg"),
        },
        {
          title: "Cloudy",
          codeOverlay: "clouds",
          urlImg: require("../../../assets/images/svg_v2/ic_cloudy_radar.svg"),
        },
        {
          title: "Pressure",
          codeOverlay: "pressure",
          urlImg: require("../../../assets/images/svg_v2/ic_pressure_radar.svg"),
        },
        {
          title: "Snow",
          codeOverlay: "snow",
          urlImg: require("../../../assets/images/svg_v2/ic_snows_radar.svg"),
        },
        {
          title: "Speed",
          codeOverlay: "wind",
          urlImg: require("../../../assets/images/svg_v2/ic_snows_radar.svg"),
        },
      ],
    };
  },

  methods: {
    onClickActiveShowRadar(value, index) {
      this.isShowActive = index;
      this.$emit("onStateValueMap", value.codeOverlay);
    },
  },
};
</script>
<style lang="scss">
.bg-img {
  width: 114px;
  height: 114px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  overflow: hidden;
  cursor: pointer;
}

.bg-color-title {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  color: #ffffff;
  padding: 6px;
}

.active-bg {
  border: 4px solid #0062f5;
}

/* Optional: Custom styling for scrollbar */
.horizontal::-webkit-scrollbar {
  height: 6px; /* Height of horizontal scrollbar */
}
.horizontal::-webkit-scrollbar-thumb {
  background-color: #888; /* Scrollbar color */
  border-radius: 10px;
}
.horizontal::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
