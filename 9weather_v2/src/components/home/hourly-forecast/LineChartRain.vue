<template>
  <div class="chart-container h-[calc(100%-140px)]">
    <div class="chart-wrapper">
      <canvas id="chart_hourly_rain" ref="canvas" height="110"></canvas>
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
// import backgroundImage from "@/assets/images/png/bg_rain.png";
import backgroundImage from "@/assets/images/svg/bg_rain_6.svg";
import pointImage from "@/assets/images/svg/ic_chance_of_rain.svg"; // Import ảnh bên cạnh điểm dữ liệu

// Đăng ký các thành phần cần thiết từ Chart.js, bao gồm cả Filler và DataLabels plugin
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
      return this.$store.state.getWeather.hourly;
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

      // Tạo một hình ảnh mới và đặt src của nó là đường dẫn đã import
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        // Lưu pattern và hình ảnh gốc vào data để sử dụng sau này
        this.pattern = ctx.createPattern(img, "repeat");
        //   this.pattern = pattern;
        this.img = img;

        // Tạo một hình ảnh mới và đặt src của nó là đường dẫn đã import cho ảnh điểm dữ liệu
        const pointImg = new Image();
        pointImg.src = pointImage;
        pointImg.onload = () => {
          this.pointImg = pointImg;
          // var chart_hourly_rain = Chart.getChart("chart_hourly_rain");
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }

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
                  borderColor: "#474A8D",
                  pointBackgroundColor: "#474A8D",
                  borderWidth: 1,
                  pointBorderColor: "#474A8D",
                  pointRadius: 3,
                  backgroundColor: this.pattern,
                  fill: true,
                  data: this.listDataProbability,
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
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                  title: {
                    display: false,
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
                  max: 110,
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
              },
            },
            plugins: [
              {
                afterDatasetsDraw: (chart) => {
                  const ctx = chart.ctx;
                  ctx.font = "10px Arial"; // Font for the text labels
                  ctx.fillStyle = "#003870"; // Color for the text labels

                  chart.data.datasets.forEach((dataset, datasetIndex) => {
                    const meta = chart.getDatasetMeta(datasetIndex);
                    meta.data.forEach((point, index) => {
                      const value = dataset.data[index];
                      const text = `${value}%`;

                      if (this.pointImg) {
                        // Calculate total width (image + text)
                        const textWidth = ctx.measureText(text).width;
                        const totalWidth = 24 + textWidth + 5; // 14 for image width, 5 for padding

                        // Calculate starting x position to center align the row
                        const startX = point.x - totalWidth / 2;

                        // Draw the image
                        ctx.drawImage(
                          this.pointImg,
                          startX + 10, // Horizontal position
                          point.y - 20, // Vertical position
                          14, // Image width
                          14 // Image height
                        );

                        // Draw the text
                        ctx.fillText(
                          text,
                          startX + 25, // Position text after the image and padding
                          point.y - 10 // Adjust vertical position to align with the image
                        );
                      }
                    });
                  });
                },
              },
            ],
          });
        };

        pointImg.onerror = (err) => {
          console.error("Error loading point image:", err);
        };
      };

      img.onerror = (err) => {
        console.error("Error loading background image:", err);
      };
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
