<template>
  <div class="w-full h-[60px] bg-nav flex items-center">
    <div class="container">
      <div class="flex justify-between items-center pad-b-t text-white">
        <!-- left -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 cursor-pointer">
            <img
              src="../../assets/images/svg_v2/ic_city.svg"
              width="24"
              alt=""
              srcset=""
            />
            <span>District/City</span>
            <img
              src="../../assets/images/svg_v2/ic_chevron_up.svg"
              width="24"
              alt=""
            />
          </div>
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="onClickShowWidget()"
          >
            <img
              src="../../assets/images/svg_v2/ic_widget_tab.svg"
              width="24"
              alt=""
              srcset=""
            />
            <span>Widget</span>
          </div>
        </div>
        <!-- right -->
        <div class="flex items-center gap-2">
          <img
            src="../../assets/images/svg_v2/ic_locate_fixed.svg"
            alt=""
            srcset=""
          />

          <div class="flex items-center mr-4 gap-2">
            <span class=" ">Your current location:</span>
            <span class="txt_medium">Hà Nội</span>
          </div>

          <button
            class="bg-bth hover:bg-blue-700 txt_regular tex- pad-small rounded-xl"
          >
            Rechange
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
export default {
  name: "nav-bottom",

  data() {
    return {};
  },

  computed: {
    renderLanguage() {
      return this.$route.params.language ? this.$route.params.language : "en";
    },
  },

  methods: {
    async onClickShowWidget() {
      await this.$router.push({
        path: `/${this.renderLanguage}/create-widget`,
      });
    },
  },
};
</script>
<style lang="scss">
//
.bg-nav {
  background-color: #43546c; /* Màu đen với opacity 5% */
}

.bg-bth {
  background-color: #e3eefb;
  color: #0d2952;
}
</style>
