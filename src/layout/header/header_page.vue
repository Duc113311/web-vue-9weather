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

            <div class="flex w-full items-center gap-2 cursor-pointer">
              <div
                class="imgLogo cursor-pointer"
                @click="onClickReloadHome()"
              ></div>
              <div
                class="txt_bold_34 color-title-logo cursor-pointer"
                @click="onClickReloadHome()"
              >
                9Weather
              </div>
            </div>
          </div>
          <!-- Search -->
          <div class="sm:w-[350px] w-[200px] h-full ml-4 md:ml-0">
            <div class="flex justify-center items-center h-full">
              <div class="w-[40vh] block">
                <el-autocomplete
                  v-model="valueSearch"
                  :fetch-suggestions="querySearchAsync"
                  :placeholder="$t('Search_location')"
                  @select="handleSelect"
                  @keydown.enter="handleEnter"
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
              class="lg:flex hidden items-center mr-4 txt_regular_15 color-text"
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

            <div class="cursor-pointer hidden md:block">
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
            <div class="cursor-pointer md:hidden block">
              <svg
                @click="onClickShowMenuMobile"
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
import {
  checkSubstring,
  convertLowerCase,
  convertToConvertLowerCase,
  convertToVietnamese,
  convertToWorldState,
  convertToWourldState,
  decryptData,
  getFromIndexedDB,
  removeWordAndAccents,
  replaceApostropheWithUnderscore,
  saveToIndexedDB,
} from "@/utils/coverTextSystem";

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
      "breadcumsObjectGetters",
      "locationChomeObjectGetters",
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
      const retrievedArray = JSON.parse(sessionStorage.getItem("cityVietnam"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.objectCityByLocationGetters;

      return resultData;
    },

    listCityAllData() {
      const retrievedArray = JSON.parse(
        sessionStorage.getItem("cityDetailVietnam")
      );
      const resultData = retrievedArray
        ? retrievedArray
        : this.listCityAllGetters;

      return resultData;
    },

    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },

    wardParamChrome() {
      const retrievedArray = JSON.parse(
        localStorage.getItem("currentLocationChome")
      );
      const resultData = retrievedArray
        ? retrievedArray
        : this.locationChomeObjectGetters;

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
      "setIsScroll",
      "setObjectFormattesLocation",
      "setListDetailCityAll",
      "setObjectCityByLocation",
    ]),
    ...mapMutations(["setListLocation", "setCountryFilter"]),

    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),

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

    /**
     * Convert định dạng giờ
     */
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

    /**
     * Click show Menu Settings
     */
    onClickShowMenu() {
      if (this.isShowHeaderMenu) {
        return this.$emit("onChangeShowHeaderMenu", false);
      }
      this.$emit("onChangeShowHeaderMenu", true);
    },

    onClickShowMenuMobile() {
      if (this.isShowHeaderMenu) {
        this.setIsScroll(false);

        return this.$emit("onChangeShowHeaderMenu", false);
      }
      this.setIsScroll(true);
      this.$emit("onChangeShowHeaderMenu", true);
    },

    /**
     * Query search get data by API Weather Lat Long
     * @param queryString
     * @param cb
     */
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
      const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.radar.rain&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
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
    splitStingWard(inputString) {
      return inputString.split("_").slice(1).join("_");
    },

    findCityData(value) {
      const listCityVN = decryptData(this.objectCityByLocationData);

      const replaceCity = convertToVietnamese(value.city).cityConvert;
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

    findDistrictsData(value) {
      const listCityVN = decryptData(this.listCityAllData);

      const replaceCity = convertToVietnamese(value.city).cityConvert;
      const replaceDistrict = convertToConvertLowerCase(value.district);

      const replaceApos = replaceApostropheWithUnderscore(replaceDistrict);
      const findData = listCityVN.find(
        (x) => x.keyAccentLanguage === replaceCity
      );

      if (findData) {
        const districtListData = findData.districtList;

        // Kiểm tra districtListData có tồn tại và là mảng không
        if (Array.isArray(districtListData)) {
          for (let index = 0; index < districtListData.length; index++) {
            const element = districtListData[index];

            const checkSub = checkSubstring(
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
    async handleEnter(event) {
      const matchedItem = this.suggestions[1];
      if (matchedItem) {
        await this.handleSelect(matchedItem); // Gọi handleSelect khi nhấn Enter
      } else {
        console.log("No matching item found");
      }
    },

    async handleSelect(item) {
      this.valueSearch = "";

      if (item?.country_key?.toLowerCase() === "vn") {
        await this.loadAllFileJson().then(async (x) => {
          const cityName = "Vietnamese";
          const cityDetail = "vietnam";
          const dataGet = await getFromIndexedDB(cityName, cityDetail);
          console.log("dataGet", dataGet);
        });
      } else {
        await this.loadProvinceWould(item).then(async (x) => {
          const cityName = item.country;
          const cityDetail = item.country_key;
          const dataGet = await getFromIndexedDB(cityName, cityDetail);
          console.log("dataGetWorld", dataGet);
        });
      }
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
            item.ward && this.getWardsByLocation(item)
              ? this.getWardsByLocation(item).viNameLanguage
              : "",
          ward_key:
            item.ward && this.getWardsByLocation(item)
              ? this.getWardsByLocation(item).keyAccentLanguage
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
                convertLowerCase(objectBread.city),
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
                convertLowerCase(objectBread.city),
                convertLowerCase(objectBread.district),
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
                convertLowerCase(objectBread.city),
                convertLowerCase(objectBread.district),
                convertLowerCase(removeWordAndAccents(objectBread.ward)),
              ],
            },
          });
        }
      } else {
        // Trên thế giới
        let objectBread = {
          country: item.country,
          country_key: item.country_key.toLowerCase(),
          state:
            item.state && this.getStateByLocation(item.state)
              ? this.getStateByLocation(item.state)
              : "",
          state_key: item.state_key,
          county: item.county,
          cities: item.cities,
          latitude: item.lat,
          longitude: item.lng,
        };

        localStorage.setItem("objectBread", JSON.stringify(objectBread));
        this.setBreadcumsAllowLocation(objectBread);

        // Bang
        if (objectBread.state.length !== 0 && objectBread.cities.length === 0) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country_key.toLowerCase(),
                convertLowerCase(objectBread.state),
              ],
            },
          });
        }
        // Quận
        if (
          objectBread.state.length !== 0 &&
          !objectBread.cities.length !== 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: language,
              location: [
                objectBread.country_key.toLowerCase(),
                convertLowerCase(objectBread.state),
                convertLowerCase(objectBread.cities),
              ],
            },
          });
        }
      }

      // window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.radar.rain&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
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

    getStateByLocation(value) {
      return convertToWorldState(value);
    },

    async loadProvinceWould(value) {
      const formattedCountry = value.country;

      const cityName = value.country;
      const cityDetail = value.country_key;
      try {
        const response = await fetch(
          `/json/world/common/${formattedCountry}.json`
        );
        if (!response.ok)
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        const provinceData = await response.json(); // Parse JSON data

        const objectState = {
          id: formattedCountry,
          data: provinceData,
        };
        // this.setObjectFormattesLocation(objectState);
        await saveToIndexedDB([objectState], cityName, cityDetail);
      } catch (error) {
        console.error("Error loading file:", error.message);
      }
    },

    async loadAllFileJson() {
      let provinces = [];

      // const dataIndexDB = await getFromIndexedDB();
      // console.log("dataIndexDB", dataIndexDB);

      // if (!dataIndexDB) {
      const context = require.context(
        "/public/json/vietnamese",
        false,
        /\.json$/
      );
      // context.keys() trả về danh sách các file, duyệt qua và import dữ liệu của từng file
      context.keys().map((key) => {
        const provinceData = context(key); // Load dữ liệu từ file

        provinces.push(provinceData);
      });

      const response = await fetch("/json/city/city.json");
      if (!response.ok)
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      const dataJson = await response.json(); // Parse JSON data
      const cityName = "Vietnamese";
      const cityDetail = "vietnam";
      await saveToIndexedDB(
        [
          {
            id: "cityVietnam",
            data: dataJson,
          },
          {
            id: "cityDetailVietnam",
            data: provinces,
          },
        ],
        cityName,
        cityDetail
      );
      // }
    },

    async loadProvince() {
      const dataCityVNSession = JSON.parse(
        sessionStorage.getItem("dataCityLog")
      );
      if (!dataCityVNSession) {
        try {
          const response = await fetch("/json/city/city.json");
          if (!response.ok)
            throw new Error(
              `Failed to fetch data: ${response.status} ${response.statusText}`
            );
          const data = await response.json(); // Parse JSON data
          this.provinceData = data;
          this.setObjectCityByLocation(this.provinceData);
        } catch (error) {
          console.error("Error loading file:", error.message);
        }
      } else {
        this.setObjectCityByLocation(dataCityVNSession);
      }
    },

    getWardsByLocation(value) {
      // Lấy danh sách Viet nam
      const listCityVN = decryptData(this.listCityAllData);

      const replaceCity = convertToVietnamese(value.city).cityConvert;
      const replaceDistrict = convertToConvertLowerCase(value.district);

      const findData = listCityVN.find(
        (x) => x.keyAccentLanguage === replaceCity
      );
      if (findData) {
        const districtListData = findData.districtList;

        if (Array.isArray(districtListData)) {
          for (let index = 0; index < districtListData.length; index++) {
            const element = districtListData[index];

            const listWard = element.wards;
            const findDataWard = listWard.find(
              (x) => x.location.lat === value.lat
            );
            if (findDataWard) {
              localStorage.setItem("locationDistrict", element.location);
              return findDataWard;
            }
          }
        } else {
          console.error("districtListData không phải là mảng");
        }
      }
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

    async onClickLocationView() {
      const objectBreadValue = this.wardParamChrome;

      if (objectBreadValue?.country_key?.toLowerCase() === "vn") {
        await this.loadAllFileJson().then(async (x) => {
          const cityName = "Vietnamese";
          const cityDetail = "vietnam";
          // const dataGet = await getFromIndexedDB(cityName, cityDetail);
          // console.log("dataGet", dataGet);
        });
      } else {
        await this.loadProvinceWould(objectBreadValue).then(async (x) => {
          const cityName = objectBreadValue.country;
          const cityDetail = objectBreadValue.country_key;
          // const dataGet = await getFromIndexedDB(cityName, cityDetail);
          // console.log("dataGetWorld", dataGet);
        });
      }

      localStorage.setItem("objectBread", JSON.stringify(objectBreadValue));

      this.setBreadcumsNotAllowLocation(objectBreadValue);

      if (objectBreadValue.country_key.toLowerCase() === "vn") {
        // tồn tại thành phố
        if (
          objectBreadValue.city.length !== 0 &&
          objectBreadValue.district.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: this.languageParam,
              location: [
                objectBreadValue.country_key.toLowerCase(),
                convertLowerCase(objectBreadValue.city),
              ],
            },
          });
        }
        // Tồn tại quận
        if (
          objectBreadValue.city.length !== 0 &&
          objectBreadValue.district.length !== 0 &&
          objectBreadValue.ward.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: this.languageParam,
              location: [
                objectBreadValue.country_key.toLowerCase(),
                convertLowerCase(objectBreadValue.city),
                convertLowerCase(objectBreadValue.district),
              ],
            },
          });
        }
        if (
          objectBreadValue.city.length !== 0 &&
          objectBreadValue.district.length !== 0 &&
          objectBreadValue.ward.length !== 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: this.languageParam,
              location: [
                objectBreadValue.country_key.toLowerCase(),
                convertLowerCase(objectBreadValue.city),
                convertLowerCase(objectBreadValue.district),
                convertLowerCase(removeWordAndAccents(objectBreadValue.ward)),
              ],
            },
          });
        }
      } else {
        // tồn tại thành phố
        if (
          objectBreadValue.state.length !== 0 &&
          objectBreadValue.county.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: this.languageParam,
              location: [
                objectBreadValue.country_key.toLowerCase(),
                convertLowerCase(objectBreadValue.state),
              ],
            },
          });
        }
        // Tồn tại quận
        if (
          objectBreadValue.state.length !== 0 &&
          objectBreadValue.county.length !== 0 &&
          objectBreadValue.cities.length === 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: this.languageParam,
              location: [
                objectBreadValue.country_key.toLowerCase(),
                convertLowerCase(objectBreadValue.state),
                convertLowerCase(objectBreadValue.county),
              ],
            },
          });
        }
        if (
          objectBreadValue.state.length !== 0 &&
          objectBreadValue.county.length !== 0 &&
          objectBreadValue.cities.length !== 0
        ) {
          await this.$router.push({
            name: "today-weather",
            params: {
              language: this.languageParam,
              location: [
                objectBreadValue.country_key.toLowerCase(),
                convertLowerCase(objectBreadValue.state),
                convertLowerCase(objectBreadValue.county),
                convertLowerCase(objectBreadValue.cities),
              ],
            },
          });
        }
      }

      const param = `version=1&type=8&app_id=amobi.weather.forecast.radar.rain&request=https://api.forecast.io/forecast/TOH_KEY/${objectBreadValue.latitude},${objectBreadValue.longitude}?lang=${this.languageParam}`;
      const resultAir = getAqiDataFromLocation(
        objectBreadValue.latitude,
        objectBreadValue.longitude
      );
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

    resetComponentData() {
      // Reset dữ liệu trong component
      Object.assign(this.$data, this.$options.data());
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
