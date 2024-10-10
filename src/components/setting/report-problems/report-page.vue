<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="text-left w-full items-center">
      Giúp chúng tôi cải thiện ứng dụng thời tiết bằng cách mô tả các điều kiện
      hiện tại của bạn.
    </div>

    <div class="w-full">
      <div class="w-full txt_color_summer txt_medium mb-2">
        <span> Điều kiện tổng thể </span>
      </div>
      <div class="w-full">
        <div class="w-full nav-bar cursor-pointer flex justify-between p-3">
          <div class="flex items-center">
            <img src="../../../assets/images/svg/ic_sun.svg" alt="" />
            <p>Nhiều nắng</p>
          </div>

          <div>
            <el-switch
              v-model="valueSun"
              style="
                --el-switch-on-color: #4d87d4;
                --el-switch-off-color: #c0c2c4b8;
              "
              size="large"
              active-value="100"
              inactive-value="0"
            />
          </div>
        </div>

        <div
          class="w-full nav-bar cursor-pointer flex justify-between p-3"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "report-page",

  data() {
    return {
      valueSun: false,
    };
  },

  methods: {},
};
</script>
<style lang="scss">
.bg-unit {
  transition: right 0.3s ease;
  color: white;
}
</style>
