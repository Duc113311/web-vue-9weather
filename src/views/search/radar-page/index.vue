<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
export default {
  name: "radar-weather",

  data() {
    return {};
  },

  mounted() {},

  methods: {},

  beforeRouteLeave(to, from, next) {
    debugger;
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>
