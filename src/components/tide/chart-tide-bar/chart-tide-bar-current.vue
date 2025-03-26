<template>
  <div class="chart-container-tempt p-chart-avg" v-if="extremesDataRender">
    <div class="chart-wrapper-tempt w-full h-full">
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

export default {
  name: "chart-tide-bar-current",
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

      const start = new Date(now); // Hôm trước 12:00
      start.setDate(start.getDate() - 1);
      start.setHours(12, 0, 0, 0);

      const end = new Date(now); // Ngày mai 12:00
      end.setDate(end.getDate() + 1);
      end.setHours(12, 0, 0, 0);

      const result = data.filter((item) => {
        const itemTime = new Date(item.datetime);
        return itemTime >= start && itemTime <= end;
      });

      return result.map((el) => Number(el.height.toFixed(2)));
    },

    extremesDataRenderTime() {
      const data = this.tideDataGetters?.extremes;

      if (!data || !Array.isArray(data)) return [];

      const now = new Date();
      now.setHours(0, 0, 0, 0); // Hôm nay 00:00

      const start = new Date(now); // Hôm trước 12:00
      start.setDate(start.getDate() - 1);
      start.setHours(12, 0, 0, 0);

      const end = new Date(now); // Ngày mai 12:00
      end.setDate(end.getDate() + 1);
      end.setHours(12, 0, 0, 0);

      const result = data.filter((item) => {
        const itemTime = new Date(item.datetime);
        return itemTime >= start && itemTime <= end;
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

      const chartHeight = ctx.canvas.height;

      // Tạo gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
      gradient.addColorStop(0, "rgba(235, 171, 63, 1)"); // Màu đậm trên cùng
      gradient.addColorStop(0.6, "rgba(235, 171, 63, 0.2)"); // Màu gần như trong suốt hơn
      gradient.addColorStop(0.8, "rgba(235, 171, 63, 0.02)"); // Màu rất nhạt trước khi hết
      gradient.addColorStop(1, "rgba(235, 171, 63, 0)"); // Màu hoàn toàn trong suốt ở đáy

      // Time
      const labelList = this.extremesDataRenderTime.map((item) => {
        const date = item.timestamp;
        return date;
      });

      // Chart
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelList,
          datasets: [
            {
              label: "",
              type: "line", // Kiểu dataset là line
              borderColor: "#EBAB3F",
              pointBackgroundColor: "#EBAB3F",
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#EBAB3F",
              pointRadius: 4, // Bán kính điểm
              backgroundColor: gradient,
              fill: "start",
              data: this.extremesDataRender,
              pointHoverRadius: 3,
              tension: 0.4,
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
              display: false,
              ticks: {
                stepSize: 20, // Điều chỉnh số lượng điểm hiển thị trên trục x
                autoSkip: false, // không bỏ qua nhãn
                maxRotation: 40,
              },
              offset: false, // ✅ Thêm khoảng cách đầu/cuối
            },
            y: {
              type: "linear",
              position: "left",
              display: false,
              beginAtZero: true,
              max: maxDataValue - 4,
              min: maxDataValue,
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
