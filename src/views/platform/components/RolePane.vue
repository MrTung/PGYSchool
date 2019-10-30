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
      <el-table-column v-loading="loading" align="center" label="角色" element-loading-text="请给我点时间！">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="人数">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.openStatus }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="最新修改">
        <template slot-scope="scope">
          <span>{{ scope.row.gmtUpdate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最新修改">
        <template slot-scope="scope">
          <span>{{scope.row.lastUpdateBy}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="195">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <span style="color:lightgray;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">权限设置</el-dropdown-item>
              <el-dropdown-item command="2">查看</el-dropdown-item>
              <el-dropdown-item @click.native="deleteData(scope.row)">删除</el-dropdown-item>
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
      this.axios.post(this.urls.getrolelist, this.form).then(response => {
        this.loading = false;
        this.list = response.data.content;
      });
    },
    addInfo() {
      this.dialogTableVisible = true;
      this.selectRow = null;
    },
    handleCommand(command) {
      switch (command) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        default:
          break;
      }
    },

    //删除
    deleteData(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios.post(this.urls.delrole + row.id).then(response => {
          this.getList();
        });
      });
    },

    editDialogListener(bol) {
      this.dialogTableVisible = bol;
      this.getList();
    },
    edit(index, row) {
      this.dialogTableVisible = true;
      this.selectRow = row;
    }
  }
};
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

