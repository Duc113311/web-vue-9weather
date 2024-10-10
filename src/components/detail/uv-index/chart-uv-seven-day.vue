<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
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
          {{
            $t("Uv_index_{name}_next_{number}_days.", {
              name: renderCityName,
              number: 30,
            })
          }}
        </p>
      </div>
    </div>

    <div class="w-full flex justify-between items-center">
      <div id="chart" class="w-full">
        <apexchart
          type="area"
          height="300"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
    <!--  -->
    <div class="w-full text-left">
      <div class="flex items-end gap-1">
        <p class="txt_regular_wind">
          {{ Math.round(objectCurrently?.cloudCover * 100) }}%
        </p>
      </div>
      <div>
        <p class="txt_light_10">
          {{ renderCountry.city }}, {{ renderCountry.country }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { convertToWeekdayAndDate } from "../../../utils/converValue.js";
export default {
  name: "chart-uv-seven-day",

  data() {
    return {
      series: [
        {
          name: "Uv Index",
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
            show: false, // Hiển thị marker (dấu chấm) trên tooltip
          },
          followCursor: true, // Tooltip di chuyển theo con trỏ chuột
        },
        fill: {
          colors: "#4bbf24",
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
            columnWidth: "50%",
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
            colors: ["#00315A"], // Set color of the data labels
          },
          background: {
            enabled: false, // Enable background for data labels
            borderRadius: 1, // Set border radius
            padding: 4,
            opacity: 0.9,
          },
          formatter: function (value) {
            return `${value}`; // Format the label to include % sign
          },
        },
        stroke: {
          width: [1],
          curve: "smooth",
        },
        xaxis: {
          categories: [],
          tickPlacement: "on",
          labels: {
            rotate: 0,
            style: {
              colors: "#4bbf24",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: true,
          min: 0,
          max: 13,
          labels: {
            show: true,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (value) => {
              return Math.round(value);
            },
          },
        },
      },
    };
  },

  computed: {
    objectCurrently() {
      return this.$store.state.getWeather.currently;
    },
    renderCountry() {
      return this.$store.state.getWeather.countryFilter;
    },

    currentDailyDataSeven() {
      return this.$store.state.getWeather.dailyDataSeven;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
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
          name: "Uv Index",
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
      return data.map((element) => Math.round(element.uvIndex));
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
