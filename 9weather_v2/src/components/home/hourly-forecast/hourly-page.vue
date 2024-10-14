<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="flex justify-between items-start pad-border-bottom">
      <div
        :title="
          $t('Temperature_&_chance_of_rain_in_{name}_in_the_coming_hours', {
            name: renderCityName,
          })
        "
        class="txt_bold txt_color_uv text-left md:w-full w-[300px] text-nowrap overflow-hidden text-ellipsis"
      >
        <span>
          {{
            $t("Temperature_&_chance_of_rain_in_{name}_in_the_coming_hours", {
              name: renderCityName,
            })
          }}
        </span>
      </div>
      <div
        v-if="!isShowBtn"
        class="cursor-pointer"
        @click="onClickDetailHourly()"
      >
        <img
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          width="20"
          alt=""
        />
      </div>
    </div>
    <vue-horizontal
      responsive
      :displacement="0.7"
      class="w-full h-[calc(100%-60px)] relative horizontal"
    >
      <div>
        <HourlyWeatherList />
        <LineChartTemp />
        <LineChartRain />
      </div>
    </vue-horizontal>

    <div
      class="flex justify-between items-center w-full bor-top-end pad-option-hourly"
    >
      <div class="flex items-center">
        <div>
          <img src="../../../assets/images/svg/ic_chance_of_rain.svg" alt="" />
        </div>
        <div class="txt_regular_12 ml-2 color-rain">
          <span>{{ $t("Chance_of_rain") }}</span>
        </div>
      </div>
      <div class="flex items-center">
        <div>
          <img src="../../../assets/images/svg/ic_chance_of_snow.svg" alt="" />
        </div>
        <div class="txt_regular_12 ml-2 color-snow">
          <span>{{ $t("Chance_of_snow") }}</span>
        </div>
      </div>
    </div>
    <!--  -->

    <!--  -->
  </div>
</template>
<script>
// import LineChart from "./LineChart.vue";
import LineChartRain from "./LineChartRain.vue";
import LineChartTemp from "./LineChartTemp.vue";
import HourlyWeatherList from "./HourlyWeatherList.vue";
import VueHorizontal from "vue-horizontal";

export default {
  name: "hourly-page",
  components: {
    // LineChart,
    LineChartRain,
    LineChartTemp,
    HourlyWeatherList,
    VueHorizontal,
  },
  data() {
    return {};
  },

  props: {
    isShowBtn: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  methods: {
    onClickDetailHourly() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "hourly-forecast-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.horizontal >>> .v-hl-btn-prev {
  display: none !important;
  left: 10px !important;
}
.horizontal >>> .v-hl-btn-next {
  display: none !important;

  right: 10px !important;
}
.horizontal:hover >>> .v-hl-btn-prev {
  display: flex !important;
  left: 10px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 10px !important;
  opacity: 0.5;
}
/* .horizontal >>> .v-hl-btn-prev svg {
  width: 24px;
  height: 24px;
  opacity: 0.4;
  padding: 0px;
  margin: 0px;
}

.horizontal >>> .v-hl-btn-next svg {
  opacity: 0.4;
} */
</style>
