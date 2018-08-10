<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col :span="24">
        <el-input v-model="searchValue" clearable placeholder="请输入内容" class="searchInput">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="addDialogFormVisible=true" plain>添加用户</el-button>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
          <el-form
          :model="form"
          :rules="rules"
          ref="addForm"
          label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleUserAdd">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="data"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
            @change="handleChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="openEditDialog(scope.row)" plain size="mini"></el-button>
          <!-- 修改用户对话框 -->
          <el-dialog
          @close="handleEditDialogClose"
          title="修改用户"
          :visible="editDialogFormVisible"
          >
            <el-form
            :model="form"
            label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input :disabled="true" v-model="form.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.mobile" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleUserEdit">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="warning" icon="el-icon-check" plain size="mini"></el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <!--
      total 总条数
    -->
    <el-pagination
      @size-change="handelSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="pagesize"
      :page-sizes="[2, 4, 6, 8]"
      :pager-count="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      count: 0,
      pagenum: 1,
      pagesize: 2,
      searchValue: "",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 表单验证的规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      // 发送请求的时候，要在请求头中添加Authorization=token
      var token = sessionStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;

      var response = await this.$http.get(
        `users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.searchValue
        }`
      );
      var { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.data = response.data.data.users;
        this.count = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 点击切换每页显示多少条数据
    handelSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    // 点击页码切换数据
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
    // 完成搜索
    handleSearch() {
      this.loadData();
    },
    // 添加用户
    handleUserAdd() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 验证通过
          const response = await this.$http.post("users", this.form);
          const { meta: { status, msg } } = response.data;
          if (status === 201) {
            this.$message.success("添加成功");
            this.addDialogFormVisible = false;
            this.loadData();
            this.$refs.addForm.resetFields();
          } else {
            this.$message.error(msg);
          }
        } else {
          // 验证不通过
          this.$message.warning("表单验证失败");
        }
      });
    },
    // 打开编辑用户对话框
    openEditDialog(users) {
      this.editDialogFormVisible = true;
      this.form = users;
      this.form.id = users.id;
    },
    // 编辑用户
    async handleUserEdit() {
      const response = await this.$http.put(`users/${this.form.id}`, {
        email: this.form.email,
        mobile: this.form.mobile
      });
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success("修改成功");
        this.editDialogFormVisible = false;
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    // 关闭编辑对话框清空表单
    handleEditDialogClose() {
      console.log(111);

      for (var key in this.form) {
        this.form[key] = "";
      }
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm("是否删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const response = await this.$http.delete(`users/${id}`);
          // 判断删除是否成功
          const { meta: { status, msg } } = response.data;
          if (status === 200) {
            if (this.data.length === 1 && this.pagenum !== 1) {
              this.pagenum--;
              // 重新加载数据
              this.loadData();
            }
            // 提示
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async handleChange(user) {
      const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
       const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.searchInput {
  width: 300px;
}
.searchRow {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
