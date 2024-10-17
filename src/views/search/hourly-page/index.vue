<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-10">
      <div class="header-h h-full">
        <div class="left-hourly">
          <!--  -->
        </div>

        <div class="right-hourly">
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hourly-weather",

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
