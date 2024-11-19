<template>
  <div class="cursor-pointer">
    <!--  -->
    <div class="district-card">
      <div class="flex items-center justify-center p-4">
        <img
          src="../../../assets/images/svg_v2/ic_rain_data.svg"
          alt="Weather icon"
          width="36"
        />
      </div>
      <h3 class="text-center txt_medium">
        {{ convertLanguage(objectLocation, "en") }}
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "district-card-page",

  props: {
    objectLocation: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {};
  },

  methods: {
    convertLanguage(data, language) {
      return data.languages[language];
    },
  },
};
</script>
<style lang="scss">
.district-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  color: white;
  height: 162px;
  list-style-type: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.district-name {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin: 10px 0;
}

.weather-condition {
  margin: 5px 0;
}

.temperature {
  font-weight: bold;
}
</style>
