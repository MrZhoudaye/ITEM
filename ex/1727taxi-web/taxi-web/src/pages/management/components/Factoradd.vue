<template>
  <div class="factoradd">
    <div class="top">
      <el-page-header @back="goBack" content="查看因子管理"></el-page-header>
    </div>
    <div class="bottom">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="因子名称">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="接入编码">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="国际编码">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="标准单位">
          <el-select v-model="form.region" placeholder="请选择活动区域" size="small" style="width:480px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准精度">
          <el-select v-model="form.region" placeholder="请选择活动区域" size="small" style="width:480px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转换单位">
          <el-select v-model="form.region" placeholder="请选择活动区域" size="small" style="width:480px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转换精度">
          <el-select v-model="form.region" placeholder="请选择活动区域" size="small" style="width:480px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="FVC">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="MIR">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="FVOC">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="OFACT">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="转换系数">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="分子量">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="标准值">
          <el-input v-model="form.name" size="small" style="width:480px"></el-input>
        </el-form-item>
         <el-form-item label="组合因子">
          <el-select v-model="form.region" placeholder="请选择活动区域" size="small" style="width:480px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small" style="margin-top:60px;margin-left: 30px">保存</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
       form: {
          name: '',
          region: '',
       }
    }
  },
  methods:{
    goBack(){
      this.$router.push({name:'factor'})
    },
    onSubmit() {
     console.log('submit!');
    }
  }
}
</script>
<style  scoped>
  .top{
    height: 50px;
    border-bottom: 1px solid #ece8e8;
    position: relative;
  }
  .el-page-header{
    line-height: 50px;
  }
  .el-form{
    margin: 0 auto;
    margin-top: 20px;
    margin-left: 240px;
  }
</style>