<template>
  <div class="equipmentcode">
    <div class="top">
       <el-page-header @back="goBack" content="设备报警码-常规监测车"></el-page-header>
       <el-button type="success" plain size="small" class="fac"  @click=" add()">新增</el-button>
    </div>
    <div class="bottom">
       <el-input
          placeholder="请输入报警码"
          prefix-icon="el-icon-search"
          v-model="input"
          size="small"
          style="width:200px;margin-left:20px;margin-right:5px">
       </el-input>
       <el-button type="primary" size="small" style="height:30px">查询</el-button>
       <el-table
         :data="table"
         style="width:98%"
         :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
         border>
         <el-table-column
            prop="name"
            label="报警码"
            align="center">
         </el-table-column>
         <el-table-column
            prop="account"
            label="报警含义"
            align="center">
         </el-table-column>
         <el-table-column
            prop="orgnization"
            label="报警类型"
            align="center">
         </el-table-column>
         <el-table-column
            prop="telephone"
            label="报警时间间隔"
            align="center">
         </el-table-column>
         <el-table-column
            prop="mobile"
            label="是否发送通知"
            align="center">
         </el-table-column>
         <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
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
    <!-- 点击新增按钮的弹框 -->
    <el-dialog title="新增报警码" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="margin-left:140px">
        <el-form-item label="活动名称" :label-width="formLabelWidth" size="small" style="width:400px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域"  size="small" style="width:280px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="报警含义" :label-width="formLabelWidth" size="small" style="width:400px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生成报警间隔时间" label-width="124px" size="small" style="width:400px">
          <el-input v-model="form.name" autocomplete="off">
              <template slot="append">h</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否发送通知" label-width="140px" prop="resource" size="small">
          <el-radio-group v-model="form.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="queding()" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
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
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      flag:''
    }
  },
  methods:{
    goBack(){
      this.$router.push({name:'equipment'})
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    // 点击编辑
    edit(rows,row) {
      this.dialogFormVisible=true
      console.log(rows.id)
      this.flag = 'bianji'
    },
    // 点击新增
    add(){
      this.dialogFormVisible=true
      this.flag = 'xinzeng'
    },
    // 点击确定
    queding(){
      console.log(this.flag)
      if(this.flag == 'bianji'){
        alert('这是编辑的请求哦')
      }
      if(this.flag == 'xinzeng')
      alert('这是新增的请求哦')
    }
  }
  
}
</script>
<style  scoped>
  .top{
    height: 50px;
    padding-left: 20px;
    /* padding-top: 20px; */
    line-height: 50px;
    border-bottom: 1px solid #ece8e8;
    margin-bottom: 20px;
    position: relative;
  }
  .el-page-header{
    line-height: 50px;
  }
  .fac{
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .bottom{
    overflow: hidden;
  }
  .el-table{
    margin-left: 20px;
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
  .dialog-footer{
    padding-right: 120px;
  }
</style>