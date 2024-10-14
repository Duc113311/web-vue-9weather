<template>
  <div class="w-full h-full md:p-10 p-5">
    <div class="feature-location flex mb-3">
      <p class="txt_bold txt-v2">
        {{ $t("Temperature_{name}", { name: renderCityName }) }}
      </p>
    </div>
    <!--  -->

    <div
      class="weather-day-temp flex flex-wrap align-baseline justify-between mt-4"
    >
      <div class="temp-item">
        <div class="h4">{{ $t("Day") }}</div>
        <div class="w-full justify-center flex items-center">
          <img
            src="../../../../assets/images/day_night/temp-1.png"
            :alt="$t('Temperature_{name}', { name: renderCityName })"
            width="102px"
            height="102px"
            class="object-cover mt-2 mb-4"
          />
        </div>
        <div>
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.minTempDataDay?.temperature
              )
            }}°
          </span>
          /
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.maxTempDataDay?.temperature
              )
            }}°
          </span>
        </div>
      </div>
      <div class="temp-item">
        <div class="h4">{{ $t("Night") }}</div>
        <div class="w-full justify-center flex items-center">
          <img
            src="../../../../assets/images/day_night/temp-2.png"
            :alt="$t('Temperature_{name}', { name: renderCityName })"
            width="102px"
            height="102px"
            class="object-cover mt-2 mb-4"
          />
        </div>
        <div>
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.minTempDataNight?.temperature
              )
            }}°
          </span>
          /
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.maxTempDataNight?.temperature
              )
            }}°
          </span>
        </div>
      </div>
      <div class="temp-item">
        <div class="h4">{{ $t("Bright") }}</div>
        <div class="w-full justify-center flex items-center">
          <img
            src="../../../../assets/images/day_night/temp-3.png"
            alt="Nhiệt độ buổi sáng"
            width="102px"
            height="102px"
            class="object-cover mt-2 mb-4"
          />
        </div>
        <div>
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.minTempDataMorning?.temperature
              )
            }}°
          </span>
          /
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.maxTempDataMorning?.temperature
              )
            }}°
          </span>
        </div>
      </div>
      <div class="temp-item">
        <div class="h4">{{ $t("Dark") }}</div>
        <div class="w-full justify-center flex items-center">
          <img
            src="../../../../assets/images/day_night/temp-4.png"
            alt="Nhiệt độ buổi tối"
            width="102px"
            height="102px"
            class="object-cover mt-2 mb-4"
          />
        </div>
        <div>
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.minTempDataEvening?.temperature
              )
            }}°
          </span>
          /
          <span>
            {{
              convertFahrenheitToCelsiusNot(
                renderTempoDay?.maxTempDataEvening?.temperature
              )
            }}°
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  celsiusToFahrenheitNot,
  fahrenheitToCelsiusNot,
  convertFtoC,
  convertCtoF,
} from "../../../../utils/converValue.js";
export default {
  name: "sunrise-page-v2",

  data() {
    return {};
  },

  computed: {
    renderTempoDay() {
      return this.convertTempDayNight(this.$store.state.getWeather.hourly48);
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

  methods: {
    convertTempDayNight(value) {
      const dataList = value.slice(1, 24);
      const dayData = [];
      const nightData = [];

      const morningData = [];
      const eveningData = [];

      //   Ngày đêm
      dataList.forEach((data) => {
        const date = new Date(data.time * 1000); // Chuyển UNIX timestamp sang đối tượng Date
        const hours = date.getUTCHours(); // Lấy giờ UTC

        if (hours >= 6 && hours < 18) {
          dayData.push(data); // Nếu giờ trong khoảng từ 6h sáng đến 6h tối, thêm vào mảng ban ngày
        } else {
          nightData.push(data); // Ngược lại thêm vào mảng ban đêm
        }
      });

      //   Sáng tối
      dataList.forEach((data) => {
        const date = new Date(data.time * 1000); // Chuyển UNIX timestamp sang đối tượng Date
        const hours = date.getUTCHours(); // Lấy giờ UTC

        if (hours >= 6 && hours < 12) {
          morningData.push(data); // Nếu giờ trong khoảng từ 6h sáng đến 6h tối, thêm vào mảng ban ngày
        }

        if (hours >= 18 && hours < 22) {
          eveningData.push(data); // Ngược lại thêm vào mảng ban đêm
        }
      });

      let objectTemp = {
        maxTempDataDay: dayData[0],
        minTempDataDay: dayData[0],
        minTempDataNight: nightData[0],
        maxTempDataNight: nightData[0],
        minTempDataMorning: morningData[0],
        maxTempDataMorning: morningData[0],
        minTempDataEvening: eveningData[0],
        maxTempDataEvening: eveningData[0],
      };
      dayData.forEach((data) => {
        if (data.temperature > objectTemp.maxTempDataDay.temperature) {
          objectTemp.maxTempDataDay = data; // Cập nhật giá trị max nếu tìm thấy temperature lớn hơn
        }
        if (data.temperature < objectTemp.minTempDataDay.temperature) {
          objectTemp.minTempDataDay = data; // Cập nhật giá trị min nếu tìm thấy temperature nhỏ hơn
        }
      });

      nightData.forEach((data) => {
        if (data.temperature > objectTemp.maxTempDataNight.temperature) {
          objectTemp.maxTempDataNight = data; // Cập nhật giá trị max nếu tìm thấy temperature lớn hơn
        }
        if (data.temperature < objectTemp.minTempDataNight.temperature) {
          objectTemp.minTempDataNight = data; // Cập nhật giá trị min nếu tìm thấy temperature nhỏ hơn
        }
      });

      morningData.forEach((data) => {
        if (data.temperature > objectTemp.maxTempDataMorning.temperature) {
          objectTemp.maxTempDataMorning = data; // Cập nhật giá trị max nếu tìm thấy temperature lớn hơn
        }
        if (data.temperature < objectTemp.minTempDataMorning.temperature) {
          objectTemp.minTempDataMorning = data; // Cập nhật giá trị min nếu tìm thấy temperature nhỏ hơn
        }
      });

      eveningData.forEach((data) => {
        if (data.temperature > objectTemp.maxTempDataEvening.temperature) {
          objectTemp.maxTempDataEvening = data; // Cập nhật giá trị max nếu tìm thấy temperature lớn hơn
        }
        if (data.temperature < objectTemp.minTempDataEvening.temperature) {
          objectTemp.minTempDataEvening = data; // Cập nhật giá trị min nếu tìm thấy temperature nhỏ hơn
        }
      });

      console.log("objectTemp", objectTemp);

      return objectTemp;
    },

    convertFahrenheitToCelsiusNot(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },
  },
};
</script>
<style lang="scss">
.weather-main-title {
  color: #003870;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.weather-day-temp .temp-item:not(:last-child) {
  border-right: 1px solid #f3f1ef;
}

.weather-day-temp .temp-item {
  padding-top: 13px;
  padding-bottom: 5px;
  width: calc(25%);
  text-align: center;
}

.weather-day-temp .temp-item .h4 {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #003870;
}

.weather-day-temp .temp-item span {
  font-size: 16px;
  line-height: 24px;
}
</style>
