<template>
  <div class="w-full items-center text-left text-white pad-t-b">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular">
        <div class="cursor-pointer" @click="onClickHome()">
          {{ $t("Home") }}
        </div>
        <div
          class="flex items-center"
          v-if="breadcumsObject?.country_key?.toLowerCase() === 'vn'"
        >
          <div class="flex items-center" v-if="breadcumsObject?.country">
            <img
              class="transform"
              src="../../assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer" @click="onClickHome()">
              {{ breadcumsObject?.country }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.city">
            <img
              class="transform"
              src="../../assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
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
            <img
              class="transform"
              src="@/assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
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
            <img
              class="transform"
              src="@/assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
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
        <div
          v-else-if="breadcumsObject?.country_key === 'us'"
          class="flex items-center"
        >
          <div class="flex items-center" v-if="breadcumsObject?.country">
            <img
              class="transform"
              src="../../assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer" @click="onClickHome()">
              {{ breadcumsObject?.country }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.state">
            <img
              class="transform"
              src="../../assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer" @click="onClickStateUSA()">
              {{ breadcumsObject?.state }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.county">
            <img
              class="transform"
              src="@/assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer">
              {{ breadcumsObject?.county }}
            </div>
          </div>
        </div>
        <div v-else class="flex items-center">
          <div class="flex items-center" v-if="breadcumsObject?.country">
            <img
              class="transform"
              src="../../assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer" @click="onClickHome()">
              {{ breadcumsObject?.country }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.state">
            <img
              class="transform"
              src="../../assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer">
              {{ breadcumsObject?.state }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.regions">
            <img
              class="transform"
              src="@/assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
            <div class="cursor-pointer">
              {{ breadcumsObject?.regions }}
            </div>
          </div>
          <div class="flex items-center" v-if="breadcumsObject?.cities">
            <img
              class="transform"
              src="@/assets/images/svg_v2/ic_move_down_left.svg"
              alt=""
            />
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

export default {
  name: "breadcums-page",

  data() {
    return {
      localBreadcums: null,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "listCityAllGetters",
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

    cityBreadcums() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      if (this.listCityAllGetters.length !== 0) {
        const findData = this.listCityAllGetters.find(
          (x) => x.keyLanguage === retrievedArray?.city_key
        );
        if (findData) {
          return findData.languages[this.languageParam];
        }
        return "";
      }

      return "";
    },
  },

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", [
      "setBreadcumsNotAllowLocation",
      "setBreadcumsAllowLocation",
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
            this.removeWordAndAccents(objectBread.county, "County"),
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
      const language = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      let objectBread = {
        country: retrievedArray.country,
        country_key: retrievedArray.country_key,
        city: retrievedArray.city,
        city_key: retrievedArray.city_key,
        district: "",
        district_key: "",
        ward: "",
        ward_key: "",
        latitude: retrievedArray.latitude,
        longitude: retrievedArray.longitude,
      };

      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);

      await this.$router.push({
        name: "today-weather",
        params: {
          language: language,
          location: [
            retrievedArray?.country_key?.toLowerCase(),
            this.convertToSlug(retrievedArray.city),
          ],
        },
      });

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${retrievedArray.latitude},${retrievedArray.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        retrievedArray.latitude,
        retrievedArray.longitude
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

    async onClickWard() {
      const language = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      let objectBread = {
        country: retrievedArray.country,
        country_key: retrievedArray.country_key,
        city: retrievedArray.city,
        city_key: retrievedArray.city_key,
        district: retrievedArray.district,
        district_key: retrievedArray.district_key,
        ward: retrievedArray.ward,
        ward_key: retrievedArray.ward_key,
        latitude: retrievedArray.latitude,
        longitude: retrievedArray.longitude,
      };

      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);

      await this.$router.push({
        name: "today-weather",
        params: {
          language: language,
          location: [
            retrievedArray?.country_key?.toLowerCase(),
            this.convertToSlug(retrievedArray.city),
            this.convertToSlug(retrievedArray.district),
            this.convertToSlug(retrievedArray.ward),
          ],
        },
      });

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${retrievedArray.latitude},${retrievedArray.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        retrievedArray.latitude,
        retrievedArray.longitude
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

    async onClickDistrict() {
      const language = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      const locationPath = `${language}/${retrievedArray.country_key.toLowerCase()}/${this.convertToSlug(
        retrievedArray.city
      )}/${this.convertToSlug(retrievedArray.district)}`;

      let objectBread = {
        country: retrievedArray.country,
        country_key: retrievedArray.country_key,
        city: retrievedArray.city,
        city_key: retrievedArray.city_key,
        district: retrievedArray.district,
        district_key: retrievedArray.district_key,
        ward: "",
        ward_key: "",
        latitude: retrievedArray.latitude,
        longitude: retrievedArray.longitude,
      };

      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);

      await this.$router.push({
        name: "today-weather",
        params: {
          language: language,
          location: [
            retrievedArray.country_key.toLowerCase(),
            this.convertToSlug(retrievedArray.city),
            this.convertToSlug(retrievedArray.district),
          ],
        },
      });

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${retrievedArray.latitude},${retrievedArray.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        retrievedArray.latitude,
        retrievedArray.longitude
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
      const keyLanguage =
        Object.keys(this.$route.params).length !== 0
          ? this.$route.params.location[0]
          : this.$i18n.locale;

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${retrievedArray.latitude},${retrievedArray.longitude}?lang=${keyLanguage}`;
      const resultAir = getAqiDataFromLocation(
        retrievedArray.latitude,
        retrievedArray.longitude
      );

      const value = encodeBase64(param);
      const valueNewAir = encodeBase64(resultAir);
      // const objectPosition = {
      //   latitude: retrievedArray.latitude,
      //   longitude: retrievedArray.longitude,
      //   city: cityCountryNow.city,
      //   country: cityCountryNow.city,
      // };
      const airCode = getParamAirByCode(this.airObjectGetters?.key);
      const encodeAirCode = encodeBase64(airCode);

      // Gọi các API song song
      await Promise.all([
        this.getWeatherDataCurrent(value),
        this.getAirQualityByKey(valueNewAir),
        this.getAirQuality(encodeAirCode),
      ]);

      // this.setCityWeather(objectPosition);
    },
  },

  mounted() {
    this.updateLocalBreadcums();
  },
};
</script>
<style lang="scss"></style>
