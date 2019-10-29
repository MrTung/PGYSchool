<template>
  <div>
    <el-form ref="ruleForm">
      <el-form-item label="角色" class="form-item" label-width="80px" prop="roleList">
        <el-select v-model="roleValue" placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" class="form-item" label-width="80px" prop="rolename">
        <el-input placeholder="请输入用户名" v-model="rolename"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="primary" @click="addInfo()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{row}">
          <el-tag>{{ row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="195">
        <template>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              下拉菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">权限设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">查看</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <NewDialog
      ref="editUserDialog"
      :isShowDialog="dialogTableVisible"
      :taskData="selectRow"
      v-on:editDialog="editDialogListener"
    ></NewDialog>
  </div>
</template>

<script>
import NewDialog from "./userinfodialog";

export default {
  components: { NewDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  props: {
    type: {
      type: String,
      default: "CN"
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      selectRow: {},

      list: null,
      roleList: "",
      roleValue: "",
      rolename: "",
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: "+id"
      },
      loading: false,

      form: {
        pageNum: "1",
        pageSize: "10"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //角色列表
      this.axios.get(this.urls.getrolefindList, this.form).then(response => {
        this.roleList = response.data;
      });

      //获取用户列表
      this.loading = true;
      this.axios.post(this.urls.getuserlist, this.form).then(response => {
        this.loading = false;
        this.list = response.data.content;
      });
    },

    addInfo(index, row) {
      this.dialogTableVisible = true;
      this.selectRow = row;
    },
    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    }
  }
};
</script>

