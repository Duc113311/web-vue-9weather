<template>
  <div class="w-full items-center text-left text-white pad-t-b">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular">
        <span>Home</span>
        <img
          class="transform"
          src="../../assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span> USA</span>
        <img
          class="transform"
          src="../../assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span>NewYork</span>
        <img
          class="transform"
          src="@/assets/images/svg_v2/ic_move_down_left.svg"
          alt=""
        />
        <span>Brooklyn</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "breadcums-page",

  data() {
    return {};
  },

  computed: {
    breadcumsObject() {
      debugger;
      return this.$store.state.commonModule.breadcumsObject;
    },
  },
};
</script>
<style lang="scss"></style>
