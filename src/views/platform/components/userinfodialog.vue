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
      <el-form ref="form" :model="form" label-width="120px" class="formview">
        <el-form-item label="用户名" class="form-item">
          <el-input v-model="form.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" class="form-item" prop="salary">
          <el-input v-model="form.trueName"></el-input>
        </el-form-item>
        <el-form-item label="TA的客户" class="form-item" prop="userCount">
          <el-input v-model="form.userCount"></el-input>
        </el-form-item>
        <el-form-item label="上次登录IP" class="form-item" prop="salary">
          <el-input v-model="form.lastIp"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" class="form-item" prop="salary">
          <el-input v-model="form.idCardNo"></el-input>
        </el-form-item>
        <el-form-item label="账户余额(积分)" class="form-item" prop="salary">
          <el-input v-model="form.points"></el-input>
        </el-form-item>
        <el-form-item label="微信号" class="form-item" prop="salary">
          <el-input v-model="form.wechat"></el-input>
        </el-form-item>
        <el-form-item label="QQ号" class="form-item" prop="salary">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="淘宝ID" class="form-item" prop="salary">
          <el-input v-model="form.tbName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" class="form-item" prop="salary">
          <el-input v-model="form.contact1"></el-input>
        </el-form-item>
        <el-form-item label="上次登录地址" class="form-item" prop="salary">
          <el-input v-model="form.loginAddress"></el-input>
        </el-form-item>
        <el-form-item label="分类喜好" class="form-item" prop="salary">
          <el-input v-model="form.like "></el-input>
        </el-form-item>
        <el-form-item label="消费等级" class="form-item" prop="salary">
          <el-input v-model="form.grades"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" class="form-item" prop="salary">
          <el-input v-model="form.bankCardNo"></el-input>
        </el-form-item>
        <el-form-item label="开户行" class="form-item" prop="salary">
          <el-input v-model="form.bankName"></el-input>
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
        id: "11",
        userCount: "",
        loginAddress: "",
        balance: "4980352",
        businessStatusId: "",
        contact1: "",
        contact2: "",
        contact3: "",
        dbCreateSysTime: "",
        dbUpdateSysTime: "",
        files: "",
        id: "",
        idCard: "",
        lastIp: "",
        name: "",
        qq: "",
        roleId: "",
        statusName: "",
        sysStatus: "",
        sysUserId: "",
        trueName: "",
        userId: "",
        wechat: ""
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

