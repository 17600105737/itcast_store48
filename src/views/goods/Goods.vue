<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col :span="24">
        <el-input clearable placeholder="请输入内容" class="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="$router.push('/goods/add')" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-column
      type="index"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="110">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="110">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtDate('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
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
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      pagenum: 1,
      pagesize: 6,
      total: 0
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      this.total = response.data.data.total;
      this.data = response.data.data.goods;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
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
