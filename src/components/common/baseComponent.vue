<template>
  <div class="w-full h-auto">
    <!--  -->
    <header>
      <!-- Nội dung sẽ được chèn vào đây -->

      <div class="text-left pad-t-b text-white">
        <slot name="header"></slot>
      </div>
    </header>

    <div class="pad-big bg-color text-white">
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
};
</script>
<style lang="scss">
.bg-color {
  background: linear-gradient(
    to right,
    rgba(243, 243, 243, 0.15),
    rgba(243, 243, 243, 0.15)
  );

  border: 1px solid #ffffff;
  border-radius: 12px;
}
</style>
