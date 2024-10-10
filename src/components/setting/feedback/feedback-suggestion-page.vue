<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full text-left">
      <div class="txt_light_summer w-full pl-2 pr-2">
        Vui lòng chia sẻ phản hồi của bạn
      </div>

      <div class="txt_light_summer pl-2 pr-2">
        Chúng tôi đọc phản hồi của bạn một cách cẩn thận để làm cho ứng dụng
        thậm chí tốt hơn cho bạn. Cảm ơn vì đã hỗ trợ chúng tôi
      </div>

      <div class="w-full p-2 mt-4">
        <div class="relative">
          <input
            type="text"
            id="floating_outlined"
            class="block bor pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            class="absolute text-sm bg-default text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >Chức vụ</label
          >
        </div>
        <div class="relative mt-4">
          <textarea
            type="text"
            id="floating_outlined"
            class="block bor h-[150px] w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            class="absolute text-sm bg-default text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >Thông tin phải hồi của bạn</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "feedback-suggestion-page",

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss">
.bor {
  border: 1.5px solid #d3a8a8;
  border-radius: 10px;
  padding: 4px;
}
</style>
