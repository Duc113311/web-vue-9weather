<template>
  <div class="chart-container" v-if="paramDailyData && paramDailyData.length">
    <div class="chart-wrapper">
      <canvas id="chart_7_day" ref="canvas" height="110"></canvas>
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
    paramDailyData() {
      return this.$store.state.getWeather.dailyData;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listDataMax() {
      const unitSetting = this.objectSetting;
      return this.paramDailyData.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element?.temperatureMax)
          : convertFtoC(element?.temperatureMax)
      );
    },
    listDataMin() {
      const unitSetting = this.objectSetting;
      return this.paramDailyData.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element?.temperatureMin)
          : convertFtoC(element?.temperatureMin)
      );
    },
  },

  watch: {
    paramDailyData(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          this.createChartWeather();
        });
      }
    },
  },

  mounted() {
    if (this.paramDailyData && this.paramDailyData.length) {
      this.$nextTick(() => {
        this.createChartWeather();
      });
    }
  },

  methods: {
    createChartWeather() {
      const canvas = document.getElementById("chart_7_day");
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      // var chart_7_day = Chart.getChart("chart_7_day");
      // if (chart_7_day) {
      //   chart_7_day.destroy();
      // }
      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#d5c692");
      gradient.addColorStop(0, "#d5c69229"); // Nửa dưới trong suốt

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
          datasets: [
            {
              label: "Temperature",
              borderColor: "#FADB38",
              pointBackgroundColor: "#C27021",
              borderWidth: 1,
              pointBorderColor: "#C27021",
              pointRadius: 3,
              backgroundColor: gradient,
              fill: false,
              data: this.listDataMax,
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
            {
              label: "Temperature2",
              borderColor: "#FADB38",
              pointBackgroundColor: "#C27021",
              borderWidth: 1,
              pointBorderColor: "#C27021",
              pointRadius: 3,
              backgroundColor: gradient,
              fill: "-1",
              data: this.listDataMin,
              datalabels: {
                display: true,
                align: "bottom",
                borderRadius: 3,
                font: {
                  size: 10,
                },
                color: "#003870",
                offset: 2,
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

.chart-wrapper {
  width: 100%; /* Đặt chiều rộng lớn hơn để kích hoạt cuộn ngang nếu cần */
}
</style>
