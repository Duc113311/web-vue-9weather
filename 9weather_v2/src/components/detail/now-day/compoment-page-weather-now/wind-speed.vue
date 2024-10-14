<template>
  <div class="w-full h-full overflow-hidden">
    <div
      class="w-full flex justify-start items-center gap-2 pb-2 bor_bottom_color"
    >
      <div class="flex items-center gap-2">
        <img
          width="20"
          height="20"
          src="../../../../assets/images/svg/ic_solar_wind_outline.svg"
          alt=""
        />
        <p class="txt_bold txt-v2">
          {{
            $t("Forecast_wind_speed_and_wind_direction_in_{name}", {
              name: renderCountry.city,
            })
          }}
        </p>
      </div>
    </div>
    <div class="w-full flex justify-between items-center gap-2 p-2">
      <p class="txt_regular_14">
        {{ convertToShortDay(objectCurrently?.time) }}
      </p>
      <p class="txt_regular_14">
        {{ convertToShortDayTime(objectCurrently?.time) }}
      </p>
    </div>
    <div class="w-full relative flex justify-between items-center">
      <div id="chart-speed" class="w-full">
        <apexchart
          type="area"
          :options="chartOptionsWinSpeed"
          :series="series"
        ></apexchart>
      </div>
    </div>

    <div class="w-full text-left">
      <div class="flex items-end gap-1">
        <p class="txt_regular_wind">
          {{ convertWindSpeed(objectCurrently?.windSpeed) }}
        </p>
        <p class="txt_light_14 pb-0.5">{{ convertUnitWindSpeed() }}</p>
        <p class="txt_regular_wind ml-1 color-footer">
          {{ convertWindDirectionFromDegrees(objectCurrently?.windBearing) }}
        </p>
      </div>
      <div>
        <p class="txt_light_10">
          {{ renderCountry.city }}, {{ renderCountry?.country }}
        </p>
      </div>
    </div>
  </div>
  <!-- ic_wind_direction -->
</template>

<script>
import {
  mphToMsInt,
  convertMPHtoMetPS,
  roundedNumber,
  convertMiToKm,
  convertMiToKnot,
  convertMiToBeaufortScale,
  codeToFind,
  getWindDirectionFromDegrees,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertTimestampNow12,
  convertTimestampNow24,
} from "../../../../utils/converValue.js";
export default {
  name: "wind-speed-weather",
  data() {
    return {
      series: [
        {
          name: "Wind Speed",
          data: [],
        },
      ],
      // listYAsis: [0.0, 0.45, 0.89, 1.34, 1.79, 2.24, 2.68, 3, 13],
      chartOptionsWinSpeed: {
        fill: {
          colors: "#01E1FF",
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#428FDB"],
        markers: {
          size: 4,
          colors: ["#1C84EE"], // Background color of the points
          hover: {
            size: 7, // Size of the points when hovered
            strokeWidth: 3, // Width of the border when hovered
          },
        },
        chart: {
          height: 350,
          type: "area",
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
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1],
          curve: "smooth",
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          categories: [],
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

          labels: {
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
        annotations: {
          points: [],
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

    renderPosition() {
      return this.$store.state.getWeather.cityCountry;
    },
  },

  watch: {
    listHourly(newValue) {
      this.handlerWindSpeed(newValue);
    },
  },

  mounted() {
    if (this.listHourly) {
      this.handlerWindSpeed(this.listHourly);
    }
  },

  methods: {
    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day} ${this.$t("month")} ${month}, ${year}`;
    },

    convertWindSpeed(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeWindSpeed_save === "m/s") {
        return convertMPHtoMetPS(value);
      }
      if (unitSetting.activeWindSpeed_save === "km/h") {
        return convertMiToKm(value);
      }
      if (unitSetting.activeWindSpeed_save === "Knot") {
        return convertMiToKnot(value);
      }
      if (unitSetting.activeWindSpeed_save === "bft") {
        return convertMiToBeaufortScale(value);
      }
      return value;
    },

    convertUnitWindSpeed(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activeWindSpeed_save);
    },

    convertWindDirectionFromDegrees(value) {
      return getWindDirectionFromDegrees(value);
    },

    convertToShortDayTime() {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampNow12(new Date(), 0, offsetValue);
      } else {
        return convertTimestampNow24(new Date(), 0, offsetValue);
      }
    },
    handlerWindSpeed(value) {
      const { categories, annotations } = this.generateCategories(value);
      this.series = [
        {
          name: "Wind Speed",
          data: this.generateSeriesData(value),
        },
      ];

      this.chartOptionsWinSpeed = {
        ...this.chartOptionsWinSpeed,
        xaxis: {
          ...this.chartOptionsWinSpeed.xaxis,
          categories: categories,
        },
        annotations: {
          points: annotations,
        },
      };
    },

    generateSeriesData(data) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return data.map((item) => {
        if (unitSetting.activeWindSpeed_save === "m/s") {
          return convertMPHtoMetPS(item.windSpeed);
        }
        if (unitSetting.activeWindSpeed_save === "km/h") {
          return convertMiToKm(item.windSpeed);
        }
        if (unitSetting.activeWindSpeed_save === "mi/h") {
          return item.windSpeed;
        }
        if (unitSetting.activeWindSpeed_save === "Knot") {
          return convertMiToKnot(item.windSpeed);
        }
        if (unitSetting.activeWindSpeed_save === "bft") {
          return convertMiToBeaufortScale(item.windSpeed);
        }
      });
    },
    generateCategories(data) {
      const categories = [];
      const annotations = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      if (data.length !== 0) {
        data.forEach((item, index) => {
          let timeConvert = 0;
          debugger;
          console.log("item", item);

          if (unitSetting.activeTime_save === "12h") {
            timeConvert = convertTimestampToHoursMinutes12(
              item?.time,
              1,
              offsetValue
            );
          } else {
            timeConvert = convertTimestampToHoursMinutes(
              item?.time,
              1,
              offsetValue
            );
          }
          categories.push(timeConvert);
          annotations.push({
            x: timeConvert,
            marker: {
              size: 0,
            },
            label: {
              text: this.getWindDirectionEmojiFromDegrees(item.windBearing),
              borderColor: "#c2c2c2",
              borderWidth: 0,
              borderRadius: 0,
              style: {
                background: "transparent",
                color: "#428FDB",
                fontSize: "12px",
              },
            },
          });
        });
      }

      return { categories, annotations };
    },
    getWindDirectionEmojiFromDegrees(windBearing) {
      windBearing = windBearing % 360;

      if (windBearing >= 22.5 && windBearing < 67.5) {
        return "↗";
      } else if (windBearing >= 67.5 && windBearing < 112.5) {
        return "→";
      } else if (windBearing >= 112.5 && windBearing < 157.5) {
        return "↘";
      } else if (windBearing >= 157.5 && windBearing < 202.5) {
        return "↓";
      } else if (windBearing >= 202.5 && windBearing < 247.5) {
        return "↙";
      } else if (windBearing >= 247.5 && windBearing < 292.5) {
        return "←";
      } else if (windBearing >= 292.5 && windBearing < 337.5) {
        return "↖";
      } else {
        return "↑";
      }
    },
  },
};
</script>

<style></style>
