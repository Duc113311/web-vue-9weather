<template>
  <div class="md:h-[24rem] h-[20rem] w-full txt_title">
    <div class="w-full pad-form imgBg relative h-full" :class="imgBgValue">
      <div class="w-full h-full container z-10 absolute left-0 right-0">
        <!-- Header -->
        <div id="header" class="w-full h-[40px] container z-50">
          <!--  -->
          <div
            class="w-full flex justify-between items-center h-full md:p-0 p-4"
          >
            <!-- Logo -->
            <div
              class="logo-app md:w-[600px] w-full h-full flex justify-center items-center"
            >
              <!--  -->
              <div class="flex w-full items-center cursor-pointer">
                <div
                  class="imgLogo cursor-pointer"
                  @click="onClickReloadHome()"
                ></div>
              </div>
            </div>
            <!-- Search -->

            <!--  -->
            <div
              class="nav-menu md:w-[600px] w-full h-full flex justify-end items-center"
            >
              <div
                class="md:flex hidden items-center pl-4 pr-4 gap-1 text-white txt_light_10"
              >
                <div class="flex items-center gap-1">
                  <img
                    src="../../assets/images/svg/ic_oclock.svg"
                    alt=""
                    class="size-img"
                  />
                  <div class="text-left">
                    <span>{{ $t("Local_time") }}:</span>
                  </div>
                </div>
                <span id="s-date-time" class="flex items-center">
                  <span class="md:block flex justify-center"
                    ><span id="hour">{{ hour }}</span
                    ><span>:</span> <span id="minutes">{{ minutes }}</span
                    ><span>:</span> <span id="second">{{ second }}</span></span
                  >
                  <span class="ml-1" id="dateValue">{{ dateValue }}</span>
                </span>
              </div>
              <img
                @click="onClickShowMenu()"
                src="../../assets/images/svg/ic_menu.svg"
                width="20"
                class="cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center items-center p-6">
          <div class="w-[34rem]">
            <div class="h-full">
              <div class="w-full items-center h-full">
                <div class="w-full">
                  <!-- New -->
                  <!-- <el-autocomplete
                    v-model="valueSearch"
                    :fetch-suggestions="querySearchAsync"
                    :placeholder="$t('Search_location')"
                    @select="handleSelect"
                    :prefix-icon="Search"
                  >
                    <template #default="{ item }">
                      <div>
                        <div class="txt_regular">{{ item.province }}</div>
                        <span class="link txt_regular_12">{{
                          item.country
                        }}</span>
                      </div>
                    </template>
                  </el-autocomplete> -->

                  <!-- Old -->
                  <el-autocomplete
                    v-model="valueSearch"
                    :fetch-suggestions="querySearchAsync"
                    :placeholder="$t('Search_location')"
                    @select="handleSelect"
                    :prefix-icon="Search"
                  >
                    <template #default="{ item }">
                      <div>
                        <div class="txt_regular">{{ item.value }}</div>
                        <span class="link txt_regular_12">{{
                          item.country
                        }}</span>
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- <div class="w-[30vh] h-full"></div> -->
              </div>
            </div>

            <div class="md:mt-4 md:mb-4">
              <div class="text-left pt-2 pb-2 txt_light_summer text-white">
                {{ $t("Recent_Locations") }}
              </div>
              <div
                v-if="renderLocationRecentData.length !== 0"
                class="w-full md:flex justify-start items-center"
              >
                <div
                  v-for="(item, index) in renderLocationRecentData"
                  :key="index"
                  class="md:w-[33%] w-full mr-2 bg-form-recent p-2 md:mb-0 mb-2"
                  @click="onClickWeatherLocation(item)"
                >
                  <div
                    class="w-full h-full text-left md:block flex items-center justify-between"
                  >
                    <!--  -->
                    <div>
                      <p class="txt_regular">{{ item.countryValue?.city }}</p>
                      <span class="txt_light_10">{{
                        item.countryValue?.country
                      }}</span>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <img
                          :src="convertIconCurrently(item.dataValue?.icon)"
                          alt=""
                        />
                        <p class="relative">
                          <span class="txt_medium_24">{{
                            convertFahrenheitToCelsius(
                              item.dataValue?.temperature
                            )
                          }}</span>
                        </p>
                      </div>
                      <p class="txt_light_10">
                        {{ $t("Real_Feel") }}
                        {{
                          convertRealFeel(item.dataValue?.apparentTemperature)
                        }}°
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="w-full flex justify-between items-center">
                <div class="w-[33%] h-[133px] mr-4 mar-b">
                  <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                </div>
                <div class="w-[33%] h-[133px] mr-4 mar-b">
                  <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                </div>
                <div class="w-[33%] h-[133px] mr-4 mar-b">
                  <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full bg-white h-[60px] topnav md:block hidden">
    <div class="container items-start w-full h-full">
      <div class="w-full items-center h-full flex">
        <div class="flex justify-between items-center w-full">
          <div>
            <ul
              class="md:flex md:items-start md:px-0 md:pb-0 md:static hidden md:w-auto w-full menu-mobile duration-700 ease-in"
            >
              <li
                class="txt_regular weather-menu-item md:mx-1 md:my-0 lg:my-1 lg:mr-6 md:ml-0 cursor-pointer"
                v-for="menu in linkHeaders"
                :key="menu.path"
                @click="onClickLink(index)"
                :class="{ active: isActive(menu) }"
              >
                <router-link
                  :to="{ name: menu.name }"
                  class="weather-menu-link"
                >
                  {{ menu.label }}
                </router-link>
                <!-- <div v-if="index == 0" class="mega-box">
                    <div class="content">
                      <div class="container">
                        <div class="region">
                          <h2>Đông Bắc Bộ</h2>
                          <ul>
                            <li>Bắc Giang</li>
                            <li>Bắc Kạn</li>
                            <li>Cao Bằng</li>
                            <li>Hà Giang</li>
                            <li>Lạng Sơn</li>
                            <li>Phú Thọ</li>
                            <li>Quảng Ninh</li>
                            <li>Thái Nguyên</li>
                            <li>Tuyên Quang</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Tây Bắc Bộ</h2>
                          <ul>
                            <li>Hoà Bình</li>
                            <li>Lai Châu</li>
                            <li>Lào Cai</li>
                            <li>Sơn La</li>
                            <li>Yên Bái</li>
                            <li>Điện Biên</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Đồng bằng sông Hồng</h2>
                          <ul>
                            <li>Bắc Ninh</li>
                            <li>Hà Nam</li>
                            <li>Hà Nội</li>
                            <li>Hải Dương</li>
                            <li>Hải Phòng</li>
                            <li>Hưng Yên</li>
                            <li>Nam Định</li>
                            <li>Ninh Bình</li>
                            <li>Thái Bình</li>
                            <li>Vĩnh Phúc</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Bắc Trung Bộ</h2>
                          <ul>
                            <li>Hà Tĩnh</li>
                            <li>Nghệ An</li>
                            <li>Quảng Bình</li>
                            <li>Quảng Trị</li>
                            <li>Thanh Hóa</li>
                            <li>Thừa Thiên Huế</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Nam Trung Bộ</h2>
                          <ul>
                            <li>Bình Thuận</li>
                            <li>Bình Định</li>
                            <li>Khánh Hòa</li>
                            <li>Ninh Thuận</li>
                            <li>Phú Yên</li>
                            <li>Quảng Nam</li>
                            <li>Quảng Ngãi</li>
                            <li>Đà Nẵng</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Tây Nguyên</h2>
                          <ul>
                            <li>Gia Lai</li>
                            <li>Kon Tum</li>
                            <li>Lâm Đồng</li>
                            <li>Đắk Lắk</li>
                            <li>Đắk Nông</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Đông Nam Bộ</h2>
                          <ul>
                            <li>Bà Rịa - Vũng Tàu</li>
                            <li>Bình Dương</li>
                            <li>Bình Phước</li>
                            <li>Hồ Chí Minh</li>
                            <li>Tây Ninh</li>
                            <li>Đồng Nai</li>
                          </ul>
                        </div>
                        <div class="region">
                          <h2>Đồng bằng sông Cửu Long</h2>
                          <ul>
                            <li>An Giang</li>
                            <li>Bạc Liêu</li>
                            <li>Bến Tre</li>
                            <li>Cà Mau</li>
                            <li>Cần Thơ</li>
                            <li>Hậu Giang</li>
                            <li>Kiên Giang</li>
                            <li>Long An</li>
                            <li>Sóc Trăng</li>
                            <li>Tiền Giang</li>
                            <li>Trà Vinh</li>
                            <li>Vĩnh Long</li>
                            <li>Đồng Tháp</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> -->
              </li>
            </ul>
          </div>
          <div>
            <div
              @click="onClickReloadHome"
              class="flex items-center gap-1 cursor-pointer"
            >
              <img
                src="../../assets/images/svg/basil_location-outline.svg"
                alt=""
                width="18"
              />
              <div class="items-center flex gap-1">
                <span class="txt_regular"
                  >{{ $t("Your_City") }}:
                  <span class="text-blue-400 txt_regular">{{
                    renderCountry.city
                  }}</span></span
                >
                <span class="text-left txt_regular">
                  {{
                    convertFahrenheitToCelsius(
                      renderWeatherCurrent?.temperature
                    )
                  }}</span
                >
                <div>
                  <img
                    :src="convertIconCurrently(renderWeatherCurrent?.icon)"
                    width="24"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import {
  celsiusToFahrenheit,
  codeToFind,
  fahrenheitToCelsius,
  getIconHourlyForecastTheme,
  convertCtoF,
  convertFtoC,
} from "../../utils/converValue";

import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
  urlEncodeString,
  decodeBase64,
} from "../../utils/EncoderDecoderUtils";
import { Search } from "@element-plus/icons-vue";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "header-page-v2",

  components: {
    SkeletonLoader,
  },
  setup() {
    return {
      Search,
    };
  },
  data() {
    return {
      valueSearch: "",
      listRecent: [],
      hour: "",
      minutes: "",
      second: "",
      dateValue: "",
      suggestionsTop100: [],
      suggestionsFull: [],
      suggestionsVietName: [],
      suggestionsTopVietName: [],
      selectedActive: null,
      imgBgValue: "",
    };
  },

  computed: {
    linkHeaders() {
      return [
        { name: "home-page", label: this.$t("Province/City") },
        { name: "introduce-page", label: this.$t("Apps & Download") },
        { name: "create-widget-view", label: this.$t("Widget") },
      ];
    },
    renderCountry() {
      console.log();
      return this.$store.state.getWeather.cityCountry;
    },

    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },

    renderWeatherCurrent() {
      return this.$store.state.getWeather.weatherCurrent;
    },

    renderLocationRecentData() {
      debugger;
      console.log(
        "locationRecentDataV2",
        this.$store.state.getWeather.locationRecentDataV2
      );
      return this.$store.state.getWeather.locationRecentDataV2;
    },
  },

  mounted() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.loadDataVietName();

    this.loadDataTop100();
    this.loadDataTopFull();
    // this.loadDataVietNameTxt();
    this.selectedActive = null;

    const storageCity = localStorage.getItem("cityName");
    if (storageCity) {
      const storageCityName = JSON.parse(storageCity);

      this.valueSearch = storageCityName;
    } else {
      this.valueSearch = "";
    }
    debugger;

    this.listRecent = this.renderLocationRecentData;

    this.randomImageBg();
    this.isActive(this.$route);
  },

  methods: {
    ...mapMutations([
      "setListLocation",
      "setRecentLocal",
      "setCityWeather",
      "setCountryFilter",
      "setKeyIndexComponent",
      "setUpdateBreadcumsObject",
    ]),
    ...mapActions([
      "getFormattedAddress",
      "getAirQualityByKey",
      "getWeatherData",
      "getAirQuality",
    ]),
    isActive(menu) {
      return this.$route.name === menu.name;
    },
    randomImageBg() {
      const backgrounds = ["img-bg", "img-bg-1", "img-bg-2", "img-bg-3"];
      const randomIndex = Math.floor(Math.random() * backgrounds.length);
      this.imgBgValue = backgrounds[randomIndex]; // Gán class ngẫu nhiên
    },

    onClickLink(value) {
      if (value !== 0) {
        this.selectedActive = value;
      }
      let routePath = null;

      if (value === 1) {
        routePath = "/introduce";
      } else if (value === 2) {
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
    /**
     * Load top data address
     */
    loadDataTop100() {
      fetch("file-txt/Top_100_Cities.txt")
        .then((response) => response.text())
        .then((text) => {
          debugger;
          this.processFileTop100(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    /**
     * Map & split
     * @param data
     */
    processFileTop100(data) {
      const lines = data.split("\n");
      this.suggestionsTop100 = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          code: values[0],
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });

      // this.setListLocation(this.suggestions);
    },

    /**
     * Load data Vietnam dạng Json
     */
    loadDataVietName() {
      fetch("file-txt/vietnam-json/city_vietnam.json")
        .then((response) => response.json())
        .then((data) => {
          debugger;
          console.log(data);
          this.suggestionsVietName = data.provinces;
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    /**
     * Load data txt Vietnam các quận huyện
     */
    loadDataVietNameTxt() {
      fetch("file-txt/vietnam-json/city_full_vietnam.txt")
        .then((response) => response.text())
        .then((text) => {
          debugger;
          this.processFileVietNameTxt(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    /**
     *
     * @param data
     */
    processFileVietNameTxt(data) {
      const lines = data.split("\n");
      this.suggestionsTopVietName = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          postalCode: values[0],
          country: values[1],
          province: values[2],
          district: values[4],
          lat: values[5],
          lng: values[6],
        };
      });
    },

    /**
     * Load Full data address
     */
    loadDataTopFull() {
      fetch("file-txt/full_city.txt")
        .then((response) => response.text())
        .then((text) => {
          debugger;
          this.processFileTopFull(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    /**
     * Map & split
     * @param data
     */
    processFileTopFull(data) {
      const lines = data.split("\n");
      this.suggestionsFull = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          code: values[0],
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });

      // this.setListLocation(this.suggestions);
    },
    /**
     * Update time now
     */
    updateTime() {
      const now = new Date();
      // Lấy giờ, phút, giây và định dạng lại nếu cần thiết
      this.hour = this.formatTimeUnit(now.getHours());
      this.minutes = this.formatTimeUnit(now.getMinutes());
      this.second = this.formatTimeUnit(now.getSeconds());

      // Định dạng ngày tháng
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      this.dateValue = now.toLocaleDateString("en-US", options);
    },
    /**
     * Format time
     * @param unit
     */
    formatTimeUnit(unit) {
      // Định dạng lại số để có hai chữ số (vd: 01, 02, ..., 12)
      return unit < 10 ? "0" + unit : unit;
    },

    async querySearchAsync(queryString, cb) {
      let timeout;
      const results = queryString
        ? this.suggestionsFull.filter(this.createFilter(queryString))
        : this.suggestionsTop100;

      if (results.length > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(results);
        }, 300 * Math.random());
      } else {
        const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
          this.valueSearch
        )}&key=TOH_KEY`;

        const value = encodeBase64(urlParam);

        await this.getFormattedAddress(value);
        timeout = setTimeout(() => {
          cb(this.$store.state.getWeather.newArray);
        }, 300 * Math.random());
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

    async handleSelect(item) {
      this.valueSearch = item.value;
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
      await this.$router.push({
        path: `/${language}/${item.country}/${item.value}/${item.code}/current-weather`,
      });
      window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
      const resultAir = getAqiDataFromLocation(item.lat, item.lng);
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );

      debugger;
      this.saveToLocalStorage("recent_key", dataLocation);
      const arrayStorage = this.getFromLocalStorage("recent_key");
      this.getValueWeatherByRecent(arrayStorage);
      const encodeAirCode = encodeBase64(airCode);

      await Promise.all([
        this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      document.title = `${item.value}, ${item.country}, Current Weather | 9Weather`;
    },
    getFromLocalStorage(key) {
      // Trả về mảng các object từ localStorage
      return JSON.parse(localStorage.getItem(key)) || [];
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

    convertRealFeel(value) {
      if (isNaN(value) || value == null) {
        return "";
      }
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
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
      debugger;
      this.$emit("onChangeShowDraw", true);
    },

    /**
     * Lấy thông tin weather, back về trang chủ
     */
    async onClickReloadHome() {
      //
      debugger;
      this.valueSearch = "";
      const originalTitle = document.title;
      document.title = "Loading...";

      // Lấy thông tin vị trí và thành phố
      const cityCountryNow = this.$store.state.getWeather.cityCountry;

      localStorage.setItem("country", JSON.stringify(cityCountryNow));
      localStorage.removeItem("cityName");
      // Chuyển hướng đến router trước
      this.$router.push({ path: "/" }).then(() => {
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
        country: cityCountryNow.city,
      };
      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherData(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      this.setCityWeather(objectPosition);
      document.title = originalTitle;
    },

    async onClickWeatherLocation(item) {
      debugger;
      const dataLocation = {
        city: item.countryValue.city,
        country: item.countryValue.country,
        latitude: item.countryValue.latitude,
        longitude: item.countryValue.longitude,
      };
      document.title = `${item?.countryValue?.value}, ${item?.countryValue?.country}, Current Weather | 9Weather`;
      localStorage.setItem("country", JSON.stringify(dataLocation));
      localStorage.setItem("cityName", JSON.stringify(dataLocation.city));
      this.setCountryFilter(dataLocation);

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.countryValue.latitude},${item.countryValue.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        item.countryValue.latitude,
        item.countryValue.longitude
      );
      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);

      const airCode = getParamAirByCode(
        this.$store.state.getAqi.airKeyObject.key
      );

      debugger;

      await this.getWeatherData(value);
      localStorage.setItem("apiCalled", true);
      let language = localStorage.getItem("language") || "en"; // Default to 'en' if not found

      console.log("item-country", item);

      // this.setUpdateBreadcumsObject(item);
      await this.$router.push({
        path: `/${language}/${item?.countryValue?.country}/${item?.countryValue?.city}/${item?.countryValue?.code}/current-weather`,
      });

      // this.saveToLocalStorage("recent_key", dataLocation);
      const encodeAirCode = encodeBase64(airCode);
      await Promise.all([
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);
    },
  },
};
</script>
<style lang="scss">
.bg-form-recent {
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  -webkit-box-pack: justify;
}

.topnav {
  z-index: 100;
  padding: 0 12px;
  box-shadow: 0 0.25rem 0.75rem rgba(18, 38, 63, 0.08);
}

.img-bg {
  background-image: url("../../assets/images/png/1920x450.jpg");
}

.img-bg-1 {
  background-image: url("../../assets/images/png/1920x450_(1).jpg");
}

.img-bg-2 {
  background-image: url("../../assets/images/png/1920x450_(2).jpg");
}

.img-bg-3 {
  background-image: url("../../assets/images/png/1920x450_(3).jpg");
}

.imgBg {
  width: 100%;
  background-size: cover;
  background-position: center;
}

.imgBg:before {
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(hsla(0, 0%, 6%, 0)),
    to(#111)
  );
  background: linear-gradient(0deg, hsla(0, 0%, 6%, 0), #111);
  content: "";
  height: 120px;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
}

.weather-menu-item.active .weather-menu-link {
  color: #003576;
}

.weather-menu-link {
  border-radius: 4px;
  background-color: #fff;
  color: #000000;
}
</style>
