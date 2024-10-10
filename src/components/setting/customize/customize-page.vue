<template>
  <div class="w-full h-full bg-unit">
    <!--  -->
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "customize-page",

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang=""></style>
