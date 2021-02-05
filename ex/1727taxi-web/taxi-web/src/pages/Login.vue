<template>
  <div class="login">
     <div class="form">
       <h2>出租车走航系统</h2>
       <el-form 
         ref="form" 
        :model="form" 
        :rules="rules"
        :label-position="labelPosition">
         <el-form-item  prop="username" >
          <el-input v-model="form.name"  placeholder="请输入用户名"></el-input>
         </el-form-item>
         <el-form-item  prop="password">
            <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
       </el-form>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition:"left",
      form: {
          username: '',
          password:''
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger:  ['blur', 'change']},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change']},
          { min: 3, max: 5, message: '长度在 8 到 16 个字符', trigger:  ['blur', 'change'] }
        ],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
           alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
    }
}
</script>
<style  scoped>
  .login{
    width: 100%;
    height: 800px;
    background-color: #cffaf1;
    position: relative;
  }
  .form{
    position: absolute;
    width: 300px;
    height: 300px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* margin: 110px auto; */
    background-color: #e6fdcc;
    text-align: center;
    padding: 0 30px;
    border-radius: 4px;
  }
   .form>h2{
     color: #20f0f0;
     line-height: 60px;
   }
  .el-button+.el-button {
    margin-left: 35px;
  }

</style>
