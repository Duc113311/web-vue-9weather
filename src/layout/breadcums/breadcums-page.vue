<template>
  <div class="w-full items-center text-left text-white pad-t-b">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular">
        <span>Home</span>
        <div class="flex items-center" v-if="breadcumsObject?.country">
          <img
            class="transform"
            src="../../assets/images/svg_v2/ic_move_down_left.svg"
            alt=""
          />
          <span> {{ breadcumsObject?.country }}</span>
        </div>
        <div class="flex items-center" v-if="breadcumsObject?.city">
          <img
            class="transform"
            src="../../assets/images/svg_v2/ic_move_down_left.svg"
            alt=""
          />
          <span>{{ breadcumsObject?.city }}</span>
        </div>
        <div class="flex items-center" v-if="breadcumsObject?.district">
          <img
            class="transform"
            src="@/assets/images/svg_v2/ic_move_down_left.svg"
            alt=""
          />
          <span>{{ breadcumsObject?.district }}</span>
        </div>
        <div class="flex items-center" v-if="breadcumsObject?.ward">
          <img
            class="transform"
            src="@/assets/images/svg_v2/ic_move_down_left.svg"
            alt=""
          />
          <span>{{ breadcumsObject?.ward }}</span>
        </div>
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
