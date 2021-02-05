<template>
  <div class="vehicle-alarm-content">
    <div class="vehicle-alarm-top-content">
      <div class="vehicle-alarm-title-box">
        车辆报警
      </div>
      <div class="vehicle-alarm-query-box clear-float">
        <div class="usual-query-div vehicle-alarm-tabs">
          <el-radio-group v-model="choicetab" size="small" @change="changeTab">
            <el-radio-button v-for="item in this.tabsArray" :key="item.id" :label="item.name"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="usual-query-div vehicle-alarm-time">
           <el-date-picker
             v-model="choicetime"
             type="date"
             value-format="yyyy-MM-dd"
             format="yyyy-MM-dd"
             placeholder="选择日期"
             @change="changeTime"
           >
           </el-date-picker>
        </div>
        <div class="usual-query-div vehicle-alarm-car-number">
          <div class="vehicle-alarm-search-icon-box">
            <i class="vehicle-alarm-search-icon el-icon-search"></i>
          </div>
          <el-input v-model="choiceKey"></el-input>
        </div>
      </div>
    </div>

    <div class="vehicle-alarm-main-content">
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import FactorLimit from './components/FactorLimit'
import EquipmentFailure from './components/EquipmentFailure'
export default {
  name: 'VehicleAlarm',
  components: {
    FactorLimit,
    EquipmentFailure
  },
  data () {
    return {
      input:'',
      tabsArray: [{id:'1',name:'因子超标'},{id:'2',name:'设备故障'}],
      choicetab: '因子超标',
      choicetime: '',
      choiceKey: '',
      tabs: ['factor-limit','equipment-failure'],
      needTabName: 'factor-limit'
    }
  },
  computed: {
    currentTabComponent () {
      console.log("ha see")
      return this.needTabName
    }
  },
  methods: {
    search () {
      console.log('车牌号')
    },
    changeTab () {
      if (this.choicetab == '因子超标') {
        this.needTabName = 'factor-limit'
      } else if (this.choicetab == '设备故障') {
        this.needTabName = 'equipment-failure'
      } else {}
    },
    changeTime () {
      console.log(this.choicetime)
    },
    showTest (val) {
      console.log(val)
    }
  },
  mounted () {
    this.showTest('父组件-----------')
  }
}
</script>

<style scoped>
  .vehicle-alarm-content{
    margin: 0 2%;
  }

  .vehicle-alarm-title-box{
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    color: #303133;
    font-weight: 400;
    border-bottom: 1px solid #E4E7ED;
  }

  .vehicle-alarm-query-box{
    height: 65px;
    line-height: 65px;
    overflow: hidden;
  }

  .usual-query-div{
    position: relative;
    float: left;
    margin-right: 20px;
  }

  .vehicle-alarm-query-box >>> .vehicle-alarm-time .el-date-editor .el-input__inner{
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
  }

   .vehicle-alarm-query-box >>> .vehicle-alarm-car-number .el-input .el-input__inner{
     width: 220px;
     height: 32px;
     line-height: 32px;
     border-radius: 4px;
     padding-right: 32px;
   }

  /*修复elementUI icon的1px误差（所在容器设置了line-height后，icon会使容器的父元素多高出1px）*/
  /*.vehicle-alarm-query-box >>> .usual-query-div .el-date-editor .el-input__prefix{
    height: auto;
  }*/

  .vehicle-alarm-search-icon-box{
    position: absolute;
    top: 18px;
    right: 0;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    z-index: 1;
  }

  .vehicle-alarm-search-icon{
    height: 16px;
  }
</style> 
