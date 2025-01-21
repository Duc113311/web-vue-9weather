<template>
  <div class="w-full h-full">
    <!-- <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in listImageMoon" :key="item">
        <component :is="item.url"></component>
      </el-carousel-item>
    </el-carousel> -->

    <el-carousel :interval="0" loop="false" type="card" height="300px">
      <el-carousel-item v-for="item in listImageMoon" :key="item">
        <div class="flex justify-center items-center w-full h-full">
          <component :is="item.url"></component>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import IcFirstQuarter from "@/components/icons/moon-phase/IcFirstQuarter.vue";
import IcFullMoon from "@/components/icons/moon-phase/IcFullMoon.vue";
import IcNewMoon from "@/components/icons/moon-phase/IcNewMoon.vue";
import IcThirdQuarter from "@/components/icons/moon-phase/IcThirdQuarter.vue";
import IcWaningGibbous from "@/components/icons/moon-phase/IcWaningGibbous.vue";
import IcWaxingCrescent from "@/components/icons/moon-phase/IcWaxingCrescent.vue";
import { markRaw } from "vue";

export default {
  name: "list-carousel-moon",

  data() {
    return {
      listImageMoon: [
        {
          id: 0,
          url: markRaw(IcFullMoon),
        },
        {
          id: 1,
          url: markRaw(IcFirstQuarter),
        },
        {
          id: 2,
          url: markRaw(IcNewMoon),
        },
        {
          id: 3,
          url: markRaw(IcThirdQuarter),
        },
        {
          id: 4,
          url: markRaw(IcWaningGibbous),
        },
        {
          id: 5,
          url: markRaw(IcWaxingCrescent),
        },
      ],
    };
  },

  computed: {},

  methods: {},
};
</script>
<style scoped>
.el-carousel__item {
  opacity: 0.4;
  transition: opacity 0.4s ease;
}

/* Hình ở giữa sẽ sáng */
.el-carousel__item.is-active {
  opacity: 1 !important;
}

/* Tùy chỉnh kích thước của carousel item */
:deep(.el-carousel__item) {
  background: none !important;
}

/* Tùy chỉnh khoảng cách giữa các items */
:deep(.el-carousel__container) {
  gap: 20px;
}

/* Bỏ background cho các item không active */
:deep(.el-carousel__item:not(.is-active)) {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* Xóa bỏ các style không cần thiết */
.el-carousel__item h3 {
  display: none;
}
</style>
