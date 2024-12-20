<template>
  <div class="w-full">
    <ItemComponent>
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex items-center text-left gap-2">
            <img
              src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
              width="24"
              alt=""
            />
            <div
              class="flex items-center"
              v-if="wardParam?.country_key === 'vn'"
            >
              <span v-if="wardParam?.city && !wardParam?.district">
                {{
                  $t(`{city}_district_Weather`, {
                    city: $t(
                      `city.city_${languageParam}.${convertToLowCase(
                        wardParam?.city_key
                      )}`
                    ),
                  })
                }}</span
              >
              <span v-if="wardParam?.district && !wardParam?.ward">
                {{
                  $t(`Weather_in_{city}_ward_and_commune`, {
                    city: wardParam?.district,
                  })
                }}
              </span>
              <span v-if="wardParam?.ward">
                {{
                  $t(`Weather_in_{city}_ward_and_commune`, {
                    city: wardParam?.ward,
                  })
                }}
              </span>
            </div>
            <div v-if="wardParam?.country_key === 'us'">
              <span v-if="wardParam?.state && !wardParam?.county"
                >Weather {{ wardParam?.state }}</span
              >
              <span v-if="wardParam?.county"
                >Weather {{ wardParam?.county }}</span
              >
            </div>
          </div>
        </div>
      </template>

      <div class="w-full h-auto" v-if="renderListCityAllGetters.length !== 0">
        <!--  -->
        <transition-group name="fade" tag="div">
          <div class="district-list">
            <DistrictCardPage
              v-for="(item, index) in displayedItems"
              :key="index"
              :objectLocation="item"
              @click="onClickShowDetailDistrict(item)"
            ></DistrictCardPage>
          </div>
        </transition-group>
        <div class="w-full text-left mt-3">
          <button
            type="button"
            @click="onClickLoadMoreItems"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
          >
            <span class="txt_medium_12">
              {{ showLessButton ? $t("Hide") : $t("See_more") }}</span
            >
          </button>
        </div>
      </div>
      <div class="h-[240px] bg-color text-white overflow-hidden pad-big" v-else>
        <div class="w-full h-full justify-center flex items-center">
          {{ $t("In_development") }}
        </div>
      </div>
    </ItemComponent>
  </div>
</template>
<script>
import DistrictCardPage from "@/components/common/card/district-card-page.vue";
import ItemComponent from "@/components/common/itemComponent.vue";
import {
  decodeBase64,
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
  urlEncodeString,
} from "@/utils/EncoderDecoderUtils";

import removeAccents from "remove-accents";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "list-nearby-location",

  components: {
    ItemComponent,
    DistrictCardPage,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showLessButton: false,
      itemsPerPage: 8, // Số mục hiển thị ban đầu
      currentPage: 1, // Trang hiện tại
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "breadcumsObjectGetters",
      "listAlabamaGetters",
    ]),

    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.renderListCityAllGetters.slice(0, end);
    },

    itemSliceCount() {
      if (this.windowWidth <= 567) {
        return 4; // Mobile
      } else if (this.windowWidth < 768) {
        return 4; // Tablet
      } else if (this.windowWidth < 1024) {
        return 6; // Tablet
      } else {
        return 8; // Desktop
      }
    },

    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    wardParam() {
      debugger;

      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },

    renderListCityAllGetters() {
      debugger;

      const countryKey = this.wardParam.country_key;

      if (this.wardParam) {
        if (countryKey === "vn") {
          const cityKey = this.wardParam.city_key;
          debugger;
          const findData = this.listCityAllGetters.find(
            (x) => x.keyAccentLanguage === cityKey
          );

          if (findData) {
            debugger;
            if (this.wardParam.district_key) {
              const findDataWard = findData.districtList?.find(
                (x) =>
                  x.keyAccentLanguage ===
                  this.removeDiacritics(this.wardParam.district)
              );
              if (findDataWard) {
                return findDataWard.wards;
              } else {
                return [];
              }
            } else {
              return findData.districtList || [];
            }
          } else {
            return [];
          }
        } else if (countryKey === "us") {
          //
          const stateKey = this.wardParam.state;
          const findData = this.listAlabamaGetters.find(
            (x) => x.nameState === stateKey
          );
          if (findData) {
            if (this.wardParam?.county) {
              const countyRemove = this.removeWordAndAccents(
                this.wardParam.county,
                "County"
              );
              const findDataCities = findData.counties.find(
                (x) => x.name === countyRemove
              );
              if (findDataCities) {
                return findDataCities.cities;
              } else {
                return [];
              }
            } else {
              return findData.counties;
            }
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    // renderListCityAllGetters() {
    //   try {
    //     // Kiểm tra wardParam và listCityAllGetters
    //     debugger;

    //     const countryKey = this.wardParam.country_key;

    //     if (countryKey === "vn") {
    //       debugger;
    //       const cityKey = this.wardParam.city_key;
    //       const findData = this.listCityAllGetters.find(
    //         (x) => x.keyAccentLanguage === cityKey
    //       );

    //       if (!findData) {
    //         console.log("Không tìm thấy thành phố phù hợp.");
    //         return [];
    //       }

    //       if (this.wardParam.district_key) {
    //         const districtKey = this.removeDiacritics(this.wardParam.district);

    //         if (typeof districtKey !== "string") {
    //           console.log("district_key không hợp lệ.");
    //           return [];
    //         }

    //         const findDataWard = findData.districtList?.find(
    //           (x) => x.keyAccentLanguage === districtKey
    //         );

    //         if (findDataWard && Array.isArray(findDataWard.wards)) {
    //           return findDataWard.wards.slice(0, this.itemSliceCount);
    //         } else {
    //           console.log(
    //             "Không tìm thấy phường phù hợp hoặc wards không phải mảng."
    //           );
    //           return [];
    //         }
    //       } else {
    //         return findData.districtList?.slice(0, this.itemSliceCount) || [];
    //       }
    //     } else if (countryKey === "us") {
    //       // Xử lý cho US (cần bổ sung logic nếu cần)

    //       const cityKey = this.wardParam.city_key;
    //       const findData = this.listAlabamaGetters.find(
    //         (x) => x.keyAccentLanguage === cityKey
    //       );
    //       return [];
    //     } else {
    //       console.log("Không hỗ trợ countryKey này.");
    //       return [];
    //     }
    //   } catch (error) {
    //     console.error("Lỗi xảy ra trong renderListCityAllGetters:", error);
    //     return [];
    //   }
    // },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

    removeWordAndAccents(str, wordToRemove) {
      const normalizedStr = removeAccents(str); // Loại bỏ dấu nếu có
      return normalizedStr
        .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
        .trim();
    },

    onClickLoadMoreItems() {
      if (this.showLessButton) {
        this.currentPage = 1; // Reset to show the initial items
        this.showLessButton = false;
      } else {
        this.currentPage++;
        this.showLessButton =
          this.currentPage * this.itemsPerPage >=
          this.renderListCityAllGetters.length;
      }
    },

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
    removeDiacritics(value) {
      const removeString = value
        .normalize("NFD") // Tách ký tự dấu
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
      return removeString.replace(/ /g, "_");
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

    convertToConvertLowerCase(str) {
      const slug = removeAccents(str).replace(/\s+/g, "_");
      return slug;
    },

    async onClickShowDetailDistrict(value) {
      debugger;

      const keyLanguageStorage = this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
      localStorage.setItem("keyLanguageCity", value.keyAccentLanguage);

      const nameCity = value.viNameLanguage;

      const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
        nameCity
      )}&key=TOH_KEY`;

      const valueEncode = encodeBase64(urlParam);
      await this.getFormattedAddress(valueEncode);
      let objectAddressNew = this.$store.state.weatherModule.newArray[0];
      debugger;
      let objectBreadStorage = JSON.parse(localStorage.getItem("objectBread"));

      let objectBread = {
        country: objectAddressNew
          ? objectAddressNew.country
          : objectBreadStorage.country,
        country_key: objectAddressNew
          ? objectAddressNew.country_key
          : objectBreadStorage.country_key,
        city: objectAddressNew
          ? this.convertToVietnamese(objectAddressNew.city).city
          : objectBreadStorage.city,
        city_key: objectBreadStorage.city_key,
        latitude: objectAddressNew
          ? objectAddressNew.lat
          : objectBreadStorage.latitude,
        longitude: objectAddressNew
          ? objectAddressNew.lng
          : objectBreadStorage.longitude,
        district:
          value.type === "District"
            ? value.viNameLanguage
            : objectBreadStorage.district,
        district_key:
          value.type === "District"
            ? value.keyAccentLanguage
            : objectBreadStorage.district_key,
        ward:
          value.type === "Ward"
            ? value.viNameLanguage
            : objectBreadStorage.ward,
        ward_key:
          value.type === "Ward"
            ? value.keyAccentLanguage
            : objectBreadStorage.ward_key,
      };

      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);
      debugger;
      if (objectBread.city.length !== 0 && objectBread.district.length === 0) {
        await this.$router.push({
          name: "today-weather",
          params: {
            language: keyLanguageStorage,
            location: [
              objectBread?.country_key?.toLowerCase(),
              this.convertToSlug(objectBread.city),
            ],
          },
        });
        this.$router.go();
      }
      if (
        objectBread.city.length !== 0 &&
        objectBread.district.length !== 0 &&
        objectBread.ward.length === 0
      ) {
        await this.$router.push({
          name: "today-weather",
          params: {
            language: keyLanguageStorage,
            location: [
              objectBread?.country_key?.toLowerCase(),
              this.convertToSlug(objectBread.city),
              this.convertToSlug(objectBread.district),
            ],
          },
        });
        this.$router.go();
      }
      if (
        objectBread.city.length !== 0 &&
        objectBread.district.length !== 0 &&
        objectBread.ward.length !== 0
      ) {
        await this.$router.push({
          name: "today-weather",
          params: {
            language: keyLanguageStorage,
            location: [
              objectBread?.country_key?.toLowerCase(),
              this.convertToSlug(objectBread.city),
              this.convertToSlug(objectBread.district),
              this.convertToSlug(objectBread.ward),
            ],
          },
        });
        this.$router.go();
      }

      // const keyCity = JSON.parse(localStorage.getItem("objectBread"));

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${objectAddressNew.lat},${objectAddressNew.lng}?lang=en`;

      const resultAir = getAqiDataFromLocation(
        objectAddressNew.lat,
        objectAddressNew.lng
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

    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
<style lang="scss">
.district-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
@media (max-width: 1024px) {
  .district-list {
    /* Adjust the max-width as needed for tablet */
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  }
}
</style>
