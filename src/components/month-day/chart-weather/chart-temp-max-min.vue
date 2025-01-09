<template>
  <div
    class="chart-container w-[89rem] mt-2"
    v-if="paramHourly && paramHourly.length"
  >
    <div class="chart-wrapper w-full h-full">
      <canvas id="chart_tem_month" height="320" ref="canvas"></canvas>
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
    convertPrecipitation(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        return convertMillimet(val);
      } else {
        return convertMillimetToInch(val);
      }
    },
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

      const gradientRain = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height * 2
      ); // Gradient từ trên xuống dưới
      gradientRain.addColorStop(0, "#00CCDC"); // Màu trên (100% độ mờ)
      gradientRain.addColorStop(1, "#00848F00"); // Màu dưới (0% độ mờ)

      const maxDataValueRain = Math.max(...this.listDataProbability);

      const displayData = this.listDataPrecipIntensity.map((value, index) => {
        console.log(
          `Index: ${index}, Original Value: ${value}, Processed Value: ${
            value === 0 ? 0.5 : value
          }`
        );
        return value === 0 ? 0.5 : value;
      });
      const maxDataValueIntensity = Math.max(...this.listDataPrecipIntensity);

      const savedTheme = localStorage.getItem("theme") || "light";

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...Array(30).keys()].map((i) => i + 1),
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
              yAxisID: "y3", // Gán trục y cho Rain
              datalabels: {
                display: true,
                align: "top",
                anchor: "start", // Gắn nhãn ở đầu cột
                font: {
                  size: 14,
                },
                color: savedTheme === "light" ? "#333333" : "#00e3f5",
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
              categoryPercentage: 0.8,
              barPercentage: 0.9,
              yAxisID: "y4", // Gán trục y cho Temperature
              datalabels: {
                display: true,
                anchor: "start", // Gắn nhãn ở đầu cột
                align: "start", // Căn nhãn ở đầu cột
                offset: 4, // Không di chuyển nhãn
                font: {
                  size: 14,
                },
                color: savedTheme === "light" ? "#333333" : "#ffffff",
                formatter: (value, context) => {
                  return this.listDataPrecipIntensity[context.dataIndex] === 0
                    ? "0" + " " + this.unitPrecipitation
                    : value + " " + this.unitPrecipitation;
                },
              },
            },

            {
              label: "Temperature Min",
              borderColor: "#EC9D00",
              pointBackgroundColor: "#EC9D00",
              pointBorderWidth: 0, // Độ dày viền của điểm
              borderWidth: 2,
              pointBorderColor: "#EC9D00",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: true,
              data: this.listTemperatureDataMax,
              pointHoverRadius: 8, // Tăng kích thước khi hove
              yAxisID: "y1", // Gán trục y cho Rain
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
              label: "Temperature Max",
              borderColor: "#00D354",
              pointBackgroundColor: "#00D354",
              pointBorderWidth: 0, // Độ dày viền của điểm
              borderWidth: 2,
              pointBorderColor: "#C27021",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: true,
              data: this.listTemperatureDataMin,
              pointHoverRadius: 8, // Tăng kích thước khi hover
              yAxisID: "y2", // Gán trục y cho Rain
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
            padding: {
              top: 20, // Chỉ định padding phía trên
              bottom: 25, // Chỉ định padding phía dưới
              left: 0,
              right: 0,
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
              offset: true,
              ticks: {
                stepSize: 2, // Điều chỉnh số lượng điểm hiển thị trên trục x
              },
            },

            y1: {
              display: false,
              beginAtZero: true,
              max: maxData,
              ticks: {
                padding: 0, // Giảm khoảng cách giữa nhãn và trục
              },
            },
            y2: {
              display: false,
              beginAtZero: true,
              max: maxData + 1,
              ticks: {
                padding: 0, // Giảm khoảng cách giữa nhãn và trục
              },
            },
            y3: {
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
            y4: {
              position: "right",
              display: false,
              beginAtZero: true,
              max: maxDataValueIntensity + 30,
              ticks: {
                padding: 0, // Giảm khoảng cách giữa nhãn và trục
                mirror: true,
              },
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
