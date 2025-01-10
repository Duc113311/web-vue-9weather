<!-- eslint-disable prettier/prettier -->
<template>
  <div class="w-full h-full bg-header overflow-hidden sticky top-0 header-page">
    <!--  -->
    <div class="w-full bg-header h-full pl-4 pr-4">
      <div class="w-full h-full container">
        <div class="w-full h-full flex items-center">
          <!-- Logo -->
          <div class="logo-app w-full h-full flex justify-center items-center">
            <!--  -->

            <div class="md:flex w-full items-center gap-2">
              <div
                class="imgLogo cursor-pointer"
                @click="onClickReloadHome()"
              ></div>
              <div class="txt_bold_34 color-title-logo">9Weather</div>
            </div>
          </div>
          <!-- Search -->
          <div class="sm:block hidden w-[350px] h-full">
            <div class="flex justify-center items-center h-full">
              <div class="w-[40vh] block">
                <el-autocomplete
                  v-model="valueSearch"
                  :fetch-suggestions="querySearchAsync"
                  :placeholder="$t('Search_location')"
                  @select="handleSelect"
                  :prefix-icon="Search"
                  class="custom-placeholder"
                >
                  <template #default="{ item }">
                    <!--  -->
                    <div
                      v-if="item.isFallback"
                      @click.stop="onClickLocationView"
                      class="flex items-center justify-start cursor-pointer gap-2 bg-location-now p-3"
                    >
                      <img
                        src="../../assets/images/svg_v2/mingcute_send-fill.svg"
                        alt=""
                        width="16"
                      />
                      <div class="txt_regular_des_moon_12">
                        {{ $t("Use_current_location") }}
                      </div>
                    </div>
                    <!--  -->

                    <div v-else-if="item.address" class="p-3">
                      <div class="txt_regular_des_moon_12">
                        {{ item.address }}
                      </div>
                      <span class="link txt_regular_12">{{
                        item.country || ""
                      }}</span>

                      <img src="" alt="" srcset="" />
                    </div>
                  </template>
                </el-autocomplete>
              </div>
              <!-- <div class="w-[30vh] h-full"></div> -->
            </div>
          </div>
          <!-- Time -->
          <div class="nav-menu w-full flex h-full justify-end items-center">
            <div
              class="lg:flex hidden items-center mr-4 txt_regular_17 color-text"
            >
              <div class="flex items-center gap-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="icon-path"
                    d="M12.0229 13.4997C12.3511 13.4999 12.6702 13.3917 12.9308 13.1921C13.1914 12.9925 13.3788 12.7125 13.4641 12.3955C13.5493 12.0785 13.5277 11.7422 13.4024 11.4388C13.2772 11.1354 13.0554 10.8818 12.7714 10.7172V6.01172C12.7714 5.81281 12.6924 5.62204 12.5517 5.48139C12.4111 5.34074 12.2203 5.26172 12.0214 5.26172C11.8225 5.26172 11.6317 5.34074 11.491 5.48139C11.3504 5.62204 11.2714 5.81281 11.2714 6.01172V10.7195L11.2691 10.7202L8.49862 9.12122C8.32645 9.02333 8.12256 8.99752 7.93142 9.04941C7.74029 9.1013 7.57744 9.22668 7.47842 9.3982C7.37939 9.56971 7.35222 9.77344 7.40284 9.96491C7.45347 10.1564 7.57777 10.3201 7.74862 10.4202L10.5311 12.0267C10.5361 12.4192 10.6955 12.794 10.9749 13.0697C11.2543 13.3454 11.6303 13.4999 12.0229 13.4997Z"
                  />
                  <path
                    class="icon-path"
                    d="M22.5 12C22.5 6.201 17.799 1.5 12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12ZM20.25 12C20.25 16.5562 16.5562 20.25 12 20.25C7.44375 20.25 3.75 16.5562 3.75 12C3.75 7.44375 7.44375 3.75 12 3.75C16.5562 3.75 20.25 7.44375 20.25 12Z"
                  />
                </svg>
                <div class="text-left">
                  <span>{{ $t("Local_time") }}: </span>&nbsp;
                </div>
              </div>
              <span id="s-date-time" class="flex items-center">
                {{ vietnamTime }}
              </span>
            </div>

            <div class="cursor-pointer">
              <svg
                @click="onClickShowMenu"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="icon-path"
                  d="M0.00756836 21.5C0.00756836 20.6716 0.679141 20 1.50757 20H11.5076C12.336 20 13.0076 20.6716 13.0076 21.5C13.0076 22.3284 12.336 23 11.5076 23H1.50757C0.679142 23 0.00756836 22.3284 0.00756836 21.5Z"
                />
                <path
                  class="icon-path"
                  d="M11.0076 2.5C11.0076 1.67157 11.6791 1 12.5076 1H22.5076C23.336 1 24.0076 1.67157 24.0076 2.5C24.0076 3.32843 23.336 4 22.5076 4H12.5076C11.6791 4 11.0076 3.32843 11.0076 2.5Z"
                />
                <path
                  class="icon-path"
                  d="M0.00769926 12.459C0.0119417 11.6306 0.686945 10.9625 1.51536 10.9667L22.3351 11.0733C23.1635 11.0776 23.8316 11.7526 23.8274 12.581C23.8231 13.4094 23.1481 14.0776 22.3197 14.0733L1.5 13.9667C0.67158 13.9624 0.00345683 13.2874 0.00769926 12.459Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Search } from "@element-plus/icons-vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

import { formatInTimeZone } from "date-fns-tz";

import {
  convertCtoF,
  codeToFind,
  convertFtoC,
  getIconHourlyForecastTheme,
} from "../../utils/converValue";
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
  urlEncodeString,
  decodeBase64,
} from "../../utils/EncoderDecoderUtils";
import removeAccents from "remove-accents";
import axios from "axios";

export default {
  name: "header_page",

  setup() {
    return {
      Search,
    };
  },
  data() {
    return {
      selectedActive: null,
      valueSearch: "",
      suggestionsTop100: [],
      suggestions: [],
      suggestionsFull: [],

      indexKey: 0,

      hour: "",
      minutes: "",
      second: "",
      dateValue: "",

      vietnamTime: "",
      usTime: "",
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Múi giờ của người dùng
    };
  },

  props: {
    isShowHeaderMenu: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    ...mapGetters("weatherModule", ["cityCountryGetters"]),
    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "objectCityByLocationGetters",
    ]),
    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    renderCountry() {
      return this.$store.state.weatherModule.cityCountry;
    },

    paramCurrently() {
      return this.$store.state.weatherModule.currently;
    },

    renderWeatherCurrent() {
      return this.$store.state.weatherModule.weatherCurrent;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },

    objectCityByLocationData() {
      const retrievedArray = JSON.parse(sessionStorage.getItem("dataCityLog"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.objectCityByLocationGetters;

      return resultData;
    },

    listCityAllData() {
      const retrievedArray = JSON.parse(sessionStorage.getItem("dataCityAll"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.listCityAllGetters;

      return resultData;
    },
  },

  watch: {
    valueSearch(newValue) {
      if (!newValue) {
        // Khi giá trị bị xóa, reset danh sách gợi ý
        this.suggestions = [];
      }
    },
  },

  async mounted() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);

    // this.loadDataTop100();
    // this.loadDataTopFull();
    this.selectedActive = null;

    // const storageCity = localStorage.getItem("cityName");

    this.valueSearch = "";
  },

  created() {},

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setBreadcumsAllowLocation",
      "setBreadcumsTheWorld",
      "setIndexComponent",
    ]),
    ...mapMutations(["setListLocation", "setCountryFilter"]),

    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),

    async onClickLocationNow() {
      localStorage.removeItem("cityName");
      localStorage.removeItem("objectBread");

      // Lấy thông tin vị trí và thành phố
      const cityCountryNow =
        // Chuyển hướng đến router trước
        this.$router.push({ path: "/" }).then(() => {
          window.location.reload();
        });
      // Xử lý tiếp các tác vụ API trong nền

      const keyLanguage = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;

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

    updateTime() {
      const now = new Date();

      // Định dạng giờ Việt Nam (Asia/Ho_Chi_Minh)
      const timeZone = this.userTimeZone;
      this.vietnamTime = formatInTimeZone(
        now,
        timeZone,
        "HH:mm:ss | dd/MM/yyyy"
      );

      // // Định dạng giờ Mỹ (America/New_York)
      // const timeZoneUS = this.userTimeZone;
      // this.usTime = formatInTimeZone(now, timeZoneUS, "HH:mm:ss | dd/MM/yyyy");
    },

    convertFahrenheitToCelsius(value) {
      if (isNaN(value) || value == null) {
        return "";
      }
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return (
          convertCtoF(value) + codeToFind(unitSetting.activeTemperature_save)
        );
      } else {
        return (
          convertFtoC(value) + codeToFind(unitSetting.activeTemperature_save)
        );
      }
    },

    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    onClickShowMenu() {
      if (this.isShowHeaderMenu) {
        return this.$emit("onChangeShowHeaderMenu", false);
      }
      this.$emit("onChangeShowHeaderMenu", true);
    },

    // updateTime() {
    //   const now = new Date();
    //   // Lấy giờ, phút, giây và định dạng lại nếu cần thiết
    //   this.hour = this.formatTimeUnit(now.getHours());
    //   this.minutes = this.formatTimeUnit(now.getMinutes());
    //   this.second = this.formatTimeUnit(now.getSeconds());

    //   // Định dạng ngày tháng
    //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    //   this.dateValue = now.toLocaleDateString("en-US", options);
    // },
    formatTimeUnit(unit) {
      // Định dạng lại số để có hai chữ số (vd: 01, 02, ..., 12)
      return unit < 10 ? "0" + unit : unit;
    },

    onClickLink(value) {
      if (value !== 0) {
        this.selectedActive = value;
      }
      let routePath = null;

      if (value === 1) {
        routePath = "/daily-weather";
      } else if (value === 2) {
        routePath = "/promotional-new";
      } else if (value === 3) {
        routePath = "/radar-detail";
      } else if (value === 4) {
        routePath = "/introduce";
      } else if (value === 5) {
        routePath = "/create-widget";
      } else if (value === -1) {
        routePath = `/${this.renderCountry.city}`;
      }

      if (routePath) {
        this.$router
          .push({ path: routePath })
          .then(() => {
            document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
          })
          .catch(() => {});
      }
    },

    async querySearchAsync(queryString, cb) {
      let timeout;
      // Tạo phần tử "Sử dụng vị trí hiện tại"
      const useCurrentLocation = {
        isFallback: true,
        address: "",
        country: "",
      };

      if (!this.valueSearch) {
        // Khi không có giá trị tìm kiếm, chỉ hiển thị "Sử dụng vị trí hiện tại"
        this.suggestions = [useCurrentLocation];
        timeout = setTimeout(() => {
          cb(this.suggestions);
        }, 300);
        return;
      }

      // Gọi API để lấy dữ liệu gợi ý
      const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
        this.valueSearch
      )}&key=TOH_KEY`;

      const value = encodeBase64(urlParam);

      try {
        await this.getFormattedAddress(value);

        // Đảm bảo giá trị tìm kiếm không thay đổi
        if (this.valueSearch === queryString) {
          // Thêm phần tử "Sử dụng vị trí hiện tại" vào đầu danh sách
          this.suggestions = [
            useCurrentLocation,
            ...(this.$store.state.weatherModule.newArray || []),
          ];
          timeout = setTimeout(() => {
            cb(this.suggestions);
          }, 300);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        this.suggestions = [useCurrentLocation];
        cb(this.suggestions);
      }
    },

    createFilter(queryString) {
      return (city) => {
        const searchString = queryString.toLowerCase();
        return (
          city.value.toLowerCase().includes(searchString) ||
          city.country.toLowerCase().includes(searchString)
        );
      };
    },

    removeAccentsUnicode(str) {
      return str
        .normalize("NFD") // Chuẩn hóa Unicode thành dạng tổ hợp ký tự và dấu
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ tổ hợp dấu
        .replace(/đ/g, "d") // Xử lý riêng cho chữ "đ"
        .replace(/Đ/g, "D");
    },

    convertToConvertLowerCase(str) {
      console.log("slug", str);

      const slug = this.removeAccentsUnicode(str).replace(/\s+/g, "_");
      console.log("slug", slug);

      return slug;
    },

    convertToCamelCase(input) {
      if (!input) return input; // Nếu chuỗi không có giá trị, trả về chính nó

      // Loại bỏ khoảng trắng và chuyển đổi thành CamelCase
      return input
        .split(" ") // Tách chuỗi theo khoảng trắng
        .map((word, index) => {
          if (index === 0) {
            return word; // Giữ nguyên từ đầu tiên
          }
          return word.charAt(0).toUpperCase() + word.slice(1); // Viết hoa chữ cái đầu của các từ còn lại
        })
        .join(""); // Nối lại chuỗi
    },

    convertToVietnamese(input) {
      // Map các từ gốc sang từ có dấu

      const data = this.removeWordAndAccents(input, ["Province", "City"]);

      // const dataNew = this.convertToCamelCase(data);
      console.log("data-new", data);

      const vietnameseMap = {
        Hanoi: "Hà Nội",
        Haiphong: "Hải Phòng",
        Danang: "Đà Nẵng",
        Hochiminh: "Hồ Chí Minh",
        Cantho: "Cần Thơ",
        AnGiang: "An Giang",
        BacGiang: "Bắc Giang",
        BacKan: "Bắc Kạn",
        BacLieu: "Bạc Liêu",
        BacNinh: "Bắc Ninh",
        BenTre: "Bến Tre",
        BinhDinh: "Bình Định",
        BinhDuong: "Bình Dương",
        BinhPhuoc: "Bình Phước",
        BinhThuan: "Bình Thuận",
        CaMau: "Cà Mau",
        CaoBang: "Cao Bằng",
        DakLak: "Đắk Lắk",
        DakNong: "Đắk Nông",
        DienBien: "Điện Biên Phủ",
        DongNai: "Đồng Nai",
        DongThap: "Đồng Tháp",
        GiaLai: "Gia Lai",
        HaGiang: "Hà Giang",
        HaNam: "Hà Nam",
        HaTinh: "Hà Tĩnh",
        HaiDuong: "Hải Dương",
        HauGiang: "Hậu Giang",
        HoaBinh: "Hòa Bình",
        HungYen: "Hưng Yên",
        KhanhHoa: "Khánh Hòa",
        KienGiang: "Kiên Giang",
        KonTum: "Kon Tum",
        LaiChau: "Lai Châu",
        LamDong: "Lâm Đồng",
        LangSon: "Lạng Sơn",
        LaoCai: "Lào Cai",
        LongAn: "Long An",
        NamDinh: "Nam Định",
        NgheAn: "Nghệ An",
        NinhBinh: "Ninh Bình",
        NinhThuan: "Ninh Thuận",
        PhuTho: "Phú Thọ",
        PhuYen: "Phú Yên",
        QuangBinh: "Quảng Bình",
        QuangNam: "Quảng Nam",
        QuangNgai: "Quảng Ngãi",
        QuangNinh: "Quảng Ninh",
        QuangTri: "Quảng Trị",
        SocTrang: "Sóc Trăng",
        SonLa: "Sơn La",
        TayNinh: "Tây Ninh",
        ThaiBinh: "Thái Bình",
        ThaiNguyen: "Thái Nguyên",
        ThanhHoa: "Thanh Hóa",
        ThuaThienHue: "Thừa Thiên Huế",
        TienGiang: "Tiền Giang",
        TraVinh: "Trà Vinh",
        TuyenQuang: "Tuyên Quang",
        VinhLong: "Vĩnh Long",
        VinhPhuc: "Vĩnh Phúc",
        YenBai: "Yên Bái",
      };

      // Kiểm tra nếu chuỗi tồn tại trong map
      const converted = vietnameseMap[data] || data;

      console.log("converted", converted);

      // Thay khoảng trắng bằng dấu gạch dưới
      return {
        city: converted,
        cityConvert: this.convertToConvertLowerCase(converted),
      };
    },

    convertToFormattedArray(input) {
      if (!input) return []; // Nếu chuỗi không có giá trị, trả về mảng rỗng

      return input
        .split(" ") // Tách chuỗi theo khoảng trắng
        .map((word, index) => {
          if (index === 0) {
            return word; // Từ đầu tiên chuyển thành chữ thường
          }
          return word.charAt(0) + word.slice(1); // Viết hoa chữ cái đầu cho từ còn lại
        });
    },

    splitStingWard(inputString) {
      return inputString.split("_").slice(1).join("_");
    },

    checkSubstring(str1, str2) {
      // Kiểm tra nếu str1 giống hoàn toàn str2
      if (str1 === str2) {
        return true;
      }

      // Tách các từ bằng cách loại bỏ ký tự không phải chữ và chia nhỏ theo dấu "_"
      const words1 = str1.replace(/[^\w\s]/g, "").split("_");
      const words2 = str2.replace(/[^\w\s]/g, "").split("_");

      // Chuyển đổi str2 thành mảng đã định dạng (giả sử convertToFormattedArray là cần thiết)
      const convertArray = this.convertToFormattedArray(str2);

      // Lọc ra các từ chung giữa words1 và words2
      const commonWords = words1.filter((word) => words2.includes(word));

      // Kiểm tra có ít nhất 2 từ chung
      return commonWords.length >= 2;
    },

    findCityData(value) {
      const listCityVN = this.objectCityByLocationData;

      debugger;
      const replaceCity = this.convertToVietnamese(value.city).cityConvert;
      for (let index = 0; index < listCityVN.length; index++) {
        const element = listCityVN[index];
        const provinceCityData = element.provinceCity;
        const findData = provinceCityData.find(
          (x) => x.keyAccentLanguage === replaceCity
        );
        if (findData) {
          return findData;
        }
      }
    },

    replaceApostropheWithUnderscore(key) {
      // Kiểm tra nếu chuỗi chứa dấu ' thì thay thế bằng _
      if (key.includes("'")) {
        return key.replace(/'/g, "_");
      }
      // Nếu không chứa dấu ', trả về chuỗi gốc
      return key;
    },

    findDistrictsData(value) {
      const listCityVN = this.listCityAllData;

      // Kiểm tra xem listCityVN có tồn tại không
      if (!listCityVN) {
        console.error("listCityAllGetters không tồn tại");
        return null; // Hoặc xử lý theo cách khác
      }

      const replaceCity = this.convertToVietnamese(value.city).cityConvert;
      const replaceDistrict = this.convertToConvertLowerCase(value.district);

      debugger;
      const replaceApos = this.replaceApostropheWithUnderscore(replaceDistrict);
      const findData = listCityVN.find(
        (x) => x.keyAccentLanguage === replaceCity
      );

      if (findData) {
        const districtListData = findData.districtList;

        // Kiểm tra districtListData có tồn tại và là mảng không
        if (Array.isArray(districtListData)) {
          for (let index = 0; index < districtListData.length; index++) {
            const element = districtListData[index];

            const checkSub = this.checkSubstring(
              removeAccents(element.keyAccentLanguage),
              replaceApos
            );

            if (checkSub) {
              return element; // Trả về district nếu tìm thấy
            }
          }
        } else {
          console.error("districtListData không phải là mảng");
        }
      }

      return null; // Trả về null nếu không tìm thấy district
    },

    findWardData(value) {
      const listCityVN = this.listCityAllData;

      // Kiểm tra xem listCityVN có tồn tại không
      if (!listCityVN) {
        console.error("listCityAllGetters không tồn tại");
        return null; // Hoặc xử lý theo cách khác
      }
      debugger;
      const replaceCity = this.convertToVietnamese(value.city).cityConvert;
      const replaceDistrict = this.convertToConvertLowerCase(value.district);
      const replaceWard = this.convertToConvertLowerCase(value.ward);

      const replaceAposDistrict =
        this.replaceApostropheWithUnderscore(replaceDistrict);
      const replaceAposWard = this.replaceApostropheWithUnderscore(replaceWard);

      const findData = listCityVN.find(
        (x) => x.keyAccentLanguage === replaceCity
      );

      if (findData) {
        const districtListData = findData.districtList;

        // Kiểm tra districtListData có tồn tại và là mảng không
        if (Array.isArray(districtListData)) {
          for (let index = 0; index < districtListData.length; index++) {
            const element = districtListData[index];

            const checkSub = this.checkSubstring(
              removeAccents(element.keyAccentLanguage),
              replaceAposDistrict
            );

            if (checkSub) {
              const wardListData = element.wards;

              // Kiểm tra wardListData có tồn tại và là mảng không
              if (Array.isArray(wardListData)) {
                for (let index = 0; index < wardListData.length; index++) {
                  const elementWard = wardListData[index];
                  const checkSubWard = this.checkSubstring(
                    removeAccents(elementWard.keyAccentLanguage),
                    this.splitStingWard(replaceAposWard)
                  );

                  if (checkSubWard) {
                    return elementWard;
                  }
                }
              } else {
                console.error("wardListData không phải là mảng");
              }
            }
          }
        } else {
          console.error("districtListData không phải là mảng");
        }
      }

      return null; // Trả về null nếu không tìm thấy ward
    },

    convertLowerCase(str) {
      const slug = removeAccents(str);
      return slug.replace(/\s+/g, "-").toLowerCase();
    },

    // removeWordAndAccents(str, wordToRemove) {
    //   const normalizedStr = removeAccents(str); // Loại bỏ dấu nếu có
    //   return normalizedStr
    //     .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
    //     .trim();
    // },

    async handleSelect(item) {
      this.valueSearch = "";
      debugger;
      let language = this.languageParam;
      if (item?.country_key?.toLowerCase() === "vn") {
        let objectBread = {
          country: item.country,
          country_key: item.country_key.toLowerCase(),
          city: item.city ? this.findCityData(item).viNameLanguage : "",
          city_key: item.city ? this.findCityData(item).keyAccentLanguage : "",
          district:
            item.district && this.findDistrictsData(item) ? item.district : "",
          district_key:
            item.district &&
            item.district.trim() !== "" &&
            this.findDistrictsData(item)
              ? this.findDistrictsData(item).keyAccentLanguage
              : "",
          ward:
            item.ward && this.findWardData(item)
              ? this.findWardData(item).viNameLanguage
              : "",
          ward_key:
            item.ward && this.findWardData(item)
              ? this.findWardData(item).keyAccentLanguage
              : "",
          latitude: item.lat,
          longitude: item.lng,
        };

        localStorage.setItem("objectBread", JSON.stringify(objectBread));

        this.setBreadcumsNotAllowLocation(objectBread);

        // tồn tại thành phố
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country_key.toLowerCase(),
                this.convertLowerCase(objectBread.city),
              ],
            },
          });
        }
        // Tồn tại quận
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length !== 0 &&
          objectBread.ward.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country_key.toLowerCase(),
                this.convertLowerCase(objectBread.city),
                this.convertLowerCase(objectBread.district),
              ],
            },
          });
        }
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length !== 0 &&
          objectBread.ward.length !== 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country_key.toLowerCase(),
                this.convertLowerCase(objectBread.city),
                this.convertLowerCase(objectBread.district),
                this.convertLowerCase(
                  this.removeWordAndAccents(objectBread.ward, [
                    "Xã",
                    "Thị Xã",
                    "Phường",
                    "Thị Trấn",
                  ])
                ),
              ],
            },
          });
        }
      } else if (item?.country_key?.toLowerCase() === "us") {
        let objectBread = {
          country: item.country,
          country_key: item.country_key,
          state: item.state,
          state_key: item.state_key,
          county: item.county,
          cities: item.cities,
          latitude: item.lat,
          longitude: item.lng,
        };

        localStorage.setItem("objectBread", JSON.stringify(objectBread));
        this.setBreadcumsAllowLocation(objectBread);

        await this.$router.push({
          name: "today-weather",
          params: {
            language: language,
            location: [
              objectBread.country_key.toLowerCase(),
              removeAccents(objectBread.state),
              this.removeWordAndAccents(objectBread.county, "County"),
              removeAccents(objectBread.cities),
            ],
          },
        });
      } else {
        let objectBread = {
          country: item.country,
          country_key: item.country ? item.country.replace(/ /g, "_") : "",
          city: item.city ? item.city : "",
          city_key:
            item.city && item.city.trim() !== ""
              ? item.city.replace(/ /g, "_")
              : "",
          district: item.district,
          district_key:
            item.district && item.district.trim() !== ""
              ? item.district.replace(/ /g, "_")
              : "",

          latitude: item.lat,
          longitude: item.lng,
        };

        localStorage.setItem("objectBread", JSON.stringify(objectBread));

        this.setBreadcumsTheWorld(objectBread);
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country.toLowerCase(),
                this.convertToSlug(objectBread.city),
              ],
            },
          });
        }
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length !== 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country.toLowerCase(),
                this.convertToSlug(objectBread.city),
                this.convertToSlug(objectBread.district),
              ],
            },
          });
        }
      }

      // window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
      const resultAir = getAqiDataFromLocation(item.lat, item.lng);
      const encodeDataWeather = encodeBase64(param);

      // API Get Weather Current
      await this.getWeatherDataCurrent(encodeDataWeather);

      const encodeKeyAir = encodeBase64(resultAir);
      // API Get Air Quality By Key
      await this.getAirQualityByKey(encodeKeyAir);

      const airCode = getParamAirByCode(this.airKeyObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);
      // API Get Air Quality Data
      await this.getAirQuality(encodeAirCode);
      this.indexKey = this.indexKey + 1;
      this.setIndexComponent(this.indexKey);
    },

    removeWordAndAccents(str, wordsToRemove) {
      const removeAccents = (s) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D");

      // Loại bỏ dấu và chuẩn hóa chuỗi
      let normalizedStr = removeAccents(str);

      // Loại bỏ từng từ trong danh sách wordsToRemove
      wordsToRemove.forEach((word) => {
        const normalizedWord = removeAccents(word);
        const regex = new RegExp(`\\b${normalizedWord}\\b`, "gi");
        normalizedStr = normalizedStr.replace(regex, "").trim();
      });

      return normalizedStr;
    },

    async getValueWeatherByRecent(value) {
      const objectLocation = value;

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

    /**
     * Load data top 100
     */
    loadDataTop100() {
      fetch("/file-txt/Top_100_Cities.txt")
        .then((response) => response.text())
        .then((text) => {
          this.processFileTop100(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },
    /**
     * Load data Full
     */
    loadDataTopFull() {
      fetch("/file-txt/full_city.txt")
        .then((response) => response.text())
        .then((text) => {
          this.processFileTopFull(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    processFileTop100(data) {
      const lines = data.split("\n");
      this.suggestionsTop100 = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });

      this.setDataTop100City(this.suggestionsTop100);

      // this.setListLocation(this.suggestions);
    },

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

    processFileTopFull(data) {
      const lines = data.split("\n");
      this.suggestionsFull = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });

      // this.setListLocation(this.suggestions);
    },

    async onClickLocationView() {
      this.valueSearch = "";

      localStorage.removeItem("objectBread");
      // Lấy thông tin vị trí và thành phố
      // Chuyển hướng đến router trước
      this.$router.push({ path: "/" }).then(() => {
        window.location.reload();
      });
      // Xử lý tiếp các tác vụ API trong nền

      const keyLanguage = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;

      const latLong = localStorage.getItem("locationLatLong");
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${latLong.latitude},${latLong.longitude}?lang=${keyLanguage}`;
      const resultAir = getAqiDataFromLocation(
        latLong.latitude,
        latLong.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(this.airObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherDataCurrent(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
    },

    /**
     * Lấy thông tin weather, back về trang chủ
     */
    async onClickReloadHome() {
      this.resetComponentData();
      localStorage.removeItem("objectBread");
      this.$router.push({ path: "/" }).then(() => {
        this.$router.go();
      });
    },

    getLocationBrowserLoad() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setPosition.bind(this),
          this.showError.bind(this)
        );
      } else {
        this.error = "Geolocation is not supported by this browser.";
      }
    },

    resetComponentData() {
      // Reset dữ liệu trong component
      Object.assign(this.$data, this.$options.data());
    },

    async setPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      const objectLatLong = {
        latitude: latitude,
        longitude: longitude,
      };
      localStorage.setItem("locationLatLong", JSON.stringify(objectLatLong));

      const keyLanguageStorage = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${keyLanguageStorage}`;
      const responsive = await axios.get(url); // Lấy thành phố và quốc gia theo map

      // Xét giá trị để lưu Recent
      const dataResponsive = responsive.data.address;

      // Xét giá trị để lưu Recent
      const objectPosition = {
        latitude: latitude,
        longitude: longitude,
        country: dataResponsive.country,
        country_key: dataResponsive.country_code,
        city: dataResponsive.city,
        city_key: removeAccents(dataResponsive.city).replace(/ /g, "_"),
        district: "",
        district_key: "",
        ward: "",
        ward_key: "",
        // objectLocation: responsive.data.address,
      };
      if (dataResponsive.city === "Thành phố Hà Nội") {
        objectPosition.city = "Hà Nội";
        objectPosition.city_key = "Ha_Noi";
      }
      localStorage.setItem("objectBread", JSON.stringify(objectPosition));
      this.setBreadcumsAllowLocation(objectPosition);

      this.setCityWeather(objectPosition);
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${latitude},${longitude}?lang=en`;

      // map url by lat,long
      const resultAir = getAqiDataFromLocation(latitude, longitude);

      const encodeDataWeather = encodeBase64(param);
      // API Get Weather Current
      await this.getWeatherDataCurrent(encodeDataWeather);

      // Lưu lại ở Storage để cache
      localStorage.setItem("keyCurrent", JSON.stringify(encodeDataWeather));

      const encodeKeyAir = encodeBase64(resultAir);
      // API Get Air Quality By Key
      await this.getAirQualityByKey(encodeKeyAir);

      const airCode = getParamAirByCode(this.airKeyObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);
      // API Get Air Quality Data
      await this.getAirQuality(encodeAirCode);
    },

    /**
     * Lấy thông tin weather ở vị trí hiện tại theo location Chome
     */
    async onClickAddressNow() {
      this.valueSearch = "";
      const originalTitle = document.title;
      document.title = "Loading...";
      // Lấy thông tin vị trí và thành phố
      const cityCountryNow = this.$store.state.getWeather.cityCountry;
      localStorage.setItem("country", JSON.stringify(cityCountryNow));
      localStorage.removeItem("cityName");
      // Chuyển hướng đến router trước
      this.$router.push({ path: `/${cityCountryNow.city}` }).then(() => {
        window.location.reload();
      });
      // Xử lý tiếp các tác vụ API trong nền

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${cityCountryNow.latitude},${cityCountryNow.longitude}?lang=en`;
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
        country: cityCountryNow.country,
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
      document.title = originalTitle;
    },
  },
};
</script>
<style lang="scss">
.nav-links {
  margin-top: 4px;
}

.p-li {
  padding: 4px;
}
.header-page {
  z-index: 100;
}

// @media (min-width: 768px) {
//   .basic-header .header-page {
//     height: 62px;
//   }
// }

.basic-header {
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: #160f05;
}

.basic-header .header-page {
  background-color: #1f1f1f;
  // height: 60px;
}

.bg-location-now {
  background-color: #91d6dd63;
}
</style>
