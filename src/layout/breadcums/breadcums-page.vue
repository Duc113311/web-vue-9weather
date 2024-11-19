<template>
  <div class="w-full items-center text-left text-white pad-t-b">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular">
        <span>Home</span>
        <img
          v-if="breadcumsObject?.country"
          class="transform"
          src="../../assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span> {{ breadcumsObject?.country }}</span>
        <img
          v-if="breadcumsObject?.city"
          class="transform"
          src="../../assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span>{{ convertToEnglishRender(breadcumsObject?.city) }}</span>
        <img
          v-if="cityBreadcums"
          class="transform"
          src="@/assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span>{{ cityBreadcums.replace(/_/g, " ") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { convertToEnglish } from "@/utils/converValue";
export default {
  name: "breadcums-page",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    /**
     * Gán giá trị breadcums
     */
    breadcumsObject() {
      console.log("this.breadcumsObjectGetters", this.breadcumsObjectGetters);
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    cityBreadcums() {
      const retrievedArray = localStorage.getItem("keyLanguageCity");

      return retrievedArray;
    },
  },

  methods: {
    convertToEnglishRender(value) {
      return value;
    },
  },
};
</script>
<style lang="scss"></style>
