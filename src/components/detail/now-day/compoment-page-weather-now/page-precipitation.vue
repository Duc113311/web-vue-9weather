<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="w-full flex justify-start items-center gap-2 pb-2 bor_bottom_color"
    >
      <div class="flex items-center gap-2">
        <img
          width="24"
          height="24"
          src="../../../../assets/images/svg/ic_material_symbols_water_drop_outline.svg"
          alt=""
        />
        <p class="txt_bold txt-v2">
          {{
            $t("Rainfall_and_chance_of_rain_in_the_coming_hours_in_{name}", {
              name: renderCountry.city,
            })
          }}
        </p>
      </div>
    </div>
    <!--  -->
    <div class="w-full flex justify-between items-center gap-2 p-2">
      <p class="txt_regular_14">
        {{ convertToShortDay(objectCurrently.time) }}
      </p>
      <p class="txt_regular_14">
        {{ convertToShortDayTime(objectCurrently.time) }}
      </p>
    </div>
    <!--  -->
    <div class="w-full flex items-center">
      <div id="chart" class="w-full">
        <apexchart
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>

    <!--  -->
    <div class="w-full text-left">
      <div class="flex items-center justify-between gap-1 txt_regular_12">
        <div class="flex items-center gap-1 txt_light">
          <img
            width="20"
            src="../../../../assets/images/svg/ic_solar_chart_bold.svg"
            alt=""
          />
          <p class="pt-2">{{ $t("Precipitation") }}</p>
        </div>
        <div class="flex items-center gap-1 txt_light">
          <img
            width="20"
            src="../../../../assets/images/svg/ic_mynaui_chart_line.svg"
            alt=""
          />
          <p>Chance of rain</p>
        </div>
      </div>
      <div class="flex justify-between items-center w-full pad-option-hourly">
        <div class="flex text-left">
          <div class="flex text-left items-center">
            <div class="w-[15px] rounded h-[15px] bg-rain"></div>
            <div class="txt_light ml-2 txt-rain">
              <span>Change of rain</span>
            </div>
          </div>
        </div>
        <div class="flex text-left">
          <div class="flex text-left items-center">
            <div class="w-[15px] rounded h-[15px] bg-snow"></div>
            <div class="txt_light ml-2 txt-snow">
              <span>Change of snow</span>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="txt_medium_14">
          {{ convertPrecipitation(convertPrecipitationValue()) }}
        </div>
        <div class="txt_regular_wind">
          {{
            $t("Total_in_the_next_{number}_hours", {
              number: convertTimeHours(),
            })
          }}
        </div>
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
import {
  convertMillimetToInch,
  convertMillimet,
  codeToFind,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertTimestampNow12,
  convertTimestampNow24,
} from "../../../../utils/converValue.js";
export default {
  name: "precipitation-weather2",
  components: {},
  data() {
    return {
      series: [
        {
          name: "precip intensity",
          type: "column",
          data: [],
        },
      ],
      chartOptions: {
        markers: {
          size: 4,
          colors: "#595C98", // Background color of the points
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
            enabled: false,
          },
        },
        legend: {
          show: false,
        },
        stroke: {
          width: [0, 1],
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [1],
          formatter: function (val, opts) {
            return val;
          },
          style: {
            fontSize: "6px",
          },
          background: {
            enabled: true,
            borderRadius: 4,
            padding: 1,
            foreColor: "#000000",
          },
        },
        tooltip: {
          enabled: true,
        },
        yaxis: [
          {
            labels: {
              style: {
                colors: "#595C98",
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                cssClass: "apexcharts-yaxis-label",
              },
              formatter: (value) => {
                return value;
              },
            },
          },
          {
            opposite: true,
            min: 0,
            max: 100,
            labels: {
              style: {
                colors: "#595C98",
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                cssClass: "apexcharts-yaxis-label",
              },
              formatter: (value) => {
                return value + "%";
              },
            },
          },
        ],

        xaxis: {
          categories: [],
          tickPlacement: "on",
          tickAmount: 6,
          labels: {
            rotate: 0,
            style: {
              colors: "#595C98",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        plotOptions: {
          bar: {
            distributed: false, // Không phân phối màu tự động
            columnWidth: "100%", // Điều chỉnh kích thước cột (0% - 100%)
            borderRadius: 1, // Làm tròn các góc cột
          },
        },
      },
    };
  },
  computed: {
    listHourly() {
      return this.$store.state.getWeather.hourly;
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
      return {
        city: "",
        country: "",
      };
    },
  },
  watch: {
    listHourly(newValue) {
      this.handlerPrecipitation(newValue);
    },
  },
  mounted() {
    if (this.listHourly.length !== 0) {
      this.handlerPrecipitation(this.listHourly);
    }
  },
  methods: {
    convertPrecipitationValue() {
      const listData = this.listHourly;
      let resultValue = 0;
      for (let index = 0; index < listData.length; index++) {
        const element = listData[index];

        resultValue += element.precipIntensity;
      }
      return resultValue;
    },
    convertTimeHours() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return 12;
      }
      if (unitSetting.activeTime_save === "24h") {
        return 24;
      }
    },
    convertPrecipitation(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        return val + " " + codeToFind(unitSetting.activePrecipitation_save);
      } else {
        return (
          convertMillimetToInch(val) +
          " " +
          codeToFind(unitSetting.activePrecipitation_save)
        );
      }
    },
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day} ${this.$t("month")} ${month}, ${year}`;
    },
    convertToShortDayTime(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampNow12(new Date(), 0, offsetValue);
      } else {
        return convertTimestampNow24(new Date(), 0, offsetValue);
      }
    },
    handlerPrecipitation(value) {
      const categories = this.generateCategories(value);

      let rainData = [];
      let snowData = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      value.forEach((item) => {
        if (item.precipType.toString() === "Rain") {
          if (unitSetting.activePrecipitation_save === "mm") {
            rainData.push(item.precipIntensity);
            snowData.push(null);
          } else {
            rainData.push(convertMillimetToInch(item?.precipIntensity));
            snowData.push(null);
          }
        } else if (item.precipType.toString() === "Snow") {
          if (unitSetting.activePrecipitation_save === "mm") {
            snowData.push(item.precipIntensity);
            rainData.push(null);
          } else {
            snowData.push(convertMillimetToInch(item?.precipIntensity));
            rainData.push(null);
          }
        }
      });

      let precipIntensity = this.generateSeriesData(value);

      this.series = [
        {
          name: "Rain Intensity",
          type: "column",
          data: rainData,
          color: "#60A5FA", // Màu cho Rain
        },

        {
          name: "Probability of Rain",
          type: "line",
          data: precipIntensity, // New data for the line series
          color: "#428FDB", // Color for the line series
          stroke: {
            width: 2, // Line thickness
          },
          markers: {
            size: 4, // Size of the markers on the line
            colors: "#428FDB", // Color of the markers
            hover: {
              size: 6, // Size of the markers when hovered
              strokeWidth: 3, // Border width of the markers when hovered
            },
          },
          tooltip: {
            enabled: true, // Enable tooltips for the line series
            shared: true, // Share tooltip across series
            intersect: false, // Show tooltip for the closest point
          },
        },

        {
          name: "Snow Intensity",
          type: "column",
          data: snowData,
          color: "#C79062", // Màu cho Snow
        },
      ];

      this.chartOptions = {
        ...this.chartOptions,
        stroke: {
          width: [0, 2, 0], // Width of the strokes for each series (columns and line)
          curve: "smooth",
        },
        markers: {
          size: [0, 4, 0], // No markers for columns, but markers for the line series
        },
        tooltip: {
          shared: true, // Show tooltips for all series when hovering over any point
          intersect: false, // Allow tooltip to show for all series when hovering over a point
        },
        yaxis: [
          {
            labels: {
              style: {
                colors: "#595C98",
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                cssClass: "apexcharts-yaxis-label",
              },
              formatter: (value) => value?.toFixed(2),
            },
          },
          {
            // Add this y-axis for the line series
            opposite: true,
            min: 0,
            max: 100,
            labels: {
              style: {
                colors: "#595C98", // Color for the probability axis labels
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
              },
              formatter: (value) => `${value}%`, // Format for the probability axis
            },
          },
        ],
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: categories,
        },
      };
    },

    generateSeriesData(data) {
      return data.map((item) => Math.round(item.precipProbability * 100) || 0);
    },

    generateCategories(data) {
      const categories = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      if (data.length !== 0) {
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

<style></style>
