<template>
  <el-dialog
    title="新增用户"
    :visible.sync="isShowDialog"
    width="25%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="app-container" style="padding-top:0px;">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="form.loginName" placeholder="由6-24位英文、数字或下划线组成"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请填写用户真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入6-18位密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input v-model="form.password1" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",

      taskInfo: null,
      roleList: [],
      form: {
        id: "",
        loginName: "",
        password: "",
        password1: "",
        realName: "",
        roleId: "",
        roleName: ""
      },

      rules: {
        loginName: [
          { required: true, trigger: "blur", message: "请输入角色名称" }
        ],
        realName: [
          { required: true, trigger: "blur", message: "请输入角色名称" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入角色名称" }
        ],
        password1: [
          { required: true, trigger: "blur", message: "请输入角色名称" }
        ],
        roleId: [{ required: true, trigger: "blur", message: "请输入角色名称" }]
      }
    };
  },
  computed: {
    // getbalance() {
    //   let userinfo = this.$store.state.userinfo;
    //   return userinfo.balance;
    // }
  },
  created() {
    //角色列表
    this.axios.get(this.urls.getrolefindList, this.form).then(response => {
      this.roleList = response.data;
    });
  },
  mounted() {},
  methods: {
    //dialog关闭按钮
    handleClose() {
      // this.isNewDialog = false;
      this.$emit("editDialog", false);
    },
    add() {
      if (this.form.password1 != this.form.password)
        return this.$message.error("两次密码输入不一样");
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.axios.post(this.urls.usersave, this.form).then(response => {
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

