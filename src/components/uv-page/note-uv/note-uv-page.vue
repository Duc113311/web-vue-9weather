<template>
  <div class="w-full flex flex-col gap-7 pad-t-b-10 pad-r-l-10">
    <div class="flex items-center text-left gap-2">
      <div class="bg-Good rounded-full w-[10px] h-[10px]"></div>
      <div class="text-left">
        <p class="txt_medium_14">{{ $t("Low") }}</p>
        <p class="txt_regular_12">0-2</p>
      </div>
    </div>
    <div class="flex items-center text-left gap-2">
      <div class="bg-Moderate rounded-full w-[10px] h-[10px]"></div>
      <div class="text-left">
        <p class="txt_medium_14">{{ $t("Moderate") }}</p>
        <p class="txt_regular_12">3-5</p>
      </div>
    </div>
    <div class="flex items-center text-left gap-2">
      <div class="bg-Sensitive-Groups rounded-full w-[10px] h-[10px]"></div>
      <div class="text-left">
        <p class="txt_medium_14">{{ $t("High") }}</p>
        <p class="txt_regular_12">6-7</p>
      </div>
    </div>
    <div class="flex items-center text-left gap-2">
      <div class="bg-Unhealthy rounded-full w-[10px] h-[10px]"></div>
      <div class="text-left">
        <p class="txt_medium_14">{{ $t("Very_High") }}</p>
        <p class="txt_regular_12">8-10</p>
      </div>
    </div>
    <div class="flex items-center text-left gap-2">
      <div class="bg-Very-Unhealthy rounded-full w-[10px] h-[10px]"></div>
      <div class="text-left">
        <p class="txt_medium_14">{{ $t("Extreme") }}</p>
        <p class="txt_regular_12">> 10</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "note-uv-page",
};
</script>
<style lang="scss">
.bg-Good {
  background-color: #2be26b;
}

.bg-Moderate {
  background-color: #f4d43f;
}

.bg-Sensitive-Groups {
  background-color: #f3a432;
}

.bg-Unhealthy {
  background-color: #c63e20;
}
.bg-Very-Unhealthy {
  background-color: #c01982;
}

.bg-Hazardous {
  background-color: #4f0369;
}
</style>
