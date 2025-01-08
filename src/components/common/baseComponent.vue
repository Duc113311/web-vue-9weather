<template>
  <div class="w-full h-full">
    <!--  -->
    <header>
      <!-- Nội dung sẽ được chèn vào đây -->

      <div class="text-left pad-t-b">
        <slot name="header"></slot>
      </div>
    </header>

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
  name: "BaseComponent",

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
