<template>
  <div class="w-full">
    <!--  -->
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_rain_wind.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>{{ title }}</p>
        </div>
      </template>
      <InforCommon
        :renderTempoDay="hourly24hData"
        :isShowDayNightData="isShowDayNightData"
      ></InforCommon>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import InforCommon from "./infor-common.vue";
import { mapGetters } from "vuex";

export default {
  name: "temp-day-night-page",

  components: {
    InforCommon,
    BaseComponent,
  },
  data() {
    return {};
  },

  props: {
    title: {
      type: String,
      default: "",
    },

    isShowDayNight: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapGetters("weatherModule", ["hourly24hGetters"]),

    hourly24hData() {
      return this.convertTempDayNight(this.hourly24hGetters);
    },

    isShowDayNightData() {
      return this.isShowDayNight;
    },
  },

  methods: {
    convertTempDayNight(value) {
      const dataList = value.slice(1, 24);
      const dayData = [];
      const nightData = [];

      const morningData = [];
      const eveningData = [];

      //   Ngày đêm
      dataList.forEach((data) => {
        const date = new Date(data.time * 1000); // Chuyển UNIX timestamp sang đối tượng Date
        const hours = date.getUTCHours(); // Lấy giờ UTC

        if (hours >= 6 && hours < 18) {
          dayData.push(data); // Nếu giờ trong khoảng từ 6h sáng đến 6h tối, thêm vào mảng ban ngày
        } else {
          nightData.push(data); // Ngược lại thêm vào mảng ban đêm
        }
      });

      //   Sáng tối
      dataList.forEach((data) => {
        const date = new Date(data.time * 1000); // Chuyển UNIX timestamp sang đối tượng Date
        const hours = date.getUTCHours(); // Lấy giờ UTC

        if (hours >= 6 && hours < 12) {
          morningData.push(data); // Nếu giờ trong khoảng từ 6h sáng đến 6h tối, thêm vào mảng ban ngày
        }

        if (hours >= 18 && hours < 22) {
          eveningData.push(data); // Ngược lại thêm vào mảng ban đêm
        }
      });

      let objectTemp = {
        maxTempDataDay: dayData[0],
        minTempDataDay: dayData[0],
        minTempDataNight: nightData[0],
        maxTempDataNight: nightData[0],
      };
      dayData.forEach((data) => {
        if (data.temperature > objectTemp.maxTempDataDay.temperature) {
          objectTemp.maxTempDataDay = data; // Cập nhật giá trị max nếu tìm thấy temperature lớn hơn
        }
        if (data.temperature < objectTemp.minTempDataDay.temperature) {
          objectTemp.minTempDataDay = data; // Cập nhật giá trị min nếu tìm thấy temperature nhỏ hơn
        }
      });

      nightData.forEach((data) => {
        if (data.temperature > objectTemp.maxTempDataNight.temperature) {
          objectTemp.maxTempDataNight = data; // Cập nhật giá trị max nếu tìm thấy temperature lớn hơn
        }
        if (data.temperature < objectTemp.minTempDataNight.temperature) {
          objectTemp.minTempDataNight = data; // Cập nhật giá trị min nếu tìm thấy temperature nhỏ hơn
        }
      });

      //

      console.log("objectTemp", objectTemp);

      return objectTemp;
    },
  },
};
</script>
<style lang="scss"></style>
