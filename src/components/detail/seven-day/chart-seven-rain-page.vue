<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
    <div class="w-full h-full p-4 overflow-hidden">
      <div class="text-left h-[30px] pl-1 pr-1">
        <a href="#" class="">
          <p class="txt_bold txt-v2">
            {{
              $t("Chance_of_rain_{name}_next_{number}_days.", {
                name: renderCityName,
              })
            }}
          </p>
        </a>
      </div>

      <!--  -->
      <div class="w-full items-center gap-2">
        <div id="chart" class="w-full">
          <apexchart
            type="area"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>

      <div class="flex justify-between items-center w-full pt-4">
        <div class="flex text-left items-center">
          <div class="w-[15px] rounded h-[15px] bg-rain"></div>
          <div class="txt_regular_14 ml-2 txt-rain">
            <span>{{ $t("Chance_of_rain") }}</span>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
import { convertToWeekdayAndDate } from "../../../utils/converValue.js";
export default {
  name: "chart-seven-rain-page",
  data() {
    return {
      series: [
        {
          name: "Chance of rain",
          data: [],
          borderColor: "#FADB38", // Border color of the line
          pointBackgroundColor: "#C27021", // Background color of the points
          pointBorderColor: "#C27021", // Border color of the points
        },
      ],
      chartOptions: {
        tooltip: {
          enabled: true, // Bật tooltip
          theme: "light", // Chủ đề của tooltip (có thể là 'light', 'dark', hoặc 'custom')
          x: {
            show: true, // Hiển thị thông tin của trục x trong tooltip
            format: "dd MMM", // Định dạng ngày tháng nếu trục x là thời gian
          },
          y: {
            formatter: function (value) {
              return value + "%"; // Định dạng giá trị hiển thị trong tooltip
            },
          },
          marker: {
            show: false, // Hiển thị marker (dấu chấm) trên tooltip
          },
          followCursor: true, // Tooltip di chuyển theo con trỏ chuột
        },
        fill: {
          colors: ["#60A5FA"],
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#428FDB"],
        markers: {
          size: 4,
          colors: ["#C27021"], // Background color of the points
          hover: {
            size: 7, // Size of the points when hovered
            strokeWidth: 3, // Width of the border when hovered
          },
        },
        chart: {
          height: 350,
          type: "bar",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
            type: "x",
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "75%",
            // barHeight: "50%",
            // distributed: true,
            borderRadius: 1,
            // barSpacing: 0,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true, // Enable data labels
          style: {
            fontSize: "12px", // Set font size
            colors: ["#003870"], // Set color of the data labels
          },
          background: {
            enabled: false, // Enable background for data labels
            borderRadius: 1, // Set border radius
            padding: 4,
            opacity: 0.9,
          },
          formatter: function (value) {
            return `${value}%`; // Format the label to include % sign
          },
        },
        stroke: {
          width: [1],
          curve: "smooth",
        },
        xaxis: {
          categories: [],
          tickPlacement: "on",
          tickAmount: 10,
          labels: {
            rotate: 0,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: true,
          min: 0,
          max: 100,
          labels: {
            show: true,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (value) => {
              return value + "%";
            },
          },
        },
      },
    };
  },

  computed: {
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
    currentDailyDataSeven() {
      return this.$store.state.getWeather.dailyDataSeven;
    },
  },

  watch: {
    currentDailyDataSeven(newValue) {
      this.handlerHumidity(newValue);
    },
  },

  mounted() {
    if (this.currentDailyDataSeven) {
      this.handlerHumidity(this.currentDailyDataSeven);
    }
  },

  methods: {
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
      return data.map((item) => Math.round(item?.precipProbability * 100) || 0);
    },

    generateCategories(data) {
      const categories = [];
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

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
<style lang="scss"></style>
