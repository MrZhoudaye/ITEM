<template>
  <div class="pollution  clearfix">
    <div class="choose  clearfix" style="z-index:1000">
      <!-- 时间选择 -->
      <el-select
        v-model="changeTimeValue"
        size='mini'
        style="margin-left: 20px;width:112px;z-index:999"
        @change="changeTimeFun(changeTimeValue)"
        placeholder="请选择">
        <el-option
          v-for="item in TimeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- 因子选择 -->
      <el-select
        v-model="changeFacValue"
        placeholder="请选择"
        size='mini'
        style="width:112px;z-index:999"
        @change="changeFacFun(changeFacValue)">
        <el-option
          v-for="item in FacOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </div>
    <div class="map">
       <div class="test">
          <div id="container" style="position: relative;width: 100%;height:100%;"></div>
        </div>
    </div>
    <!-- 颜色指标 -->
    <ul class="colorStandard">
      <li class="left one">优</li>
      <li class="left two">良</li>
      <li class="left three">轻度</li>
      <li class="left four">中度</li>
      <li class="left five">重度</li>
      <li class="left six">严重</li>
    </ul>
    <!-- 数字指标 -->
      <ul class="numberStandard">
      <li class="left" style="width:53px">0</li>
      <li class="left">50</li>
      <li class="left">150</li>
      <li class="left">250</li>
      <li class="left">350</li>
      <li class="left">420</li>
      <li class="left" style="width:62px">600</li>
    </ul>
  </div>
</template>

<script>
  import MapLoader from '../../assets/js/Amap'
  import timeUtils from '../../assets/js/timeUtils'

  var map
  var colors
  var massMarks
  export default {
    name:"pollution",
    data () {
      return {
        massData: '',
        FacOptions: [{
          value: '107',
          label: 'PM 2.5'
          }, {
          value: '121',
          label: 'PM 10'
          }],
        TimeOption:[{
          value: '1',
          label: '过去一小时'
          },{
          value: '2',
          label: '今天'
          },{
          value: '3',
          label: '昨天'
          },{
          value: '4',
          label: '本周'
          },{
          value: '5',
          label: '上周'
          },{
          value: '6',
          label: '本月'
          },{
          value: '7',
          label: '上月'
          }],
          changeTimeValue: '1',
          timeStamp: '',
          startTime: '',
          endTime: '',
          changeFacValue: '107',
        }
      },
    created(){
      // console.log(1111111)
    },
    mounted(){
      this.getTimeInfo()
      this.init()
    },
    methods :{
      getTimeInfo () {
        this.$XHR.get('/taxi/web/api/v1/sail/getCurrentTimeMillis', {})
        .then(this.handleTimeInfo)
      },
      handleTimeInfo (res) {
        if (res.status === 200) {
          if (res.data.data) {
            this.timeStamp = res.data.data
            this.getStartEndTime('0')
            this.getStartEndTime(this.changeTimeValue)
            this.getPollutionMapInfo()
          }
        }else {
          alert(res.statusText)
        }
        // console.log(res)
      },
      getStartEndTime(value){
        switch (value) {
          case '0':
            // 获取当前最新时间
            this.endTime = timeUtils.getTimes(this.timeStamp,0)
            // console.log(this.endTime)
            return
          case '1':
            // 获取过去一小时
            this.startTime = timeUtils.getTimes(this.timeStamp,1)
            // console.log(this.startTime)
            return
          case '2':
            // 获取今天时间
            this.startTime = timeUtils.getTimes(this.timeStamp,2)
            // console.log(this.startTime)
            return
          case '3':
            // 获取昨天时间
            this.startTime = timeUtils.getTimes(this.timeStamp,3) + ' 00:00:00'
            this.endTime = timeUtils.getTimes(this.timeStamp,3) + ' 23:59:59'
            // console.log(this.startTime)
            // console.log(this.endTime)
            return
          case '4':
            // 获取本周时间
            this.startTime = timeUtils.getTimes(this.timeStamp,4)
            // console.log(this.startTime)
            return
          case '5':
            // 获取上周时间
            this.startTime = timeUtils.getTimes(this.timeStamp,5)
            this.endTime = timeUtils.getTimes(this.timeStamp,6)
            // console.log(this.startTime)
            // console.log(this.endTime)
            return
          case '6':
            // 获取本月时间
            this.startTime = timeUtils.getTimes(this.timeStamp,7)
            // console.log(this.startTime)
            return
          case '7':
            // 获取上月时间
            this.startTime = timeUtils.getTimes(this.timeStamp,8)
            this.endTime = timeUtils.getTimes(this.timeStamp,9)
            // console.log(this.startTime)
            // console.log(this.endTime)
            return
        }
      },
      changeTimeFun (value) {
        this.getTimeInfo ()
      },
      changeFacFun (value) {
        this.getTimeInfo ()
      },
      getPollutionMapInfo () {
        this.$XHR.get('/taxi/web/api/v1/sail/pollutionCloud', {
          params: {
            startTime: this.startTime,
            endTime: this.endTime,
            pollutantCode: this.changeFacValue
          }
        })
        .then(this.handlePollutionMapInfo)
      },
      handlePollutionMapInfo (res) {
        if (res.status === 200) {
          if (res.data.data) {
            this.massData = res.data.data.entries
            massMarks.setData(this.massData)
          }
        }else {
          alert(res.statusText)
        }
        // console.log(res)
      },
      init: function () {
        let that = this
        MapLoader().then(AMap => {
          // 颜色数组
          colors = [
            '#30d385',
            '#e8c107',
            '#ff9902',
            '#ff0200',
            '#990099',
            '#990000'
          ];
          // 地图实例
          map = new AMap.Map('container', {
            //需求的城市的经度和纬度
            center: [116.405285, 39.904989],
            //是否监控地图容器尺寸变化
            resizeEnable: true,
            zoom: 5,
            // 主题
            mapStyle: 'amap://styles/grey' 
          })
          map.on('complete',function(){
            // console.log("ces")
            // 需要的插件
            AMap.plugin(['AMap.ToolBar','AMap.Scale'], function () {
              map.addControl(new AMap.ToolBar())
              map.addControl(new AMap.Scale())
            })

            var style = [{
                  url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                  anchor: new AMap.Pixel(1,1), // 锚点从左上角向右偏移1,向下偏移1
                  size: new AMap.Size(2,2),
                  zIndex: 11
              }, {
                  url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                  anchor: new AMap.Pixel(1,1),
                  size: new AMap.Size(2,2),
                  zIndex: 12
              }, {
                  url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                  anchor: new AMap.Pixel(1,1),
                  size: new AMap.Size(2,2),
                  zIndex: 13
              }, {
                  url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                  anchor: new AMap.Pixel(1,1),
                  size: new AMap.Size(2,2),
                  zIndex: 14
              }, {
                  url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                  anchor: new AMap.Pixel(1,1),
                  size: new AMap.Size(2,2),
                  zIndex: 15
              }, {
                  url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                  anchor: new AMap.Pixel(1,1),
                  size: new AMap.Size(2,2),
                  zIndex: 16
              }];
              massMarks = new AMap.MassMarks(that.massData,{
                  alwaysRender: false,
                  zIndex: 5,  // 海量点图层叠加的顺序
                  zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
                  style: style
              });
              massMarks.setMap(map)
          })
        },)
      }
    },
  }
</script>

<style scoped>
  .choose{
    position: absolute;
    right: 30px;
    top: 60px;
  }
  .test{
    position: absolute;
    top: 32px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .colorStandard{
    position: absolute;
    right: 30px;
    bottom: 20px;
    text-align: center;
  }
  .numberStandard {
    position: absolute;
    right: -32px;
    bottom: 4px;
    text-align:left;
  }
  .left{
    width:60px;
    height:16px;
    color: #fff;
    opacity:1;
    font-size: 10px;
    padding: 1px 10px;
    line-height: 16px;
    float: left;
  }
  .one{
    background:#30d385;
    border-radius: 8px 0 0 8px;
  }
  .two{
    background:#e8c107;
  }
  .three{
    background:#ff9902;
  }
  .four{
    background:#ff0200;

  }
  .five{
    background:#990099;
  }
  .six{
    background:#990000;
    border-radius: 0 8px 8px 0;
  }
  .clearfix:after,.clearfix:before{
    content: "";
    display: table;
  }
  .clearfix:after{
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }

</style>
