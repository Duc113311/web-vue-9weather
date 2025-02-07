<template>
  <div class="w-[1550px] z-10">
    <div
      class="chart-container-uv h-full w-full"
      v-if="listHourly && listHourly.length"
    >
      <canvas id="chart_hourly" height="auto" ref="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import {
  convertTimestamp12hSun,
  convertTimestamp24hSun,
} from "@/utils/converValue";
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
  name: "detail-chart-uv",

  data() {
    return {};
  },

  computed: {
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listUvIndexData() {
      const unitSetting = this.objectSetting;

      return this.listHourly.map((element) => Math.round(element.uvIndex) || 0);
      // return [
      //   12, 12, 16, 17, 10, 13, 10, 15, 3, 12, 12, 16, 17, 12, 12, 16, 17, 10,
      //   13, 10, 15, 3, 12, 12,
      // ];
    },
  },

  watch: {
    listHourly(newValue) {
      if (newValue.length !== 0) {
        this.$nextTick(() => {
          this.createChartHourly24h();
        });
      }
    },
  },

  mounted() {
    if (this.listHourly && this.listHourly.length) {
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
      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#FFD600"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(1, "#FFA800"); // Màu dưới (#F5D400 với độ mờ 10%)
      const displayData = this.listUvIndexData.map((value) =>
        value === 0 ? 0.5 : value > 13 ? 13 : value
      );

      // Thay đổi màu sắc của từng cột dựa trên giá trị
      const backgroundColors = displayData.map((value) => {
        if (value <= 2) return "#389311"; // Màu cho giá trị thấp
        if (2 < value && value <= 5) return "#F3E52B"; // Màu cho giá trị trung bình
        if (5 < value && value <= 7) return "#EE621D"; // Màu cho giá trị cao
        if (7 < value && value <= 10) return "#CF2526"; // Màu cho giá trị rất cao
        return "#9064CB"; // Màu cho giá trị cực cao
      });

      const labelList = this.listHourly.map((item) => {
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
              label: "Uv Index",
              type: "bar",
              pointBackgroundColor: "#ffffff",
              borderWidth: 1,
              pointBorderColor: "#C27021",
              pointRadius: 5,
              backgroundColor: backgroundColors,
              fill: true,
              data: displayData,
              barThickness: 30,
              borderRadius: 20,
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
            },
            datalabels: {
              display: true,
              align: "end", // Position labels at the end of each bar
              anchor: "end", // Anchor labels to the end of each bar
              font: {
                size: 14,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: savedTheme === "light" ? "#333333" : "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
              formatter: (value, context) => {
                return value === 0.5 ? 0 : value;
              },
              offset: 0,
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
              beginAtZero: true,
              max: 14,
              min: 0,
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
<style lang=""></style>
