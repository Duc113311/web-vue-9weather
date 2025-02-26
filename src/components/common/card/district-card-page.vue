<template>
  <div class="cursor-pointer">
    <!--  -->
    <div class="district-card-km">
      <div class="flex items-center justify-center p-1">
        <component :is="IcCardCity"></component>
      </div>

      <div
        class="text-center txt_medium_14"
        v-if="breadcumsObject.country_key === 'vn'"
      >
        <span v-if="renderLanguage === 'en'">
          {{
            convertCapitalizeWords(
              removeWordAndAccents(
                $t(
                  `${convertToConvert(breadcumsObject.city)}.${convertToConvert(
                    breadcumsObject.city
                  )}_${renderLanguage}.${objectLocation.keyAccentLanguage}`
                )
              )
            )
          }}
        </span>
        <span v-if="renderLanguage === 'vi'">
          {{
            $t(
              `${convertToConvert(breadcumsObject.city)}.${convertToConvert(
                breadcumsObject.city
              )}_${renderLanguage}.${objectLocation.keyAccentLanguage}`
            )
          }}
        </span>
      </div>

      <div class="text-center txt_medium_14" v-else>
        <!-- {{
          removeWordAndAccents(
            $t(
              `${convertToConvert(breadcumsObject.city)}.${convertToConvert(
                breadcumsObject.city
              )}_${renderLanguage}.${objectLocation.keyAccentLanguage}`
            ),
            "District"
          )
        }} -->
        {{ objectLocation.enNameLanguage }}
      </div>

      <div class="txt_regular_12 color_BFBFBF">
        <!-- <p>
          ({{ Math.round(calculateDistance(objectLocation.location))
          }}{{ unitSetting.activeDistance_save }} {{ $t("Away") }})
        </p> -->
        <p>
          {{
            $t(`{number}_{unit}_away`, {
              number: Math.round(calculateDistance(objectLocation.location)),
              unit: unitSetting.activeDistance_save,
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import removeAccents from "remove-accents";
import { capitalizeWords, convertHaversine } from "@/utils/converValue";
import { encodeBase64, urlEncodeString } from "@/utils/EncoderDecoderUtils";
import { getDistance } from "geolib";
import IcCardCity from "@/components/icons/IcCardCity.vue";
import { markRaw } from "vue";

export default {
  name: "district-card-page",

  props: {
    objectLocation: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      distanceKm: 0,
      IcCardCity: markRaw(IcCardCity),
    };
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    renderLanguage() {
      return this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
    },

    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    unitSetting() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return unitSetting;
    },
  },

  methods: {
    calculateDistance(value) {
      const locationValue = {
        latitude: value.lat,
        longitude: value.lng,
      };
      const locationSearch = {
        latitude: this.breadcumsObject.latitude,
        longitude: this.breadcumsObject.longitude,
      };
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      const distanceValue = convertHaversine(
        locationValue.latitude,
        locationValue.longitude,
        locationSearch.latitude,
        locationSearch.longitude,
        unitSetting.activeDistance_save
      );
      // Sử dụng geolib để tính khoảng cách
      const distance = getDistance(locationValue, locationSearch);
      this.distanceKm = (distance / 1000).toFixed(1); // Đổi sang km và làm tròn
      return distanceValue;
    },
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },
    convertLanguage(data, language) {
      return data.languages[language];
    },

    removeWordAndAccents(str, wordToRemove) {
      const normalizedStr = removeAccents(str); // Loại bỏ dấu nếu có
      return normalizedStr
        .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
        .trim();
    },

    removeDiacritics(str) {
      const removeString = str
        .normalize("NFD") // Tách ký tự dấu
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
      return removeString.toLowerCase().replace(/\s+/g, "");
    },

    convertToConvert(str) {
      const slug = removeAccents(str).toLowerCase().replace(/\s+/g, "");
      return slug;
    },
  },
};
</script>
<style lang="scss">
.district-card-km {
  box-shadow: inset 0px 0px 56px var(--bg-compo-1),
    inset -50px -50px 100px 0px var(--bg-compo-2),
    inset 500px 500px 100px 0px var(--bg-compo-3);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  height: 112px;
  list-style-type: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.district-name {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin: 10px 0;
}

.weather-condition {
  margin: 5px 0;
}

.temperature {
  font-weight: bold;
}
</style>
