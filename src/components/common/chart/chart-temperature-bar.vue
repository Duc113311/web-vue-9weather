<template>
  <div
    class="chart-container w-[89rem]"
    v-if="paramHourly && paramHourly.length && listTemperatureData.length"
  >
    <div class="chart-wrapper w-full h-full">
      <canvas id="chart_hourly" height="200" ref="canvas"></canvas>
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
  name: "chart-temperature-bar",
  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    paramHourly() {
      return this.$store.state.weatherModule.hourly24h;
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
      // return [5, 10, 12, 45, 15, 17, 10, 24, 30, 10, 40, 23];
    },

    listDataProbability() {
      return this.paramHourly.map((element) =>
        Math.round(element.precipProbability * 100)
      );
      // return [0, 1, 5, 10, 0, 4, 100, 26, 49, 0];
    },

    listDataPrecipIntensity() {
      return this.paramHourly.map((element) =>
        // this.convertPrecipitation(element.humidity * 100)
        Math.round(this.convertPrecipitation(element.precipIntensity))
      );
    },

    unitPrecipitation() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activePrecipitation_save);
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

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo gradient Temperature Dark
      const gradientTemperatureDark = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      );

      gradientTemperatureDark.addColorStop(0, "rgba(245, 163, 0, 1)"); // Màu #00CCDC với độ mờ 100% (vị trí 0%)
      gradientTemperatureDark.addColorStop(0.4, "rgba(245, 163, 0, 0.4)"); // Màu #FFFFFF với độ mờ 0% (vị trí 100%)
      gradientTemperatureDark.addColorStop(0.8, "rgba(245, 163, 0, 0)"); // Màu #FFFFFF với độ mờ 0% (vị trí 100%)
      gradientTemperatureDark.addColorStop(1, "rgba(255, 255, 255, 0)"); // Màu #FFFFFF với độ mờ 0% (vị trí 100%)

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

      // Lấy giá trị nhỏ nhất trong dữ liệu và giảm thêm padding
      const minDataValue = Math.min(...this.listTemperatureData);
      const maxDataValue = Math.max(...this.listTemperatureData);

      const labelList = this.paramHourly.slice(0, 24).map((item) => {
        const date = item.time;
        return this.convertTime(date);
      });

      const savedTheme = localStorage.getItem("theme") || "light";

      console.log("savedTheme", savedTheme);

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelList,
          datasets: [
            {
              label: "Temperature",
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
              fill: true, // Tô nền dưới line
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
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 0, // Chỉ định padding phía trên
              bottom: 0, // Chỉ định padding phía dưới
              left: 20,
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
              max: maxDataValue + 4,
              min: minDataValue - 10,
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
                  return `${label}: ${value === 0.5 ? 0 : value}°`; // Thông tin khi hover
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
              tension: 0.5,
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
.chart-container {
  width: 150%;
}

.chart-wrapper {
  width: 100%; /* Đặt chiều rộng lớn hơn để kích hoạt cuộn ngang nếu cần */
}
</style>
