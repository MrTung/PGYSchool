<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from "./components/TabPane";

export default {
  name: "Tab",
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: "班级管理", key: "CN" },
        { label: "学生管理", key: "US" },
        { label: "教师管理", key: "JP" }
      ],
      activeName: "CN"
    };
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    }
  },
  created() {
    // init the default  selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {
    showCreatedTimes() {}
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
