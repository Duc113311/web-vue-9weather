<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
    <div class="w-full h-full p-4 overflow-hidden">
      <div class="text-left h-[30px] pl-1 pr-1">
        <a href="#" class="">
          <p class="txt_bold txt-v2">
            {{
              $t("Chance_of_rain_in_{name}_tomorrow_by_the_hour", {
                name: renderCityName,
              })
            }}
          </p>
        </a>
      </div>

      <!--  -->
      <div class="w-full items-center gap-2 h-[300px]">
        <div id="chart" class="w-full">
          <apexchart
            type="area"
            height="300"
            :options="chartOptionsRainTomw"
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
        <div class="flex text-left items-center">
          <div class="w-[15px] rounded h-[15px] bg-snow"></div>
          <div class="txt_regular_14 ml-2 txt-snow">
            <span>{{ $t("Chance_of_snow") }}</span>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
import {
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
} from "../../../utils/converValue.js";
export default {
  name: "weather-chart-rain-tow",

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
      chartOptionsRainTomw: {
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
          type: "bar", // Change chart type to "bar"
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
            borderRadius: 1,
          },
        },
        legend: {
          show: false,
        },

        stroke: {
          width: [1],
          curve: "smooth",
        },
        dataLabels: {
          enabled: true, // Enable data labels
          style: {
            fontSize: "10px", // Set font size
            colors: ["#003870"], // Set color of the data labels
          },
          offsetY: -10, // Adjust vertical offset
          background: {
            enabled: false, // Enable background for data labels
            borderRadius: 1, // Set border radius
            padding: 4,
            opacity: 0.9,
          },
          formatter: function (value) {
            return `${Math.round(value)}%`; // Format the label to include % sign
          },
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
            formatter: function (value, index) {
              // Show label for every second category
              if (index % 2 === 0) {
                return value + "%";
              } else {
                return value; // Hide the label
              }
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

    paramTomorrowData() {
      return this.$store.state.getWeather.tomorrowData;
    },
  },

  watch: {
    paramTomorrowData(newValue) {
      this.handlerHumidity(newValue);
    },
  },

  mounted() {
    if (this.paramTomorrowData.length !== 0) {
      debugger;
      this.handlerHumidity(this.paramTomorrowData);
    }
  },

  methods: {
    handlerHumidity(value) {
      const categories = this.generateCategories(value);

      // Check if categories is an array
      if (Array.isArray(categories)) {
        this.series = [
          {
            name: "Chance of rain",
            type: "bar",
            data: this.generateSeriesData(value),
          },
        ];

        // Ensure chartOptionsRainTomw is correctly structured
        if (this.chartOptionsRainTomw && this.chartOptionsRainTomw.xaxis) {
          if (Array.isArray(this.chartOptionsRainTomw.xaxis.categories)) {
            this.chartOptionsRainTomw = {
              ...this.chartOptionsRainTomw,
              xaxis: {
                ...this.chartOptionsRainTomw.xaxis,
                categories: categories,
              },
            };
          } else {
            console.error("Xaxis categories is not a valid array");
          }
        }
      } else {
        console.error("Categories is not a valid array:", categories);
      }
    },

    generateSeriesData(data) {
      return data.map((item) => item.precipProbability * 100);
    },

    generateCategories(data) {
      let categories = [];
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (Array.isArray(data) && data.length !== 0) {
        debugger;
        data.forEach((item, index) => {
          let timeConvert = "";

          if (unitSetting.activeTime_save === "12h") {
            timeConvert = convertTimestampToHoursMinutes12(
              item?.time,
              0,
              offsetValue
            );
          } else {
            timeConvert = convertTimestampToHoursMinutes(
              item?.time,
              0,
              offsetValue
            );
          }

          categories.push(timeConvert);
        });
      }

      return categories;
    },
  },
};
</script>
<style lang="scss">
//
</style>
