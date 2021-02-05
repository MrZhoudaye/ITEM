<template>
  <div class="factor">
    <div class="title" v-if="showFactor">
      <h3>因子管理</h3>
      <el-button type="success" size="small" plain class="add" @click="goFactoradd()">新增</el-button>
    </div>
    <div class="bottom"  v-if="showFactor">
      <el-input
          placeholder="请输入因子名称"
          prefix-icon="el-icon-search"
          size="small"
          v-model="input">
      </el-input>
      <el-checkbox v-model="checked" @change="changetable">组合因子</el-checkbox>
      <el-table
        :data="facTable"
        style="width:100%"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        border>
        <el-table-column
            prop="pollutantName"
            label="因子名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="pollutantCode"
            label="接入编码"
            align="center">
        </el-table-column>
        <el-table-column
            prop="internationalCode"
            label="国际编码"
            align="center">
        </el-table-column>
        <el-table-column
            prop="standardUnit"
            label="标准单位"
            align="center">
        </el-table-column>
        <el-table-column
            prop="standardPrecision"
            label="标准精度"
            align="center">
        </el-table-column>
        <el-table-column
            prop="tranUnit"
            label="转换单位"
            align="center">
        </el-table-column>
        <el-table-column
            prop="tranpercision"
            label="转换精度"
            align="center">
        </el-table-column>
        <el-table-column
            prop="tranratio"
            label="转换系数"
            align="center">
        </el-table-column>
        <el-table-column
            prop=""
            label="包含的因子"
            align="center">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="readEquip(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="editEquip(scope.row)">编辑</el-button>
              <el-button type="text" size="small" >删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <router-view></router-view>
  </div>
  
</template>
<script>
export default {
  data(){
    return{
      showFactor:true,
      input:'',
      checked:false,
      facTable: [
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
        }
      ],
     pageNum: 4,
     pageSize:5,
     total:null,
    }
  },
  // computed: {
  //  key() {
  //   return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
  //  }
  // },
  created(){
    var url = window.location.href;
    if(url.indexOf("factoradd")>=0){
      this.showFactor=false
    }else{
      this.showFactor=true
    }
  },
  mounted(){
    this.getFactable()
  },
  watch: {
   "$route": {
      handler: function(val, oldVal){
        // console.log("路由变化了")
        var url = window.location.href;
        if(url.indexOf("factoradd")>=0){
          this.showFactor=false
        }else{
          this.showFactor=true
        }
      },
      // 深度观察监听
      deep: true
   }
  },
  methods:{
    // 获取因子管理列表
    getFactable(){
      console.log(this.checked)
      this.$XHR.get('/taxi/web/api/v1/pollutants/pulltants',
      {
        params:{
            "pollutantName":"SO₂",
            "isisCombinedPollution":this.checked,
            "pageNumber":this.pageNum,
            "pageSize":this.pageSize
        }
      })
      .then(res=>{
        if(res.status==200){
          console.log(res)
          console.log(res.data.data.entries)
      }else{
        alert(res.data.message)
      }
      })
    },
    // 点击组合因子
    changetable(){
      //  this.checked
      console.log(this.checked)
   
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    // 点击新增
    goFactoradd(){
      // console.log("去新页面")
      this.$router.push({name:"factoradd"})
    },
    // 点击查看
    readEquip(row){
      this.$router.push({
        name:"factoradd",
        query:{
          id:row.id,
          readonly:true
        }
      })
    },
    // 点击编辑
    editEquip(row){
       this.$router.push({
        name:"factoradd",
        query:{
          id:row.id,
          readonly:false
        }
      })
    }
  },
 
}
</script>
<style  scoped>
  .factor{
    margin: 0 2%;
  }
  .title{
    height: 50px;
    border-bottom: 1px solid #eeecec;
  }
  h3{
    line-height: 50px;
    display: inline-block;
    font-size:16px;
  }
  .add{
    float: right;
    margin-top: 10px;
  }
  .bottom{
    overflow: hidden;
  }
  .el-table{
    /* margin-left: 18px; */
    margin-top: 15px;
  }
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 15px;
  }
  .el-input{
    width: 220px;
    margin-top: 20px;
    /* margin-left: 20px; */
  }
</style>