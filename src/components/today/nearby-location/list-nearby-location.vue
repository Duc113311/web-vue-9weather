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
            <span v-if="wardParam?.city && !wardParam?.district"
              >Thời tiết quận huyện {{ wardParam?.city }}</span
            >
            <span v-if="wardParam?.district && !wardParam?.ward"
              >Thời tiết phường xã {{ wardParam?.district }}</span
            >
            <span v-if="wardParam?.ward"
              >Thời tiết phường xã {{ wardParam?.ward }}</span
            >
          </div>
          <div
            v-if="
              renderListCityAllGetters.length !== 0 &&
              this.breadcumsObjectGetters.country === 'Vietnam'
            "
          >
            <p>See more</p>
          </div>
        </div>
      </template>

      <div
        class="w-full h-[302px]"
        v-if="
          renderListCityAllGetters.length !== 0 &&
          this.breadcumsObjectGetters.country === 'Vietnam'
        "
      >
        <!--  -->
        <div class="district-list">
          <DistrictCardPage
            v-for="(item, index) in renderListCityAllGetters"
            :key="index"
            :objectLocation="item"
            @click="onClickShowDetailDistrict(item)"
          ></DistrictCardPage>
        </div>
      </div>
      <div class="h-[340px] bg-color text-white overflow-hidden pad-big" v-else>
        <div class="w-full h-full justify-center flex items-center">
          In development
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
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "list-nearby-location",

  components: {
    ItemComponent,
    DistrictCardPage,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "breadcumsObjectGetters",
    ]),

    ...mapGetters("airQualityModule", [
      "airObjectGetters",
      "airKeyObjectGetters",
    ]),

    wardParam() {
      debugger;

      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;
      console.log("resultData", resultData);

      return resultData;
    },

    renderListCityAllGetters() {
      debugger;

      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      console.log("retrievedArray", retrievedArray);

      // const cityLocation = retrievedArray
      //   ? retrievedArray
      //   : this.breadcumsObjectGetters;

      if (retrievedArray) {
        if (retrievedArray.country === "Vietnam") {
          console.log("listCityAllGetters", this.listCityAllGetters);
          const findData = this.listCityAllGetters.find(
            (x) => x.keyLanguage === retrievedArray.city_key
          );

          if (findData) {
            if (retrievedArray.district_key) {
              const findDataWard = findData.districtList.find(
                (x) => x.keyLanguage === retrievedArray.district_key
              );
              if (findDataWard) {
                return findDataWard.districtList.slice(0, 8);
              } else {
                return [];
              }
            } else {
              return findData.districtList.slice(0, 8);
            }
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        const findData = this.listCityAllGetters.find(
          (x) => x.keyLanguage === this.breadcumsObjectGetters.city_key
        );
        return findData.districtList.slice(0, 8);
      }
    },
  },

  methods: {
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

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

    async onClickShowDetailDistrict(value) {
      debugger;
      const keyLanguageStorage = this.$route.params.language
        ? this.$route.params.language
        : localStorage.getItem("language");
      localStorage.setItem("keyLanguageCity", value.keyLanguage);

      const nameCity = value.languages[keyLanguageStorage];

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
        city_key: objectAddressNew
          ? this.convertToVietnamese(objectAddressNew.city).cityConvert
          : objectBreadStorage.city_key,
        latitude: objectAddressNew
          ? objectAddressNew.lat
          : objectBreadStorage.latitude,
        longitude: objectAddressNew
          ? objectAddressNew.lng
          : objectBreadStorage.longitude,
        district: objectAddressNew
          ? "Quận" + " " + objectAddressNew.district
          : "",
        district_key: objectAddressNew
          ? ("Quận" + " " + objectAddressNew.district).replace(/ /g, "_")
          : "",
        ward: objectAddressNew ? "Phường" + " " + objectAddressNew.ward : "",
        ward_key: objectAddressNew
          ? ("Phường" + " " + objectAddressNew.ward).replace(/ /g, "_")
          : "",
      };
      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);
      debugger;
      if (objectBread.city.length !== 0 && objectBread.district.length === 0) {
        const locationPath = `${keyLanguageStorage}/${objectBread.country_key.toLowerCase()}/${this.convertToSlug(
          objectBread.city
        )}`;

        await this.$router.push({
          path: `/${locationPath}/today-weather`,
        });
      }
      if (
        objectBread.city.length !== 0 &&
        objectBread.district.length !== 0 &&
        objectBread.ward.length === 0
      ) {
        const locationPath = `${keyLanguageStorage}/${objectBread.country_key.toLowerCase()}/${this.convertToSlug(
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
        const locationPath = `${keyLanguageStorage}/${objectBread.country_key.toLowerCase()}/${this.convertToSlug(
          objectBread.city
        )}/${this.convertToSlug(objectBread.district)}/${this.convertToSlug(
          objectBread.ward
        )}`;

        await this.$router.push({
          path: `/${locationPath}/today-weather`,
        });
      }

      window.location.reload();

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
  },
};
</script>
<style lang="scss">
.district-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
</style>
