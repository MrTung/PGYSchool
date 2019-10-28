<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="用户列表" name="CN">
        <keep-alive>
          <UserPane type="CN" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="US">
        <keep-alive>
          <RolePane type="US" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RolePane from "./components/RolePane";
import UserPane from "./components/UserPane";

export default {
  name: "Tab",
  components: { RolePane, UserPane },
  data() {
    return {
      tabMapOptions: [
        { label: "用户列表", key: "CN" },
        { label: "角色管理", key: "US" }
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
