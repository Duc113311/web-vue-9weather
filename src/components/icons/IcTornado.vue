<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 4H3M18 8H6M19 12H9M16 16H10M11 20H9"
      stroke="var(--color-icon-df)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script>
export default {
  name: "Ic-Tornado",
  props: {
    width: {
      type: String,
      default: "24", // default value if no width is provided
    },
    height: {
      type: String,
      default: "24", // default value if no height is provided
    },
  },
};
</script>
<style></style>
