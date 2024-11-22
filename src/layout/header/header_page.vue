<!-- eslint-disable prettier/prettier -->
<template>
  <div class="w-full bg-header overflow-hidden sticky top-0 header-page">
    <div class="w-full bg-header h-full pad-big">
      <div class="w-full h-full container">
        <!-- Header -->
        <div class="w-full">
          <!--  -->
          <div class="w-full flex justify-between items-center h-full">
            <!-- Logo -->
            <div
              class="logo-app md:w-[600px] w-full h-full flex justify-center items-center"
            >
              <!--  -->

              <div class="md:flex w-full items-center gap-2">
                <div
                  class="imgLogo cursor-pointer"
                  @click="onClickReloadHome()"
                ></div>

                <!-- <div class="flex justify-between items-center md:pt-2 pt-0">
                  <div> 
                    <div class="flex items-center gap-1">
                      <div class="items-center flex gap-1">
                        <span class="txt_regular">
                          <span class="text-blue-400 txt_light_summer">{{
                            renderCityName
                          }}</span></span
                        >
                        <span class="text-left txt_light_summer">
                          {{
                            convertFahrenheitToCelsius(
                              paramCurrently?.temperature
                            )
                          }}</span
                        >
                        <div>
                          <img
                            :src="convertIconCurrently(paramCurrently?.icon)"
                            class="size-img"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
            <!-- Search -->
            <div class="w-[calc(100%-720px)] h-full md:block hidden">
              <div class="w-full flex justify-center items-center h-full">
                <div class="w-[60vh] lg:block hidden">
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
                          width="20"
                        />
                        <div class="txt_regular">Sử dụng vị trí hiện tại</div>
                      </div>
                      <!--  -->

                      <div v-else-if="item.address" class="p-3">
                        <div class="txt_regular">{{ item.address }}</div>
                        <span class="link txt_regular_12">{{
                          item.country || ""
                        }}</span>
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- <div class="w-[30vh] h-full"></div> -->
              </div>
            </div>
            <!--  -->
            <div
              class="nav-menu md:w-[600px] w-full h-full flex justify-end items-center"
            >
              <!-- <div
                class="md:flex items-center pl-4 pr-4 gap-1 text-white txt_regular"
              >
                <div class="flex items-center gap-1">
                  <img
                    class="size-img"
                    src="../../assets/images/svg/ic_oclock.svg"
                    alt=""
                  />
                  <div class="text-left">
                    <span>{{ $t("Local_time") }}</span>
                  </div>
                </div>
                <span id="s-date-time" class="flex items-center">
                  <span class="md:block flex justify-center"
                    ><span id="hour">{{ hour }}</span
                    ><span>:</span> <span id="minutes">{{ minutes }}</span
                    ><span>:</span> <span id="second">{{ second }}</span></span
                  >
                  <span class="ml-1" id="dateValue">| {{ dateValue }}</span>
                </span>
              </div> -->
              <div class="flex items-center mr-4">
                <div class="flex items-center gap-1">
                  <img
                    class="size-img"
                    src="../../assets/images/svg/ic_oclock.svg"
                    alt=""
                  />
                  <div class="text-left">
                    <span>{{ $t("Local_time") }}:</span>
                  </div>
                </div>
                <span id="s-date-time" class="flex items-center ml-2">
                  {{ vietnamTime }}
                </span>
              </div>

              <div class="cursor-pointer">
                <img
                  @click="onClickShowMenu"
                  src="../../assets/images/svg/ic_menu.svg"
                  width="20"
                  class="cursor-pointer"
                  alt=""
                />
              </div>
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
    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.location[0]
        : localStorage.getItem("language");
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

    this.loadDataTop100();
    this.loadDataTopFull();
    this.selectedActive = null;

    // const storageCity = localStorage.getItem("cityName");

    this.valueSearch = "";
  },

  created() {},

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    ...mapMutations(["setListLocation", "setCountryFilter"]),

    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),

    async onClickLocationNow() {
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

      const keyLanguage = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");

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
      debugger;
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

    convertToVietnamese(input) {
      // Map các từ gốc sang từ có dấu
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
        DienBien: "Điện Biên",
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
      const converted = vietnameseMap[input] || input;

      // Thay khoảng trắng bằng dấu gạch dưới
      return {
        city: converted,
        cityConvert: converted.replace(/ /g, "_"),
      };
    },

    async handleSelect(item) {
      debugger;
      this.valueSearch = "";
      let language = this.languageParam;
      if (item.country === "Vietnam") {
        let objectBread = {
          country: item.country,
          country_key: item.country_key
            ? item.country_key.replace(/ /g, "_")
            : "",
          city: item.city ? this.convertToVietnamese(item.city).city : "",
          city_key: item.city
            ? this.convertToVietnamese(item.city).cityConvert
            : "",
          district: item.district ? "Quận" + " " + item.district : "",
          district_key:
            item.district && item.district.trim() !== ""
              ? ("Quận" + " " + item.district).replace(/ /g, "_")
              : "",
          ward: item.ward ? "Phường" + " " + item.ward : "",
          ward_key: item.ward
            ? ("Phường" + " " + item.ward).replace(/ /g, "_")
            : "",
          latitude: item.lat,
          longitude: item.lng,
        };
        debugger;

        localStorage.setItem("objectBread", JSON.stringify(objectBread));

        this.setBreadcumsNotAllowLocation(objectBread);

        // tồn tại thành phố
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length === 0
        ) {
          const locationPath = `${language}/${objectBread.country_key.toLowerCase()}/${this.convertToSlug(
            objectBread.city
          )}`;

          await this.$router.push({
            path: `/${locationPath}/today-weather`,
          });
        }
        // Tồn tại quận
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length !== 0 &&
          objectBread.ward.length === 0
        ) {
          const locationPath = `${language}/${objectBread.country_key.toLowerCase()}/${this.convertToSlug(
            objectBread.city
          )}/${this.convertToSlug(objectBread.district)}`;
          await this.$router.push({
            path: `/${locationPath}/today-weather`,
          });
        }
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length !== 0 &&
          objectBread.ward.length !== 0
        ) {
          const locationPath = `${language}/${objectBread.country_key.toLowerCase()}/${this.convertToSlug(
            objectBread.city
          )}/${this.convertToSlug(objectBread.district)}/${this.convertToSlug(
            objectBread.ward
          )}`;

          await this.$router.push({
            path: `/${locationPath}/today-weather`,
          });
        }
      } else {
        debugger;
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
        debugger;

        localStorage.setItem("objectBread", JSON.stringify(objectBread));

        this.setBreadcumsNotAllowLocation(objectBread);
        debugger;
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length === 0
        ) {
          const locationPath = `${language}/${this.convertToSlug(
            objectBread.country
          )}/${this.convertToSlug(objectBread.city)}`;

          await this.$router.push({
            path: `/${locationPath}/today-weather`,
          });
        }
        if (
          objectBread.city.length !== 0 &&
          objectBread.district.length !== 0
        ) {
          const locationPath = `${language}/${this.convertToSlug(
            objectBread.country
          )}/${this.convertToSlug(objectBread.city)}/${this.convertToSlug(
            objectBread.district
          )}`;
          await this.$router.push({
            path: `/${locationPath}/today-weather`,
          });
        }
      }

      // localStorage.setItem("country", JSON.stringify(dataLocation));
      // localStorage.setItem("cityName", JSON.stringify(dataLocation.city));
      // this.setCountryFilter(dataLocation);

      console.log("item-search", item);

      // this.setUpdateBreadcumsObject(item);

      window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
      const resultAir = getAqiDataFromLocation(item.lat, item.lng);
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(this.airObjectGetters.key);

      const encodeAirCode = encodeBase64(airCode);

      await Promise.all([
        this.getWeatherDataCurrent(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
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
      debugger;
      debugger;
      this.valueSearch = "";

      localStorage.removeItem("objectBread");
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

    /**
     * Lấy thông tin weather, back về trang chủ
     */
    async onClickReloadHome() {
      //
      debugger;
      this.valueSearch = "";

      localStorage.removeItem("objectBread");
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

    // processAdditionalFile(data) {
    //   const lines = data.split("\n");
    //   const newSuggestions = lines.map((line, index) => {
    //     const values = line
    //       .split(";")
    //       .map((value) => value.replace(/"/g, "").trim());
    //     return {
    //       id: this.suggestions.length + index + 1,
    //       value: values[1],
    //       country: values[2],
    //       lat: values[3],
    //       lng: values[4],
    //     };
    //   });
    //   // Thêm dữ liệu từ file mới vào suggestions
    //   this.suggestions = [...this.suggestions, ...newSuggestions];
    // },
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

@media (min-width: 768px) {
  .basic-header .header-page {
    height: 62px;
  }
}

.basic-header .header-page {
  background-color: #1f1f1f;
  height: 78px;
}

.bg-location-now {
  background-color: #91d6dd63;
}
</style>
