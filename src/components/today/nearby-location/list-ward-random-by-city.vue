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
            <span>Phường/ xã lân cận</span>
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
  name: "list-ward-random-by-city",

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

    renderListCityAllGetters() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const keyCityValue = localStorage.getItem("keyLanguageCity");
      debugger;
      console.log("retrievedArray", retrievedArray);

      // const cityLocation = retrievedArray
      //   ? retrievedArray
      //   : this.breadcumsObjectGetters;

      if (retrievedArray) {
        console.log("listCityAllGetters", this.listCityAllGetters);
        const findData = this.listCityAllGetters.find(
          (x) => x.keyLanguage === retrievedArray.keyLanguage
        );

        if (findData) {
          const findCity = findData.districtList.find(
            (x) => x.keyLanguage === keyCityValue
          );
          if (findCity) {
            return findCity.districtList.slice(0, 8);
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        const findData = this.listCityAllGetters.find(
          (x) => x.nameCategory === this.breadcumsObjectGetters.city
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

    async onClickShowDetailDistrict(value) {
      debugger;
      localStorage.setItem("keyLanguageCity", value.keyLanguage);
      const nameCity = value.languages["en"];

      const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
        nameCity
      )}&key=TOH_KEY`;

      const valueEncode = encodeBase64(urlParam);
      let objectAddressNew = {};
      await this.getFormattedAddress(valueEncode).then((data) => {
        const jsonValue = decodeBase64(data);
        if (!jsonValue) {
          return;
        }
        debugger;
        const listResultAddress = JSON.parse(jsonValue);
        const addressResult = listResultAddress.results;
        const partsAddress = addressResult[0].formatted_address.split(", ");

        objectAddressNew.city = partsAddress[0];
        objectAddressNew.country = partsAddress[partsAddress.length - 1];
        objectAddressNew.lat = addressResult[0].geometry.location.lat;
        objectAddressNew.lng = addressResult[0].geometry.location.lng;
      });
      let language = localStorage.getItem("language") || "en";

      await this.$router.push({
        path: `/${language}/today-weather/${objectAddressNew.country}/${objectAddressNew.city}/${value.languages["en"]}/${value.languages["en"]} `,
      });
      window.location.reload();

      //   const keyCity = JSON.parse(localStorage.getItem("objectBread"));
      const objectBread = {
        country: objectAddressNew.country,
        city: objectAddressNew.city,
        latitude: objectAddressNew.lat,
        longitude: objectAddressNew.lng,
        country_code: objectAddressNew?.code ? objectAddressNew?.code : "",
        keyLanguage: value.keyLanguage,
        // keyCategory: valueCategory.keyLanguage,
      };
      localStorage.setItem("keyCityWardRandom", value.keyLanguage);
      localStorage.setItem("objectBread", JSON.stringify(objectBread));

      this.setBreadcumsNotAllowLocation(objectBread);

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
