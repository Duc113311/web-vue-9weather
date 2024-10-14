<template>
  <div class="w-full h-auto">
    <header>
      <!-- Nội dung sẽ được chèn vào đây -->

      <div class="text-left pad-t-b text-white">
        <slot name="header"></slot>
      </div>
    </header>

    <div class="text-white">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ItemComponent",
};
</script>
<style lang="scss"></style>
