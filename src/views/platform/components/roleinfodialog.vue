<template>
  <el-dialog
    title="新增角色"
    :visible.sync="isShowDialog"
    width="25%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="开放角色" prop="openStatus">
          <el-switch v-model="form.openStatus" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" @click="add()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Qs from "qs";

export default {
  name: "taskInfo",
  components: {},
  props: {
    isShowDialog: Boolean,
    taskData: { type: Object }
  },

  watch: {
    taskData: function(newValue, oldValue) {
      if (newValue) {
        this.taskInfo = newValue;
        this.form = this.taskInfo;
      }
    }
  },
  data() {
    return {
      taskInfo: null,

      form: {
        openStatus: "0",
        name: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入角色名称" }]
      }
    };
  },
  computed: {
    // getbalance() {
    //   let userinfo = this.$store.state.userinfo;
    //   return userinfo.balance;
    // }
  },
  created() {},
  mounted() {},
  methods: {
    //dialog关闭按钮
    handleClose() {
      // this.isNewDialog = false;
      this.$emit("editDialog", false);
    },
    add() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios.post(this.urls.rolesave, this.form).then(response => {
            this.$emit("editDialog", false);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}

.formview {
  padding: 0 30px;
  padding-top: 0px;
}

.sub-navbar {
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(
    90deg,
    rgba(32, 182, 249, 1) 0%,
    rgba(32, 182, 249, 1) 0%,
    rgba(33, 120, 241, 1) 100%,
    rgba(33, 120, 241, 1) 100%
  );

  .subtitle {
    font-size: 20px;
    color: #fff;
  }

  &.draft {
    background: #d0d0d0;
  }

  &.deleted {
    background: #d0d0d0;
  }
}
</style>

