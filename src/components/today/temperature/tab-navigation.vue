<template>
  <div class="w-full h-[100px]">
    <div class="flex w-full justify-between">
      <div
        class="item-tab pad-tab bor-c bor-radios-big"
        v-for="(item, index) in listTab"
        :class="{ 'active-tab': activeIndex === index }"
        :key="index"
      >
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tab-navigation",

  data() {
    return {
      listTab: ["Today", "UV", "Wind", "Humid", "Pressure"],
      activeIndex: 0,
    };
  },
};
</script>
<style lang="scss">
.item-tab {
  flex: 1;
  min-width: 0; // This prevents flex items from overflowing
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }
}

.active-tab {
  background-color: #ffffff;
  color: #0062f5 !important;
}
</style>
