<template>
  <div class="w-full h-full">
    <apexchart
      width="500"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  name: "chart-apex-rain",

  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
