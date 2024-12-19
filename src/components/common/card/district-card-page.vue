<template>
  <div class="cursor-pointer">
    <!--  -->
    <div class="district-card">
      <div class="flex items-center justify-center p-1">
        <img
          src="../../../assets/images/svg_v2/ic_rain_data.svg"
          alt="Weather icon"
          width="36"
        />
      </div>
      <h3
        class="text-center txt_medium"
        v-if="breadcumsObject.country_key === 'vn'"
      >
        {{
          removeWordAndAccents(
            $t(
              `${convertToConvert(breadcumsObject.city)}.${convertToConvert(
                breadcumsObject.city
              )}_${renderLanguage}.${objectLocation.keyAccentLanguage}`
            ),
            "District"
          )
        }}
      </h3>

      <h3
        class="text-center txt_medium"
        v-if="breadcumsObject.country_key === 'us'"
      >
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
        {{ objectLocation.name }}
      </h3>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import removeAccents from "remove-accents";

export default {
  name: "district-card-page",

  props: {
    objectLocation: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {};
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
  },

  methods: {
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
.district-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: white;
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
