<template>
  <div class="warning">
    <div class="title" >
      <h3>超标报警</h3>
       <div class="btns">
          <el-button type="success" size="small" plain @click="addWarning">新增</el-button>
          <el-button type="danger" size="small" plain>批量删除</el-button>
       </div>
    </div>
    <div class="bottom">
      <el-table
        :data="Carstable"
        style="width: 100%"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
          border
        @selection-change="handleSelectionChange"
          >
        <el-table-column
          type="selection"
          width="80"
          align="center">
        </el-table-column>
          <el-table-column
          prop="siteName"
          label="检测因子"
          align="center">
        </el-table-column>
        <el-table-column
          prop="accessCode"
          label="报警等级"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="数据源"
          align="center">
        </el-table-column>
          <el-table-column
          prop="deviceName"
          label="超限值"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="报警提醒时间间隔"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          >
          <!-- <template slot-scope="scope"> -->
          <el-button type="text"  size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" >删除</el-button>
          <!-- </template> -->
        </el-table-column>
      </el-table>
        <!-- 分页 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination> -->
    </div>
    <!-- 点击新增的弹框 -->
    <el-dialog title="新增超标报警"  :visible.sync="dialogFormVisible">
      <el-form :model="form" >
        
        <el-form-item label="检测因子" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择检测因子" size="small" style="width:300px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="报警等级" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择报警等级" size="small" style="width:300px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="数据源" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择数据源" size="small" style="width:300px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超限值"  :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" size="small" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="报警间隔时间"  :label-width="formLabelWidth">
          <el-input-number v-model="num" controls-position="right"  size="small" style="width:300px" :min="0" :max="60"></el-input-number>
          <!-- <el-input v-model="form.name" autocomplete="off" size="small" style="width:300px"></el-input> -->
          <span>min</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:-30px">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
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
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
        },
        num:0,

        formLabelWidth: '120px'
      //  currentPage: 4,
    }
  },
   created(){
   
  },
  // 监听路由
   watch: {

  },
  methods:{
    // handleSizeChange(val) {
    //     console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //     console.log(`当前页: ${val}`);
    // },
    handleSelectionChange(rows,row){
      let selected = rows.length
      this.selected=selected
        // console.log(rows)
      this.mutiDevice=rows
        console.log(this.mutiDevice)
        // console.log(selected)  // 1就是选中，0是取消选中
    },
    addWarning(){
      this. dialogFormVisible=true
       this.$nextTick(function(){
       var dio=document.querySelector('.el-dialog')
       dio.style.width="35%"
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
    overflow: hidden;
  }
  h3{
    line-height: 50px;
    display: inline-block;
    font-size:16px;
  }
  .btns{
    float: right;
    margin-top: 10px;
  }
  /* .bottom{
    overflow: hidden;
  } */
  .el-table{
    /* margin-left: 18px; */
    margin-top: 20px;
    overflow: hidden;
  }
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 15px;
  }
  span{
    color: #909399;
    margin-left: 10px;
  }
</style>