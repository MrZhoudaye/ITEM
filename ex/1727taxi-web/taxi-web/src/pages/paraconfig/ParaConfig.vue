<template>
    <div class="paraconfig">
      <div class="title">
        <el-page-header @back="goBack" content="参数配置">
        </el-page-header>
      </div>
      <div class="bot">
        <div class="pellet">
          <div class="text">
             颗粒物模块K值信息
          </div>
          <el-form :inline="true"  :model="formInline" class="demo-form-inline" label-width="100px">
            <el-form-item label="PM1 K值" class="mr" >
              <el-input v-model="formInline.user"  size="small"></el-input>
            </el-form-item>
            <el-form-item label="PM1 B值" >
              <el-input v-model="formInline.user"  size="small"></el-input>
            </el-form-item><br>
            <el-form-item label="PM2.5 K值" class="mr" >
              <el-input v-model="formInline.user"   size="small"></el-input>
            </el-form-item>
            <el-form-item label="PM2.5 B值">
              <el-input v-model="formInline.user"  size="small"></el-input>
            </el-form-item><br>
            <el-form-item label="PM10 K值" class="mr">
              <el-input v-model="formInline.user"  size="small"></el-input>
            </el-form-item>
            <el-form-item label="PM10 B值">
              <el-input v-model="formInline.user"  size="small"></el-input>
            </el-form-item><br>
            <el-form-item>
              <el-button type="primary" size="small" style="margin-left:100px">获取</el-button>
              <el-button size="small" type="success">设置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="time">
          <div class="text">
             时间校准
          </div>
          <el-form :inline="true"  :model="formInline" class="demo-form-inline" label-width="100px">
            <el-form-item label="仪器时间" class="mr"  >
              <!-- <el-input v-model="formInline.user" size="small"></el-input> -->
              <el-date-picker type="datetime"  :default-value='value' placeholder="选择日期" size="small" v-model="formInline.date1" style="width:80%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="系统时间">
              <el-date-picker type="datetime" placeholder="选择日期" size="small" v-model="formInline.date1" style="width:80%;"></el-date-picker>
            </el-form-item><br>
            <el-form-item>
              <el-button type="primary" size="small" style="margin-left:100px">获取</el-button>
              <el-button size="small" type="success">设置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dataup">
          <div class="text">
             数据上传间隔
          </div>
          <el-form :inline="true"  :model="formInline" class="demo-form-inline" label-width="100px">
            <el-form-item label="时间间隔">
              <el-input v-model="formInline.user"  size="small"></el-input>
            </el-form-item><br>
            <el-form-item>
              <el-button type="primary" size="small" style="margin-left:100px">获取</el-button>
              <el-button size="small" type="success">设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {
  data() {
    return { 
      // labelPosition:"right",
      formInline: {
            user: '',
            region: '',
            date1:''
          },
      value:""

    }
  },
  methods:{
    goBack(){
      this.$router.push({
        name:'teamviewer'
      })
    }
  }

}
</script>

<style scoped>
  .paraconfig{
    margin: 0 2%;
  }
  .title{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ece8e8;
    margin-bottom: 40px;
  }
  .el-page-header{
    line-height: 50px;
    font-size: 16px;
    /* margin-left: 20px; */
  }
  .bot{
    width: 100%;
    box-sizing: border-box;
  }
  .pellet{
    width: 70%;
    margin-left: 200px;
    border: 1px solid #e0e6ed;
    border-radius: 5px;
    min-height: 60px;
    padding: 40px 50px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 0px;
    margin-bottom: 30px;
  }
  .pellet>.text{
    display: inline-block;
    font-size: 16px;
    position: absolute;
    left: 20px;
    top: -10px;
    z-index: 2;
    padding: 0 10px;
    background-color: #fff;
  }
  .time{
    width: 70%;
    margin-left: 200px;
    border: 1px solid #e0e6ed;
    border-radius: 5px;
    min-height: 60px;
    padding: 40px 50px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 0px;
    margin-bottom: 30px;
  }
  .time>.text{
    display: inline-block;
    font-size: 16px;
    position: absolute;
    left: 20px;
    top: -10px;
    z-index: 2;
    padding: 0 10px;
    background-color: #fff;
  }
  .dataup{
    width: 70%;
    margin-left: 200px;
    border: 1px solid #e0e6ed;
    border-radius: 5px;
    min-height: 60px;
    padding: 40px 50px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 0px;
    margin-bottom: 30px;

  }
  .dataup>.text{
    display: inline-block;
    font-size: 16px;
    position: absolute;
    left: 20px;
    top: -10px;
    z-index: 2;
    padding: 0 10px;
    background-color: #fff;
  }
  .mr{
    margin-right: 60px;
  }
</style>