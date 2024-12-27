<template>
  <div class="w-full h-[50px] bg-nav flex items-center">
    <div class="w-full h-full pl-4 pr-4 text-white">
      <div class="w-full h-full container">
        <div class="w-full h-full flex justify-between items-center">
          <!-- left -->
          <div class="md:flex hidden items-center gap-4">
            <div class="h-district pt-5 pb-5 hidden lg:block relative group">
              <div class="flex items-center gap-2 cursor-pointer">
                <img
                  src="../../assets/images/svg_v2/ic_city.svg"
                  width="16"
                  alt=""
                  srcset=""
                />
                <span class="txt_regular_16">{{ $t("District_City") }}</span>
                <img
                  src="../../assets/images/svg_v2/ic_chevron_up.svg"
                  width="24"
                  alt=""
                />
              </div>

              <div class="relative group">
                <div
                  class="mega-box absolute"
                  :class="{ 'hidden-p': isMegaBoxVisible }"
                >
                  <div class="content">
                    <div class="container">
                      <div
                        class="container-c"
                        v-if="breadcumsObject?.country_key === 'vn'"
                      >
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

                      <div
                        class="container-c"
                        v-if="breadcumsObject?.country_key === 'us'"
                      >
                        <!--  -->
                        <div
                          class="region"
                          v-for="(item, index) in objectCity"
                          :key="index"
                        >
                          <h2>
                            {{ item.regionName }}
                          </h2>
                          <ul>
                            <li
                              v-for="(item1, index) in item?.states"
                              :key="index"
                              @click="onClickSearchState(item1, item)"
                            >
                              {{ item1.nameState }}
                            </li>
                          </ul>
                        </div>
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
                width="20"
                alt=""
                srcset=""
              />
              <span class="txt_regular_16">{{ $t("Widget") }}</span>
            </div>
          </div>
          <!-- right -->
          <div class="flex items-center gap-2">
            <img
              src="../../assets/images/svg_v2/ic_locate_fixed.svg"
              width="16"
              alt=""
              srcset=""
            />

            <div class="flex items-center mr-2 gap-2">
              <span class="txt_regular_16"
                >{{ $t("Your_current_location") }}:</span
              >
              <span
                class="txt_medium_des_16 text-blue-400"
                v-if="currentLocationChome?.country_key?.toLowerCase() === 'vn'"
                >{{
                  $t(
                    `city.city_${languageParam}.${currentLocationChome?.city_key}`
                  )
                }}</span
              >
              <span
                class="txt_medium_des_16 text-blue-400"
                v-else-if="
                  currentLocationChome?.country_key?.toLowerCase() === 'us'
                "
                >{{ currentLocationChome?.state }}</span
              >
              <span class="txt_medium_des_16 text-blue-400" v-else>{{
                currentLocationChome?.city
              }}</span>
            </div>
            <div
              class="flex items-center cursor-pointer txt_medium_des bg-bth pad-small"
              @click="onClickRechange()"
            >
              <span>{{ $t("rechange") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import removeAccents from "remove-accents";

export default {
  name: "nav-bottom",

  data() {
    return {
      isMegaBoxVisible: false,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "objectCityByLocationGetters",
      "listStateAmericanGetters",
      "locationChomeObjectGetters",
    ]),
    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    renderLanguage() {
      return this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
    },

    currentLocationChome() {
      const retrievedArray = JSON.parse(
        localStorage.getItem("currentLocationChome")
      );

      return retrievedArray ? retrievedArray : this.locationChomeObjectGetters;
    },

    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    objectCity() {
      if (this.breadcumsObject.country_key === "vn") {
        const retrievedArray = JSON.parse(
          sessionStorage.getItem("dataCityLog")
        );

        return this.objectCityByLocationGetters.length !== 0
          ? this.objectCityByLocationGetters
          : retrievedArray;
      } else if (this.breadcumsObject.country_key === "us") {
        const retrievedArray = JSON.parse(
          sessionStorage.getItem("dataStateAmerican")
        );
        return this.listStateAmericanGetters.length !== 0
          ? this.listStateAmericanGetters
          : retrievedArray;
      } else {
        return [];
      }
    },

    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },
  },

  methods: {
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setKeyIndexComponent",
    ]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },

    toggleMegaBox() {
      this.isMegaBoxVisible = !this.isMegaBoxVisible; // Chuyển đổi trạng thái hiển thị
    },
    convertToSlug(str) {
      // Bước 1: Loại bỏ dấu tiếng Việt
      const normalizedStr = str
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu
      // Bước 2: Chuyển thành chữ thường và thay thế khoảng trắng bằng gạch ngang
      const resultConvert = normalizedStr
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng "-"
        .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự không hợp lệ (chỉ giữ lại chữ, số, và "-")

      return resultConvert;
    },

    convertToConvert(str) {
      const slug = removeAccents(str).toLowerCase().replace(/\s+/g, "-");
      return slug;
    },

    removeAccentsUnicode(str) {
      return str
        .normalize("NFD") // Chuẩn hóa Unicode thành dạng tổ hợp ký tự và dấu
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ tổ hợp dấu
        .replace(/đ/g, "d") // Xử lý riêng cho chữ "đ"
        .replace(/Đ/g, "D");
    },

    convertToConvertLowerCase(str) {
      const slug = this.removeAccentsUnicode(str).replace(/\s+/g, "_");
      return slug;
    },

    async onClickSearchState(value, valueCategory) {},

    async onClickSearchCity(value, valueCategory) {
      try {
        const nameCity = value.viNameLanguage;
        const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
          nameCity
        )}&key=TOH_KEY`;
        const valueEncode = encodeBase64(urlParam);

        await this.getFormattedAddress(valueEncode);

        const newDataValue = this.$store.state.weatherModule.newArray[0];
        const language = this.languageParam;

        debugger;
        const objectBread = {
          country: newDataValue.country,
          country_key: newDataValue.country_key.toLowerCase(),
          city: nameCity,
          city_key: this.convertToConvertLowerCase(nameCity),
          district: "",
          district_key: "",
          ward: "",
          ward_key: "",
          latitude: newDataValue.lat,
          longitude: newDataValue.lng,
        };

        localStorage.setItem("objectBread", JSON.stringify(objectBread));
        this.setBreadcumsNotAllowLocation(objectBread);

        const convertCityUrl = this.convertToConvert(objectBread.city);
        // Chuyển hướng ngay lập tức
        await this.$router.push({
          name: "today-weather",
          params: {
            language,
            location: [objectBread.country_key.toLowerCase(), convertCityUrl],
          },
        });
        this.setKeyIndexComponent(1);
        this.isMegaBoxVisible = true;
        setTimeout(() => {
          this.isMegaBoxVisible = false;
        }, 50);
        // this.$router.go();

        // Gọi các API sau khi chuyển hướng
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBread.latitude},${objectBread.longitude}?lang=${this.languageParam}`;

        const resultAir = getAqiDataFromLocation(
          objectBread.latitude,
          objectBread.longitude
        );
        const [valueEncodeW, valueNewAir, encodeAirCode] = [
          encodeBase64(param),
          encodeBase64(resultAir),
          encodeBase64(getParamAirByCode(this.airObjectGetters.key)),
        ];

        await Promise.all([
          this.getWeatherDataCurrent(valueEncodeW),
          this.getAirQualityByKey(valueNewAir),
          this.getAirQuality(encodeAirCode),
        ]);
      } catch (error) {
        console.error("Error while searching city:", error);
        // Hiển thị thông báo lỗi cho người dùng
      }
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

      const currentLocationChome = JSON.parse(
        localStorage.getItem("currentLocationChome")
      );

      // Lấy thông tin vị trí và thành phố
      this.$router.push({ path: "/" }).then(() => {});
      // Xử lý tiếp các tác vụ API trong nền
      this.setKeyIndexComponent(1);
      const keyLanguage = this.$route.params.language;

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${currentLocationChome.latitude},${currentLocationChome.longitude}?lang=${keyLanguage}`;
      const resultAir = getAqiDataFromLocation(
        currentLocationChome.latitude,
        currentLocationChome.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);
      const objectPosition = {
        latitude: currentLocationChome.latitude,
        longitude: currentLocationChome.longitude,
        city: currentLocationChome.city,
        country: currentLocationChome.cicountryty,
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
  padding: 6px 6px;
  border-radius: 14px;
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
  transition: opacity 0.3s ease, transform 0.3s ease; // Thêm hiệu ứng trượt
  transform: translateY(10px); // Đặt vị trí ban đầu
}
.h-district:hover .mega-box {
  top: 14px;
  opacity: 1;
  visibility: visible;
  z-index: 10;
  width: 100%;
  transform: translateY(0); // Trở về vị trí ban đầu
}

@media (max-width: 768px) {
  .h-district:hover .mega-box {
    opacity: 0; /* Ẩn mega-box */
    visibility: hidden; /* Ẩn mega-box */
    z-index: -1; /* Đưa mega-box ra khỏi z-index */
  }
}
.mega-box .content {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
}

.mega-box .region {
  width: 228px;
  margin-top: 10px;
}

.mega-box .container-c {
  flex-wrap: wrap;
  justify-content: left;
  padding: 10px 10px;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.413);
  background: #ffffff;
}

.mega-box .region h2 {
  font-size: 14px;
  margin-top: 0;
  color: #007bff;
  padding-left: 20px;
}

.mega-box .region ul {
  list-style-type: none;
  padding: 0;
}

.mega-box .region ul li {
  font-size: 12px;
  padding: 6px 18px;
  cursor: pointer;
}

.mega-box .region ul li:hover {
  background-color: #0e2950;
  color: white;
}

.hidden-p {
  display: none !important; /* Ẩn hoàn toàn khi không hover */
}
</style>
