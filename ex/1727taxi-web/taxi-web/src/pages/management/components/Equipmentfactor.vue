<template>
  <div class="equipmentfactor">
    <div class="top">
       <el-page-header @back="goBack" content="设备因子-常规监测车"></el-page-header>
       <el-button type="primary" size="small" class="fac"  @click="dialogVisible = true">因子设置</el-button>
    </div>
    <div class="bottom">
       <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input"
          size="small"
          style="width:200px;margin-right:5px">
       </el-input>
       <el-button type="primary" size="small" style="height:30px">查询</el-button>
       <el-table
         :data="table"
         style="width:100%"
         :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
         border>
         <el-table-column
            prop="name"
            label="因子名称"
            align="center">
         </el-table-column>
         <el-table-column
            prop="account"
            label="接入编码"
            align="center">
         </el-table-column>
         <el-table-column
            prop="orgnization"
            label="国际编码"
            align="center">
         </el-table-column>
         <el-table-column
            prop="telephone"
            label="标准单位"
            align="center">
         </el-table-column>
         <el-table-column
            prop="mobile"
            label="标准精度"
            align="center">
         </el-table-column>
         <el-table-column
            label="转换单位"
            align="center">
          </el-table-column>
          <el-table-column
            label="转换精度"
            align="center">
          </el-table-column>
          <el-table-column
            label="转换系数"
            align="center">
          </el-table-column>
       </el-table>
        <!-- 分页 -->
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
       </el-pagination>
    </div>
    <!-- 因子设置弹框 -->
    <el-dialog
      title="因子选择"
      :visible.sync="dialogVisible"
      width="40%"
      >
      <el-transfer 
        v-model="value" 
        :data="data"
        :titles="['候选因子', '已选因子']">
        </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addFac" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    // 穿梭框
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
        });
      }
      return data;
    }
    return{
      data: generateData(),
      value:[],
      input:'',
      table: [
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
       }, {
          id:11,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:12,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       },{
          id:13,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:14,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:15,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }
      ],
      currentPage: 4,
      dialogVisible: false
    }
  },
  methods:{
    goBack(){
      this.$router.push({name:'equipment'})
    },
   // 点击新增
    addFac(){
      this.dialogVisible= false
    },
    handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
    }
  }
  
}
</script>
<style  scoped>
  .top{
    height: 50px;
    border-bottom: 1px solid #ece8e8;
    margin-bottom: 20px;
    position: relative;
  }
  .el-page-header{
    line-height: 50px;
  }
  .fac{
    position: absolute;
    right: 0px;
    top: 10px;
  }
  .bottom{
    overflow: hidden;
  }
  .el-table{
    /* margin-left: 20px; */
    margin-top: 20px;
  }
  .el-pagination{
    float: right;
    margin-right: 20x;
    margin-top: 20px;
  }
  .el-transfer{
    margin-left: 7px;
  }
</style>