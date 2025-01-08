<template>
  <div
    class="chart-container w-[78rem]"
    v-if="paramHourly && paramHourly.length && listTemperatureData.length"
  >
    <div class="chart-wrapper w-full h-full">
      <canvas id="chart_hourly" height="290" ref="canvas"></canvas>
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
  name: "chart-domain-rain",
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
    },

    listDataProbability() {
      return this.paramHourly.map((element) =>
        Math.round(element.precipProbability * 100 || 0)
      );
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
    convertPrecipitation(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        return convertMillimet(val);
      } else {
        return convertMillimetToInch(val);
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

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height * 2);
      gradient.addColorStop(0, "rgba(245, 163, 0, 0.5)"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(1, "rgba(245, 212, 0, 0.1)"); // Màu dưới (#F5D400 với độ mờ 10%)
      // Vẽ một hình chữ nhật bao phủ toàn bộ canvas

      const gradientRain = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height * 2
      ); // Gradient từ trên xuống dưới
      gradientRain.addColorStop(0, "#00CCDC"); // Màu trên (100% độ mờ)
      gradientRain.addColorStop(1, "#00848F00"); // Màu dưới (0% độ mờ)

      const gradientPrecipIntensity = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      ); // Gradient từ trên xuống dưới
      gradientPrecipIntensity.addColorStop(0, "#2E77E8"); // Màu trên (100% độ mờ)
      gradientPrecipIntensity.addColorStop(1, "#104B77"); // Màu dưới (0% độ mờ)

      // Lấy giá trị nhỏ nhất trong dữ liệu và giảm thêm padding
      const minDataValue = Math.min(...this.listTemperatureData);
      const maxDataValue = Math.max(...this.listTemperatureData);

      const maxDataValueRain = Math.max(...this.listDataProbability);
      const maxDataValueIntensity = Math.max(...this.listDataPrecipIntensity);
      const yAxisMin = minDataValue - 2; // Giảm giá trị nhỏ nhất xuống thêm 5 đơn vị (tuỳ chỉnh)

      const displayData = this.listDataPrecipIntensity.map((value, index) => {
        console.log(
          `Index: ${index}, Original Value: ${value}, Processed Value: ${
            value === 0 ? 0.5 : value
          }`
        );
        return value === 0 ? 0.5 : value;
      });
      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [...Array(24).keys()].map((i) => i + 1),
          datasets: [
            {
              label: "Chance of rain",
              type: "line", // Kiểu dataset là line
              borderColor: "#00E3F5",
              pointBackgroundColor: "#00E3F5",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2,
              pointBorderColor: "#00E3F5",
              pointRadius: 5,
              backgroundColor: gradientRain,
              fill: true,
              data: this.listDataProbability,
              pointHoverRadius: 8,
              yAxisID: "y2", // Gán trục y cho Rain
              datalabels: {
                display: true,
                align: "top",
                anchor: "start", // Gắn nhãn ở đầu cột
                font: {
                  size: 14,
                },
                color: "#00E3F5",
                formatter: (value) => `${value}%`, // Định dạng giá trị hiển thị
                offset: 8,
              },
            },

            {
              label: "PrecipIntensity",
              type: "bar", // Kiểu dataset là line
              borderColor: "#0062F5",
              pointBackgroundColor: "#0062F5",
              pointBorderColor: "#0062F5",
              backgroundColor: "#0062F5",
              fill: true, // Tô nền dưới line
              data: displayData,
              borderRadius: 20,
              barThickness: 30,
              yAxisID: "y3", // Gán trục y cho Temperature
              datalabels: {
                display: true,
                anchor: "start", // Gắn nhãn ở đầu cột
                align: "start", // Căn nhãn ở đầu cột
                offset: 4, // Không di chuyển nhãn
                font: {
                  size: 14,
                },
                color: "#ffffff",
                formatter: (value, context) => {
                  return this.listDataPrecipIntensity[context.dataIndex] === 0
                    ? "0" + " " + this.unitPrecipitation
                    : value + " " + this.unitPrecipitation;
                },
              },
            },

            {
              label: "Temperature",
              type: "line", // Kiểu dataset là line
              borderColor: "#EBAB3F",
              pointBackgroundColor: "#EBAB3F",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#EBAB3F",
              pointRadius: 5, // Bán kính điểm
              backgroundColor: gradient,
              fill: true, // Tô nền dưới line
              data: this.listTemperatureData,
              pointHoverRadius: 8, // Tăng kích thước khi hover
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
                offset: 8,
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20, // Chỉ định padding phía trên
              bottom: 25, // Chỉ định padding phía dưới
              left: 0,
              right: 0,
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
              ticks: {
                padding: 0, // Giảm khoảng cách giữa nhãn và trục
              },
            },
            y2: {
              type: "linear",
              position: "right",
              display: false,
              beginAtZero: true,
              max: maxDataValueRain + 100,
              ticks: {
                padding: 0, // Giảm khoảng cách giữa nhãn và trục
              },
              // min: yAxisMin - 30,
            },
            y3: {
              position: "right",
              display: false,
              beginAtZero: true,
              max: maxDataValueIntensity - 1,
              min: yAxisMin + 60,
              ticks: {
                padding: 0, // Giảm khoảng cách giữa nhãn và trục
              },
            },
            y4: {
              position: "right",
              display: false,
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || "";
                  return `${label}: ${value}`; // Thông tin khi hover
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
