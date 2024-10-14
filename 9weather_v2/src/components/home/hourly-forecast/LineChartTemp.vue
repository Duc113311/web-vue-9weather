<template>
  <div
    class="chart-container h-[80px]"
    v-if="paramHourly && paramHourly.length"
  >
    <div class="chart-wrapper">
      <canvas id="chart_hourly" ref="canvas" height="110"></canvas>
    </div>
  </div>
</template>
<script>
import { Chart } from "chart.js";

import { convertFtoC, convertCtoF } from "../../../utils/converValue.js";

export default {
  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    paramHourly() {
      return this.$store.state.getWeather.hourly;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listTemperatureData() {
      const unitSetting = this.objectSetting;

      return this.paramHourly.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element.temperature)
          : convertFtoC(element.temperature)
      );
    },
  },

  watch: {
    paramHourly(newData) {
      debugger;
      if (newData.length !== 0) {
        debugger;
        this.$nextTick(() => {
          this.createChartHourly24h();
        });
      }
    },
  },

  mounted() {
    debugger;
    if (this.paramHourly && this.paramHourly.length) {
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

      // var chart_hourly = Chart.getChart("chart_hourly");
      // if (chart_hourly) {
      //   chart_hourly.destroy();
      // }

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#d5c692");
      // gradient.addColorStop(1, "rgba(217, 217, 217, 0.4)");
      // gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.4)"); // Chuyển sang trong suốt
      gradient.addColorStop(0, "#d5c69229"); // Nửa dưới trong suốt

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...Array(24).keys()].map((i) => i + 1),
          datasets: [
            {
              label: "Temperature",
              borderColor: "#FADB38",
              pointBackgroundColor: "#C27021",
              borderWidth: 1,
              pointBorderColor: "#C27021",
              pointRadius: 3,
              backgroundColor: gradient,
              fill: true,
              data: this.listTemperatureData,
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
            },
            datalabels: {
              display: true,
              align: "top",
              borderRadius: 3,
              font: {
                size: 10,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: "#003870", // Thay đổi màu sắc của nhãn dữ liệu
              offset: 1,
              formatter: (value, context) => {
                return `${value}°`;
              },
            },
          },
          scales: {
            x: {
              display: false,
              title: {
                display: false,
                //   text: "Tháng",
              },
            },
            y: {
              display: false,
              title: {
                display: false,
                //   text: "Giá trị",
              },
              beginAtZero: true,
              // max: 110,
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

<style scoped>
.chart-container {
  width: 100%;
}
</style>
