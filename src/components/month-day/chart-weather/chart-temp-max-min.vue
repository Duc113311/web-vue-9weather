<template>
  <div
    class="chart-container-tempt w-[1550px] p-chart-avg"
    v-if="paramHourly && paramHourly.length && listTemperatureData.length"
  >
    <div class="chart-wrapper-tempt w-full h-full">
      <canvas id="chart_hourly" ref="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import {
  convertFtoC,
  convertCtoF,
  convertMillimet,
  convertMillimetToInch,
  codeToFind,
  convertTimestamp12hSun,
  convertTimestamp24hSun,
  convertDayOfWeek,
} from "../../../utils/converValue.js";
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

    listTemperatureData() {
      const unitSetting = this.objectSetting;

      return this.paramHourly.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element.temperatureMax)
          : convertFtoC(element.temperatureMax)
      );
      // return [0, 1, 5, 10, 0, 100, 4, 100, 26, 49, 0];
    },

    listTemperatureMin() {
      const unitSetting = this.objectSetting;

      return this.paramHourly.map((element) =>
        unitSetting.activeTemperature_save === "f"
          ? convertCtoF(element.temperatureMin)
          : convertFtoC(element.temperatureMin)
      );
      // return [0, 1, 5, 10, 0, 100, 4, 100, 26, 49, 0];
    },
  },

  props: {
    heightValue: {
      type: String,
      default: "90",
    },
  },

  watch: {
    paramHourly(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          this.createChartHourly24h();
        });
      }
    },
  },

  mounted() {
    if (this.paramHourly && this.paramHourly.length) {
      this.$nextTick(() => {
        this.createChartHourly24h();
      });
    }
  },

  methods: {
    convertTime(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();
      const year = dateNew.getFullYear();
      const timestampValue = convertDayOfWeek(value);
      return timestampValue + " " + day + " " + year;
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

      // Lấy giá trị nhỏ nhất trong dữ liệu và giảm thêm padding
      const minDataValue = Math.min(...this.listTemperatureData);
      const maxDataValue = Math.max(...this.listTemperatureData);

      const minDataValueMin = Math.min(...this.listTemperatureMin);
      const maxDataValueMin = Math.max(...this.listTemperatureMin);

      // Tạo gradient Temperature Dark Max
      const gradientTemperatureDark = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      );
      gradientTemperatureDark.addColorStop(0, "rgba(245, 163, 0, 1)"); // 100% độ mờ
      gradientTemperatureDark.addColorStop(0.7, "rgba(245, 163, 0, 0)"); // Gần với màu nền, hoàn toàn trong suốt
      gradientTemperatureDark.addColorStop(1, "rgba(245, 163, 0, 0)"); // Gần với màu nền, hoàn toàn trong suốt

      // Tạo gradient Temperature Dark
      const gradientTemperatureLight = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      );
      gradientTemperatureLight.addColorStop(0, "rgba(245, 163, 0, 0.5)"); // Màu vàng cam (#F5A300) với độ mờ 50%
      gradientTemperatureLight.addColorStop(0, "rgba(245, 163, 0, 0.2)"); // Màu vàng cam (#F5A300) với độ mờ 50%
      gradientTemperatureLight.addColorStop(1, "rgba(255, 255, 255, 0)"); // Màu trắng (#FFFFFF) với độ mờ 0%

      // Tạo gradient Temperature Dark Min
      const gradientTemperatureDarkMin = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      );
      gradientTemperatureDarkMin.addColorStop(0, "rgba(0, 211, 84, 1)"); // 100% độ mờ
      gradientTemperatureDarkMin.addColorStop(0.7, "rgba(0, 211, 84, 0)"); // Gần với màu nền, hoàn toàn trong suốt
      gradientTemperatureDarkMin.addColorStop(1, "rgba(0, 211, 84, 0)"); // Gần với màu nền, hoàn toàn trong suốt

      // Tạo gradient Temperature Dark
      const gradientTemperatureLightMin = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      );
      gradientTemperatureLightMin.addColorStop(0, "rgba(0, 211, 84, 0.5)"); // Màu vàng cam (#F5A300) với độ mờ 50%
      gradientTemperatureLightMin.addColorStop(0, "rgba(0, 211, 84, 0.2)"); // Màu vàng cam (#F5A300) với độ mờ 50%
      gradientTemperatureLightMin.addColorStop(1, "rgba(255, 255, 255, 0)"); // Màu trắng (#FFFFFF) với độ mờ 0%

      const labelList = this.paramHourly.map((item) => {
        const date = item.time;
        return this.convertTime(date);
      });

      const savedTheme = localStorage.getItem("theme") || "light";

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelList,
          datasets: [
            {
              label: "Temperature Max",
              type: "line", // Kiểu dataset là line
              borderColor: "#EBAB3F",
              pointBackgroundColor: "#EBAB3F",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#EBAB3F",
              pointRadius: 5, // Bán kính điểm
              backgroundColor:
                savedTheme === "light"
                  ? gradientTemperatureLight
                  : gradientTemperatureDark,
              fill: false, // Tô nền dưới line
              data: this.listTemperatureData,
              pointHoverRadius: 4, // Tăng kích thước khi hover
              yAxisID: "y1", // Gán trục y cho Temperature
              datalabels: {
                display: true,
                align: "top",
                anchor: "start", // Gắn nhãn ở đầu cột
                font: {
                  size: 14,
                },
                color: "#EBAB3F",
                formatter: (value) => `${value}°`, // Định dạng giá trị hiển thị
                offset: 6,
              },
            },

            {
              label: "Temperature Min",
              type: "line", // Kiểu dataset là line
              borderColor: "#00D354",
              pointBackgroundColor: "#00D354",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#00D354",
              pointRadius: 5, // Bán kính điểm
              backgroundColor:
                savedTheme === "light"
                  ? gradientTemperatureLight
                  : gradientTemperatureDark,
              fill: "-1", // Tô nền dưới line
              data: this.listTemperatureMin,
              pointHoverRadius: 4, // Tăng kích thước khi hover
              yAxisID: "y2", // Gán trục y cho Temperature
              datalabels: {
                display: true,
                align: "bottom",
                anchor: "start", // Gắn nhãn ở đầu cột
                font: {
                  size: 14,
                },
                color: "#00D354",
                formatter: (value) => `${value}°`, // Định dạng giá trị hiển thị
                offset: 0,
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 40, // Chỉ định padding phía trên
              bottom: 20, // Chỉ định padding phía dưới
              left: 18,
              right: 20,
            },
          },
          scales: {
            x: {
              display: false,
              ticks: {
                stepSize: 10, // Điều chỉnh số lượng điểm hiển thị trên trục x
              },
            },
            y1: {
              type: "linear",
              position: "left",
              display: false,
              beginAtZero: true,
              max: maxDataValue + 2,
              min: minDataValue - 8,
              ticks: {
                padding: 10, // Giảm khoảng cách giữa nhãn và trục
              },
            },
            y2: {
              type: "linear",
              position: "left",
              display: false,
              beginAtZero: true,
              max: maxDataValue + 4,
              min: minDataValue - 8,
              ticks: {
                padding: 10, // Giảm khoảng cách giữa nhãn và trục
              },
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
                  return `${label}: ${value}°`; // Thông tin khi hover
                },
              },
            },
            datalabels: {
              anchor: "end",
              align: "top",
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
  },
};
</script>
<style lang="scss"></style>
