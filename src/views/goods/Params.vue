<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb class="bread" level1="商品管理" level2="分类参数"></my-breadcrumb>

    <!-- 消息提示 -->
    <el-alert
      class="alert"
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon>
    </el-alert>

    <el-row>
      <el-col :span="24">
        请选择商品分类：
        <el-cascader
          placeholder="请选择商品分类"
          expand-trigger="hover"
          :options="options"
          :props="{ label: 'cat_name', value: 'cat_id' }"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button :disabled="this.selectedOptions.length !== 3" type="primary">添加动态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="expand">
            <template slot-scope="scope">
              <el-tag
                :key="item"
                v-for="item in scope.row.params"
                closable
                @close="handleClose(item, scope.row)">
                {{ item }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="商品参数"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain>
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="only">
        <el-button :disabled="this.selectedOptions.length !== 3" type="primary">添加静态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain>
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  created() {
    this.loadOptions();
  },
  data() {
    return {
      options: [],
      selectedOptions: [],
      activeName: 'many',
      data: []
    }
  },
  methods: {
    handleChange() {
      this.loadData();
    },
    handleClick() {
      this.loadData();
    },
    // 加载下拉列表
    async loadOptions() {
      const response = await this.$http.get('categories?type=3');
      this.options = response.data.data;
    },
    // 加载表格
    async loadData() {
      if (this.selectedOptions.length === 3) {
        const response = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeName}`);
        const { meta: { status, msg } } = response.data;
        if (status === 200) {
          this.data = response.data.data;
          if (this.activeName==='many') {
            this.data.forEach((item)=>{
              const arr = item.attr_vals.length===0?[]:item.attr_vals.split(',');
              this.$set(item,'params',arr);
            })
          }
        } else {
          this.$message.error(msg);
        }
      }
    },
    async handleClose(tag, param) {
      const index = param.params.findIndex((item)=>{
        if (tag === item) {
          return true;
        }
      });
      param.params.splice(index,1);

      const response = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${param.attr_id}`, {
        'attr_vals': param.params.join(','),
        'attr_sel': this.activeName,
        'attr_name': param.attr_name
      });

      const { meta: { status, msg } } = response.data;

      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }

    }
  }
}
</script>

<style>
.alert {
  margin-bottom: 10px;
  margin-top: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
