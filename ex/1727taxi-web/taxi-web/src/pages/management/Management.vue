<template>
  <div class="management">
    <el-container>
      <el-header style="height:32px">
        <div class="title">出租车走航后台管理系统</div>
         <div class="nav">
            <el-menu
            :default-active="onManageRoutes"
            class="el-menu-demo"
            mode="horizontal"
            router>
            <!-- <el-menu-item index="/management/users">用户管理</el-menu-item> -->
            <el-menu-item index="/management/cars">车辆管理</el-menu-item>
            <el-menu-item index="/management/equipment">设备管理</el-menu-item>
            <el-menu-item index="/management/factor">因子管理</el-menu-item>
            <el-menu-item index="/management/dictionary">字典管理</el-menu-item>
            <el-menu-item index="/management/warning">报警配置</el-menu-item>
            <el-menu-item index="/management/driver">司机信息配置</el-menu-item>
          </el-menu>
        </div>
        <!-- 左边登录头像 -->
        <!-- 二维码 -->
        <div class="weixin">
          下载移动端
        </div>
        <el-dropdown
          @command="handleCommand"
          trigger="click"
         >
          <span class="el-dropdown-link">
          <img class="logout" src="../../assets/person.jpg" alt="">
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">退出</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="d">用户管理</el-dropdown-item>
            <el-dropdown-item command="c">出租车走航监测平台</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> 
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name:'management',
  data () {
    return {
       onManageRoutes:"",

    }
  },
  //  computed:{
  //    onManageRoutes(){
  //      let path = this.$route.path.replace('/','');
  //        return path ? path : '/';
  //   }
  // },
  watch:{
    '$route':function(to,from){
      var activeArray=to.path.split('/',3)
      var active=activeArray.join('/')
      // console.log(active)
      this.onManageRoutes=active
    }
  },
  
  created(){
  },
  mounted() {
    this.onManageRoutes=this.$router.history.current.path.split('/',3).join('/')
  },
  methods:{
    handleCommand(command) {
      if(command == 'a'){
        this.$router.push({path:'/login'})
        this.$message('退出');
      }
      if(command == 'b'){
        this.$message('修改密码');
      }
      if(command == 'c'){
        this.$router.push({path:'/index'})
          // this.$message('出租车走航监测平台');
      }
      if(command == 'd'){
        // this.$router.push({path:'/index'})
          this.$message('用户管理');
      }
    },
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
      // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-container > .el-main{
     padding: 0;
   }
   .el-menu{
     background: #001529;
   }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
     background: #001529;
     color:#fff;
   }
  .el-container>.el-header {
    height :32px;
    line-height: 32px;
    position: relative;
    display: flex;
  }
  .nav {
    flex :1;
    height: 32px;
    display :flex;
    justify-content: center;
  }
  .el-menu--horizontal>.el-menu-item {
    background-color: #001529;
    color:rgba(255,255,255,1);
    height: 32px;
    font-size: 12px;
    line-height: 32px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown-menu{
    padding: 0;
  }
  .el-dropdown-menu__item{
    line-height:26px ;
  }
  .el-popper[x-placement^=bottom] {
    margin-top: -7px;
  }
  .el-container>.el-header {
    height :32px;
    line-height: 32px;
    position: relative;
    display: flex;
    background-image: url(../.././assets/背景.png);
   }
   .el-dropdown{
    position: absolute;
    right :16px;
    top :5px
   }
  .logout {
    width :24px;
    height: 24px;
    border-radius :50%;
   }
  .title {
    /* width :180px; */
    height :32px;
    font-size: 18px;
    position: absolute;
    padding-left: 30px;
    left: 0;
    color: #fff;
   }
  .el-submenu /deep/.el-submenu__title{
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #fff;
    border-bottom:none;
  }
  /* 二维码 */
  .weixin{
    position: absolute;
    right: 6px;
    width:112px;
    height:32px;
    opacity:0.05;
    font-size:14px;
    font-family:PingFangSC-Regular;
    line-height:14px;
    color:rgba(255,255,255,1);
    opacity:0.65;
    padding: 6px 10px;
    line-height: 20px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    line-height:32px!important;
    height:32px!important;
  }
</style>
