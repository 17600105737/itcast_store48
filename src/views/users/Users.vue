<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col :span="24">
        <el-input clearable placeholder="请输入内容" class="searchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>成功按钮</el-button>
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
        prop="address"
        label="用户状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      data:[]
    }
  },
  created(){
    this.loadData()
  },
  methods:{
    async loadData(){
      // 发送请求的时候，要在请求头中添加Authorization=token
      var token = sessionStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      var response = await axios.get
      ('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=10');
      var { meta:{status,msg}} = response.data;
      if (status === 200) {
        this.data = response.data.data.users;
      } else {
        this.$message.error(msg);
      }
    }
  }
}
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
