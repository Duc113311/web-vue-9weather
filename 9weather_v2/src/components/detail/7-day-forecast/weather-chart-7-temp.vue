<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <canvas id="chart_30_day" ref="canvas" height="120"></canvas>
    </div>
  </div>
</template>

<script>
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

// Đăng ký các scale và components cần thiết
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

import {
  fahrenheitToCelsiusNot,
  celsiusToFahrenheitNot,
} from "../../../utils/converValue.js";
export default {
  name: "weather-chart-7-temp",

  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    paramDailyData() {
      console.log("listDaily30Day", this.$store.state.getWeather.dailyData);

      return this.$store.state.getWeather.dailyData;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listDataMax() {
      const unitSetting = this.objectSetting;

      if (!this.paramDailyData || this.paramDailyData.length === 0) {
        return []; // Trả về mảng rỗng nếu paramDailyData chưa có giá trị
      }

      return this.paramDailyData.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? celsiusToFahrenheitNot(element.temperatureMax)
          : fahrenheitToCelsiusNot(element.temperatureMax)
      );
    },

    listDataMin() {
      const unitSetting = this.objectSetting;

      if (!this.paramDailyData || this.paramDailyData.length === 0) {
        return []; // Trả về mảng rỗng nếu paramDailyData chưa có giá trị
      }

      return this.paramDailyData.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? celsiusToFahrenheitNot(element.temperatureMin)
          : fahrenheitToCelsiusNot(element.temperatureMin)
      );
    },
  },

  watch: {
    paramDailyData(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          if (this.listDataMin.length !== 0 && this.listDataMax.length !== 0) {
            this.createChartWeather();
          }
        });
      }
    },
  },

  mounted() {
    if (this.paramDailyData && this.paramDailyData.length) {
      this.$nextTick(() => {
        if (this.listDataMin.length !== 0 && this.listDataMax.length !== 0) {
          this.createChartWeather();
        }
      });
    }
  },

  methods: {
    createChartWeather() {
      const minData = Math.min(...this.listDataMin);
      const maxData = Math.max(...this.listDataMax);
      console.log("minData", minData);
      console.log("maxData", maxData);

      const canvas = document.getElementById("chart_30_day");
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      var chart_30_day = Chart.getChart("chart_30_day");
      if (chart_30_day) {
        chart_30_day.destroy();
      }

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#d5c692");
      gradient.addColorStop(1, "#d5c69229"); // Nửa dưới trong suốt

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.listDataMax,
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
                color: "#C27021", // Thay đổi màu sắc của nhãn dữ liệu
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
                color: "#000000",
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
