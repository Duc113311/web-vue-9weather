<template>
  <div class="w-full h-full">
    <div
      class="w-full h-full flex flex-col lg:flex-row justify-between items-center"
    >
      <div class="w-full h-full">
        <div class="pad-form-radios bg-from w-full h-[550px] mb-3">
          <!--  -->
          <div class="w-full h-full">
            <!--  -->
            <div class="title-uv txt_medium bor-bottom pb-2 h-full">
              <span class="text-xl">{{ formatMonthYear(new Date()) }}</span>
              <div class="w-full my-3 px-4">
                <div class="bor-bottom"></div>
              </div>
              <ChartUvIndex />
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartUvIndex from "./chart-uv-index.vue";
import { formatMonthYear } from "../../../utils/converValue";
export default {
  name: "uv-month-page",
  components: {
    ChartUvIndex,
  },
  data() {
    return {};
  },

  methods: {
    formatMonthYear(date) {
      return formatMonthYear(date);
    },
  },
};
</script>
<style lang="scss"></style>
