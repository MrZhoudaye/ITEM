<template>
  <div class="cars">
    <div class="title" v-if="showCars">
        <h3>车辆管理</h3>
        <div class="btns">
          <el-button type="success" @click="goAdd" plain size="small">新增</el-button>
        </div>
    </div>
    <div class="bot" v-if="showCars">
       <div class="table">
          <el-cascader
            size="small"
            v-model="value"
            :options="options"
            @change="handleChange">
         </el-cascader>
         <el-input
           size="small"
           placeholder="请输入接入编码或站点名称"
           prefix-icon="el-icon-search"
           style="width:220px;margin-bottom:10px;"
           v-model="input">
         </el-input>
         <el-checkbox v-model="checked" @change="ifChoose">未绑定站点设备</el-checkbox>
         <!-- 表格 -->
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
              label="站点名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="accessCode"
              label="接入编码"
              align="center">
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="监测属性"
              align="center">
            </el-table-column>
            <!-- <el-table-column
              prop="mobile"
              label="站点设备类型"
              align="center">
            </el-table-column> -->
            <el-table-column
              label="操作"
              align="center"
              width="180"
              >
              <template slot-scope="scope">
              <el-button type="text" @click="tabAdd(scope.row)"  size="small">查看</el-button>
             <!-- <el-button></el-button> <router-link :to="{ name:'add',params: {id: id} }">详情</router-link> -->
              <el-button type="text" size="small" @click="editCar(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteSite(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="stationEquip(scope.row)">站点设备</el-button>
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
    </div>
    <!-- 批量配置因子个数弹框 -->
    <el-dialog
      title="批量配置因子有效个数"
      :visible.sync="FacVisible"
      width="48%">
      <div class="person">
        <el-form ref="form" :model="form" label-width="210px" style="margin-left:20px">
          <el-form-item label="生成小时均值最小有效分钟个数" size="small" style="width:664px">
             <el-input type="number" v-model="form.name"></el-input>
          </el-form-item>
            <el-form-item label="生成日均值最小有效小时个数" size="small" style="width:664px">
             <el-input type="number" v-model="form.name"></el-input>
          </el-form-item>
            <el-form-item label="生成月均值最小有效日均值个数" size="small" style="width:664px">
             <el-input type="number" v-model="form.name"></el-input>
          </el-form-item>
            <el-form-item label="生成年均值最小有效日均值个数" size="small" style="width:664px">
             <el-input type="number" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="factor">
        <span class="t">因子:</span>
        <el-transfer 
            :data="FacList" 
            v-model="value"
            :titles="['列表1', '列表2']"
            >
        </el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="FacVisible = false">取 消</el-button>
      <el-button type="primary" @click="FacVisible = false" class="mr">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  
  data(){
    return {
      showCars:true,
      value:[],
      options:[],
      input: '',
      checked:false,
      Carstable: [],
      // 总数
      total:null,
      // 每页条数
      pageSize:5,
      // 页数
      pageNum: 1,

      addrules:{
        name: [
            { required: true, message: '请输入活动名称', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        checkpassword: [
            { required: true, message: '请再次输入密码', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        orgnization:[
            {required: true, message: '请选择组织', trigger: ['blur','change']},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      items: [],
      selected:0,
      // 批量配置因子个数
      FacVisible:false,
      FacList:[],
      value:[],
      form:{
        name:'',
        num: '',
       },
      mutiDevice:[],
    }
  },
  computed:{
   
  },
  created(){
  },
  mounted(){
      this.getCarstable()
  },
  watch: {
  //  "$route": {
  //     handler: function(val, oldVal){
  //       // console.log("路由变化了")
  //       var url = window.location.href;
  //       if(url.indexOf("carsadd")>=0){
  //         this.showCars=false
  //       }else{
  //         this.showCars=true
  //         this.getCarstable()
  //       }
  //     },
  //     // 深度观察监听
  //     deep: true
  //  }
  },
  methods:{
    // 获取表格
    getCarstable(){
      this.$XHR.post("/taxi/web/api/v1/site/getSites", 
         {
            "hasNotDevices": false,
            "pageNum": this.pageNum,
            "pageSize": this.pageSize,
            "siteNameOrAccessCode": "出租车"
          }
      ).then(res=>{
         if(res.status===200){
          // console.log(res)
          // console.log(res.data)
          // console.log(res.data.data.records)
          this.Carstable=res.data.data.records
          this.total=res.data.data.total
          this.pageSize=res.data.data.size
          this.pageNum=res.data.data.current
         }else{
           alert(res.data.message)
        }
      })
    },

    handleChange(value) {
        console.log(value);
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this. getCarstable()
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this. getCarstable()
        // console.log(`当前页: ${val}`);
    },
    handleSelectionChange(rows,row){
      let selected = rows.length
      this.selected=selected
        // console.log(rows)
      this.mutiDevice=rows
        console.log(this.mutiDevice)
        // console.log(selected)  // 1就是选中，0是取消选中
    },
    // 绑定站点设备
    ifChoose(){
      console.log("状态改变了")
    },
    // 点击新增按钮
    goAdd(){
      this.$router.push({name:'carsadd'})
    },
    // 表格里的查看
    tabAdd(row){
      console.log(row.siteId)
      this.$router.push({
        name: 'carsadd',
        query: {
          id:row.siteId,
          readonly: 'true',
        }
      });
    },
    // 删除
    deleteSite(row){
        this.$confirm('确定删除么？',"提示",{
          type:'warning'
         }).then(()=>{
              this.$XHR.delete(`/taxi/web/api/v1/site/delete/${row.siteId}`)
               .then(res=>{
                if(res.status===200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  if (this.Carstable.length === 1 && this.pagenum > 1) {
                    this.pagenum--
                  }
                  this.getCarstable()
                }else{
                  alert(res.data.message)
                }
               })
         }).catch(()=>{
            this.$message({
            type: 'info',
            message: '已取消删除'
           });
         })
    },

    // 表格里的编辑
    editCar(row){
      console.log(row.siteId)
      this.$router.push({
        name:'carsadd',
        query: {
          id:row.siteId,
          mode:[]
        }
      });
    },
    // 站点设备
    stationEquip(rows,row){
      var mutiDevice=[]
          mutiDevice.push(rows)
          this.mutiDevice=mutiDevice
      console.log("点击了站点设备",this.mutiDevice)
      this.$router.push({
        name: 'carsadd',
        query: {
          id:rows.siteId,
          // readonly:false
          mode:this.mutiDevice
        }
      });
    }
   },
  }
</script>
<style scoped>
  .cars{
    margin: 0 2%;
  }
  .title{
    height: 50px;
    position: relative;
    border-bottom: 1px solid #ece8e8;
    margin-bottom: 10px;
  }
  .btns{
    position: absolute;
    top: 10px;
    right: 0px;
  }
  h3{
    line-height: 50px;
    font-size: 16px;
    /* margin-left: 20px; */
  }
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }
  .el-cascader{
   margin-top: 15px;
   margin-bottom: 20px;
  }
  .el-dialog{
    position: relative;
  }
  .el-tag{
     margin-right: 10px;
  }
  .factor{
    margin-top: 60px;
    margin-left: 86px;
    position: relative;
  }
  .t{
    position: absolute;
    left: -45px;
  }
  .mr{
    margin-right: 45px;
  }
 
</style>