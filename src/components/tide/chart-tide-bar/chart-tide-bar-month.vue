<template>
  <div
    class="chart-container-tempt p-chart-avg w-[3550px] h-full pt-4 pb-4 pl-4 pr-4 overflow-x-auto"
    v-if="extremesDataRender"
  >
    <div class="chart-wrapper-tempt min-w-[1000px] h-full">
      <canvas id="chart_hourly" ref="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import {
  convertGroupedForLineChart,
  convertGroupedToChartData,
  takeFirstNFromObject,
} from "@/utils/middleware";
import { mapGetters } from "vuex";

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
import { convertToShortDayMonth } from "@/utils/converValue";

export default {
  name: "chart-tide-bar-month",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("tideModule", ["tideDataGetters"]),

    extremesDataRender() {
      const data = this.tideDataGetters?.extremes;

      if (!data || !Array.isArray(data)) return [];

      const now = new Date();
      now.setHours(0, 0, 0, 0); // Hôm nay 00:00

      const result = data.filter((item) => {
        const itemTime = new Date(item.datetime);
        return itemTime >= now; // ✅ lấy từ hôm nay trở đi
      });

      return result.map((el) => Number(el.height.toFixed(2)));
    },

    extremesDataRenderTime() {
      const data = this.tideDataGetters?.extremes;

      if (!data || !Array.isArray(data)) return [];

      const now = new Date();
      now.setHours(0, 0, 0, 0); // Hôm nay 00:00

      const result = data.filter((item) => {
        const itemTime = new Date(item.datetime);
        return itemTime >= now; // ✅ lấy từ hôm nay trở đi
      });
      return result || [];
    },
  },

  watch: {
    extremesDataRender(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          this.createChartHourly24h();
        });
      }
    },
  },

  mounted() {
    if (this.extremesDataRender && this.extremesDataRender.length) {
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

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const maxDataValue = Math.max(...this.extremesDataRender);
      const minDataValue = Math.min(...this.extremesDataRender);

      const chartHeight = ctx.canvas.height;

      // Tạo gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight + 200);
      gradient.addColorStop(0, "rgba(20, 130, 231, 1)"); // Đậm đầu
      gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.3)"); // Trắng mờ cuối
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Trắng mờ cuối
      // Time
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;
      const labelList = this.extremesDataRenderTime.map((item) => {
        const date = item.timestamp;
        return convertToShortDayMonth(date, offsetValue, timezoneValue);
      });
      const canvasWidth = labelList.length * 60;
      this.$refs.canvas.width = canvasWidth;

      // Chart
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelList,
          datasets: [
            {
              label: "",
              type: "line", // Kiểu dataset là line
              borderColor: "#ffffff",
              pointBackgroundColor: "#ffffff",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#ffffff",
              pointRadius: 4, // Bán kính điểm
              backgroundColor: gradient,
              fill: "start",
              data: this.extremesDataRender,
              pointHoverRadius: 3,
              tension: 0.4,
              formatter: function (value, context) {
                return `${value} m`; // Định dạng dữ liệu hiển thị
              },
              display: true,
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
            },
          },
          scales: {
            x: {
              display: true,
              ticks: {
                stepSize: 20, // Điều chỉnh số lượng điểm hiển thị trên trục x
                autoSkip: false, // không bỏ qua nhãn
                maxRotation: 40,
                color: "#ffffff",
                font: {
                  size: 12,
                },
              },
              offset: false, // ✅ Thêm khoảng cách đầu/cuối

              grid: {
                display: true, // ✅ Hiện vạch kẻ trục X
                color: "rgba(0,0,0,0.1)",
              },
            },
            y: {
              type: "linear",
              position: "left",
              display: true,
              beginAtZero: true,
              max: maxDataValue + 1,
              min: minDataValue,

              ticks: {
                callback: (val) => `${val} m`,
                color: "#ccc",
              },
              grid: {
                display: true, // ✅ Hiện vạch kẻ trục Y
                color: "rgba(0,0,0,0.1)",
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
              intersect: false, // Cho phép hover ở mọi nơi trên đường
              mode: "index", // Hiển thị tooltip của tất cả dataset tại vị trí trục x
              theme: "dark",
              displayColors: false, // Ẩn ô màu mặc định
              titleAlign: "center",
              bodyAlign: "center",
              footerAlign: "center",
            },
            datalabels: {
              anchor: "end",
              align: "top",
              display: false,
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
