<template>
   <div class="carsadd">
     <div class="top">
       <el-page-header @back="goBack" content="车辆管理"></el-page-header>
        <!-- 标签页 -->
        <el-button-group v-if="showbtns">
          <el-button 
            v-if="stationBtn"
            :type="button==='button1'?'primary' :''"  
            size="mini" @click="baseInfo('button1')">基本信息</el-button>
          <el-button   
            size="mini"  
            :type="button==='button2'?'primary' :''"  @click="equip('button2')">设备管理</el-button>
          <el-button  
            size="mini" 
            :type="button==='button3'?'primary' :''" 
            @click="Fac('button3')">设备因子列表</el-button>
        </el-button-group>
     </div>
     <div class="bottom" v-if='showone'>
       <div class="inputs">
         <el-form :model="addForm" :disabled="flag" :rules="rules" :label-position="labelPosition" ref="addForm" label-width="150px" class="demo-ruleForm">
            <el-form-item  label="站点名称" prop="siteName" >
              <el-input v-model="addForm.siteName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="接入编码" prop="accessCode">
              <el-input v-model="addForm.accessCode" size="small"></el-input>
            </el-form-item>
             <el-form-item label="车牌号码" prop="license">
              <el-input v-model="addForm.license" size="small"></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-input v-model="addForm.company" size="small"></el-input>
            </el-form-item>
            <el-form-item label="站点设备类型" class="addinput" size="small" prop="deviceTypeId" label-width="150px">
              <el-select  v-model="addForm.deviceTypeId" placeholder="请选择站点设备类型"  style="width:330px">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" size="small" class="serve" @click="addSite()">保存</el-button>
              <el-button size="small">取消</el-button>
            </el-form-item>
          </el-form>
       </div>
     </div>
     <!-- 设备管理的表格 -->
     <div class="equipTable" v-if="showtwo">
       <el-button type="success" class="equipAdd" size="small" plain @click="getModel(),getUnit()">新增</el-button>
       <el-table
          :data="equipTable"
          style="width: 99%"
          :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
          border>
          <el-table-column
            width="180"
            prop="deviceName"
            align="center"
            label="设备型号">
          </el-table-column>
          <el-table-column
            prop="siteDeviceName"
            label="设备名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="methodPrinciple"
            label="方法原理"
            align="center">
          </el-table-column>
          <el-table-column
            prop="manufacturer"
            label="生产厂商"
            align="center">
          </el-table-column>
          <el-table-column
            prop="installDate"
            label="安装日期"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180"
            >
            <template slot-scope="scope">
            <el-button type="text" size="small" @click="editForm(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delForm(scope.row)">删除</el-button>
            </template>
          </el-table-column>
       </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChangeOne"
            @current-change="handleCurrentChangeOne"
            :current-page="pageNumOne"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSizeOne"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalOne">
        </el-pagination>
       <!-- 点击设备管理里新增的弹框 -->
       <el-dialog title="新增站点设备" :visible.sync="addFormVisible">
          <el-form :model="addform" :inline="true" :rules="formrules" ref="form">
            <el-form-item label="设备型号" class="addinput"  prop="deviceId" :label-width="formLabelWidth">
              <el-select  v-model="addform.deviceId" placeholder="设备型号"  style="width:220px">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addform.name" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号" :label-width="formLabelWidth">
              <el-input v-model="addform.productNumber" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="成产厂商" :label-width="formLabelWidth">
              <el-input v-model="addform.manufacturter" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
             <el-form-item label="出厂日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="addform.productDate" style="width:220px"></el-date-picker>
            </el-form-item>
             <el-form-item label="安装日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="addform.installDate" style="width:220px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="方法原理" :label-width="formLabelWidth">
              <el-input v-model="addform.methodPrinciple" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
             <el-form-item label="计量单位" class="addinput"  prop="unit" :label-width="formLabelWidth">
              <el-select  v-model="addform.unit" placeholder="计量单位"  style="width:220px">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计量范围" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input-number v-model="addform.measureLow" :min="0" controls-position="right" autocomplete="off"></el-input-number>
              </el-col>
              <el-col class="line" :span="1">&nbsp&nbsp&nbsp-&nbsp</el-col>
              <el-col :span="8">
                <el-input-number v-model="addform.measureUp" :min="1" controls-position="right" autocomplete="off"></el-input-number>
              </el-col>
              <span>（最小量程-最大量程）</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addEquip()">确 定</el-button>
          </div>
      </el-dialog>
      <!-- 点击编辑的弹框 -->
      <el-dialog title="编辑站点设备" :visible.sync="editFormVisible">
          <el-form :model="editform" :inline="true" :rules="formrules" ref="form">
            <el-form-item label="设备型号" class="addinput"  prop="deviceId" :label-width="formLabelWidth">
              <el-select  v-model="editform.deviceId" placeholder="设备型号"  style="width:220px">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="editform.name" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号" :label-width="formLabelWidth">
              <el-input v-model="editform.productNumber" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="成产厂商" :label-width="formLabelWidth">
              <el-input v-model="editform.manufacturter" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
             <el-form-item label="出厂日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择日期" v-model="editform.productDate" style="width:220px"></el-date-picker>
            </el-form-item>
             <el-form-item label="安装日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择日期" v-model="editform.installDate" style="width:;"></el-date-picker>
            </el-form-item>
            <el-form-item label="方法原理" :label-width="formLabelWidth">
              <el-input v-model="editform.methodPrinciple" autocomplete="off" style="width:220px"></el-input>
            </el-form-item>
             <el-form-item label="计量单位" class="addinput"  prop="unit" :label-width="formLabelWidth">
              <el-select  v-model="editform.unit" placeholder="计量单位"  style="width:220px">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计量范围" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input-number v-model="editform.measureLow" :min="0" controls-position="right" autocomplete="off"></el-input-number>
              </el-col>
              <el-col class="line" :span="1">&nbsp&nbsp&nbsp-&nbsp</el-col>
              <el-col :span="8">
                <el-input-number v-model="editform.measureUp" :min="1" controls-position="right" autocomplete="off"></el-input-number>
              </el-col>
              <span>（最小量程-最大量程）</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editEquip()">确 定</el-button>
          </div>
      </el-dialog>
     </div>
     <!-- 设备因子列表 -->
     <div class="FacTable" v-if="showthree">
        <el-input
          placeholder="请输入因子编码或名称"
          prefix-icon="el-icon-search"
          style='width:220px;margin-top:15px;margin-left:10px'
          size="small"
          v-model="input2">
        </el-input>
        <el-table
          :data="equipTable"
          style="width: 99%;margin-left:10px;margin-top:15px"
          :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
            border
            >
          <el-table-column
            align="center"
            prop="pollutantName"
            label="因子名称">
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
            label="转换单位"
            prop="tranUnit"
            align="center"
            width="180">
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
        </el-table>
        <!-- 分页 -->
         <el-pagination
            @size-change="handleSizeChangeTwo"
            @current-change="handleCurrentChangeTwo"
            :current-page="pageNumTwo"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSizeTwo"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalTwo">
         </el-pagination>
     </div>
   </div>
</template>
<script>

import MapLoader from '../../../assets/js/Amap'
export default {
  data(){
    return{
      labelPosition:'right',
      activeName: 'first',
      showbtns:false,
      showone:true,
      showtwo:false,
      showthree:false,
      showfour:false,
      stationBtn:true,
      button:"button1",
      input2:"",
      input3:'',
      addForm: {
        siteName: '',
        accessCode: '',
        license:"",
        company:"",
        deviceTypeId: ''
      },
      flag:false,
      options:[],
      options2:[],
      value:"",
      // 点击查看的id
      readId:null,
      rules: {
        siteName: [
          { required: true, message: '请输入站点名称', trigger: ['blur','change'] },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur','change']}
        ],
        accessCode: [
          { required: true, message: '请输入接入编码', trigger:  ['blur','change']},
          { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: ['blur','change']}
        ],
        license:[
          { required: true, message: '请输入车牌号码', trigger:  ['blur','change']},
        ],
        deviceTypeId:[
          { required: true, message: '请选择站点设备类型', trigger:  ['blur','change']},
        ]
      },
      // 设备管理表格
      equipTable: [],
      pageSizeOne:2,
      pageNumOne: 1,
      totalOne:null,
      pageNumTwo:1,
      pageSizeTwo:2,
      totalTwo:null,
      // 设备管理点击新增的弹框
      addFormVisible: false,
      // 点击设备管理编辑的弹框
      editFormVisible: false,
      editId:null,
      addform: {
        deviceId: '',
        installDate:"", //安装日期
        manufacturer: "",  //出厂编号
        measureLow:'', //最小量程
        measureUp: '', //最大量程
        methodPrinciple: "", //方法原理
        name: "",     //设备名称
        productDate:"", //出厂日期
        productNumber: "",
        siteId:"",
        unit: ""
      },
      editform: {
        deviceId: '',
        installDate: "", //安装日期
        manufacturer: "",  //出厂编号
        measureLow:'', //最小量程
        measureUp: '', //最大量程
        methodPrinciple: "", //方法原理
        name: "",     //设备名称
        productDate: "", //出厂日期
        productNumber: "",
        siteId:"",
        unit: ""
      },
      formrules:{
          name: [
            { required: true, message: '请输入设备名称', trigger:  ['blur','change']},
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur','change'] }
          ],
          deviceId: [
            {required: true, message: '请选择设备型号', trigger: ['blur','change'] },
          ],
      },
      formLabelWidth: '120px',
      // 分页
      items:[],
    }
  },
  created() {
      var id,readonly,mode
      id = this.$route.query.id,  //接受参数关键代码
      // console.log(id)
      readonly=this.$route.query.readonly
      this.readId=id

      // console.log(url)
      mode=this.$route.query.mode
      //  this.items=mode
      if(id&&readonly) {
        //  console.log("点击查看按钮")
         this.showbtns=true
         this.flag=true
         this.getaAddFoem()
      }  
      else if(id&&mode==""){
        // console.log("点击了编辑按钮")
        this.getaAddFoem()
      }
      else if(id&&mode!=""){
        this.showbtns=true
        this.stationBtn=false
        this.showone=false
        this.showtwo=true
        this.button='button2';
        this.getStation()
      }
      else{
       return false
      }
  },
  mounted(){
    this. getSelect()
  },
  methods:{
    goBack() {
      this.$router.push({name:'cars'})
    },
    // 获取addForm
    getaAddFoem(){
      this.$XHR.get(`/taxi/web/api/v1/site/getSite/`+this.readId)
      .then(res=>{
        if(res.status===200){
          // console.log(res)
          this.addForm=res.data.data
        }else{
          alert(res.data.message)
        }
      })
    },
    // 新增里获取下拉框
    getSelect() {
      this.$XHR.get(`/taxi/web/api/v1/dicts/site-device-types`)
      .then(res=>{
          if(res.status===200){
            // console.log(res)
            console.log(res.data.data.entries)
            this.options=res.data.data.entries
          }else{
            alert(res.data.message)
          }
        })
    },
    // 点击新增的保存
    addSite() {
      this.$refs.addForm.validate((valid)=>{
        if(valid){
          this.$XHR.post(`/taxi/web/api/v1/site/addSite`,
            {
              "accessCode":this.addForm.accessCode,
              "deviceTypeId":this.addForm.deviceTypeId,
              "siteName" :this.addForm.siteName,
              "license":this.addForm.license,
              "company":this.addForm.company
            }
            ).then(res=>{
              if(res.status===200){
                  this.$message.success('添加成功')
                  this.$router.push({path:'/management/cars'})
                  console.log(res)
              }else{
                alert(res.data.message)
              }
            })
        }else{
            console.log('error submit!!');
            return false;
        }
       
      })
    },
    // 判断是新增还是编辑
    // ifAdd(){
    //   let flag=true
    //   if(flag){

    //   }
    // },
    // 点击编辑的保存
    updata(){

    },
    // 点击站点设备
    getStation() {
       this.$XHR.get(`/taxi/web/api/v1/site-devices/getSiteDevices/`,
         {params:{
            "siteId":this.readId,
            "pageNum": this.pageNumOne,
            "pageSize": this.pageSizeOne,
          }}
        )
        .then(res=>{
           if(res.status===200){
            // console.log(res)
            // console.log("执行了设备管理")
            // console.log(res.data.data.records)
            this.equipTable=res.data.data.records
            // let code=res.data.data.records.map((item)=>{
            //   return item.siteDeviceName
            // })
            // console.log(code)
            this.totalOne=res.data.data.total
            this.pageNumOne=res.data.data.current
            // console.log(this.pageNum)
            this.pageSizeOne=res.data.data.size
          }else{
            alert(res.data.message)
          }
        })
    },
    //基本信息按钮 
    baseInfo(val) {
        this.showone=true
        this.showtwo=false
        this.showthree=false
        this.button=val;
    },
    // 设备管理按钮
    equip(val){
        // console.log("这是设备管理")
        this.showone=false
        this.showtwo=true
        this.showthree=false
        this.button="button2";
        // console.log(this.readId)
        this.$XHR.get(`/taxi/web/api/v1/site-devices/getSiteDevices/`,
         {params:{
            "siteId":this.readId,
            "pageNum": this.pageNumOne,
            "pageSize": this.pageSizeOne,
          }}
        )
        .then(res=>{
           if(res.status===200){
            // console.log(res)
            // console.log("执行了设备管理")
            // console.log(res.data.data.records)
            this.equipTable=res.data.data.records
            // let code=res.data.data.records.map((item)=>{
            //   return item.siteDeviceName
            // })
            // console.log(code)
            this.totalOne=res.data.data.total
            this.pageNumOne=res.data.data.current
            // console.log(this.pageNum)
            this.pageSizeOne=res.data.data.size
          }else{
            alert(res.data.message)
          }
        })
    },
    // 获取设备类型
    getModel() {
     this.addFormVisible=true
     this.$XHR.get('/taxi/web/api/v1/device/getDevices/',
      { params: {
        "pageNumber":this.pageNum,
        "pageSize":this.pageSize
      }}
     ).then(res=>{
       if(res.status==200){
         console.log(res)
        //  this.options2=res.data.data.entries
       }else{
         alert(res.data.message)
       }
     })

    },
    // 获取计量单位
    getUnit() {
      console.log("获取单位")
        this.addFormVisible=true
        this.$XHR.get('/taxi/web/api/v1/dicts/units/'
        ).then(res=>{
          if(res.status==200){
            // console.log(res)
          //  console.log(res.data.data.entries)
           this.options2=res.data.data.entries
          }else{
            alert(res.data.message)
          }
        })
    },
    // 设备管理里的新增
    addEquip() {
        // console.log("这是设备管理的新增")
        console.log(this.addform.installDate)
        this.$refs.form.validate((valid)=>{
        if(valid){
            this.addFormVisible=false
            this.$XHR.post('/taxi/web/api/v1/site-devices/addSiteDevice/',
            {
              "deviceId":this.addform.deviceId,
              "installDate":this.addform.installDate, //安装日期
              "manufacturer":this.addform.manufacturer,  //出厂编号
              "measureLow":this.addform.measureLow, //最小量程
              "measureUp":this.addform.measureUp, //最大量程
              "methodPrinciple":this.addform.methodPrinciple, //方法原理
              "name": this.addform.name,     //设备名称
              "productDate":this.addform.productDate, //出厂日期
              "productNumber":this.addform.productNumber,
              "siteId": this.readId,
              "unit":this.addform.unit
            }
            ).then(res=>{
              if(res.status==200){
                // console.log(res)
                this.equip()
                this.button="button2"
               this.$refs.form.resetFields()
              }else{
                alert(res.data.message)
                this.addFormVisible=true
              }
            })
        }
        else{
          console.log('error submit!!');
          return false
        }
       })
    
    },
    // 设备管理编辑
    editForm(row) {
      this.editFormVisible=true
      // $ /taxi/web/api/v1/site-devices/get/{id}
      this.$XHR.get(`/taxi/web/api/v1/site-devices/get/${row.siteDeviceId}`)
      .then(res=>{
          if(res.status==200){
            console.log(res)
            // console.log(res.data.data)
            this.editform=res.data.data
            this.editId=row.siteDeviceId
          }
          else{
            alert(res.data.message)
          }
      })
    },
    // 设备管理编辑编辑里的确定
    editEquip() {
      console.log("编辑里的确定")
      // console.log( this.editId)
      this.$refs.form.validate((valid)=>{
        if(valid){
            this.editFormVisible=false
            this.$XHR.post(`/taxi/web/api/v1/site-devices/update/`+this.editId,
            {
              "deviceId":this.editform.deviceId,
              "installDate": this.editform.installDate, //安装日期
              "manufacturer": this.editform.manufacturer,  //出厂编号
              "measureLow":this.editform.measureLow, //最小量程
              "measureUp":this.editform.measureUp, //最大量程
              "methodPrinciple":this.editform.methodPrinciple, //方法原理
              "name": this.editform.name,     //设备名称
              "productDate":this.editform.productDate, //出厂日期
              "productNumber":this.editform.productNumber,
              "siteId": this.readId,
              "unit":this.editform.unit
            }
            ).then(res=>{
              if(res.status==200){
                console.log(res)
                this.equip()
                this.button="button2"
              }else{
                alert(res.data.message)
                this.editFormVisible=true
              }
            })
        }
        else{
          console.log('error submit!!');
          return false
        }
      })
    },
    // 设备列表里的删除
    delForm(row) {
      console.log(row.siteDeviceId)
      this.$confirm('确定删除么？',"提示",{
            type:'warning',
        }).then(()=>{
          // console.log("删除么")
          this.$XHR.delete(`/taxi/web/api/v1/site-devices/delete/${row.siteDeviceId}`)
          .then(res=>{
            if(res.status===200){
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
                    
              if (this.equipTable.length === 1 && this.pagenum > 1) {
                this.pagenum--
              }
              this.equip()
            }else{
              alert(res.data.message)
            }
          })
        }).catch(()=>{
           this.$message({
            type: 'info',
            message: '已取消删除',
          }); 
      })
    },
    // 设备因子列表按钮
    Fac(val) {
        this.showone=false
        this.showtwo=false
        this.showthree=true
        this.button="button3";
        console.log(this.readId)
        this.$XHR.get(`/taxi/web/api/v1/site-devices/getSiteDevicePollutant/`,
         {params:{
            "siteId":this.readId,
            "pageNum": this.pageNumTwo,
            "pageSize": this.pageSizeTwo,
            "nameOrCode":""
          }}
        )
        .then(res=>{
           if(res.status===200){
            console.log(res)
            // this.equipTable=res.data.data.records
            // this.total=res.data.data.total
            // this.pageNum=res.data.data.current
            // this.pageSize=res.data.data.size

          }else{
             alert(res.data.message)
          }
        })
    },
    // 分页
    handleSizeChangeOne(val) {
        console.log(`每页 ${val} 条`);
        this.pageSizeOne = val
        // console.log(this.pageSize)
        this.pageNumOne = 1
        this.equip()
    },
    handleCurrentChangeOne(val) {
        // console.log(`当前页: ${val}`);
        this.pageNumOne = val
        this.equip()
    },
    handleSizeChangeTwo(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        // console.log( this.pageSize)
        this.pageNum = 1
        this.Fac()
    },
    handleCurrentChangeTwo(val) {
        // console.log(`当前页: ${val}`);
        this.pageNum = val
        this.Fac()
    },
  }
}
</script>
<style  scoped>
  .carsadd{
    height: 100%;
    margin: 0 2%;
  }
  .top{
    height: 50px;
    line-height: 50px;
    /* padding-top: 15px; */
    /* padding-left: 15px; */
    border-bottom: 1px solid #ece8e8;
    position: relative;
  }
  .el-button-group{
    position: absolute;
    top: 12px;
    left:200px;
  }
  .el-page-header{
    line-height: 50px;
  }
  .el-tabs{
    position: absolute;
    top: 0px;
    left:210px;
    height: 560px;
  }
  .el-tabs__item{
    height: 56px!important;
    line-height: 54px!important;
  }
  .bottom{
    margin-top: 15px;
  }
  .equipTable{
    overflow: hidden;
    margin-left: 10px;
    margin-top: 15px;
  }
  .equipAdd{
    float: right;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }
  .inputs{
    position: absolute;
    width: 500px;
    padding-right: 20px;
    left: 50%;
    transform: translate(-100%);
    box-sizing: border-box;
  }
  .serve{
    margin-left: 200px;
  }
  .map{
    height: 31px;
    margin-left: 10px;
  }
 
  /* 批量新增标签 */
  .batchperson{
    width: 100%;
    height: 60px;
    overflow: hidden;
  }
  .batchAdd{
    float:right;
    margin-top: 10px;
    margin-right: 20px;
  }
  .batchTable{
    overflow: hidden;
    margin-left: 10px;
  }
  
</style>