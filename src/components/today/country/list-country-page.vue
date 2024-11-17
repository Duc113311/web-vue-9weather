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
            <span>Tỉnh thành lân cận</span>
          </div>
          <div>
            <p>See more</p>
          </div>
        </div>
      </template>

      <div class="w-full h-[302px]">
        <!--  -->

        <div v-if="renderCityLocation.length !== 0">
          <div
            v-for="(item, index) in renderCityLocation"
            :key="index"
            class="flex justify-between items-center pb-3 pt-3"
            :class="{ 'bor-b': index !== renderCityLocation.length - 1 }"
          >
            <div>{{ convertKeyLanguage(item, "en") }}</div>
            <img
              src="../../../assets/images/svg_v2/ic_rain_data.svg"
              width="24"
              alt=""
            />
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
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
    ]),

    renderCityLocation() {
      debugger;
      const retrievedDataCity = sessionStorage.getItem("dataCityLog")
        ? JSON.parse(sessionStorage.getItem("dataCityLog"))
        : null;

      if (!retrievedDataCity) {
        console.error("retrievedDataCity is null or invalid.");
        return [];
      }

      const retrievedArray = localStorage.getItem("objectBread")
        ? JSON.parse(localStorage.getItem("objectBread"))
        : null;

      if (retrievedArray) {
        const findData = retrievedDataCity.find(
          (x) => x.keyLanguage === retrievedArray.keyCategory
        );

        if (findData) {
          const findExistData = findData.districtList.filter(
            (x) => x.keyLanguage !== retrievedArray.keyLanguage
          );
          return findExistData.length > 0 ? findExistData.slice(0, 6) : [];
        }
      } else {
        for (const element of retrievedDataCity) {
          const findExistData = element.districtList.filter(
            (x) =>
              x.keyLanguage !==
              this.convertToUnderscore(this.breadcumsObjectGetters.city)
          );
          if (findExistData.length > 0) {
            return findExistData.slice(0, 6);
          }
        }
      }

      return [];
    },
  },

  methods: {
    convertKeyLanguage(value, keyLanguage) {
      return value.languages[keyLanguage];
    },

    convertToUnderscore(text) {
      return text.replace(/ /g, "_");
    },
  },
};
</script>
<style lang="scss"></style>
