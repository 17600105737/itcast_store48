<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <!-- 表格 -->
    <el-button class="addButton">添加角色</el-button>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get('roles');
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data;
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
  overflow: auto;
}
.addButton {
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>
