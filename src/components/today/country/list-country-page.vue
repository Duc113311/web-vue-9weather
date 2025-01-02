<template>
  <div class="w-full">
    <BaseComponent>
      <!--  -->
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex items-center text-left gap-2">
            <img
              src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
              width="24"
              alt=""
            />
            <span class="txt_medium_14">{{
              convertCapitalizeWords($t("Cities_Provinces"))
            }}</span>
          </div>
        </div>
      </template>

      <div
        class="w-full h-auto show-scroll pt-1 pb-1"
        v-if="renderCityLocation.length !== 0"
      >
        <div v-if="objectBreadParam.country_key === 'vn'">
          <div
            v-for="(item, index) in renderCityLocation"
            :key="index"
            class="flex justify-between items-center pt-2 pb-2 cursor-pointer item-city"
            :class="{ 'bor-b': index !== renderCityLocation.length - 1 }"
          >
            <div class="txt_medium_15">
              {{ $t(`city.city_${renderLanguage}.${item.keyAccentLanguage}`) }}
            </div>
            <img
              src="../../../assets/images/svg_v2/ic_rain_data.svg"
              width="24"
              alt=""
            />
          </div>
        </div>
        <div v-if="objectBreadParam.country_key === 'us'">
          <div
            v-for="(item, index) in renderCityLocation"
            :key="index"
            class="flex justify-between items-center pb-3 pt-3 pr-2"
            :class="{ 'bor-b': index !== renderCityLocation.length - 1 }"
          >
            <div>
              {{ item.nameState }}
            </div>
            <img
              src="../../../assets/images/svg_v2/ic_rain_data.svg"
              width="24"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="h-[212px]" v-else>
        <div class="w-full h-full justify-center flex items-center">
          {{ $t("In_development") }}
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import { capitalizeWords } from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "list-country-page",

  components: {
    BaseComponent,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", [
      "objectCityByLocationGetters",
      "breadcumsObjectGetters",
      "listStateAmericanGetters",
    ]),

    renderLanguage() {
      return this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
    },

    objectBreadParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },

    renderCityLocation() {
      debugger;
      const retrievedDataCity = sessionStorage.getItem("dataCityLog")
        ? JSON.parse(sessionStorage.getItem("dataCityLog"))
        : [];

      if (!retrievedDataCity) {
        console.error("retrievedDataCity is null or invalid.");
        return [];
      }

      const countryCode = this.objectBreadParam.country_key.toLowerCase();
      debugger;
      if (countryCode === "vn") {
        for (const element of retrievedDataCity) {
          const listCity = element.provinceCity;
          if (Object.keys(this.breadcumsObjectGetters).length !== 0) {
            const findExistData = listCity.filter(
              (x) => x.keyAccentLanguage === this.objectBreadParam.city_key
            );
            if (findExistData.length > 0) {
              const findExistNew = listCity.filter(
                (x) => x.keyAccentLanguage !== this.objectBreadParam.city_key
              );
              return findExistNew;
            }
          }
        }
      } else if (countryCode === "us") {
        for (const element of this.listStateAmericanGetters) {
          const findExistData = element.states.filter(
            (x) => x.nameState !== this.objectBreadParam.state
          );
          if (findExistData.length > 0) {
            return findExistData;
          }
        }
      } else {
        return [];
      }

      return [];
    },
  },

  methods: {
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },
    convertKeyLanguage(value, keyLanguage) {
      return value.languages[keyLanguage];
    },

    convertToUnderscore(text) {
      return text.replace(/ /g, "_");
    },

    removeDiacritics(str) {
      return str
        .normalize("NFD") // Tách ký tự dấu
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
    },
  },
};
</script>
<style lang="scss">
.item-city:hover {
  background-color: rgba(239, 240, 242, 0.126);
}
</style>
