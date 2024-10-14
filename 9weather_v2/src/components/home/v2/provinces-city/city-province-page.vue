<template>
  <div class="w-full h-full overflow-hidden">
    <div
      class="title-regular flex justify-between items-center pad-border-bottom"
    >
      <div class="flex justify-center">
        <div class="txt_bold">
          <span> Top 100 city </span>
        </div>
      </div>
    </div>

    <div class="w-full">
      <ul class="weather-city-inner md:columns-3 columns-2">
        <li
          class="shown cursor-pointer"
          v-for="(item, index) in suggestionsTop100"
          :key="index"
          @click="onClickCityTop100(item)"
        >
          <img
            src="https://thoitiet.app/assets/images/icontt.svg"
            alt="Thời tiết"
          />
          <h3 class="list-city-lq">
            <a>{{ item.value }}</a>
          </h3>
        </li>
      </ul>

      <div class="w-full text-left">
        <button
          type="button"
          @click="onClickLoadMoreItems"
          class="text-white cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
        >
          <span class="txt_medium">
            {{ isAllItemsDisplayed() ? $t("Hide") : $t("See_more") }}</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import {
  getAqiDataFromLocation,
  encodeBase64,
  getParamAirByCode,
  decodeBase64,
  urlEncodeString,
} from "../../../../utils/EncoderDecoderUtils.js";
export default {
  name: "city-province-page",

  data() {
    return {
      suggestionsVietNam: [],
      suggestionsTop100: [],
      itemsPerPage: 21, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
      valueChoose: -1,
      originalSuggestionsVietNam: [], // Dữ liệu gốc từ file
      originalSuggestionsTop100: [], // Dữ liệu gốc từ file
    };
  },

  mounted() {
    // this.loadDataVietName();
    this.loadDataTop100();
  },

  methods: {
    ...mapMutations(["setCountryFilter", "setWeatherRecentData"]),
    ...mapActions([
      "getWeatherData",
      "getAirQualityByKey",
      "getAirQuality",
      "getWeatherRecentData",
    ]),
    async onClickCityTop100(item) {
      debugger;
      const dataLocation = {
        city: item.value,
        code: item.code,
        country: item.country,
        latitude: item.lat,
        longitude: item.lng,
      };

      localStorage.setItem("country", JSON.stringify(dataLocation));
      localStorage.setItem("cityName", JSON.stringify(dataLocation.city));
      this.setCountryFilter(dataLocation);

      let language = localStorage.getItem("language") || "en";
      console.log("item-search", item);

      // this.setUpdateBreadcumsObject(item);
      await this.$router
        .push({
          path: `/${language}/${item?.country}/${item?.value}/${item?.code}/current-weather`,
        })
        .then(() => {
          window.location.reload();
        });

      // window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
      const resultAir = getAqiDataFromLocation(item.lat, item.lng);
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      this.saveToLocalStorage("recent_key", dataLocation);
      const arrayStorage = this.getFromLocalStorage("recent_key");
      this.getValueWeatherByRecent(arrayStorage);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );

      const encodeAirCode = encodeBase64(airCode);

      await Promise.all([
        this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
    },

    async getValueWeatherByRecent(value) {
      const objectLocation = value;

      debugger;
      for (let index = 0; index < objectLocation.length; index++) {
        const element = objectLocation[index];
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${element.latitude},${element.longitude}?lang=en`;
        const value = encodeBase64(param);
        let resultArray = [];
        await this.getWeatherRecentData(value).then((data) => {
          const decodeData = JSON.parse(decodeBase64(data));
          const objectRecent = {
            countryValue: element,
            dataValue: decodeData.currently,
          };
          resultArray.push(objectRecent);
          this.setWeatherRecentData(objectRecent);
        });
      }
    },

    getFromLocalStorage(key) {
      // Trả về mảng các object từ localStorage
      return JSON.parse(localStorage.getItem(key)) || [];
    },

    saveToLocalStorage(key, value) {
      let storedData = JSON.parse(localStorage.getItem(key)) || [];
      debugger;
      // Nếu mảng đã đủ 3 phần tử, xóa phần tử đầu tiên
      if (storedData.length === 3) {
        storedData.pop();
      }

      // Thêm phần tử mới vào mảng
      if (storedData.length !== 0) {
        const findData = storedData.find(
          (x) =>
            x.latitude === value.latitude && x.longitude === value.longitude
        );
        if (!findData) {
          storedData.unshift(value);
        }
      } else {
        storedData.unshift(value);
      }

      // Lưu lại mảng mới vào localStorage
      localStorage.setItem(key, JSON.stringify(storedData));
    },

    loadDataTop100() {
      fetch("file-txt/Top_100_Cities.txt")
        .then((response) => response.text())
        .then((text) => {
          this.processFileTop100(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    processFileTop100(data) {
      const lines = data.split("\n");
      this.originalSuggestionsTop100 = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          code: values[0],
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });
      this.updateSuggestionsVietNam();

      console.log("suggestionsVietNam", this.originalSuggestionsTop100);
    },

    // loadDataVietName() {
    //   fetch("file-txt/Vietnam.txt")
    //     .then((response) => response.text())
    //     .then((text) => {
    //       this.processFileVietName(text);
    //     })
    //     .catch((error) => {
    //       console.error("Error loading file:", error);
    //     });
    // },

    // processFileVietName(data) {
    //   const lines = data.split("\n");
    //   this.originalSuggestionsVietNam = lines.map((line, index) => {
    //     const values = line
    //       .split(";")
    //       .map((value) => value.replace(/"/g, "").trim());
    //     return {
    //       code: values[0],
    //       country: values[1],
    //       value: values[2],
    //       lat: values[3],
    //       lng: values[4],
    //     };
    //   });
    //   this.updateSuggestionsVietNam();

    //   console.log("suggestionsVietNam", this.originalSuggestionsVietNam);
    // },

    updateSuggestionsVietNam() {
      const end = this.currentPage * this.itemsPerPage;
      this.suggestionsTop100 = this.originalSuggestionsTop100.slice(0, end);
    },

    onClickLoadMoreItems() {
      if (
        this.currentPage * this.itemsPerPage >=
        this.originalSuggestionsTop100.length
      ) {
        // Nếu đã hiển thị hết, reset về trang đầu tiên
        this.currentPage = 1;
      } else {
        // Tăng currentPage và cập nhật danh sách hiển thị
        this.currentPage++;
      }
      this.updateSuggestionsVietNam();
    },

    isAllItemsDisplayed() {
      return (
        this.currentPage * this.itemsPerPage >=
        this.originalSuggestionsTop100.length
      );
    },
  },
};
</script>
<style lang="scss">
.weather-city-inner {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 10px 10px 10px;
  -webkit-column-count: 3;
  -moz-column-count: 3;
  align-items: center;
}

.weather-city-inner li {
  font-size: 16px;
  line-height: 20px;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #e9e5e1;
  transition: all 0.2s linear;
  display: flex;
  gap: 13px;
  align-items: center;
  text-align: center;
}
h3.list-city-lq {
  font-size: 16px;
  font-weight: normal;
  display: inline-block;
  padding-top: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* Tạo hiệu ứng trượt lên */
}
</style>
