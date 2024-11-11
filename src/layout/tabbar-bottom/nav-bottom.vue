<template>
  <div class="w-full h-[60px] bg-nav flex items-center">
    <div class="container relative">
      <div class="flex justify-between items-center pad-b-t text-white">
        <!-- left -->
        <div class="flex items-center gap-4">
          <div class="h-district">
            <div class="flex items-center gap-2 cursor-pointer">
              <img
                src="../../assets/images/svg_v2/ic_city.svg"
                width="24"
                alt=""
                srcset=""
              />
              <span>District/City</span>
              <img
                src="../../assets/images/svg_v2/ic_chevron_up.svg"
                width="24"
                alt=""
              />
            </div>

            <div class="mega-box container">
              <div class="content">
                <div class="container-c">
                  <!--  -->
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
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="onClickShowWidget()"
          >
            <img
              src="../../assets/images/svg_v2/ic_widget_tab.svg"
              width="24"
              alt=""
              srcset=""
            />
            <span>Widget</span>
          </div>
        </div>
        <!-- right -->
        <div class="flex items-center gap-2">
          <img
            src="../../assets/images/svg_v2/ic_locate_fixed.svg"
            alt=""
            srcset=""
          />

          <div class="flex items-center mr-4 gap-2">
            <span class=" ">Your current location:</span>
            <span class="txt_medium" v-if="breadcumsObject?.city">{{
              breadcumsObject?.city
            }}</span>
          </div>

          <button
            class="bg-bth hover:bg-blue-700 txt_regular tex- pad-small rounded-xl"
            @click="onClickRechange()"
          >
            Rechange
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import {
  encodeBase64,
  getAqiDataFromLocation,
  getParamAirByCode,
} from "@/utils/EncoderDecoderUtils";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "nav-bottom",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "objectCityByLocationGetters",
    ]),
    renderLanguage() {
      return this.$route.params.language ? this.$route.params.language : "en";
    },

    breadcumsObject() {
      return this.breadcumsObjectGetters;
    },

    objectCity() {
      return this.objectCityByLocationGetters;
    },
  },

  methods: {
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getFormattedAddress",
    ]),
    ...mapActions("airQualityModule", ["getAirQualityByKey", "getAirQuality"]),
    ...mapMutations("weatherModule", ["setCityWeather"]),

    async onClickShowWidget() {
      await this.$router.push({
        path: `/${this.renderLanguage}/create-widget`,
      });
    },

    async onClickRechange() {
      this.valueSearch = "";

      localStorage.removeItem("cityName");
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
      document.title = "originalTitle;";
    },
  },
};
</script>
<style lang="scss">
//
.bg-nav {
  background-color: #43546c; /* Màu đen với opacity 5% */
}

.bg-bth {
  background-color: #e3eefb;
  color: #0d2952;
}
.h-district:hover .mega-box {
  transition: all 0.3s ease;
  top: 30px;
  opacity: 1;
  visibility: visible;
  z-index: 10;
}

.mega-box {
  display: block;
  position: absolute;
  left: 0;
  top: 115px;
  opacity: 0;
  visibility: visible;
  color: black;
  z-index: -1;
}

.mega-box .content {
  background: #ffffff;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.mega-box .region {
  // background-color: #fff;
  // border: 1px solid #ddd;
  // border-radius: 4px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // margin: 10px;
  // padding: 20px;
  width: 208px;
  margin-top: 10px;
}

.mega-box .container-c {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  text-align: left;
}

.mega-box .region h2 {
  font-size: 14px;
  margin-top: 0;
  color: #007bff;
  padding-left: 20px;
}

.mega-box .region ul {
  list-style-type: none;
  padding: 0;
}

.mega-box .region ul li {
  margin: 5px 0;
  font-size: 12px;
  padding-left: 20px;
}

.mega-box .region ul li:hover {
  background-color: aqua;
}
</style>
