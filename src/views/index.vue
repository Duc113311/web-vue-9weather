<template>
  <div class="flex flex-col">
    <!-- header -->

    <div class="basic-header menu-open">
      <HeaderPage
        @onChangeShowHeaderMenu="onChangeShowHeaderMenu"
        :isShowHeaderMenu="isShowHeaderMenu"
      ></HeaderPage>
      <HeaderMenu
        v-show="isShowHeaderMenu"
        @onChangeCloseMenu="onChangeShowHeaderMenu"
      ></HeaderMenu>
    </div>
    <div class="header-placeholder"></div>

    <div class="body-app relative body-n flex-grow">
      <NavBottom></NavBottom>

      <div class="w-full pad-big">
        <router-view />
      </div>
    </div>

    <FooterPage></FooterPage>

    <!-- Header menu -->
  </div>
</template>
<script>
import axios from "axios";
import {
  encodeBase64,
  decodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils.js";
import removeAccents from "remove-accents";

import { mapActions, mapGetters, mapMutations } from "vuex";
import HeaderPage from "@/layout/header/header_page.vue";
import NavBottom from "@/layout/tabbar-bottom/nav-bottom.vue";
import FooterPage from "@/layout/footer/footer-page.vue";
import HeaderMenu from "@/layout/header/header-menu.vue";

export default {
  name: "dash-page",

  components: {
    HeaderPage,
    NavBottom,
    FooterPage,
    HeaderMenu,
    // NavTabbar,
  },
  data() {
    return {
      suggestionsTop100: [],
      provinces: [],
      isShowHeaderMenu: false,
      provinceData: null,
    };
  },

  async mounted() {
    await this.loadProvince();

    await this.loadAllFileJson();

    await this.loadStateAmerican();

    await this.loadProvinceAmerican();
    const objectBread = localStorage.getItem("objectBread");
    const routerLink = this.$route.params;
    debugger;
    if (!objectBread) {
      this.getLocationBrowser();
    } else {
      const objectBreadValue = JSON.parse(objectBread);
      if (objectBreadValue.country_key === "vn") {
        this.handleLocation(objectBreadValue);
      } else if (objectBreadValue.country_key === "us") {
        this.handleLocationAmerican(objectBreadValue);
      } else {
        debugger;
        // localStorage.removeItem("objectBread");
        // this.getLocationBrowser();
        this.handleLocationWorld(objectBreadValue);
      }
    }

    // this.loadDataTop100();
  },

  computed: {
    ...mapGetters("airQualityModule", [
      "airKeyObjectGetters",
      "airObjectGetters",
    ]),

    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "objectCityByLocationGetters",
      "listAlabamaGetters",
    ]),
  },

  created() {},

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setBreadcumsAllowLocation",
      "setObjectCityByLocation",
      "setAmericanStateRegions",
      "setListDetailCityAll",
      "setStateAmerican",
      "setLocationChome",
    ]),

    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getWeatherDataIp",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("idFindModule", ["getIpLocation"]),

    onChangeShowHeaderMenu(value) {
      this.isShowHeaderMenu = value;
    },

    async loadProvince() {
      debugger;
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

    async loadProvinceAmerican() {
      debugger;
      const dataStateAmericanSession = JSON.parse(
        sessionStorage.getItem("dataStateAmerican")
      );
      if (!dataStateAmericanSession) {
        try {
          const response = await fetch("/json/city/american.json");
          if (!response.ok)
            throw new Error(
              `Failed to fetch data: ${response.status} ${response.statusText}`
            );
          const data = await response.json(); // Parse JSON data
          this.provinceData = data.regions;
          this.setAmericanStateRegions(this.provinceData);
        } catch (error) {
          console.error("Error loading file:", error.message);
        }
      } else {
        this.setAmericanStateRegions(dataStateAmericanSession);
      }
    },

    async loadAllFileJson() {
      let provinces = [];
      const dataCityLogVNSession = JSON.parse(
        sessionStorage.getItem("dataCityAll")
      );
      if (!dataCityLogVNSession) {
        const context = require.context(
          "/public/json/vietnamese",
          false,
          /\.json$/
        );
        debugger;
        // context.keys() trả về danh sách các file, duyệt qua và import dữ liệu của từng file
        const provincesData = context.keys().map((key) => {
          const provinceData = context(key); // Load dữ liệu từ file

          provinces.push(provinceData);
        });
        this.setListDetailCityAll(provinces);
      } else {
        this.setListDetailCityAll(dataCityLogVNSession);
      }
    },

    async loadStateAmerican() {
      let provinces = [];
      const dataCityLogVNSession = JSON.parse(
        sessionStorage.getItem("dataAlabama")
      );
      if (!dataCityLogVNSession) {
        const context = require.context(
          "/public/json/american",
          false,
          /\.json$/
        );
        debugger;
        // context.keys() trả về danh sách các file, duyệt qua và import dữ liệu của từng file
        const provincesData = context.keys().map((key) => {
          const provinceData = context(key); // Load dữ liệu từ file

          provinces.push(provinceData);
        });
        this.setStateAmerican(provinces);
      } else {
        this.setStateAmerican(dataCityLogVNSession);
      }
    },

    async handleLocationAmerican(dataValue) {
      let latitude = dataValue.latitude;
      let longitude = dataValue.longitude;

      localStorage.setItem("objectBread", JSON.stringify(dataValue));

      this.setBreadcumsAllowLocation(dataValue);

      this.setCityWeather(dataValue);

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

    async handleLocationWorld(dataValue) {
      let latitude = dataValue.latitude;
      let longitude = dataValue.longitude;

      const paramsRouter = this.$route.params;
      debugger;

      if (Object.keys(paramsRouter).length === 0) {
        // Xét giá trị để lưu Recent
        const objectPosition = {
          latitude: latitude,
          longitude: longitude,
          country: dataValue.country,
          country_key: dataValue.country_key,
          city: dataValue.city,
          city_key: dataValue.city_key,
          district: "",
          district_key: "",
          ward: "",
          ward_key: "",
          // objectLocation: responsive.data.address,
        };
        localStorage.setItem("objectBread", JSON.stringify(objectPosition));

        this.setBreadcumsAllowLocation(objectPosition);

        this.setCityWeather(objectPosition);
      } else {
        if (paramsRouter.location && paramsRouter.location.length === 3) {
          // Xét giá trị để lưu Recent
          const objectPosition = {
            latitude: latitude,
            longitude: longitude,
            country: dataValue.country,
            country_key: dataValue.country_key,
            city: dataValue.city,
            city_key: dataValue.city_key,
            district: "",
            district_key: "",
            ward: "",
            ward_key: "",
          };
          localStorage.setItem("objectBread", JSON.stringify(objectPosition));

          this.setBreadcumsAllowLocation(objectPosition);

          this.setCityWeather(objectPosition);
        }
        if (paramsRouter.location && paramsRouter.location.length === 4) {
          const objectPosition = {
            latitude: latitude,
            longitude: longitude,
            country: dataValue.country,
            country_key: dataValue.country_key,
            city: dataValue.city,
            city_key: dataValue.city_key,
            district: dataValue.district,
            district_key: dataValue.district_key,
            ward: "",
            ward_key: "",

            // objectLocation: responsive.data.address,
          };
          localStorage.setItem("objectBread", JSON.stringify(objectPosition));

          this.setBreadcumsAllowLocation(objectPosition);

          this.setCityWeather(objectPosition);
        }
      }

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

    async handleLocation(dataValue) {
      debugger;
      let latitude = dataValue.latitude;
      let longitude = dataValue.longitude;

      const objectLatLong = {
        latitude: latitude,
        longitude: longitude,
      };
      localStorage.setItem("locationLatLong", JSON.stringify(objectLatLong));

      localStorage.setItem("objectBread", JSON.stringify(dataValue));

      this.setBreadcumsAllowLocation(dataValue);

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
     * Connect vị trí trên trình duyệt
     */
    getLocationBrowser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setPosition.bind(this),
          this.showError.bind(this)
        );
      } else {
        this.error = "Geolocation is not supported by this browser.";
      }
    },

    /**
     * Có lấy cho phép lấy location trình duyệt
     * @param position
     */
    async setPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      debugger;
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
      debugger;

      // Xét giá trị để lưu Recent
      const dataResponsive = responsive.data.address;

      debugger;
      if (dataResponsive.country_code.toLowerCase() === "us") {
        const objectPosition = {
          latitude: latitude,
          longitude: longitude,
          country_key: dataResponsive.country_code.toLowerCase(), // us
          country: dataResponsive.country, // us
          state: dataResponsive.state, // State
          state_key: dataResponsive.state.toLowerCase(), // State
          county: dataResponsive.county, // county
          cities: dataResponsive?.cities ? dataResponsive?.cities : "", // cities
          // objectLocation: responsive.data.address,
        };

        console.log("objectPosition-us", objectPosition);

        localStorage.setItem(
          "currentLocationChome",
          JSON.stringify(objectPosition)
        );
        this.setLocationChome(objectPosition);

        localStorage.setItem("objectBread", JSON.stringify(objectPosition));
        this.setBreadcumsAllowLocation(objectPosition);
      } else if (dataResponsive.country_code.toLowerCase() === "vn") {
        const objectPosition = {
          latitude: latitude,
          longitude: longitude,
          country: dataResponsive.country,
          country_key: dataResponsive.country_code.toLowerCase(),
          city: dataResponsive?.city,
          city_key: this.convertToConvertLowerCase(dataResponsive?.city),
          district: "",
          district_key: "",
          ward: "",
          ward_key: "",
        };

        console.log("objectPosition-vn", objectPosition);

        localStorage.setItem("objectBread", JSON.stringify(objectPosition));
        localStorage.setItem(
          "currentLocationChome",
          JSON.stringify(objectPosition)
        );
        this.setLocationChome(objectPosition);
        this.setBreadcumsAllowLocation(objectPosition);

        this.setCityWeather(objectPosition);
      } else {
        const objectPosition = {
          latitude: latitude,
          longitude: longitude,
          country: dataResponsive.country, // United Kingdom
          country_key: dataResponsive.country_code.toLowerCase(), // gb
          state: dataResponsive.state, // England
          regions: dataResponsive.state_district, // Greater London
          regions_key: this.convertToConvertLowerCase(
            dataResponsive.state_district
          ), // Greater London
          cities: dataResponsive?.neighbourhood // Covent Garden
            ? dataResponsive?.neighbourhood
            : "",
          cities_key: dataResponsive?.neighbourhood // Covent Garden
            ? this.convertToConvertLowerCase(dataResponsive?.neighbourhood)
            : "",
        };

        console.log("objectPosition-other", objectPosition);

        localStorage.setItem("objectBread", JSON.stringify(objectPosition));
        this.setBreadcumsAllowLocation(objectPosition);

        this.setCityWeather(objectPosition);
      }

      // Xét giá trị để lưu Recent

      // if (dataResponsive.city === "Thành phố Hà Nội") {
      //   objectPosition.city = "Hà Nội";
      //   objectPosition.city_key = "Ha_Noi";
      // }
      debugger;

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

    convertToConvertLowerCase(str) {
      const slug = removeAccents(str).replace(/\s+/g, "_");
      return slug;
    },

    /**
     * Handle hàm để lấy location request
     * @param value
     */
    async getIpLocationHandle(value) {
      try {
        const codeLocation = encodeBase64(value);
        await this.getWeatherDataIp(codeLocation).then(async (data) => {
          const valueNew = decodeBase64(data);
          debugger;
          // API Lấy vị trí
          await this.getIpLocation(valueNew).then(async (data) => {
            // Xét Breadcum
            debugger;

            const objectLatLong = {
              latitude: data.latitude,
              longitude: data.longitude,
            };
            localStorage.setItem(
              "locationLatLong",
              JSON.stringify(objectLatLong)
            );

            const objectLocation = {
              country: data.country,
              country_key: data.country_code.toLowerCase(),
              city: this.convertToVietnamese(data.city).city,
              city_key: removeAccents(
                this.convertToVietnamese(data.city).cityConvert
              ),
              district: "",
              district_key: "",
              ward: "",
              ward_key: "",
              latitude: data.latitude,
              longitude: data.longitude,
            };

            localStorage.setItem("objectBread", JSON.stringify(objectLocation));
            this.setBreadcumsNotAllowLocation(objectLocation);

            const objectPosition = {
              latitude: data.latitude,
              longitude: data.longitude,
              code: data.region_code,
              city: data.city,
              country: data.country,
            };
            this.setCityWeather(objectPosition);
            const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${data.latitude},${data.longitude}?lang=en`;
            const resultAir = getAqiDataFromLocation(
              data.latitude,
              data.longitude
            );

            const encodeDataWeather = encodeBase64(param);
            // API Get Weather Current
            await this.getWeatherDataCurrent(encodeDataWeather);

            localStorage.setItem(
              "keyCurrent",
              JSON.stringify(encodeDataWeather)
            );

            const valueNewAir = encodeBase64(resultAir);
            // Call API getAirQualityByKey
            await this.getAirQualityByKey(valueNewAir);

            const airCode = getParamAirByCode(this.airKeyObjectGetters?.key);
            const encodeAirCode = encodeBase64(airCode);

            // API Get Air Quality Data
            await this.getAirQuality(encodeAirCode);
          });
        });
      } catch (error) {
        this.error = "Unable to retrieve location via IP.";
      }
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

    /**
     * Không cho phép lấy location trình duyêt
     * @param error
     */
    async showError(error) {
      let param =
        "version=1&type=1&app_id=amobi.weather.forecast.storm.radar&request=https://ipfind.co/me?auth=TOH_KEY";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.error = "User denied the request for Geolocation.";
          await this.getIpLocationHandle(param);
          break;
        case error.POSITION_UNAVAILABLE:
          this.error = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.error = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.error = "An unknown error occurred.";
          break;
      }
    },
  },
};
</script>

<style lang="scss"></style>
