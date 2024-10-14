<template>
  <div class="w-full p-2 items-center text-left bg-breadcums">
    <div class="container">
      <div class="flex items-center gap-2 txt_regular">
        <span>World</span>
        <img
          class="transform scale-x-[-1]"
          src="../../assets/images/svg/ic_back_left.svg"
          alt=""
        />
        <span> {{ breadcumsObject?.continent }}</span>
        <img
          class="transform scale-x-[-1]"
          src="../../assets/images/svg/ic_back_left.svg"
          alt=""
        />
        <span>{{ breadcumsObject?.country }}</span>
        <img
          class="transform scale-x-[-1]"
          src="@/assets/images/svg/ic_back_left.svg"
          alt=""
        />
        <span> {{ breadcumsObject?.city }}</span>
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
