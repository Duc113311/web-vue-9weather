<template>
  <div class="w-full h-full">
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <!--  -->
        <vue-horizontal
          responsive
          :displacement="0.8"
          class="w-full h-[calc(100%-40px)] relative horizontal"
        >
          <div class="w-full h-full relative">
            <ChartWind class="h-[40px]"></ChartWind>

            <div class="h-[calc(100%-40px)] w-full">
              <div
                class="chart-container-win h-full w-[1550px] p-chart-avg"
                v-if="listHourly && listHourly.length"
              >
                <canvas id="chart_hourly" class="h-full" ref="canvas"></canvas>
              </div>
            </div>
          </div>
        </vue-horizontal>

        <div class="w-full h-[40px] flex justify-between pad-t-b-10 pad-r-l-10">
          <div class="w-full flex justify-between items-center">
            <div class="flex items-center gap-1">
              <div class="bg-wind rounded-full w-[10px] h-[10px]"></div>
              <div class="txt_regular_12">
                <p>Wind speed:</p>
              </div>
              <div class="flex items-center gap-0.5">
                <p class="txt_medium_15">
                  {{ this.generateSeriesDataObject(objectCurrently) }}
                </p>
                <p class="txt_regular_12">({{ convertUnitPressure() }})</p>
              </div>
              <p class="txt_medium_15">
                {{ convertWindBearing(objectCurrently?.windBearing) }}
              </p>
            </div>
            <div class="flex items-center text-left gap-2">
              <span
                class="txt_regular_12"
                v-if="breadcumsObjectValue?.country_key?.toLowerCase() === 'vn'"
              >
                {{
                  $t(
                    `city.city_${languageParam}.${convertToLowCase(
                      breadcumsObjectValue?.city_key
                    )}`
                  )
                }}, {{ breadcumsObjectValue?.country }}</span
              >
              <span v-else class="txt_regular_12">
                {{ breadcumsObjectValue.state }},
                {{ breadcumsObjectValue?.country }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartWind from "@/components/common/chart/chart-wind.vue";
import VueHorizontal from "vue-horizontal";

import {
  codeToFind,
  convertMiToBeaufortScale,
  convertMiToKm,
  convertMiToKnot,
  convertMPHtoMetPS,
  convertTimestamp12hSun,
  convertTimestamp24hSun,
  getWindDirectionFromDegrees,
} from "@/utils/converValue";

import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  LineController,
  ChartDataLabels
);

import ChartDataLabels from "chartjs-plugin-datalabels";
import { mapGetters } from "vuex";

export default {
  name: "wind-chart-page",

  components: { ChartWind, VueHorizontal },
  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "listCityAllGetters",
    ]),
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    objectCurrently() {
      return this.$store.state.weatherModule.currently;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listWindSpeedData() {
      const unitSetting = this.objectSetting;

      return this.generateSeriesData(this.listHourly);
    },

    breadcumsObjectValue() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },
  },

  watch: {
    listHourly(newValue) {
      if (newValue.length !== 0) {
        this.$nextTick(() => {
          this.createChartHourly24h();
        });
      }
    },
  },

  mounted() {
    if (this.listHourly && this.listHourly.length) {
      this.$nextTick(() => {
        this.createChartHourly24h();
      });
    }
  },

  methods: {
    convertUnitPressure() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activeWindSpeed_save);
    },
    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
    convertWindBearing(value) {
      return getWindDirectionFromDegrees(value);
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

    createChartHourly24h() {
      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);

      // Màu bắt đầu: Xanh đậm (đậm nhất)
      gradient.addColorStop(0, "rgba(14, 41, 80, 1)"); // #0E2950 với alpha = 1 (đậm)

      // Màu trung gian: Xanh nhạt dần
      gradient.addColorStop(0.5, "rgba(14, 41, 80, 0.3)"); // Alpha = 0.3 (nhạt)

      // Gần cuối: Rất nhạt
      gradient.addColorStop(0.7, "rgba(14, 41, 80, 0)"); // Alpha = 0.05 (rất mờ)
      gradient.addColorStop(0.6, "rgba(14, 41, 80, 0)"); // Alpha = 0.05 (rất mờ)

      // Màu kết thúc: Hoàn toàn trong suốt
      gradient.addColorStop(1, "rgba(14, 41, 80, 0)"); // Alpha = 0 (trong suốt)

      const labelList = this.listHourly.map((item) => {
        const date = item.time;
        return this.convertTime(date);
      });

      const maxWindSpeedData = Math.max(...this.listWindSpeedData);

      const unitSetting = this.objectSetting.activeWindSpeed_save;

      const savedTheme = localStorage.getItem("theme") || "light";

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelList,
          datasets: [
            {
              label: "Wind speed",
              borderColor: "#0E2950",
              pointBackgroundColor: "#0E2950",
              borderWidth: 2,
              pointBorderColor: "#0E2950",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: true,
              data: this.listWindSpeedData,
              pointHoverRadius: 4, // Tăng kích thước khi hover
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 0, // Chỉ định padding phía trên
              bottom: 0, // Chỉ định padding phía dưới
              left: 18,
              right: 18,
            },
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
              theme: "dark",
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || "";
                  return `${label}: ${value} ${unitSetting}`; // Thông tin khi hover
                },
              },
            },
            datalabels: {
              display: true,
              align: "top",
              font: {
                size: 14,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: savedTheme === "light" ? "#333333" : "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
              formatter: (value, context) => {
                return `${this.formatWindSpeed(value)}`;
              },
            },
          },
          scales: {
            x: {
              display: false,

              ticks: {
                stepSize: 2, // Điều chỉnh số lượng điểm hiển thị trên trục x
              },
            },
            y: {
              display: false,
              beginAtZero: true,
              max: maxWindSpeedData + 4,
              min: 0,
            },
          },
          elements: {
            line: {
              tension: 0.3,
            },
          },
        },
        plugins: [{}],
      });
    },

    formatWindSpeed(windSpeed) {
      // Kiểm tra nếu là số nguyên thì thêm ".00"
      if (Number.isInteger(windSpeed)) {
        return windSpeed.toFixed(2); // Thêm 2 chữ số thập phân
      }
      return windSpeed.toString(); // Giữ nguyên nếu đã có phần thập phân
    },

    generateSeriesDataObject(item) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeWindSpeed_save === "m/s") {
        return convertMPHtoMetPS(item.windSpeed);
      }
      if (unitSetting.activeWindSpeed_save === "km/h") {
        return convertMiToKm(item.windSpeed);
      }
      if (unitSetting.activeWindSpeed_save === "mi/h") {
        return item.windSpeed;
      }
      if (unitSetting.activeWindSpeed_save === "knot") {
        return convertMiToKnot(item.windSpeed);
      }
      if (unitSetting.activeWindSpeed_save === "bft") {
        return convertMiToBeaufortScale(item.windSpeed);
      }
    },
    generateSeriesData(data) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return data.map((item) => {
        if (unitSetting.activeWindSpeed_save === "m/s") {
          return convertMPHtoMetPS(item.windSpeed);
        }
        if (unitSetting.activeWindSpeed_save === "km/h") {
          return convertMiToKm(item.windSpeed);
        }
        if (unitSetting.activeWindSpeed_save === "mi/h") {
          return item.windSpeed;
        }
        if (unitSetting.activeWindSpeed_save === "knot") {
          return convertMiToKnot(item.windSpeed);
        }
        if (unitSetting.activeWindSpeed_save === "bft") {
          return convertMiToBeaufortScale(item.windSpeed);
        }
      });
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
  left: 24px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 24px !important;
  opacity: 0.5;
}
.bg-wind {
  background-color: #0e2950;
}
</style>
