<template>
  <div class="w-full h-[60px] bg-nav flex items-center">
    <div class="container relative">
      <div class="flex justify-between items-center pad-b-t text-white">
        <!-- left -->
        <div class="flex items-center gap-4">
          <div class="h-district pt-5 pb-5">
            <div class="flex items-center gap-2 cursor-pointer">
              <img
                src="../../assets/images/svg_v2/ic_city.svg"
                width="24"
                alt=""
                srcset=""
              />
              <span>{{ $t("District_City") }}</span>
              <img
                src="../../assets/images/svg_v2/ic_chevron_up.svg"
                width="24"
                alt=""
              />
            </div>

            <div class="mega-box">
              <div class="container">
                <div class="content">
                  <div class="container-c">
                    <!--  -->
                    <div
                      class="region"
                      v-for="(item, index) in objectCity"
                      :key="index"
                    >
                      <h2>
                        {{
                          $t(
                            `city.city_${renderLanguage}.${item.keyAccentLanguage}`
                          )
                        }}
                      </h2>
                      <ul>
                        <li
                          v-for="(item1, index) in item?.provinceCity"
                          :key="index"
                          @click="onClickSearchCity(item1, item)"
                        >
                          {{
                            $t(
                              `city.city_${renderLanguage}.${item1.keyAccentLanguage}`
                            )
                          }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="onClickShowWidget()"
          >
            <img
              src="../../assets/images/svg_v2/ic_widget_tab.svg"
              width="24"
              alt=""
              srcset=""
            />
            <span>{{ $t("Widget") }}</span>
          </div>
        </div>
        <!-- right -->
        <div class="flex items-center gap-2">
          <img
            src="../../assets/images/svg_v2/ic_locate_fixed.svg"
            alt=""
            srcset=""
          />

          <div class="flex items-center mr-2 gap-2">
            <span class=" ">{{ $t("Your_current_location") }}:</span>
            <span
              class="txt_medium text-blue-400"
              v-if="breadcumsObject?.city"
              >{{ breadcumsObject?.city }}</span
            >
          </div>
          <div
            class="flex items-center cursor-pointer txt_medium"
            @click="onClickRechange()"
          >
            <span>{{ $t("rechange") }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import {
  decodeBase64,
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
  urlEncodeString,
} from "@/utils/EncoderDecoderUtils";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "nav-bottom",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "objectCityByLocationGetters",
    ]),
    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    renderLanguage() {
      return this.$route.params.language ? this.$route.params.language : "en";
    },

    breadcumsObject() {
      console.log("this.breadcumsObjectGetters", this.breadcumsObjectGetters);
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      console.log("retrievedArray", retrievedArray);

      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    objectCity() {
      const retrievedArray = JSON.parse(sessionStorage.getItem("dataCityLog"));
      console.log("exist-weather", this.objectCityByLocationGetters);
      console.log("retrievedArray", retrievedArray);

      return this.objectCityByLocationGetters.length !== 0
        ? this.objectCityByLocationGetters
        : retrievedArray;
    },

    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : localStorage.getItem("language");
    },
  },

  methods: {
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

    convertToSlug(str) {
      // Bước 1: Loại bỏ dấu tiếng Việt
      const normalizedStr = str
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      // Bước 2: Chuyển thành chữ thường và thay thế khoảng trắng bằng gạch ngang
      return normalizedStr
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng "-"
        .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự không hợp lệ (chỉ giữ lại chữ, số, và "-")
    },
    async onClickSearchCity(value, valueCategory) {
      debugger;
      const nameCity = value.languages["en"];

      const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
        nameCity
      )}&key=TOH_KEY`;

      const valueEncode = encodeBase64(urlParam);
      await this.getFormattedAddress(valueEncode);

      debugger;
      const newDataValue = this.$store.state.weatherModule.newArray[0];
      let language = this.languageParam;

      const objectBread = {
        country: newDataValue.country,
        country_key: newDataValue.country_key,
        city: nameCity,
        city_key: nameCity.replace(/ /g, "_"),
        latitude: newDataValue.lat,
        longitude: newDataValue.lng,
      };

      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);

      const locationPath = `${language}/${objectBread.country.toLowerCase()}/${this.convertToSlug(
        objectBread.city
      )}`;
      await this.$router.push({
        name: "today-weather",
        params: {
          language: language,
          location: [
            objectBread.country_key.toLowerCase(),
            this.convertToSlug(objectBread.city),
          ],
        },
      });

      window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBread.latitude},${objectBread.longitude}?lang=${this.languageParam}`;

      const resultAir = getAqiDataFromLocation(
        objectBread.latitude,
        objectBread.longitude
      );
      const valueEncodeW = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(this.airObjectGetters.key);

      const encodeAirCode = encodeBase64(airCode);

      await Promise.all([
        this.getWeatherDataCurrent(valueEncodeW),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
    },

    getLanguageDisplay(data, languageKey) {
      return data.languages[languageKey] || data.languages.vi;
    },

    async onClickShowWidget() {
      await this.$router.push({
        path: `/${this.renderLanguage}/create-widget`,
      });
    },

    async onClickRechange() {
      this.valueSearch = "";

      localStorage.removeItem("cityName");
      localStorage.removeItem("objectBread");

      debugger;
      // Lấy thông tin vị trí và thành phố
      const cityCountryNow =
        // Chuyển hướng đến router trước
        this.$router.push({ path: "/" }).then(() => {
          window.location.reload();
        });
      // Xử lý tiếp các tác vụ API trong nền

      const keyLanguage = this.$route.params.language;

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${cityCountryNow.latitude},${cityCountryNow.longitude}?lang=${keyLanguage}`;
      const resultAir = getAqiDataFromLocation(
        cityCountryNow.latitude,
        cityCountryNow.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);
      const objectPosition = {
        latitude: cityCountryNow.latitude,
        longitude: cityCountryNow.longitude,
        city: cityCountryNow.city,
        country: cityCountryNow.city,
      };
      const airCode = getParamAirByCode(this.airObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherDataCurrent(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      this.setCityWeather(objectPosition);
    },
  },
};
</script>
<style lang="scss">
//
.bg-nav {
  background-color: #43546c; /* Màu đen với opacity 5% */
}

.bg-bth {
  background-color: #e3eefb;
  color: #0d2952;
}
.h-district:hover .mega-box {
  transition: all 0.3s ease;
  top: 60px;
  opacity: 1;
  visibility: visible;
  z-index: 10;
  width: 77%;
}

.mega-box {
  display: block;
  position: absolute;
  left: 0;
  top: 115px;
  opacity: 0;
  visibility: visible;
  color: black;
  z-index: -1;
}

.mega-box .content {
  background: #ffffff;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
}

.mega-box .region {
  width: 208px;
  margin-top: 10px;
}

.mega-box .container-c {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 20px;
  text-align: left;
}

.mega-box .region h2 {
  font-size: 16px;
  margin-top: 0;
  color: #007bff;
  padding-left: 20px;
}

.mega-box .region ul {
  list-style-type: none;
  padding: 0;
}

.mega-box .region ul li {
  font-size: 14px;
  padding: 6px 18px;
  cursor: pointer;
}

.mega-box .region ul li:hover {
  background-color: aqua;
}
</style>
