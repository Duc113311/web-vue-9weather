<template>
  <div class="w-full h-full">
    <!-- -->

    <BaseComponent>
      <template v-slot:header>
        <h1>Tiêu đề của component</h1>
      </template>

      <p>Nội dung chính của component</p>
    </BaseComponent>

    <!--  -->
  </div>
</template>

<script>
import BaseComponent from "@/components/common/baseComponent.vue";

export default {
  name: "today-page",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
