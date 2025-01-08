<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="bg-color overflow-hidden"
      :class="{ 'pad-big': isShowPad }"
      :style="{ height: `${heightValue}` }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseList",

  data() {
    return {};
  },

  props: {
    isShowPad: {
      type: Boolean,
      default: true,
    },

    isDisplay: {
      type: Boolean,
      default: true,
    },

    height: {
      type: [Number, String],
      default: "100%",
    },
  },

  computed: {
    heightValue() {
      return typeof this.height === "number" ? `${this.height}px` : this.height;
    },
  },
};
</script>
<style lang="scss"></style>
