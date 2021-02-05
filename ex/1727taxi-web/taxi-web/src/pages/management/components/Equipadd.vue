<template>
<div class="equipadd">
   <div class="top">
       <el-page-header @back="goBack" content="设备管理"></el-page-header>
    </div>
    <div class="bottom">
      <el-form :model="addform"  :disabled="flag" :rules="rules" ref="addform" label-width="400px" class="demo-addform">
        <el-form-item label="设备型号" prop="deviceName" >
          <el-input v-model="addform.deviceName" style="width:400px" size="small"></el-input>
        </el-form-item>
         <el-form-item label="设备编码" prop="deviceCode" >
          <el-input v-model="addform.deviceCode" style="width:400px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceTypeId">
          <el-select v-model="addform.deviceTypeId" placeholder="请选择设备类型" style="width:400px" size="small">
            <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="生产厂商" prop="conpany" >
          <el-input v-model="addform.conpany" style="width:400px" size="small"></el-input>
        </el-form-item>
         <el-form-item label="原始数据频率(min)" prop="realdataCycle" >
          <el-input v-model="addform.realdataCycle" style="width:400px" size="small"></el-input>
        </el-form-item>
         <!-- <el-form-item label="生成小时数据最小有效分钟数据个数" prop="minEffectRecord" >
          <el-input v-model="addform.minEffectRecord" style="width:400px" size="small"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"  @click="serveEquip()" size="small" style="margin-left:274px">保存</el-button>
          <el-button @click="resetForm('addform')" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</div>

</template>
<script>
export default {
  data(){
    return{
      addform: {
        deviceName: '',
        deviceCode: '',
        deviceTypeId: '',
        conpany: '',
        realdataCycle: '',
      },
      options:[],
      rules:{
        deviceName: [
          { required: true, message: '请输入设备型号', trigger:[ 'blur','change']},
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur','change']}
        ],
        deviceCode: [
          { required: true, message: '请输入设备编码', trigger:[ 'blur','change']},
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur','change']}
        ],
        deviceTypeId:[
          { required: true, message: '请选择设备类型', trigger:  ['blur','change']},
        ],
        realdataCycle: [
          { required: true, message: '请输入原始数据频率', trigger:[ 'blur','change']},
        ],
     
      },
      // 点击查看的id
      readId:'',
      flag:false,
      val:true,
    }
  },
  created(){
    var readonly,id,edit
    id=this.$route.query.id
    readonly=this.$route.query.readonly
    this.readId=id
    if(readonly){
      // console.log("点击了查看")
      this.getaddForm()
      this.flag=true
    }
    else if(!readonly){
      // console.log("点击了编辑")
      this.getaddForm()
      this.editform=this.addform
    }
    else{
      return false
    }
  },
  mounted(){
    this.getSelect()
  },
  methods:{
    goBack(){
      this.$router.push({name:'equipment'})
    },
    // 获取设备类型下拉框
    getSelect(){
      this.$XHR.get(`/taxi/web/api/v1/dicts/device-types`)
      .then(res=>{
          if(res.status===200){
            // console.log(res.data.data)
            // console.log(res.data.data.entries)
            this.options=res.data.data.entries
          }else{
            alert(res.data.message)
          }
        })
    },
    // 获取addform
    getaddForm(){
      this.$XHR.get(`/taxi/web/api/v1/device/get/`+this.readId)
      .then(res=>{
        if(res.status==200){
          this.addform=res.data.data
        }else{
          alert(res.data.message)
        }
      })
    },
    // 判断是编辑还是新增

     
    // 点击编辑里的保存，进行更新
    // upData(){
    // },
    // 保存
    serveEquip() {
       var val=true
        if(val){
        console.log("这是新增")
        this.val=false
        console.log(this.val)
        this.$router.push({name:"equipment"})
      }
      else{
       console.log("这是编辑")
        //  this.val=false
         this.$router.push({name:"equipment"})

      }
      // this.$refs.addform.validate((valid) => {
      //   if (valid) {
      //     this.$XHR.post('/taxi/web/api/v1/device/addDevice',
      //     {
      //       "company": this.addform.conpany,
      //       "deviceCode": this.addform.deviceCode,
      //       "deviceName": this.addform.deviceName,
      //       "deviceTypeId":this.addform.deviceTypeId,
      //       "minEffectRecord": "",
      //       "pollutantCodes": "",
      //       "realdataCycle": this.addform.realdataCycle
      //     }).then(res=>{
      //       // console.log(res)
      //       this.$router.push({name:"equipment"})
      //     })
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style  scoped>
  .top{
    height: 50px;
    /* line-height: 50px; */
    /* padding-top: 15px; */
    /* padding-left: 15px; */
    border-bottom: 1px solid #ece8e8;
  }
  .el-page-header{
    line-height: 50px;
  }
  .bottom{
    /* position: relative; */
    margin-top: 50px;
  }
  .el-form{
    top: 30px;
    left: 100px;
  }
</style>