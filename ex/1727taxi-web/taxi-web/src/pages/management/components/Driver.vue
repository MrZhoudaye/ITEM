<template>
  <div class="driver">
    <div class="top">
      <h3>司机信息配置</h3>
      <el-button type="success" size="small" class="add" plain>新增</el-button>
    </div>
    <div class="bottom">
      <el-table
        :data="tableData"
        border
        style="width: 40%"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="手机号"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            width="150">
              <!-- <template slot-scope="scope"> -->
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" style="margin-left:10px">删除</el-button>
              <!-- </template> -->
          </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods:{

  }
}
</script>
<style  scoped>
  .driver{
    margin: 0 2%;
  }
 .top{
    height: 50px;
    border-bottom: 1px solid #eeecec;
    overflow: hidden;
  }
  .el-table{
    margin-top: 40px;
    margin-left: 200px;
  }
  .add{
    float: right;
    margin-top: 10px;
  }
  h3{
    display: inline-block;
    line-height: 50px;
    font-size: 16px;
  }
 
</style>