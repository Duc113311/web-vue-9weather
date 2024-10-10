<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
    <div class="w-full h-full overflow-hidden">
      <div class="text-left h-[30px] pl-1 pr-1">
        <a href="#" class="">
          <p class="txt_bold txt-v2">
            {{
              $t("Uv_index_{name}_next_{number}_days.", {
                name: renderCityName,
                number: 30,
              })
            }}
          </p>
        </a>
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
              <div class="text-left txt_light_summer">
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
              <div class="text-left txt_light_summer">
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
              <div class="text-left txt_light_summer">
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
              <div class="text-left txt_light_summer">
                <p>
                  {{
                    $t(
                      "The_risk_from_UV_rays_is_very_high._Increase_protective_measures_such_as_wearing_a_wide-brimmed_hat,_using_high_SPF_sunscreen,_and_seeking_shade_when_outdoors."
                    )
                  }}
                </p>
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
              <div class="text-left txt_light_summer">
                <p>
                  {{
                    $t(
                      "UV_rays_are_extremely_dangerous._Avoid_going_outdoors_during_this_time_if_possible,_and_if_you_must_go_out,_take_all_possible_protective_measures."
                    )
                  }}
                </p>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--  -->
      <div class="w-full items-center gap-2">
        <div id="chart" class="w-full">
          <apexchart
            type="area"
            :options="chartOptionsRainTomw"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="w-full flex text-left">
        <div class="flex text-left items-center">
          <div class="w-[15px] rounded h-[15px] bg-uv"></div>
          <div class="txt_light_summer ml-2 txt-uv">
            <span>{{ $t("Uv_Index") }}</span>
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
  name: "chart-uv-30-day",

  data() {
    return {
      series: [
        {
          name: "Chance of rain",
          data: [],
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
              return value; // Định dạng giá trị hiển thị trong tooltip
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
        markers: {
          size: 4,
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
            columnWidth: "80%",
            borderRadius: 1,
            stroke: {
              show: true, // Enable the stroke (border)
              width: 1, // Width of the border
            },
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
            colors: ["#00315A"], // Set color of the data labels
          },
          background: {
            enabled: false, // Enable background for data labels
            borderRadius: 1, // Set border radius
            padding: 4,
            opacity: 0.9,
          },
          formatter: function (value) {
            return `${value.toFixed(1)}`; // Format the label to include % sign
          },
        },
        xaxis: {
          categories: [],
          tickPlacement: "on",
          tickAmount: 10,
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
              return value.toFixed(1);
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
      console.log(
        "dailyDataSeven",
        this.$store.state.getWeather.listDaily30Day
      );
      return this.$store.state.getWeather.listDaily30Day;
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
            name: "Uv Index",
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
      return data.map((item) => item.uvIndex);
    },

    generateCategories(data) {
      let categories = [];
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
<style lang="scss">
//
</style>
