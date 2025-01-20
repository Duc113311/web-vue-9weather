<template>
  <div class="w-full h-full">
    <!--  -->

    <div class="container mt-5">
      <div class="header-h h-full w-full flex gap-20-px">
        <div class="left-hourly lg:w-[80%] w-full">
          <div class="flex justify-between w-full gap-20-px">
            <!--  -->
            <div class="w-full">
              <SkeletonLoader class="w-full h-[320px]"> </SkeletonLoader>
            </div>
            <div class="w-full">
              <SkeletonLoader class="w-full h-[320px]"> </SkeletonLoader>
            </div>
            <!--  -->
          </div>
        </div>
        <div class="right-hourly w-[20%]">
          <div class="w-full h-full">
            <NoteAir
              v-if="currentlyData && Object.keys(currentlyData).length > 0"
            ></NoteAir>
            <SkeletonLoader v-else class="w-full h-[320px]"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "uv-page",
};
</script>
<style lang=""></style>
