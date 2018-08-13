<template>
  <el-card class="card">
      <!-- 面包屑 -->
      <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
      <!-- 添加分类按钮 -->
      <el-button
      type="success"
      plain
      class="cateButton"
      >添加分类</el-button>
      <!-- 表格 -->
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="cat_name"
          label="分类名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cat_level"
          label="级别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cat_deleted"
          label="是否有效">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData:[]
    }
  }
};
</script>

<style>
.cateButton {
  margin-top: 10px;
}
</style>
