<template>
  <div class="online">
    <div class="search">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        suffix-icon="el-icon-search"
      ></el-autocomplete>
      <el-dropdown  @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <el-button type="primary" plain="" icon="el-icon-folder" class="choose">杭州</el-button>
        </span>
        <el-dropdown-menu style="width:180px" slot="dropdown">
          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right">
      <div class="top">
        <h3>在线率</h3>
      </div>
      <div class="bot">
        <div class="inputs">
          <span>数据类型：</span>
          <el-select  @change="oopp" size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>时间:</span>
          <el-date-picker v-if="hour"
            size="small"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
          <el-date-picker v-if="day"
            size="small"
            v-model="value2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button-group v-if="day" style="margin-left:10px">
            <el-button type="primary" size="small" class="date" plain>今天</el-button>
            <el-button type="primary" size="small" class="date" plain>昨天</el-button>
          </el-button-group>
          <el-button-group style="float:right">
            <el-button class="check" size="small" icon="el-icon-s-grid"></el-button>
            <el-button class="check" size="small" icon="el-icon-s-data"></el-button>
          </el-button-group>
       </div>
       <div class="onlinetable" v-if="table">
          <el-table
            :data="tableData"
            :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180px"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              align="center">
            </el-table-column>
             <el-table-column
              prop="date"
              label="日期"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              align="center">
            </el-table-column>
             <el-table-column
              prop="date"
              label="日期"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
             align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              align="center">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
       </div>
       <div class="echart" v-if="echart">
          <mylineecharts></mylineecharts>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import mylineecharts from './components/onEchart'

export default {
   components:{
    mylineecharts:mylineecharts,
  },
  data() {
    return {
      input:'',
      hour:false,
      day:true,
      table:false,
      echart:true,
      options:[
        {
          value:1,
          label:"小时"
       },
       {
          value:2,
          label:"天"
       }
      ],
      value:2,
      value1:'',
      value2:'',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
       }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
       }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
       }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      restaurants: [],
      state: '',
      timeout:  null,
      currentPage4:""
    }
  },
  created(){
    //  if(this.value==1){
    //     this.hour=true
    //     this.day=false
    //     this.value=2
    //  }
    //  else{
    //     this.value=1
    //     this.hour=false
    //     this.day=true
    //  }
  },
  mounted() {
      this.restaurants = this.loadAll();
    },
  methods:{
    oopp(){
      console.log('我切换了选项')
      if(this.day){
        this.day = false
        this.hour = true
      console.log('day',this.day)
      console.log('hour',this.hour)
        return
      }
      if(this.hour){
        this.day = true
        this.hour = false
      console.log('day',this.day)
      console.log('hour',this.hour)
        return
      }
    },
    loadAll() {
      return [
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleCommand(command) {
        this.$message('click on item ' + command);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }

  }
}
</script>

<style scoped>
  /* .online{ */
    /* box-sizing: border-box; */
  /* } */
  .search{
    float: left;
    position: fixed;;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    margin-right: 20px;
    margin-top: 32px;
    border-right: 1px solid #eeecec;
    padding-top: 10px;
    padding-left: 10px;
    box-sizing: border-box;

  }
  .el-autocomplete{
    width: 180px;
  }
  .choose{
     width: 180px;
     margin-top: 2px;
  }
  .check{
    /* float: right; */
    border:none;
  }
  .el-button-group{
    /* box-sizing: border-box; */
    height: 31px;
    line-height: 31px;
  }
  .date{
    height: 31px;
  }
  .right{
      margin: 0 2%;
      /* margin-left: 20px; */
      padding-left: 180px;
  }
  .top{
    height: 50px;
    line-height: 50;
    border-bottom: 1px solid #eeecec;
  }
  .inputs{
    margin-top: 20px;

  }
  .onlinetable{
    height: 500px;
    margin-top: 20px;
    /* background-color: pink; */
  }
  .el-pagination{
    float: right;
    margin-top: 15px;
  }
  .echart{
    height: 616px;
    margin-top: 20px;
    /* background-color: skyblue; */
  }
  h3{
    line-height: 50px;
    font-size: 16px;

  }
  .el-input{
    width: 220px;
  }
  .el-select{
    margin-right: 10px;
  }
  .el-checkbox-group{
    margin-left: 15px;
    display: inline-block;
  }
</style>