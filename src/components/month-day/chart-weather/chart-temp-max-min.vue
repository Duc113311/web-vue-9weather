<template>
  <div
    class="chart-container w-[89rem] mt-2"
    v-if="paramHourly && paramHourly.length"
  >
    <div class="chart-wrapper w-full h-full">
      <canvas id="chart_tem_month" height="140" ref="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import { convertFtoC, convertCtoF } from "../../../utils/converValue.js";
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
  name: "chart-temp-max-min",
  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    paramHourly() {
      return this.$store.state.weatherModule.listDaily30Day;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listTemperatureDataMax() {
      const unitSetting = this.objectSetting;

      return this.paramHourly.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element.temperatureMax)
          : convertFtoC(element.temperatureMax)
      );
    },

    listTemperatureDataMin() {
      const unitSetting = this.objectSetting;

      return this.paramHourly.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element.temperatureMin)
          : convertFtoC(element.temperatureMin)
      );
    },
  },

  watch: {
    paramHourly(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          if (
            this.listTemperatureDataMin.length !== 0 &&
            this.listTemperatureDataMax.length !== 0
          ) {
            this.createChartMonthly();
          }
        });
      }
    },
  },

  mounted() {
    if (this.paramHourly && this.paramHourly.length) {
      this.$nextTick(() => {
        if (
          this.listTemperatureDataMin.length !== 0 &&
          this.listTemperatureDataMax.length !== 0
        ) {
          this.createChartMonthly();
        }
      });
    }
  },

  methods: {
    createChartMonthly() {
      const minData = Math.min(...this.listTemperatureDataMin);
      const maxData = Math.max(...this.listTemperatureDataMax);
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
      gradient.addColorStop(0, "rgba(245, 163, 0, 0.5)"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(1, "rgba(245, 212, 0, 0.1)"); // Màu dưới (#F5D400 với độ mờ 10%)

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...Array(30).keys()].map((i) => i + 1),
          datasets: [
            {
              label: "Temperature",
              borderColor: "#EC9D00",
              pointBackgroundColor: "#EC9D00",
              pointBorderWidth: 0, // Độ dày viền của điểm
              borderWidth: 2,
              pointBorderColor: "#EC9D00",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: false,
              data: this.listTemperatureDataMax,
              pointHoverRadius: 8, // Tăng kích thước khi hover
              datalabels: {
                display: true,
                align: "top",
                borderRadius: 1,
                font: {
                  size: 14,
                  //   weight: "bold", // Chỉnh độ đậm của chữ
                },
                color: "#EC9D00", // Thay đổi màu sắc của nhãn dữ liệu
                offset: 4,
                formatter: (value, context) => {
                  return `${value}°`;
                },
              },
            },
            {
              label: "Temperature",
              borderColor: "#00D354",
              pointBackgroundColor: "#00D354",
              pointBorderWidth: 0, // Độ dày viền của điểm
              borderWidth: 2,
              pointBorderColor: "#C27021",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: "-1",
              data: this.listTemperatureDataMin,
              pointHoverRadius: 8, // Tăng kích thước khi hover
              datalabels: {
                display: true,
                align: "bottom",
                borderRadius: 3,
                font: {
                  size: 14,
                },
                color: "#00D354",
                offset: 4,
                formatter: (value) => `${value}°`,
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          layout: {
            padding: 20,
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw; // Get the raw value
                  return `Temperature: ${value}°`; // Display value with percentage
                },
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
              min: minData - 1,
              max: maxData + 1,
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
        },
        plugins: [{}],
      });
    },
  },
};
</script>
<style lang="scss">
.chart-wrapper {
  width: 100%; /* Đặt chiều rộng lớn hơn để kích hoạt cuộn ngang nếu cần */
}
</style>
