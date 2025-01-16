<template>
  <div class="w-full items-center text-left color_f9f9f9 pad-t-b mt-2">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular_17 pad-l-r-20">
        <div class="cursor-pointer" @click="onClickHome()">
          {{ $t("Home") }}
        </div>
        <div
          class="flex items-center"
          v-if="breadcumsObject?.country_key?.toLowerCase() === 'vn'"
        >
          <div class="flex items-center" v-if="breadcumsObject?.country">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer" @click="onClickHome()">
              {{ breadcumsObject?.country }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.city">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer" @click="onClickCity()">
              {{
                $t(
                  `city.city_${languageParam}.${convertToLowCase(
                    breadcumsObject?.city_key
                  )}`
                )
              }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.district">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer" @click="onClickDistrict()">
              {{
                convertCapitalizeWords(
                  $t(
                    `${convertToSlugCity(
                      breadcumsObject?.city
                    )}.${convertToSlugCity(
                      breadcumsObject?.city
                    )}_${languageParam}.${convertToLowCase(
                      breadcumsObject?.district_key
                    )}`
                  )
                )
              }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.ward">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer" @click="onClickWard()">
              {{
                convertCapitalizeWords(
                  $t(
                    `${convertToSlugCity(
                      breadcumsObject?.city
                    )}.${convertToSlugCity(
                      breadcumsObject?.city
                    )}_${languageParam}.${convertToLowCase(
                      breadcumsObject?.ward_key
                    )}`
                  )
                )
              }}
            </div>
          </div>
        </div>
        <!-- Trên thế giới -->
        <div v-else class="flex items-center">
          <div class="flex items-center" v-if="breadcumsObject?.country">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer">
              {{ breadcumsObject?.country }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.state">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer">
              {{ breadcumsObject?.state }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.county">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer">
              {{ breadcumsObject?.county }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.cities">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43814 21.5621L14.5625 2.43778"
                stroke="var(--color-txt)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="cursor-pointer">
              {{ breadcumsObject?.cities }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { capitalizeWords, convertToEnglish } from "@/utils/converValue";
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils";
import removeAccents from "remove-accents";
import {
  convertLowerCase,
  removeWordAndAccents,
} from "@/utils/coverTextSystem";

export default {
  name: "breadcums-page",

  data() {
    return {
      localBreadcums: null,
      indexKey: 0,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "listCityAllGetters",
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
    /**
     * Gán giá trị breadcums
     */
    breadcumsObject() {
      return this.localBreadcums;
    },

    listCityAllData() {
      const retrievedArray = JSON.parse(sessionStorage.getItem("dataCityAll"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.listCityAllGetters;

      return resultData;
    },
  },

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setBreadcumsAllowLocation",
      "setIndexComponent",
    ]),
    ...mapMutations(["setListLocation", "setCountryFilter"]),

    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),

    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },
    updateLocalBreadcums() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      this.localBreadcums = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;
    },

    async onClickStateUSA() {
      const breadcumsObject = this.breadcumsObject;
      let objectBread = {
        country: breadcumsObject.country,
        country_key: breadcumsObject.country_key,
        state: breadcumsObject.state,
        state_key: breadcumsObject.state_key,
        county: breadcumsObject.county,
        cities: "",
        latitude: breadcumsObject.latitude,
        longitude: breadcumsObject.longitude,
      };
      localStorage.setItem("objectBread", JSON.stringify(objectBread));
      this.setBreadcumsAllowLocation(objectBread);

      await this.$router.push({
        name: "today-weather",
        params: {
          language: this.languageParam,
          location: [
            objectBread.country_key.toLowerCase(),
            removeAccents(objectBread.state),
            removeWordAndAccents(objectBread.county, "County"),
          ],
        },
      });

      window.location.reload();

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBread.latitude},${objectBread.longitude}?lang=${this.languageParam}`;
      const resultAir = getAqiDataFromLocation(
        objectBread.lat,
        objectBread.lng
      );
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

    async onClickCity() {
      debugger;
      const objectBreadValue = this.breadcumsObject;
      if (objectBreadValue?.country_key?.toLowerCase() === "vn") {
        const locationValue = this.getCityByLocation(objectBreadValue.city_key);
        let objectBread = {
          country: objectBreadValue.country,
          country_key: objectBreadValue.country_key,
          city: objectBreadValue.city ? objectBreadValue.city : "",
          city_key: objectBreadValue.city_key ? objectBreadValue.city_key : "",
          district: "",
          district_key: "",
          ward: "",
          ward_key: "",
          latitude: locationValue.lat,
          longitude: locationValue.lng,
        };
        localStorage.setItem("objectBread", JSON.stringify(objectBread));

        this.setBreadcumsAllowLocation(objectBread);
        await this.$router.push({
          name: "today-weather",
          params: {
            language: this.languageParam,
            location: [
              objectBread?.country_key?.toLowerCase(),
              convertLowerCase(objectBread.city),
            ],
          },
        });
        debugger;
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBread.latitude},${objectBread.longitude}?lang=${this.languageParam}`;

        // const latLong = localStorage.getItem("locationLatLong");
        const resultAir = getAqiDataFromLocation(
          objectBread.latitude,
          objectBread.longitude
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
      }
    },

    async onClickWard() {
      debugger;
      const objectBread = this.breadcumsObject;
      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsAllowLocation(objectBread);
      await this.$router.push({
        name: "today-weather",
        params: {
          language: this.languageParam,
          location: [
            objectBread?.country_key?.toLowerCase(),
            convertLowerCase(objectBread.city),
            convertLowerCase(objectBread.district),
            convertLowerCase(removeWordAndAccents(objectBread.ward)),
          ],
        },
      });
      debugger;
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBread.latitude},${objectBread.longitude}?lang=${this.languageParam}`;

      // const latLong = localStorage.getItem("locationLatLong");
      const resultAir = getAqiDataFromLocation(
        objectBread.latitude,
        objectBread.longitude
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

    async onClickDistrict() {
      debugger;
      const objectBreadValue = this.breadcumsObject;
      if (objectBreadValue?.country_key?.toLowerCase() === "vn") {
        const locationValue = this.getDistrictByLocation(
          objectBreadValue.city_key,
          objectBreadValue.district_key
        );
        let objectBread = {
          country: objectBreadValue.country,
          country_key: objectBreadValue.country_key,
          city: objectBreadValue.city ? objectBreadValue.city : "",
          city_key: objectBreadValue.city_key ? objectBreadValue.city_key : "",
          district: objectBreadValue.district ? objectBreadValue.district : "",
          district_key: objectBreadValue.district_key
            ? objectBreadValue.district_key
            : "",
          ward: "",
          ward_key: "",
          latitude: locationValue.lat,
          longitude: locationValue.lng,
        };
        localStorage.setItem("objectBread", JSON.stringify(objectBread));

        this.setBreadcumsAllowLocation(objectBread);
        await this.$router.push({
          name: "today-weather",
          params: {
            language: this.languageParam,
            location: [
              objectBread?.country_key?.toLowerCase(),
              convertLowerCase(objectBread.city),
              convertLowerCase(objectBread.district),
            ],
          },
        });
        debugger;
        const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectBread.latitude},${objectBread.longitude}?lang=${this.languageParam}`;

        // const latLong = localStorage.getItem("locationLatLong");
        const resultAir = getAqiDataFromLocation(
          objectBread.latitude,
          objectBread.longitude
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
      }
    },

    getCityByLocation(cityKey) {
      // Lấy danh sách Viet nam
      debugger;
      const listCityVN = this.listCityAllData;

      const findData = listCityVN.find((x) => x.keyAccentLanguage === cityKey);
      if (findData) {
        return findData.location;
      }
    },

    getDistrictByLocation(district, district_key) {
      // Lấy danh sách Viet nam
      debugger;
      const listCityVN = this.listCityAllData;

      const findData = listCityVN.find((x) => x.keyAccentLanguage === district);
      if (findData) {
        const districtListData = findData.districtList;

        if (Array.isArray(districtListData)) {
          debugger;

          const findDataDistrict = districtListData.find(
            (x) => x.keyAccentLanguage === district_key
          );
          if (findDataDistrict) {
            debugger;
            return findDataDistrict.location;
          }
        } else {
          console.error("districtListData không phải là mảng");
        }
      }
    },

    convertToSlug(str) {
      // Bước 1: Loại bỏ dấu tiếng Việt
      const normalizedStr = str
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      const normalizedStrResult = normalizedStr
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, "_") // Thay thế khoảng trắng bằng "-"
        .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự không hợp lệ (chỉ giữ lại chữ, số, và "-")
      return normalizedStrResult;
    },

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },

    convertToSlugCity(str) {
      const slug = removeAccents(str);

      return slug
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng
    },

    convertToEnglishRender(value) {
      return value;
    },

    async onClickHome() {
      const retrievedArray = JSON.parse(
        localStorage.getItem("locationLatLong")
      );
      this.$router.push({ path: "/" }).then(() => {
        window.location.reload();
      });

      // const objectPosition = {
      //   latitude: retrievedArray.latitude,
      //   longitude: retrievedArray.longitude,
      //   city: cityCountryNow.city,
      //   country: cityCountryNow.city,
      // };

      // this.setCityWeather(objectPosition);
    },
  },

  mounted() {
    this.updateLocalBreadcums();
  },
};
</script>
<style lang="scss"></style>
