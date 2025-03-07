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

      // Lấy giá trị nhỏ nhất trong dữ liệu và giảm thêm padding
      const maxDataValue = Math.max(...this.listTemperatureData);

      const minDataValueMin = Math.min(...this.listTemperatureMin);

      // Tạo gradient Temperature Dark Max

      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#d5c692");
      gradient.addColorStop(1, "#d5c69229"); // Nửa dưới trong suốt

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
              label: " Max",
              borderColor: "#EBAB3F",
              pointBackgroundColor: "#EBAB3F",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#EBAB3F",
              pointRadius: 5, // Bán kính điểm
              backgroundColor: gradient,
              fill: false, // Tô nền dưới line
              data: this.listTemperatureData,
              pointHoverRadius: 4, // Tăng kích thước khi hover
              datalabels: {
                display: true,
                align: "top",
                font: {
                  size: 14,
                },
                color: "#EBAB3F",
                formatter: (value) => `${value}°`, // Định dạng giá trị hiển thị
                offset: 4,
              },
            },

            {
              label: " Min",
              type: "line", // Kiểu dataset là line
              borderColor: "#00D354",
              pointBackgroundColor: "#00D354",
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#00D354",
              pointRadius: 5, // Bán kính điểm
              backgroundColor: gradient,
              fill: "-1", // Tô nền dưới line
              data: this.listTemperatureMin,
              pointHoverRadius: 4, // Tăng kích thước khi hover
              datalabels: {
                display: true,
                align: "bottom",
                font: {
                  size: 14,
                },
                color: "#00D354",
                formatter: (value) => `${value}°`, // Định dạng giá trị hiển thị
                offset: 4,
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
            y: {
              display: false,
              title: {
                display: false,
                //   text: "Giá trị",
              },
              beginAtZero: true,
              min: minDataValueMin - 3,
              max: maxDataValue + 3,
            },
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              clip: false, // Không cắt tooltip khi nó vượt khỏi vùng vẽ
              enabled: false,
              cornerRadius: 6, // Làm bo góc tooltip
              theme: "dark",
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || "";
                  let value = context.raw || "";
                  return `${label}: ${Number(value) === 0 ? 0 : value}°`; // Thông tin khi hover
                },
              },

              external: function (context) {
                let tooltipModel = context.tooltip;
                if (!tooltipModel || tooltipModel.opacity === 0) {
                  let tooltipEl = document.getElementById("chartjs-tooltip");
                  if (tooltipEl) tooltipEl.style.opacity = "0";
                  return;
                }

                let tooltipEl = document.getElementById("chartjs-tooltip");

                if (!tooltipEl) {
                  tooltipEl = document.createElement("div");
                  tooltipEl.id = "chartjs-tooltip";
                  tooltipEl.style.position = "absolute";
                  tooltipEl.style.background = "rgba(0, 0, 0, 0.8)";
                  tooltipEl.style.color = "#fff";
                  tooltipEl.style.padding = "6px 10px";
                  tooltipEl.style.borderRadius = "4px";
                  tooltipEl.style.pointerEvents = "none";
                  tooltipEl.style.zIndex = "1000";
                  tooltipEl.style.fontSize = "12px";
                  tooltipEl.style.whiteSpace = "nowrap";
                  tooltipEl.style.transition = "all 0.1s ease";
                  context.chart.canvas.parentNode.appendChild(tooltipEl);
                }

                // Lấy thông tin điểm dữ liệu
                const chartRect = context.chart.canvas.getBoundingClientRect();
                let tooltipX = tooltipModel.caretX;
                let tooltipY = tooltipModel.caretY;

                // Kiểm tra nếu tooltip ở mép trái thì dịch sang phải
                if (tooltipX < 20) {
                  tooltipX += 10;
                }
                // Kiểm tra nếu tooltip ở mép phải thì dịch sang trái
                if (tooltipX + tooltipEl.offsetWidth > chartRect.width - 20) {
                  tooltipX -= tooltipEl.offsetWidth + 10;
                }

                // Định dạng nội dung tooltip
                tooltipEl.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="width: 8px; height: 8px; background: ${tooltipModel.labelColors[0].backgroundColor}; border-radius: 50%; margin-right: 6px;"></span>
        <strong>${tooltipModel.title[0]}</strong>: ${tooltipModel.body[0].lines[0]}
      </div>
    `;

                // Đặt vị trí tooltip gần dấu chấm
                tooltipEl.style.opacity = "1";
                tooltipEl.style.left = `${tooltipX + 10}px`; // Dịch sang phải một chút
                tooltipEl.style.top = `${tooltipY - 25}px`; // Dịch lên trên điểm
              },
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
<style lang="scss">
.chart-container-tempt {
  overflow: visible !important;
}

#chartjs-tooltip {
  transition: all 0.1s ease;
  white-space: nowrap;
}
</style>
