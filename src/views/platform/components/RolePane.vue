<template>
  <div>
    <el-form ref="ruleForm">
      <el-form-item label="搜索角色" class="form-item" label-width="80px" prop="rolename">
        <el-input placeholder="请输入角色名" v-model="rolename"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="getList()">查询</el-button>
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

      <el-table-column align="center" label="操作" width="95">
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
import { fetchList } from "@/api/article";
import NewDialog from "./roleinfodialog";

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
    //获取数据
    getList() {
      this.loading = true;
      this.axios.get(this.urls.getrolelist, this.form).then(response => {
        this.loading = false;
      });
    },
    addInfo(index, row) {
      this.dialogTableVisible = true;
      this.selectRow = row;
    },

    //删除
    deleteData(index, row, type) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios.put(this.urls.delrole + row.id).then(response => {
          this.getList();
        });
      });
    },

    editDialogListener(bol) {
      this.dialogTableVisible = bol;
    }
  }
};
</script>

