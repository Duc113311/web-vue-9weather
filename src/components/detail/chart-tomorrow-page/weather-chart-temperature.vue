<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
    <div class="w-full h-full p-4 overflow-hidden">
      <div class="text-left h-[30px] pl-1 pr-1">
        <a href="#" class="feature-location d-flex mb-3">
          <p class="txt_bold txt-v2">
            {{
              $t("Temperature_in_{name}_tomorrow_by_hour", {
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
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="w-full flex text-left pt-4">
        <div class="flex text-left items-center">
          <div class="w-[15px] rounded h-[15px] bg-temp"></div>
          <div class="txt_regular_14 ml-2 txt-temp">
            <span>{{ $t("Temperature_{name}") }}</span>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
import {
  fahrenheitToCelsiusNot,
  celsiusToFahrenheitNot,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
} from "../../../utils/converValue.js";
export default {
  name: "weather-chart-temperature",

  data() {
    return {
      series: [
        {
          name: "Temperature",
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
              return value + "°"; // Định dạng giá trị hiển thị trong tooltip
            },
          },
          marker: {
            show: true, // Hiển thị marker (dấu chấm) trên tooltip
          },
          followCursor: true, // Tooltip di chuyển theo con trỏ chuột
        },
        fill: {
          colors: "#709F23",
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#709F23"],
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
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
            type: "x",
          },
        },

        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true, // Enable data labels
          style: {
            fontSize: "10px", // Set font size
            colors: ["#003870"], // Set color of the data labels
          },
          offsetY: -8, // Adjust vertical offset
          background: {
            enabled: false, // Enable background for data labels
            borderRadius: 1, // Set border radius
            padding: 4,
            opacity: 0.9,
          },
          formatter: function (value) {
            return `${value}°`; // Format the label to include % sign
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
              colors: "#709F23",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: true,
          min: 0,
          max: 50,
          labels: {
            show: true,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (value) => {
              return value;
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

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },
  },

  watch: {
    paramTomorrowData(newValue) {
      this.handlerTemperature(newValue);
    },
  },

  mounted() {
    if (this.paramTomorrowData) {
      this.handlerTemperature(this.paramTomorrowData);
    }
  },

  methods: {
    handlerTemperature(value) {
      const categories = this.generateCategories(value);
      this.series = [
        {
          name: "Temperature",
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
      const unitSetting = this.objectSetting;
      return data.map((item) =>
        unitSetting.activeTemperature_save === "f"
          ? celsiusToFahrenheitNot(item.temperature)
          : fahrenheitToCelsiusNot(item.temperature)
      );
    },

    generateCategories(data) {
      const categories = [];

      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (data.lenth !== 0) {
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
