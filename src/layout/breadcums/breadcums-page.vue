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
          v-if="breadcumsObject?.district"
          class="transform"
          src="@/assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span>{{ breadcumsObject?.district }}</span>
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
      return this.breadcumsObjectGetters;
    },
  },

  methods: {
    convertToEnglishRender(value) {
      return convertToEnglish(value);
    },
  },
};
</script>
<style lang="scss"></style>
