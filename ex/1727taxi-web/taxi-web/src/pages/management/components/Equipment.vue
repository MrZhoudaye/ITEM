<template>
  <div class="equipment">
    <div class="title" v-if="showEquip">
      <h3>设备管理</h3>
      <el-button type="success" size="small" plain class="add" @click="goEquipadd()">新增</el-button>
    </div>
    <div class="bottom" v-if="showEquip">
      <el-table
         :data="equipTable"
         style="width:100%"
         :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
         border>
         <el-table-column
            prop="deviceName"
            label="设备型号"
            align="center">
         </el-table-column>
         <el-table-column
            prop="deviceCode"
            label="设备编码"
            align="center">
         </el-table-column>
         <el-table-column
            prop="deviceType"
            label="设备类型"
            align="center">
         </el-table-column>
          <el-table-column
            prop="pollutantCodes"
            label="污染因子"
            align="center">
         </el-table-column>
         <el-table-column
            prop="conpany"
            label="生产厂商"
            align="center">
         </el-table-column>
         <el-table-column
            prop="realdataCycle"
            label="原始数据频率（min)"
            align="center">
         </el-table-column>
         <el-table-column
            prop="minEffectRecord"
            label="生成小时数据最小有效分钟数据个数"
            align="center">
         </el-table-column>
         <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="tabEquip(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="editEquip(scope.row)">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="goEquipFac(scope.row)">设备因子</el-button>
              <el-button type="text" size="small" @click="goEquipCode(scope.row)">设备报警码</el-button>
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
       showEquip:true,
       equipTable: [{
          company: null,
          createTime: "",
          deviceCode: "",
          deviceName: "",
          deviceType: "",
          id: "",
          minEffectRecord: null,
          pollutantCodes: "",
          realdataCycle:null,
          updateTime: null,
       }
     
       ],
       pageNum: 1,
       pageSize:10,
       total:null,
    }
  },
  created(){
    var url = window.location.href;
    if(url.indexOf("equipadd")>=0){
      this.showEquip=false
    }else if(url.indexOf("equipmentfactor")>=0){
      this.showEquip=false
    }else if(url.indexOf("equipmentcode")>=0){
      this.showEquip=false
    }
    else{
      this.showEquip=true
    }
  },
  mounted(){
      this.getEquiptable()
  },
  // 监听路由
  watch: {
   "$route": {
      handler: function(val, oldVal){
        // console.log("路由变化了")
        var url = window.location.href;
        if(url.indexOf("equipadd")>=0){
          this.showEquip=false
        }else if(url.indexOf("equipmentfactor")>=0){
          this.showEquip=false
        }else if(url.indexOf("equipmentcode")>=0){
          this.showEquip=false
        }
        else{
          this.showEquip=true
        }
      },
      // 深度观察监听
      deep: true
   }
  },
  methods:{
    // 获取设备管理的表格
    getEquiptable(){
       this.$XHR.get('/taxi/web/api/v1/device/getDevices/',
       {params:{
         "pageNum":this.pageNum,
         "pageSize":this.pageSize
       }}
       ).then(res=>{
         if(res.status==200){
            // console.log(res)
            // console.log(res.data.data.records)
            this.equipTable=res.data.data.records
            this.pageNum=res.data.data.current
            this.total=res.data.data.total
            this.pageSize=res.data.data.size
         }
         else{
           alert(res.data.message)
         }
       })
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize= val
        this.pageNum = 1
        this.getEquiptable()
    },
    handleCurrentChange(val) {
        this.pageNum = val
        this.getEquiptable()
    },
    // 点击新增按钮
    goEquipadd(){
      // console.log("去新增页面")
      this.$router.push({name:"equipadd"})
    },
    // 点击设备因子
    goEquipFac(row){
      this.$router.push({
        name:"equipmentfactor",
        query:{
        id:row.id
        }
      })
    },
    // 设备报警码
    goEquipCode(row){
      this.$router.push({
        name:"equipmentcode",
        query:{
        id:row.id
        }
      })
    },
    // 点击查看
    tabEquip(row){
      //  console.log(row.id)
      this.$router.push({
        name:"equipadd",
        query:{
        id:row.id,
        readonly:"true"
        }
      })
    },
    // 点击编辑
    editEquip(row){
      var flag = 1
       this.$router.push({
        name:"equipadd",
        query:{
        id:row.id,
        // edit:'true'
        flag
        }
      })
    }
  }
}
</script>
<style  scoped>
  .equipment{
    margin: 0 2%;
  }
  .title{
    height: 50px;
    border-bottom: 1px solid #eeecec;
    /* padding:0  20px; */
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
    /* overflow: hidden; */
    margin-top: 20px;
  }
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 15px;
  }
</style>