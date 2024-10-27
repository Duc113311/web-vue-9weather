<template>
  <div class="chart-container-rain w-[80rem] absolute top-36 z-20">
    <div class="chart-wrapper w-full h-full">
      <canvas id="chart_hourly_rain" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

export default {
  name: "chart-domain-rain",
  data() {
    return {
      chart: null,
      pattern: null,
      img: null,
      pointImg: null, // Add an image object to the data
      chartInstance: null,
    };
  },

  computed: {
    paramHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    listDataProbability() {
      return this.paramHourly.map((element) =>
        Math.round(element.precipProbability * 100)
      );
    },
  },

  watch: {
    paramHourly(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          this.createChartRain24h();
        });
      }
    },
  },

  mounted() {
    if (this.paramHourly && this.paramHourly.length) {
      this.$nextTick(() => {
        this.createChartRain24h();
      });
    }
  },

  methods: {
    createChartRain24h() {
      const canvas = document.getElementById("chart_hourly_rain");
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      // var chart_hourly_rain = Chart.getChart("chart_hourly_rain");
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height); // Gradient từ trên xuống dưới
      gradient.addColorStop(0, "#00CCDC"); // Màu trên (100% độ mờ)
      gradient.addColorStop(1, "#00848F00"); // Màu dưới (0% độ mờ)
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
          ],
          datasets: [
            {
              label: "Rain",
              borderColor: "#F4F5F8",
              pointBackgroundColor: "#00E3F5",
              borderWidth: 1,
              pointBorderColor: "#474A8D",
              pointRadius: 3,
              backgroundColor: gradient,
              fill: true,
              data: [
                0, 20, 30, 40, 50, 20, 49, 12, 63, 80, 12, 7, 13, 34, 6, 12, 8,
                60, 80, 12, 100, 43, 60, 70, 80, 90, 100,
              ],
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
              font: {
                size: 10,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
              formatter: (value, context) => {
                return `${value}%`;
              },
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Thêm background cho label
            },
          },
          scales: {
            x: {
              display: false,
              title: {
                display: false,
                stepSize: 2,
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
              max: 100,
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

<style scoped>
.chart-wrapper {
  width: 100%; /* Đặt chiều rộng lớn hơn để kích hoạt cuộn ngang nếu cần */
}

.chart-container-rain {
  left: -10px;
}
</style>
