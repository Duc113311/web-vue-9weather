<template>
  <div class="w-full">
    <BaseComponent :isShowPad="false">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_Air_quality.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p class="txt_medium_14">{{ $t("air_quality") }}</p>
        </div>
      </template>
      <div class="w-full h-[211px]">
        <!--  -->
        <div class="text-left pad-big">
          <div class="flex justify-between items-start">
            <div>
              <div class="txt_bold_24" v-if="apiValue">
                <span>{{ apiValue }}</span>
              </div>
              <div
                class="txt_regular_17 text-left"
                :style="{ color: progressColor }"
              >
                <span>{{ convertAirIndexName(paramAirModule) }}</span>
              </div>
              <span class="txt_regular_12">
                {{ convertAqiHealthyInformationInfo(paramAirModule) }}</span
              >
            </div>
            <el-popover placement="top" :width="200" trigger="hover">
              <template #reference>
                <img
                  src="../../../assets/images/svg_v2/ic_waring.svg"
                  alt=""
                  srcset=""
                />
              </template>
              <template #default>
                <div class="color_0D2952">
                  <div class="">
                    <p class="txt_medium_14">{{ titleRecommended }}</p>
                  </div>
                  <div class="text-left">
                    <span class="txt_regular_12">{{
                      convertAqiRecommendedPrecautionsInfo(110)
                    }}</span>
                  </div>
                </div>
              </template>
            </el-popover>
          </div>
        </div>

        <div class="w-full items-center gap-2">
          <div id="chart" class="w-full">
            <apexchart
              height="120"
              type="area"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import { decodeBase64 } from "@/utils/EncoderDecoderUtils";
import BaseComponent from "../baseComponent.vue";
import { ref, computed } from "vue";
import {
  getAirSummaryName,
  getAqiHealthyInformationInfo,
  getAqiRecommendedPrecautionsInfo,
} from "@/utils/converValue";
import { mapGetters } from "vuex";
import { useStore } from "vuex"; // Nhập useStore từ vuex

export default {
  name: "air-quality-page",
  components: {
    BaseComponent,
  },

  data() {
    return {
      titleRecommended: this.$t("Recommended_Precautions"),
    };
  },

  setup() {
    const series = ref([
      {
        name: "Air Quality Index",
        data: [280, 290, 270, 260, 280, 250, 290, 295, 280, 270], // Dữ liệu mẫu
      },
    ]);
    const store = useStore();
    const paramAir = computed(() => {
      return store.state.airQualityModule.apiValue;
    });

    const paramAirModule = computed(() => {
      const storageAir = paramAir.value;
      return storageAir;
    });

    const getColorFromPercentage = (percentage) => {
      if (percentage <= 50) return "#41E11F";
      if ((50 <= percentage) & (percentage <= 100)) return "#FCFF2F";
      if ((100 <= percentage) & (percentage <= 150)) return "#F68421";
      if ((150 <= percentage) & (percentage <= 200)) return "#F42E1C";
      if ((200 <= percentage) & (percentage <= 300)) return "#8C4396";
      return "#781125"; // Giá trị phần trăm từ 90 đến 100
    };

    const progressColor = computed(() => {
      return getColorFromPercentage(paramAirModule.value);
    });

    const chartOptions = ref({
      chart: {
        type: "area",
        toolbar: { show: false },
        sparkline: { enabled: true },
        offsetY: 0,
      },
      stroke: {
        curve: "smooth",
        width: 5,
        colors: [progressColor.value],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.4,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "#FFD700",
              opacity: 0.7,
            },
            {
              offset: 100,
              color: "#001f3f",
              opacity: 0.4,
            },
          ],
        },
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false },
        min: 0,
        max: 300, // Giới hạn trục y
        offset: 0,
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      tooltip: {
        enabled: false,
      },
    });

    return {
      series,
      chartOptions,
      progressColor,
      paramAirModule,
      getColorFromPercentage,
    };
  },

  computed: {
    ...mapGetters("airQualityModule", ["airObjectGetters", "apiValueGetters"]),

    apiValue() {
      return this.$store.state.airQualityModule.apiValue;
    },

    dotStyle() {
      return { left: `${(parseInt(this.paramAirModule) / 500) * 100}%` };
    },
  },

  methods: {
    convertAirIndexName(val) {
      return getAirSummaryName(val);
    },

    convertAqiHealthyInformationInfo(val) {
      return getAqiHealthyInformationInfo(val);
    },

    convertAqiRecommendedPrecautionsInfo(val) {
      return getAqiRecommendedPrecautionsInfo(val);
    },

    // getColorFromPercentage(percentage) {
    //   if (percentage <= 50) return "#9dc194";
    //   if (percentage <= 100) return "#cbd956";
    //   if (percentage <= 150) return "#ecc32b";
    //   if (percentage <= 200) return "#f9b81d";
    //   if (percentage <= 300) return "#ff6272";
    //   return "#ff38a2"; // Giá trị phần trăm từ 90 đến 100
    // },
  },
};
</script>
<style lang="scss">
.chart-container {
  margin: 0; /* Remove any margin */
  padding: 0; /* Remove any padding */
  overflow: hidden; /* Prevent overflow */
}
</style>
