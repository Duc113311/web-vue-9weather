<template>
  <div
    class="chart-container-tempt w-[1550px] pl-6 pr-6"
    v-if="extremesDataRender"
  >
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
import {
  convertFeetToMeter,
  convertMeterToFeet,
  formatTo12HourTimeTide,
  formatTo24HourTimeTide,
} from "@/utils/converValue";

export default {
  name: "chart-tide-bar-current",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("tideModule", ["extremesDataGetters"]),

    extremesDataRender() {
      const data = this.extremesDataGetters.slice(0, 2);

      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      // 🔹 Fake điểm đầu: giảm 20%
      const objectCloneStart = { ...data[0] };
      objectCloneStart.height = objectCloneStart.height * 0.1;
      const fakeStartValue =
        unitSetting.activeTide_save === "m"
          ? convertFeetToMeter(objectCloneStart.height)
          : convertMeterToFeet(objectCloneStart.height);

      // 🔹 Fake điểm cuối: tăng 80%
      const objectCloneEnd = { ...data[data.length - 1] };
      objectCloneEnd.height = objectCloneEnd.height / 4.8;
      const fakeEndValue =
        unitSetting.activeTide_save === "m"
          ? convertFeetToMeter(objectCloneEnd.height)
          : convertMeterToFeet(objectCloneEnd.height);

      // 🔹 Dữ liệu thật
      const listHeight = data.map((el) => {
        const value = el.height;
        return unitSetting.activeTide_save === "m"
          ? convertFeetToMeter(value)
          : convertMeterToFeet(value);
      });

      // 🔹 Trả kết quả: [fake đầu, dữ liệu thật..., fake cuối]
      return [fakeStartValue, ...listHeight, fakeEndValue];
    },

    extremesDataRenderTime() {
      const data = this.extremesDataGetters;
      const objectClone = { ...data[0] };
      const objectCloneEnd = { ...data[data.length - 1] };

      console.log("data-extreme", data);

      return [objectClone, ...data, objectCloneEnd] || [];
    },

    extremesDataRenderTimeRender() {
      const data = this.extremesDataGetters;
      const objectClone = { ...data[0] };
      const objectCloneEnd = { ...data[data.length - 1] };

      const timeClone = objectClone.datetime;
      const timeCloneend = objectCloneEnd.datetime;
      const listDataTime = data.map((el) => {
        return el.datetime;
      });
      return [timeClone, ...listDataTime, objectCloneEnd] || [];
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
      const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
      gradient.addColorStop(0, "rgba(20, 130, 231, 1)"); // Màu đậm trên cùng
      gradient.addColorStop(0.6, "rgba(20, 130, 231, 0.2)"); // Màu gần như trong suốt hơn
      gradient.addColorStop(0.8, "rgba(20, 130, 231, 0.02)"); // Màu rất nhạt trước khi hết
      gradient.addColorStop(1, "rgba(20, 130, 231, 0)"); // Màu hoàn toàn trong suốt ở đáy

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
              borderColor: "#1482E7",
              pointBackgroundColor: "#ffffff",
              pointRadius: (ctx) =>
                ctx.dataIndex === 0 || ctx.dataIndex === 3 ? 0 : 4, // ẩn chấm đầu
              pointBorderWidth: 1, // Độ dày viền của điểm
              borderWidth: 2, // Độ dày đường
              pointBorderColor: "#ffffff",
              backgroundColor: gradient,
              fill: "start",
              data: this.extremesDataRender,
              pointHoverRadius: 3,
              tension: 0.4,
              datalabels: {
                align: "top",
                anchor: "end",
                color: "#ffffff",
                font: {
                  size: 10,
                },
                formatter: (value, context) => {
                  console.log("value", context.dataIndex);
                  console.log(
                    "this.extremesDataRenderTimeRender",
                    this.extremesDataRenderTimeRender
                  );

                  return this.convertDateTime(
                    this.extremesDataRenderTimeRender[context.dataIndex]
                  ); // VD: "05:20"
                },
              },
              display: true,
            },
            {
              label: "",
              data: this.extremesDataRender,
              borderColor: "transparent",
              backgroundColor: "transparent",
              pointRadius: 0,
              datalabels: {
                align: "bottom",
                anchor: "start",
                color: "#cccccc",
                font: {
                  size: 12,
                },
                formatter: (value, context) => {
                  const trendArrow = value >= 0 ? "↑" : "↓";
                  return `${value} ${this.unitTide()} ${trendArrow}`;
                },
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10, // Chỉ định padding phía trên
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
              max: maxDataValue + 0.5,
              min: minDataValue - 1,
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
              anchor: "center",
              align: "top",
              color: "#ccc", // Màu chữ
              display: (ctx) =>
                ctx.dataIndex === 0 || ctx.dataIndex === 3 ? 0 : 4, // ẩn chấm đầu
              font: {
                size: 12,
              },
              formatter: (value, context) => {
                const labelTime = context.chart.data.labels[context.dataIndex];
                const trendArrow = value >= 0 ? "↑" : "↓"; // Mũi tên
                return [`${labelTime}`, `${value} ${trendArrow}`]; // array = hiển thị 2 dòng
              },
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
    convertDateTime(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return formatTo12HourTimeTide(value);
      } else {
        return formatTo24HourTimeTide(value);
      }
    },

    unitTide() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      return unitSetting.activeTide_save;
    },
  },
};
</script>
<style lang="scss"></style>
