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
      border
      stripe
      :data="data"
      style="width: 100%">
        <el-table-column
          prop="cat_name"
          label="分类名称"
          >
        </el-table-column>
        <el-table-column
          label="级别"
          width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.cat_level===0">一级</span>
            <span v-else-if="scope.row.cat_level===1">二级</span>
            <span v-else-if="scope.row.cat_level===2">三级</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="是否有效">
          <template slot-scope="scope">
            {{ scope.row.cat_deleted ? '无效':'有效' }}
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
      total: 0,
      pagenum: 1,
      pagesize: 6
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.total = response.data.data.total;
        this.data = response.data.data.result;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    }
  }
};
</script>

<style>
.cateButton {
  margin-top: 10px;
}
</style>
