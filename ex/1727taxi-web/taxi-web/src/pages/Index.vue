<template>
    <el-container>
      <el-header style="height:32px">
        <div class="title">出租车走航系统</div>
        <div class="nav">
          <el-menu
            :default-active="onRoutes"
            class="el-menu-demo"
            mode="horizontal"
            router>
            <el-menu-item index="nowdata">实时数据</el-menu-item>
            <el-menu-item index="pollutionmap">污染云图</el-menu-item>
            <el-menu-item index="vehiclealarm">车辆报警</el-menu-item>
            <el-menu-item index="online">在线率</el-menu-item>
            <el-menu-item index="teamviewer">远程控制</el-menu-item>
          </el-menu>
        </div>
        <!-- 左边登录头像 -->
        <div class="weixin">
          下载移动端
        </div>
        <el-dropdown
          @command="handleCommand"
          trigger="click"
         >
          <span class="el-dropdown-link">
          <img class="logout" src="../assets/person.jpg" alt="">
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">退出</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="c">后台管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {}
  },
  computed: {
    onRoutes () {
      let path = this.$route.path.replace('/','');
      return path ? path : '/';
    }
  },
  methods:{
    handleCommand(command) {
      if(command == 'a'){
        console.log("退出")
        this.$router.push({path:'login'})
        this.$message('退出');
        }
      if(command == 'b'){
        console.log("修改密码")
        // this.$message('修改密码');
      }
      if(command == 'c'){
        this.$router.push({path:'/management/cars'})
        // console.log("去后台管理")
        // this.$message('后台管理');
      }
    }
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-container > .el-main{
    padding: 0;
  }
  .el-header{
    position: relative;
    background-image: url(.././assets/背景.png);
    height :32px;
    line-height: 32px;
    display: flex;
    padding: 0 12px;
  }
  .el-menu{
    background: #001529;
     /* color:#ccc; */
   }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background: #001529;
    color:#fff;
   }

  .el-menu--horizontal>.el-menu-item.is-active{
    color:#fff;
  }
  
  .logout {
    width :24px;
    height: 24px;
    background-color: black;
    border-radius: 50%;
    margin: 4px 0;
   }

  .title {
    width: 180px;
    height: 32px;
    font-size: 18px;
    color: #fff;
    /* background-color: blanchedalmond */
   }

  .nav {
    flex: 1;
    height: 32px;
    display: flex;
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
    margin-top: 0px;
  }

  /* 二维码 */
  .weixin{
    width:112px;
    height:32px;
    /* background:rgba(255,255,255,1); */
    opacity:0.05;
    font-size:14px;
    font-family:PingFangSC-Regular;
    line-height:14px;
    color:rgba(255,255,255,1);
    opacity:0.65;
    padding: 6px 0;
    margin-right: 30px;
    box-sizing: border-box;
    line-height: 20px;
  }
</style>
