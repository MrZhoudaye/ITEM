<template>
  <div class="warning">
    <div class="title">
      <h3>远程控制</h3>
      <el-tag size="small">AQGRS(微型)站</el-tag>
    </div>
    <div class="bottom">
      <el-cascader
            size="small"
            class="search"
            v-model="value"
            :options="options"
            @change="handleChange">
      </el-cascader>
      <el-input
          class="search"
          size="small"
          placeholder="请输入接入编码或站点名称"
          prefix-icon="el-icon-search"
          style="width:220px;"
          v-model="input">
      </el-input>
      <el-checkbox v-model="checked" @change="ifChoose" class="search">未绑定站点设备</el-checkbox>
      <el-table
        :data="Carstable"
        style="width: 100%"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
          border
          >
        <el-table-column
          type="index"
          width="80"
          label="序号"
          align="center">
        </el-table-column>
          <el-table-column
          prop="siteName"
          label="区域（网格）"
          align="center">
        </el-table-column>
        <el-table-column
          prop="accessCode"
          label="站点"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="接入编码"
          align="center">
        </el-table-column>
          <el-table-column
          prop="deviceName"
          label="检测属性"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="站点设备类型"
          align="center">
        </el-table-column>
          <el-table-column
          prop="deviceName"
          label="电池电量（%）"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="气体流量（sccm）"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="温度"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label=湿度
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="scope">
            <!-- paraConfig -->
          <el-button type="text"  size="small" @click="goParaconfig(scope.row)">参数配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
       options:[],
       checked:false,
       value:'',
       input:'',
       Carstable: [
        {
          id:1111,
          account: '2016-05-02',
          name: '王小虎',
          telephone: '6318965',
          role:'员工'
        },{
          id:10,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
        }
       ],

      //  currentPage: 4,
    }
  },
   created(){
    
  },
  // 监听路由
   watch: {

  },
  methods:{
    handleChange(value) {
      console.log(value);
    },
      // 绑定站点设备
    ifChoose(){
      console.log("状态改变了")
    },
    goParaconfig(row){
      console.log(row.id)
      this.$router.push({
        name:'paraconfig'
      })
    }
  }
}
</script>
<style  scoped>
  .warning{
    margin: 0 2%;
  }
  .title{
    height: 50px;
    border-bottom: 1px solid #eeecec;
    /* padding:0  20px; */
    overflow: hidden;
  }
  h3{
    line-height: 50px;
    display: inline-block;
    font-size:16px;
    margin-right: 10px;
  }
  .btns{
    float: right;
    margin-top: 10px;
  }
  .bottom{
    overflow: hidden;
  }
  .el-table{
    /* margin-left: 18px; */
    margin-top: 10px;
    overflow: hidden;
  }
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 15px;
  }
  .search{
    margin-top: 20px;
    margin-bottom: 5px;
  }
  
</style>