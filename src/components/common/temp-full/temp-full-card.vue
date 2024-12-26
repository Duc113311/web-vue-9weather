<template>
  <div class="w-full">
    <!--  -->
    <BaseComponent :height="heightAuto">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_rain_wind.svg"
            width="24"
            alt=""
            srcset=""
          />
          <div v-if="wardParam.country_key === 'vn'">
            <span v-if="wardParam?.city && !wardParam?.district">
              {{
                $t(`Weather_{city}`, {
                  city: $t(`city.city_${languageParam}.${wardParam?.city_key}`),
                })
              }}
            </span>

            <span
              v-if="wardParam?.city && wardParam?.district && !wardParam?.ward"
            >
              {{
                convertCapitalizeWords(
                  $t(`Weather_{city}`, {
                    city: $t(
                      `${convertToSlugCity(
                        wardParam?.city
                      )}.${convertToSlugCity(
                        wardParam?.city
                      )}_${languageParam}.${convertToLowCase(
                        wardParam?.district_key
                      )}`
                    ),
                  })
                )
              }}
            </span>

            <span
              v-if="wardParam?.city && wardParam?.district && wardParam?.ward"
              >{{
                convertCapitalizeWords(
                  $t(`Weather_{city}`, {
                    city: $t(
                      `${convertToSlugCity(
                        wardParam?.city
                      )}.${convertToSlugCity(
                        wardParam?.city
                      )}_${languageParam}.${convertToLowCase(
                        wardParam?.ward_key
                      )}`
                    ),
                  })
                )
              }}</span
            >
          </div>
        </div>
      </template>
      <InforFullCard></InforFullCard>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import InforFullCard from "./infor-full-card.vue";
import { mapGetters } from "vuex";
import { capitalizeWords } from "@/utils/converValue";
import removeAccents from "remove-accents";

export default {
  name: "temp-full-card",

  components: {
    BaseComponent,
    InforFullCard,
  },
  data() {
    return {
      heightAuto: "auto",
    };
  },

  computed: {
    ...mapGetters("weatherModule", ["dailyOneGetters", "currentlyGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },
    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },
    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },
  },

  methods: {
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },

    convertToSlugCity(str) {
      const slug = removeAccents(str);
      debugger;
      return slug
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng
    },

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
  },
};
</script>
<style lang="scss"></style>
