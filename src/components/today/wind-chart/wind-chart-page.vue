<template>
  <div class="w-full h-full">
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <!--  -->
        <vue-horizontal
          responsive
          :displacement="0.7"
          class="w-full h-full relative horizontal"
        >
          <div>
            <ChartWind></ChartWind>
            <div
              class="chart-container w-[89rem]"
              v-if="listHourly && listHourly.length"
            >
              <canvas id="chart_hourly" height="310" ref="canvas"></canvas>
            </div>
          </div>
        </vue-horizontal>

        <div
          class="absolute w-full bottom-0 left-0 flex justify-end pad-t-b-10 pad-r-l-10"
        >
          <div class="flex items-center text-left gap-2">
            <div class="bg-wind rounded-full w-[10px] h-[10px]"></div>
            <span class="txt_regular_12">{{
              $t(`Wind_speed_{unit}`, {
                unit: objectSetting.activeWindSpeed_save,
              })
            }}</span>
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
  convertMiToBeaufortScale,
  convertMiToKm,
  convertMiToKnot,
  convertMPHtoMetPS,
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
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listWindSpeedData() {
      const unitSetting = this.objectSetting;

      return this.generateSeriesData(this.listHourly);
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

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#ffffff"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(1, "#878787"); // Màu dưới (#F5D400 với độ mờ 10%)

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...Array(24).keys()].map((i) => i + 1),
          datasets: [
            {
              label: "Wind speed",
              borderColor: "#e6e6e6",
              pointBackgroundColor: "#e6e6e6",
              borderWidth: 2,
              pointBorderColor: "#e6e6e6",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: true,
              data: this.listWindSpeedData,
              pointHoverRadius: 8, // Tăng kích thước khi hover
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 24,
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              display: true,
              align: "top",
              font: {
                size: 14,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
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
              max: 20,
            },
          },
          elements: {
            line: {
              tension: 0.5,
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
  background-color: #e6e6e6;
}
</style>
