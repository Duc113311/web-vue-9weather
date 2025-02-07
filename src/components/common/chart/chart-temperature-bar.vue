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

      console.log("this.listTemperatureData", this.listTemperatureData);

      // Lấy giá trị nhỏ nhất trong dữ liệu và giảm thêm padding
      const minDataValue = Math.min(...this.listTemperatureData);
      const maxDataValue = Math.max(...this.listTemperatureData);

      const chartHeight = ctx.canvas.height;
      const minPosition =
        chartHeight -
        ((minDataValue - minDataValue) / (maxDataValue - minDataValue)) *
          chartHeight;
      const maxPosition =
        chartHeight -
        ((maxDataValue - minDataValue) / (maxDataValue - minDataValue)) *
          chartHeight;

      // Tạo gradient Temperature Dark
      const gradientTemperatureDark = ctx.createLinearGradient(
        0,
        0,
        0,
        ctx.canvas.height
      );

      gradientTemperatureDark.addColorStop(0, "rgba(245, 163, 0, 1)"); // 100% độ mờ
      gradientTemperatureDark.addColorStop(0.6, "rgba(245, 163, 0, 0)"); // Gần với màu nền, hoàn toàn trong suốt
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
              label: "Temperature",
              type: "line", // Kiểu dataset là line
              borderColor: "#EBAB3F",
              pointBackgroundColor: "#EBAB3F",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#EBAB3F",
              pointRadius: 5, // Bán kính điểm
              backgroundColor: (context) => {
                const { chart } = context;

                console.log("context", context);

                const dataIndex = context.datasetIndex;
                const dataset = context.dataset;
                const value = dataset.data[dataIndex];

                const ctx = chart.ctx;

                const isLightTheme = this.savedTheme === "light";

                let gradient;
                if (value >= 0) {
                  // Vẽ gradient từ trên xuống
                  gradient = ctx.createLinearGradient(
                    0,
                    0,
                    0,
                    ctx.canvas.height
                  );
                  gradient.addColorStop(0, "rgba(245, 163, 0, 1)");
                  gradient.addColorStop(0.6, "rgba(245, 163, 0, 0)");
                } else {
                  // Vẽ gradient từ dưới lên
                  gradient = ctx.createLinearGradient(
                    0,
                    ctx.canvas.height,
                    0,
                    0
                  );
                  gradient.addColorStop(0, "rgba(245, 163, 0, 1)");
                  gradient.addColorStop(0.6, "rgba(245, 163, 0, 0.2)");
                }

                // Tuỳ theo theme ta chọn màu khác nhau
                if (isLightTheme) {
                  // Vd: Light theme: màu vàng đậm phía trên (hoặc dưới), dần chuyển sang trong suốt
                  gradient.addColorStop(0, "rgba(245, 163, 0, 1)");
                  gradient.addColorStop(0.6, "rgba(245, 163, 0, 0.3)");
                  gradient.addColorStop(1, "rgba(245, 163, 0, 0)");
                } else {
                  // Vd: Dark theme: bạn có thể đổi các mã màu cho phù hợp
                  gradient.addColorStop(1, "rgba(245, 163, 0, 0)");
                }

                return gradient;
              },

              fill: true, // Tô nền dưới line
              data: this.listTemperatureData,
              pointHoverRadius: 4, // Tăng kích thước khi hover
              datalabels: {
                display: true,
                align: (context) => {
                  const { dataset, dataIndex } = context;
                  const value = dataset.data[dataIndex];
                  // Nếu giá trị < 0 thì đặt align = bottom, ngược lại thì top
                  return value < 0 ? "bottom" : "top";
                },
                anchor: "start", // Gắn nhãn ở đầu cột
                font: {
                  size: 14,
                },
                color: "#EBAB3F",
                formatter: (value) => `${value}°`, // Định dạng giá trị hiển thị
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: maxDataValue, // Chỉ định padding phía trên
              bottom: 0, // Chỉ định padding phía dưới
              left: 22,
              right: 24,
            },
          },
          scales: {
            x: {
              display: false,
              ticks: {
                stepSize: 10, // Điều chỉnh số lượng điểm hiển thị trên trục x
              },
            },
            y: {
              type: "linear",
              position: "left",
              display: false,
              beginAtZero: true,
              max: maxDataValue + 2,
              min: minDataValue - 3,
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
              align: "left",
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || "";
                  return `${label}: ${Number(value) === 0 ? 0 : value}°`; // Thông tin khi hover
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
<style lang="scss"></style>
