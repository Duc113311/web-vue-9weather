<template>
  <div class="w-full h-[38px] mb-4">
    <div class="flex justify-center">
      <div
        class="item-tab pad-tab bor-c bor-radios-big cursor-pointer w-[200px]"
        v-for="(item, index) in listTab"
        :class="{ 'active-tab': activeIndex === index }"
        :key="index"
        @click="onClickTabChart(index)"
      >
        <span>{{ $t(item) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tab-navigation",
  components: {},
  data() {
    return {
      listTab: ["temperature", "uv", "wind_speed", "Humid", "pressure"],
      activeIndex: 0,
    };
  },

  methods: {
    onClickTabChart(value) {
      this.activeIndex = value;
      this.$emit("onChangeTabChart", value);
    },
  },
};
</script>
<style lang="scss">
.item-tab {
  flex: 1;
  min-width: 0; // This prevents flex items from overflowing
  margin-right: 10px;
  font-size: 12px;

  &:last-child {
    margin-right: 0px;
  }
}

.active-tab {
  background-color: #ffffff;
  color: #0062f5;
}

.item-tab:hover {
  background-color: #edfffe38;
  color: #ffffff;
}
</style>
