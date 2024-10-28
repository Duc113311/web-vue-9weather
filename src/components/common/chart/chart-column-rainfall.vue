<template>
  <div class="w-[86rem] absolute bottom-6 right-1">
    <div id="chart" class="w-full">
      <apexchart
        type="bar"
        :options="chartOptions"
        :series="series"
        height="140"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import { convertToWeekdayAndDate } from "@/utils/converValue";

export default {
  name: "chart-column-rainfall",
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          stacked: true,
          stackType: "100%",
          height: "100%",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%", // Giảm kích thước cột
            borderRadius: 16,
            endingShape: "rounded",
            barPadding: 1.5,
            dataLabels: {
              position: "bottom", // Đảm bảo label ở dưới cột
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            const seriesIndex = opts.seriesIndex;
            const dataPointIndex = opts.dataPointIndex;
            const w = opts.w;
            if (seriesIndex === 0) {
              const value = w.globals.series[0][dataPointIndex].toFixed(1);
              return value; // Sử dụng ký tự Zero Width Space
            }
          },
          style: {
            colors: ["#ffffff"],
            fontSize: "12px",
            fontWeight: "bold",
          },
          offsetY: 0,
          position: "bottom",
          textAnchor: "middle", // Căn giữa text
        },
        stroke: {
          curve: "smooth",
          width: [0, 0, 2], // Độ rộng cho mỗi series, 2px cho đường
        },
        xaxis: {
          categories: [
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

          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },

          max: 15,
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        colors: ["#0C61EE", "rgba(255, 255, 255, 0.15)"], // Màu xanh cho giá trị thực, xám cho phần còn lại
        fill: {
          opacity: 1,
        },
      },
    };
  },

  computed: {
    // currentDailyDataSeven() {
    //   return this.$store.state.weatherModule.hourly24h;
    // },

    categoryLength() {
      return [];
    },
    series() {
      const data = [
        0.4, 0.8, 0.7, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.7, 0.3, 0.2,
        0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.7, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2,
      ];
      const maxValue = 1; // Giá trị tối đa cho mỗi cột
      return [
        {
          name: "Actual Value",
          data: data,
        },
        {
          name: "Remaining",
          data: data.map((value) => maxValue - value),
        },
      ];
    },
  },

  watch: {
    // currentDailyDataSeven(newValue) {
    //   this.handlerHumidity(newValue);
    // },
  },

  mounted() {
    // if (this.currentDailyDataSeven) {
    //   this.handlerHumidity(this.currentDailyDataSeven);
    // }
  },

  methods: {
    getColor(value) {
      if (value >= 100) return "#00FF00";
      if (value >= 75) return "#FFFF00";
      if (value >= 50) return "#FFA500";
      return "#FF0000";
    },
    handlerHumidity(value) {
      const categories = this.generateCategories(value);
      this.series = [
        {
          name: "Chance of rain",
          type: "bar",
          data: this.generateSeriesData(value),
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: categories,
        },
      };
    },

    generateSeriesData(data) {
      return data.map((item) => Math.round(item?.precipIntensity) || 0);
    },

    generateCategories(data) {
      const categories = [];
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;

      if (data.length !== 0) {
        data.forEach((item, index) => {
          let timeConvert = convertToWeekdayAndDate(
            item?.time,
            offsetValue
          ).date;

          categories.push(timeConvert);
        });
      }

      return categories;
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%; /* Đặt chiều rộng lớn hơn để kích hoạt cuộn ngang nếu cần */
}
</style>
