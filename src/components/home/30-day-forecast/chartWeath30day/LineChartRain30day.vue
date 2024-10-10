<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <canvas id="chart_30_day_rain" ref="canvas" height="110"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";

// import backgroundImage from "@/assets/images/png/bg_rain.png";
import backgroundImage from "@/assets/images/svg/bg_rain_6.svg";
import pointImage from "@/assets/images/svg/ic-chance-of-rain.svg"; // Import ảnh bên cạnh điểm dữ liệu

export default {
  data() {
    return {
      chart: null,
      pattern: null,
      img: null,
      pointImg: null, // Add an image object to the data
    };
  },

  computed: {
    paramDailyData() {
      return this.$store.state.getWeather.listDaily30Day;
    },

    listDataProbability() {
      return this.paramDailyData.map((element) =>
        Math.round(element.precipProbability * 100)
      );
    },
  },

  watch: {
    paramDailyData(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          this.createChartRain();
        });
      }
    },
  },

  mounted() {
    if (
      this.paramDailyData &&
      this.paramDailyData.length &&
      this.listDataProbability.length
    ) {
      this.$nextTick(() => {
        this.createChartRain();
      });
    }
  },

  methods: {
    createChartRain() {
      const canvas = document.getElementById("chart_30_day_rain");
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
          var chart_30_day_rain = Chart.getChart("chart_30_day_rain");
          if (chart_30_day_rain) {
            chart_30_day_rain.destroy();
          }

          chart_30_day_rain = new Chart(ctx, {
            type: "line",
            data: {
              labels: this.listDataProbability,
              datasets: [
                {
                  label: "Rain",
                  borderColor: "#474A8D",
                  pointBackgroundColor: "#474A8D",
                  borderWidth: 1,
                  withDefaults: 10,
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
              // Bỏ hiển thị tọa độ
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
              // {
              //   // Plugin tùy chỉnh để vẽ ảnh bên cạnh các điểm dữ liệu
              //   afterDatasetsDraw: (chart) => {
              //     const ctx = chart.ctx;
              //     chart.data.datasets.forEach((dataset, datasetIndex) => {
              //       // console.log(datasetIndex, dataset);
              //       //   if (datasetIndex == 1) {
              //       //     return false;
              //       //   }
              //       const meta = chart.getDatasetMeta(datasetIndex);
              //       meta.data.forEach((point, index) => {
              //         if (this.pointImg) {
              //           ctx.drawImage(
              //             this.pointImg,
              //             point.x - 7, // Điều chỉnh vị trí ngang của ảnh
              //             point.y - 10, // Điều chỉnh vị trí dọc của ảnh
              //             14, // Chiều rộng của ảnh
              //             14 // Chiều cao của ảnh
              //           );
              //         }
              //       });
              //     });
              //   },
              // },
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
                        const totalWidth = 14 + textWidth + 5; // 14 for image width, 5 for padding

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
