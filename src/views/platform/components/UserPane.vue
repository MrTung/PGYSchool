<template>
  <div>
    <el-form ref="ruleForm">
      <el-form-item label="角色" class="form-item" label-width="80px" prop="roleList">
        <el-select v-model="roleList" placeholder="请选择">
          <el-option label="全部" value />
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" class="form-item" label-width="80px" prop="rolename">
        <el-input placeholder="请输入用户名" v-model="rolename"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="fetchData('ruleForm')">查询</el-button>
        <el-button type="primary" @click="addInfo()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
          <el-tag>{{ row.type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
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
      rolename: "",
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: "+id"
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //角色列表
      this.axios.get(this.urls.getrolefindList, this.form).then(response => {});

      //获取用户列表
      this.loading = true;
      this.axios.get(this.urls.getuserlist, this.form).then(response => {
        this.loading = false;
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

