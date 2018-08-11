<template>
  <el-card class="card">
    <el-breadcrumb class="nav" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限管理表格 -->
    <template>
      <el-table
        :data="data"
        stripe
        border
        style="width: 100%">
        <el-table-column
        type="index"
        width="180">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级">
        </el-table-column>
      </el-table>
  </template>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  }
};
</script>

<style>
.card {
  height: 100%;
}
.nav {
  margin-bottom: 10px;
}
</style>
