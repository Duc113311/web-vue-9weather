<template>
  <div class="w-full h-full">
    <!--  -->
    <header>
      <!-- Nội dung sẽ được chèn vào đây -->

      <div class="text-left pad-t-b text-white">
        <slot name="header"></slot>
      </div>
    </header>

    <div
      class="bg-color text-white overflow-hidden"
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
<style lang="scss">
.bg-color {
  box-shadow: inset 0px 0px 56px rgb(255 255 255 / 17%),
    inset -50px -50px 100px 0px rgb(251 251 251 / 0%),
    inset 500px 500px 100px 0px rgb(243 243 243 / 12%);

  border-radius: 20px;
}
</style>
