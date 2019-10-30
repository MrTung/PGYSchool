<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form">
      <el-form-item label="网校状态" class="form-item" label-width="70px">
        <el-select v-model="form.type" placeholder="请选择公告类型">
          <el-option label="正常" value="2" />
          <el-option label="锁定" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="网校名称" class="form-item" label-width="80px" prop="mobile">
        <el-input placeholder="请输入网校名称" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="日期范围" class="form-item" label-width="70px">
        <el-date-picker
          v-model="form.starttime"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="请选择开始日期"
        />
        <span>至</span>
        <el-date-picker
          v-model="form.endtime"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="请选择结束日期"
        />
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="fetchData()">查询</el-button>
        <el-button type="success" @click="addNotice()">新建网校</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column label="网校" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="管理员信息" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="学生 / 教师" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="课程 / 课件" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="作业 / 答疑" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="登录" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="最后登录" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="短信配额" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="存储空间" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column label="有效期" align="center" style="color:red">
        <template slot-scope="scope">{{scope.row.memo}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="95">
        <template slot-scope="scope">{{ scope.row.type == '1' ? '商家' :'买手'}}</template>
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
  </div>
</template>

<script>
export default {
  components: {},

  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "gray",
        2: "gray",
        3: "danger",
        4: "success",
        5: "danger",
        6: "success",
        7: "danger",
        8: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      infoVisible: false,

      selectData: "",

      shoptypelist: [],
      list: null,
      listLoading: true,
      form: {
        starttime: "",
        endtime: "",
        _uiName_: "eleme",
        _pagination: "{'pageNumber':1,'pageSize':10}"
      }
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.fetchData();
  },
  methods: {
    formatTime(row, column, cellValue) {
      return getTimeDate(cellValue);
    },

    addNotice() {
      this.selectData = "add";
      this.infoVisible = true;
    },
    lookinfo(row) {
      this.selectData = row.memo;
      this.infoVisible = true;
    },

    fetchData() {
      this.listLoading = false;
      // this.axios
      //   .get(this.urls.noticelist)
      //   .then(response => {
      //     this.list = response.data.list;
      //     this.listLoading = false;
      //   });
    },

    //删除
    delede(index, row) {
      console.log(index, row);
      this.$confirm("是否确认删除该公告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          id: row.id
        };
        this.axios
          .delete(this.urls.deletenotice + "?" + Qs.stringify(param))
          .then(response => {
            this.fetchData();
          });
      });
    },

    wangwangListener(bol) {
      this.infoVisible = bol;
    }
  }
};
</script>
<style scoped>
.form-item {
  display: inline-block;
  margin-right: 20px;
}
</style>