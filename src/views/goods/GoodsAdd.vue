<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb class="bread" level1="商品管理" level2="商品列表"></my-breadcrumb>

    <!-- 消息提示 -->
    <el-alert
      class="alert"
      title="添加商品信息"
      type="info"
      center
      show-icon>
    </el-alert>

    <!-- 步骤条 -->
    <el-steps :active="activeName - 0" finish-status="success" align-center>
      <el-step name="1" title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-form
      label-position="top"
      :model="form">
      <el-tabs
        @tab-click="handleTabClick"
        v-model="activeName"
        class="tabs"
        tab-position="left">
        <el-tab-pane name="0" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              clearable
              placeholder="请选择商品分类"
              expand-trigger="hover"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id', children: 'children'}"
              v-model="selectedOptions2"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="1" label="商品参数">
          <el-form-item
            v-for="item in dynamicParams"
            :key="item.attr_id"
            :label="item.attr_name"
            >
            <el-checkbox
              checked
              v-for="param in item.params"
              :key="param"
              border
              :label="param"
              >

            </el-checkbox>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品属性">
          <el-form-item
            v-for="item in staticParams"
            :key="item.attr_id"
            :label="item.attr_name"
            >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="4" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  created() {
    this.loadOptions();
  },
  data() {
    return {
      activeName: '0',
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
      },
      options: [],
      selectedOptions2: [],
      // 动态参数列表
      dynamicParams: [],
      staticParams: []
    }
  },
  methods: {
    // 获取三级列表数据
    async loadOptions() {
      const response = await this.$http.get('categories?type=3');
      this.options = response.data.data;
    },
    // 获取参数
    async loadParams(index) {
      // 判断点击的是动态参数选项卡还是静态参数选项卡
      const sel = index==='1'? 'many':'only';
      const response = await this.$http.get(`categories/${this.selectedOptions2[2]}/attributes?sel=${sel}`);

      if (sel==='many') {
        // 动态参数
        this.dynamicParams = response.data.data;
      
        // 获取动态参数里的选项
        this.dynamicParams.map((item)=>{
          item.params = item.attr_vals.length===0 ? []:item.attr_vals.split(',');
        });     
      } else if (sel==='only') {
        // 静态参数
        this.staticParams = response.data.data;
      }

    },
    // 点击tab选项卡时执行的操作
    handleTabClick(tab,event) {
      if (tab.index === '1' || tab.index === '2') {
        
        if (this.selectedOptions2.length !== 3) {
          // 没有选择三级列表
          this.$message.error('请先选择商品分类');
          return;
        }
        // 加载动态参数
        this.loadParams(tab.index);
      }
    },
    // 点击级联列表时执行的函数
    handleChange() {
      if (this.selectedOptions2.length !== 3) {
        this.$message.warning('请选择三级分类');
        this.selectedOptions2.length=0;
      }
    }
  }
}
</script>

<style>
.bread {
  margin-bottom: 10px;
}
.alert {
  margin-bottom: 10px;
}
.el-step__title {
  font-size: 14px;
}
.tabs {
  margin-top: 20px;
}
</style>
