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
      <template slot-scope="scope">
        <el-row class="level1Row" v-for="level1 in scope.row.children" :key="level1.id">
          <el-col :span="4">
            <!-- 一级权限 -->
            <el-tag closable>
              {{ level1.authName }}
            </el-tag>
          </el-col>
          <el-col :span="20">
            <el-row v-for="level2 in level1.children" :key="level2.id">
              <el-col :span="4">
                <!-- 二级权限 -->
                <el-tag closable type="success">
                  {{ level2.authName }}
                </el-tag>
              </el-col>
              <el-col :span="20">
                <el-tag class="level3Tag" closable type="warning" v-for="level3 in level2.children" :key="level3.id">
                  {{ level3.authName }}
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-if="scope.row.children.length===0">
          没有分配权限
        </el-row>
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
.level3Tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.level1Row {
  margin-bottom: 10px;
}
</style>
