<template>
  <div class="chartCard w-full h-full overflow-hidden">
    <div
      class="w-full flex justify-start items-center gap-2 pb-2 bor_bottom_color"
    >
      <div class="flex items-center gap-2">
        <img
          src="../../../assets/images/svg/svg_ic_uv.xml.svg"
          width="20"
          height="20"
          alt=""
        />
        <p class="txt_bold txt-v2">
          {{ $t("Uv_index_{name}_today", { name: renderCityName }) }}
        </p>
      </div>
    </div>

    <div class="flex justify-between w-full pad-option-tb-8">
      <el-tabs type="border-card" class="w-full equal-width-tabs">
        <el-tab-pane>
          <template #label>
            <div>
              <p class="title-tab">{{ $t("Short") }}</p>
              <p class="des-atb">0-2</p>
            </div>
          </template>
          <template #default>
            <div class="text-left">
              <p>
                {{
                  $t(
                    "Low_UV_levels,_no_need_for_special_protection_when_outdoors."
                  )
                }}
              </p>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <div>
              <p class="title-tab">{{ $t("Medium") }}</p>
              <p class="des-atb">3-5</p>
            </div>
          </template>
          <template #default>
            <div class="text-left">
              <p>
                {{
                  $t(
                    "There_is_a_moderate_risk_from_UV_rays._Sunglasses_and_sunscreen_are_recommended."
                  )
                }}
              </p>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <div>
              <p class="title-tab">{{ $t("High") }}</p>
              <p class="des-atb">6-7</p>
            </div>
          </template>
          <template #default>
            <div class="text-left">
              {{
                $t(
                  "UV_rays_are_highly_intense._You_should_limit_going_out_during_the_middle_of_the_day,_use_protective_clothing,_sunglasses,_and_sunscreen."
                )
              }}
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <div>
              <p class="title-tab">{{ $t("Very_high") }}</p>
              <p class="des-atb">8-10</p>
            </div>
          </template>
          <template #default>
            <div class="text-left">
              {{
                $t(
                  "The_risk_from_UV_rays_is_very_high._Increase_protective_measures_such_as_wearing_a_wide-brimmed_hat,_using_high_SPF_sunscreen,_and_seeking_shade_when_outdoors."
                )
              }}
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <div>
              <p class="title-tab">{{ $t("Extremely_high") }}</p>
              <p class="des-atb">> 10</p>
            </div>
          </template>
          <template #default>
            <div class="text-left">
              {{
                $t(
                  "UV_rays_are_extremely_dangerous._Avoid_going_outdoors_during_this_time_if_possible,_and_if_you_must_go_out,_take_all_possible_protective_measures."
                )
              }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--  -->
    <div class="chartBox">
      <div class="colLarge items">
        <div class="box">
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div class="colSmall items2">
        <canvas id="myChart2"></canvas>
      </div>
    </div>
    <!--  -->
    <div class="flex justify-between w-full pad-option-tb-8">
      <div class="flex flex-col justify-start items-start">
        <p class="txt_light_summer">
          {{ $t("World_Health_Organization_UVI") }} /
          <span class="txt_regular_14">
            {{ Math.round(objectCurrently?.uvIndex) }}
            {{ convertUvSummaryName(objectCurrently?.uvIndex) }}
          </span>
        </p>

        <p class="txt_light_summer">
          {{ renderCountry.city }}, {{ renderCountry.country }}
        </p>
      </div>
      <div class="txt_regular_14">
        {{ convertToShortDayTime(objectCurrently.time) }}
      </div>
    </div>
  </div>
</template>

<script>
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
  BarController,
  BarElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  LineController,
  annotationPlugin,
  zoomPlugin,
  BarController,
  BarElement,
  ChartDataLabels
);
import {
  convertTimestampToHoursMinutes12,
  getUvSummaryName,
  convertTimestampToHoursMinutes,
} from "../../../utils/converValue";
export default {
  name: "chart-uv-index",
  data() {
    return {
      myChart: null,
    };
  },

  computed: {
    paramDailyData() {
      return this.$store.state.getWeather.hourly48;
    },
    listDataUvIndex() {
      return this.paramDailyData.map((element) => Math.round(element.uvIndex));
    },
    listLabelsUvIndex() {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return this.paramDailyData.map((element) =>
        unitSetting.activeTime_save === "12h"
          ? convertTimestampToHoursMinutes12(element?.time, 1, offsetValue)
          : convertTimestampToHoursMinutes(element?.time, 1, offsetValue)
      );
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },

    objectCurrently() {
      return this.$store.state.getWeather.currently;
    },

    renderCountry() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName;
      }
      return "";
    },
  },

  mounted() {
    if (this.paramDailyData && this.paramDailyData.length) {
      this.$nextTick(() => {
        this.dragScroll();
        this.createChartUvIndex();
        // this.createChartUvIndexTwo();
      });
    }
  },

  watch: {
    paramDailyData(newData) {
      if (newData.length !== 0) {
        this.$nextTick(() => {
          this.dragScroll();
          this.createChartUvIndex();
          // this.createChartUvIndexTwo();
        });
      }
    },
  },
  methods: {
    convertUvSummaryName(value) {
      return getUvSummaryName(value);
    },

    convertToShortDayTime(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(value, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(value, 1, offsetValue);
      }
    },

    //
    dragScroll() {
      const slider = document.querySelector(".items");
      const slider2 = document.querySelector(".items2");

      let isDown = false;
      let startX;
      let scrollLeft;

      slider2.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider2.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider2.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider2.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    },

    createChartUvIndex() {
      const ctx = document.getElementById("myChart").getContext("2d");

      // Tạo gradient với 3 màu khác nhau
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(255, 10, 215, 0.8)"); // Màu 1 với độ mờ 0.8
      gradient.addColorStop(0.4, "rgba(255, 183, 19, 0.8)"); // Màu 2 với độ mờ 0.8
      gradient.addColorStop(0.7, "rgba(159, 246, 142, 0.8)"); // Màu 3 với độ mờ 0.8
      const data = {
        labels: this.listLabelsUvIndex,
        datasets: [
          {
            label: "uvIndex",
            data: this.listDataUvIndex,
            backgroundColor: gradient,
            borderColor: "#3448FC",
            borderWidth: 1,
            withDefaults: 10,
            pointBorderColor: "white",
            pointRadius: 3,
            fill: true,
          },
        ],
      };
      const config = {
        type: "bar",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true, // Tự động bỏ qua một số nhãn
                maxTicksLimit: 16, // Số lượng nhãn tối đa trên trục X
                align: "center", // Canh giữa
                rotation: 0, // Hiển thị nhãn theo chiều ngang
                color: "#3448FC", // Màu chữ cho trục Y
              },
              grid: {
                display: false, // Bỏ lưới dọc
              },
            },
            y: {
              position: "left",
              min: 0, // Giá trị tối thiểu
              max: 13,
              ticks: {
                display: false,
                stepSize: 1, // Khoảng cách giữa các đơn vị
                color: "#3448FC", // Màu chữ cho trục Y
              },
              grid: {
                lineWidth: 1,
                // color: "white", // màu biểu đồ đg kẻ
                drawTicks: false,
                borderColor: "rgba(255, 26, 104, 1)",
                drawBorder: false,
              },
              beginAtZero: true,
              afterFit: (ctx) => {
                ctx.width = 35;
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: true, // Hiển thị nhãn dữ liệu
              color: "#003870", // Màu chữ của nhãn dữ liệu
              anchor: "end", // Vị trí của nhãn dữ liệu
              align: "top", // Căn chỉnh nhãn dữ liệu
              formatter: (value) => {
                return value === 0 ? "" : `${value}`; // Định dạng nhãn dữ liệu
              },
            },
            tooltip: {
              enabled: true,
            },
            font: {
              size: 10,
              //   weight: "bold", // Chỉnh độ đậm của chữ
            },
            color: "#003870", // Thay đổi màu sắc của nhãn dữ liệu
            offset: 1,
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
        },
      };

      if (this.myChart) this.myChart.destroy();
      this.myChart = new Chart(document.getElementById("myChart"), config);
    },

    createChartUvIndexTwo() {
      const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Weekly Sales",
            data: this.myChart.data.datasets[0].data,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#3448FC",
            withDefaults: 10,
            pointBorderColor: "white",
            fill: true,
          },
        ],
      };
      const config = {
        type: "bar",
        data,
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              bottom: 28.5,
              left: 0,
            },
          },
          scales: {
            x: {
              display: false,
              ticks: {
                display: false,
                color: "#3448FC", // Màu chữ cho trục Y
              },
              grid: {
                drawTicks: false,
              },
            },
            y: {
              position: "right",
              min: 0, // Giá trị tối thiểu
              max: 13,
              ticks: {
                stepSize: 1, // Khoảng cách giữa các đơn vị
                color: "#3448FC", // Màu chữ cho trục Y
              },
              grid: {
                lineWidth: 1,
                // color: "white", // màu biểu đồ đg kẻ
              },
              beginAtZero: true,
              afterFit: (ctx) => {
                ctx.width = 35;
              },
            },
          },
          plugins: {
            annotation: {
              annotations: {
                label0: {
                  type: "label",
                  xAdjust: -10,
                  xValue: 0,
                  yValue: 11.3,
                  backgroundColor: "transparent",
                  content: ["Very High"],
                  font: {
                    size: 12,
                  },
                  color: "#3448FC", // Màu chữ cho trục Y
                },
                label1: {
                  type: "label",
                  xAdjust: 30,
                  xValue: 0,
                  yValue: 8.3,
                  backgroundColor: "transparent",
                  content: ["High"],
                  font: {
                    size: 12,
                  },
                  color: "#3448FC", // Màu chữ cho trục Y
                },
                label2: {
                  type: "label",
                  xAdjust: 30,
                  xValue: 0,
                  yValue: 5.3,
                  backgroundColor: "transparent",
                  content: ["Moderate"],
                  font: {
                    size: 12,
                  },
                  color: "#3448FC", // Màu chữ cho trục Y
                },
                label3: {
                  type: "label",
                  xAdjust: 30,
                  xValue: 0,
                  yValue: 2.3,
                  backgroundColor: "transparent",
                  content: ["Low"],
                  font: {
                    size: 12,
                  },
                  color: "#3448FC", // Màu chữ cho trục Y
                },
              },
            },
            legend: {
              display: false,
            },
            datalabels: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
            font: {
              size: 10,
              //   weight: "bold", // Chỉnh độ đậm của chữ
            },
            color: "#003870", // Thay đổi màu sắc của nhãn dữ liệu
            offset: 1,
            formatter: (value, context) => {
              return `${value}°`;
            },
          },
        },
      };
      // render init block
      if (this.myChart2) this.myChart2.destroy();
      this.myChart2 = new Chart(document.getElementById("myChart2"), config);
    },
  },
};
</script>

<style lang="scss" scoped>
.chartCard {
  /* background: rgba(54, 162, 235, 0.2); */
}
.chartBox {
  width: 100%;
  /* padding: 20px; */
  height: 100%;
  /* border-radius: 20px; */
  /* border: solid 3px rgba(54, 162, 235, 1); */
  /* background: white; */
  display: flex;
  position: relative;

  justify-content: left;
}
.colSmall {
  position: absolute;
  max-width: 100%;
  width: 100%;
  height: 350px;
}
.colLarge {
  max-width: 100%;
  width: calc(100% - 35px);
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}

.box {
  width: 200%;
  height: 350px;
}
</style>
