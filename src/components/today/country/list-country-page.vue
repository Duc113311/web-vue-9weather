<template>
  <div class="w-full">
    <BaseComponent>
      <!--  -->
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex items-center text-left gap-2">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.167 2V4M5.09717 4.92993L6.50717 6.33993M20.167 12H22.167M19.2371 4.92993L17.8271 6.33993M16.114 12.6501C16.237 11.9046 16.1464 11.1395 15.8527 10.4433C15.5589 9.74717 15.0739 9.14847 14.454 8.71654C13.834 8.28461 13.1044 8.03711 12.3496 8.00269C11.5948 7.96827 10.8457 8.14835 10.189 8.52206M13.167 22H7.16695C6.22092 21.9998 5.29436 21.7312 4.49487 21.2255C3.69539 20.7197 3.0558 19.9975 2.65038 19.1427C2.24496 18.288 2.09035 17.3358 2.20451 16.3966C2.31867 15.4575 2.69691 14.5701 3.29531 13.8373C3.89371 13.1046 4.6877 12.5567 5.58507 12.2572C6.48244 11.9577 7.44637 11.9189 8.36489 12.1454C9.28342 12.3718 10.1188 12.8542 10.7742 13.5366C11.4295 14.2189 11.8777 15.0731 12.067 16H13.167C13.9626 16 14.7257 16.3161 15.2883 16.8787C15.8509 17.4413 16.167 18.2044 16.167 19C16.167 19.7956 15.8509 20.5587 15.2883 21.1213C14.7257 21.6839 13.9626 22 13.167 22Z"
                stroke="var(--color-icon-df)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
