<template>
  <div class="w-full items-center text-left text-white pad-t-b">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular">
        <div class="cursor-pointer" @click="onClickHome()">
          {{ $t("Home") }}
        </div>
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
            {{ breadcumsObject?.city }}
          </div>
        </div>
        <div class="flex items-center" v-if="breadcumsObject?.district">
          <img
            class="transform"
            src="@/assets/images/svg_v2/ic_move_down_left.svg"
            alt=""
          />
          <div class="cursor-pointer" @click="onClickDistrict()">
            {{ breadcumsObject?.district }}
          </div>
        </div>
        <div class="flex items-center" v-if="breadcumsObject?.ward">
          <img
            class="transform"
            src="@/assets/images/svg_v2/ic_move_down_left.svg"
            alt=""
          />
          <div class="cursor-pointer" @click="onClickWard()">
            {{ breadcumsObject?.ward }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { convertToEnglish } from "@/utils/converValue";
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils";
export default {
  name: "breadcums-page",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "listCityAllGetters",
    ]),
    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : localStorage.getItem("language");
    },
    /**
     * Gán giá trị breadcums
     */
    breadcumsObject() {
      console.log("this.breadcumsObjectGetters", this.breadcumsObjectGetters);
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    cityBreadcums() {
      debugger;
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

    districtBreadcums() {
      debugger;
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      if (this.listCityAllGetters.length !== 0) {
        const findData = this.listCityAllGetters.find(
          (x) => x.keyLanguage === retrievedArray?.city_key
        );
        if (findData) {
          if (retrievedArray?.district_key) {
            const findDataWard = findData.districtList.find(
              (x) =>
                x.languages["en"].replace(/ /g, "_") ===
                retrievedArray.district_key
            );
            if (findDataWard) {
              return findDataWard.languages[this.languageParam];
            } else {
              return "";
            }
          }
        } else {
          return "";
        }
      }
      return "";
    },

    wardBreadcums() {
      debugger;
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      if (this.listCityAllGetters.length !== 0) {
        const findData = this.listCityAllGetters.find(
          (x) => x.keyLanguage === retrievedArray?.city_key
        );
        if (findData) {
          if (retrievedArray?.district_key) {
            const findDataWard = findData.districtList.find(
              (x) =>
                x.languages["en"].replace(/ /g, "_") ===
                retrievedArray.district_key
            );
            if (findDataWard) {
              if (retrievedArray?.ward_key) {
                const findDataWardNew = findDataWard.districtList.find(
                  (x) => x.keyLanguage === retrievedArray?.ward_key
                );

                if (findDataWardNew) {
                  return findDataWardNew.languages[this.languageParam];
                } else {
                  return "";
                }
              }
            } else {
              return "";
            }
          } else {
            return "";
          }
        }
      }
      return "";
    },
  },

  methods: {
    ...mapMutations("weatherModule", ["setCityWeather", "setDataTop100City"]),
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    ...mapMutations(["setListLocation", "setCountryFilter"]),

    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),

    async onClickCity() {
      debugger;
      const language = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");
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
        : localStorage.getItem("language");
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
      debugger;
      const language = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");
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

      // Bước 2: Chuyển thành chữ thường và thay thế khoảng trắng bằng gạch ngang
      return normalizedStr
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng "-"
        .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự không hợp lệ (chỉ giữ lại chữ, số, và "-")
    },

    convertToEnglishRender(value) {
      return value;
    },

    async onClickHome() {
      debugger;
      const retrievedArray = JSON.parse(
        localStorage.getItem("locationLatLong")
      );
      this.$router.push({ path: "/" }).then(() => {
        window.location.reload();
      });
      const keyLanguage =
        Object.keys(this.$route.params).length !== 0
          ? this.$route.params.location[0]
          : localStorage.getItem("language");

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
      debugger;
    },
  },
};
</script>
<style lang="scss"></style>
