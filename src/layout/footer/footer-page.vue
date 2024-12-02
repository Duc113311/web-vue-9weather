<template>
  <div class="w-full h-auto p-2 bg-footer mt-10">
    <div class="container">
      <!-- footer -->
      <div class="w-full justify-between flex items-center">
        <div
          class="logo-app lg:w-[600px] h-full flex justify-center items-center"
        >
          <div class="flex w-full items-center cursor-pointer">
            <div class="imgLogo cursor-pointer"></div>
          </div>
        </div>
        <div class="tab-proxy flex items-center">
          <div>
            <span class="underline">Tems of Use</span>
          </div>
          &nbsp;|&nbsp;
          <div>
            <span class="underline">Privacy Policy</span>
          </div>
          &nbsp;|&nbsp;
          <div>
            <span class="underline">Cookie Policy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "footer_page",
};
</script>
<style lang="scss">
.bg-footer {
  background-color: #dfecff;
}
</style>
