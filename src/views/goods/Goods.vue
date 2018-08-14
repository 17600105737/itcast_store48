<template>
  <el-card>
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col :span="24">
        <el-input clearable placeholder="请输入内容" class="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
      type="index"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品价格(元)"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          size="mini"
          >
          </el-button>
          <el-button
          type="danger"
          icon="el-icon-delete"
          plain
          size="mini"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  }
}
</script>

<style>
.search {
  width: 300px;
}
.searchRow {
  margin-top: 10px;
}
</style>
