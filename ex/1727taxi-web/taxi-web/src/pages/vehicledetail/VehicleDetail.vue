<template>
  <div class="nowdata">
    <div class="title-message">
      <h3 class="carDetail">车辆详情</h3>
      <el-button class="backBtn" size="small">
        <img src="../../assets/返回箭头.png" class="leftArrow" alt="" />&nbsp;&nbsp;返回
      </el-button>
    </div>
    <div class="topLine"></div>
    <el-row :gutter="20">
      <!-- 左侧地图 -->
      <el-col :span="16" style="padding-right:0px">
        <div class="grid-content bg-purple">
          <!--  -->
          <div class="line-title">
            <h4>轨迹</h4>
            <div class="choose">
              <!-- 因子选择 -->
              <el-select
                style="width:112px;"
                v-model="value1"
                placeholder="请选择"
                size="mini"
                @change="FacValue(value1)"
              >
                <el-option
                  v-for="item in FacOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <!-- 时间选择 -->
              <el-select
                v-model="value2"
                size="mini"
                style="margin-left: 20px;width:112px;"
                @change="TimeValue(value2)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in TimeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 地图轨迹部分 -->
          <div class="line-map">
              <div class="map">
              <div class="test">
                <div
                  id="container"
                  style="position: relative;width: 100%;height:100%;"
                ></div>
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
          <!-- 柱状图 -->
          <div class="line-echart">
            <mylineecharts></mylineecharts>
            <!-- value="开始动画" -->
            <!-- <input
              type="button"
              class="btn"
              id="start"
              @click="startAnimation()"
            /> -->
          </div>
        </div>
      </el-col>
      <!-- 右侧信息 -->
      <el-col :span="8" style="padding-left:0px;padding-right:0px">
        <div class="grid-content bg-purple content-right">
          <!-- 车辆信息 -->
          <div class="info">
            <h4>车辆信息</h4>
            <div v-for="item in infomation" :key="item.id" class="infoS">
              <p>
                <span class="infoList">车牌号码：</span>
                <span>{{ item.carnumber }}</span>
              </p>
              <p>
                <span class="infoList">档案编号：</span>
                <span> {{ item.filesnumber }}</span>
              </p>
              <p>
                <span class="infoList" style="margin-right:14px;">总重量：</span>
                <span> {{ item.weight }}</span>
              </p>
              <p>
                <span class="infoList">外廓尺寸：</span>
                <span> {{ item.size }}</span>
              </p>
              <p>
                <span class="infoList">校验记录：</span>
                <span> {{ item.record }}</span>
              </p>
              <p>
                <span class="infoList" style="margin-right:14px;">所有人：</span>
                <span> {{ item.all }}</span>
              </p>
              <p>
                <span class="infoList">联系方式：</span>
                <span> {{ item.mobile }}</span>
              </p>
            </div>
          </div>
          <!-- 在线率 -->
          <div class="online">
            <h4>在线率</h4>
            
            <!-- 在线率echarts -->
             <!-- 折线图 -->
              <myonlineecharts></myonlineecharts>
              <!--  下方提示-->
              <div  class="text">
                <!-- v-for="item in tips" :key="item.id" -->
                <p>设备号:</p>
                <p>共计24小时，1440分钟</p>
                <p>在线时间为19:02小时，1441分钟</p>
                <p>在线率为0.79</p>
                <span style="margin-right:3px">Tips:</span>
                <span>整点过后会显示上一小时的在线分钟数</span>
              </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<!-- <script src="http://echarts.baidu.com/build/dist/echarts.js"></script> -->

<script>
import MapLoader from '../../assets/js/Amap'
import onlineecharts from './components/Onlineecharts'
import mylineecharts from './components/Lineecharts'
var map, colors, marker, lineArr, polyline, passedPolyline;

export default {
  name: "nowdata",
  components:{
    myonlineecharts:onlineecharts,
    mylineecharts:mylineecharts,
  },
  data() {
    return {
      //  echarts颜色
      option: {},
      FacOptions: [
        {
          value: "1",
          label: "PM 2.5"
        },
        {
          value: "2",
          label: "PM 10"
        }
      ],
      TimeOption: [
        {
          value: "1",
          label: "过去一小时"
        },
        {
          value: "2",
          label: "过去三天"
        },
        {
          value: "3",
          label: "过去十天"
        }
      ],
      value1: "1",
      value2: "1",
      infomation: [
        {
          carnumber: "abcdefg",
          filesnumber: "1234567",
          weight: "1800kg",
          size:"3961*1683*1448",
          record:"检验有效期至2020年8月",
          all:"汤汤",
          mobile:"12345678910"
        }
      ]
    };
  },
  created() {
    // console.log(1111111);
  },
  mounted() {
    this.init();
    // this.autoPlay()
  },
  methods: {
    FacValue(value) {
      console.log(value);
    },
    TimeValue(value) {
      console.log(value);
    },
    startAnimation() {
      console.log(1111);
      marker.moveAlong(lineArr, 200);
    },
    // 地图
    init: function() {
      // var map
      let that = this;
      MapLoader().then(AMap => {
        // 颜色数组
        colors = [
          "#30d385",
          "#e8c107",
          "#ff9902",
          "#ff0200",
          "#990099",
          "#990000"
        ];

        map = new AMap.Map("container", {
          //需求的城市的经度和纬度
          center: [120.153576, 30.287459],
          //是否监控地图容器尺寸变化
          resizeEnable: true,
          zoom: 10,
          // 主题
          mapStyle: 'amap://styles/grey'
        });
        // 需要的插件
        AMap.plugin(
          ["AMap.ToolBar"],
          function() {
            map.addControl(new AMap.ToolBar());
            // map.addControl(new AMap.Scale());
            // map.addControl(new AMap.moveAnimation())
            // map.addControl(new AMap.MarkerClusterer());
          }
        );

        // 轨迹回放
        lineArr = [
          [116.478935, 39.997761],
          [116.478939, 39.997825],
          [116.478912, 39.998549],
          [116.478912, 39.998549],
          [116.478998, 39.998555],
          [116.478998, 39.998555],
          [116.479282, 39.99856],
          [116.479658, 39.998528],
          [116.480151, 39.998453],
          [116.480784, 39.998302],
          [116.480784, 39.998302],
          [116.481149, 39.998184],
          [116.481573, 39.997997],
          [116.481863, 39.997846],
          [116.482072, 39.997718],
          [116.482362, 39.997718],
          [116.483633, 39.998935],
          [116.48367, 39.998968],
          [116.484648, 39.999861]
        ];

        marker = new AMap.Marker({
          map: map,
          position: [116.478935, 39.997761],
          icon: "https://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -13),
          autoRotation: true,
          angle: -90
        });

        // 绘制轨迹
        polyline = new AMap.Polyline({
          map: map,
          path: lineArr,
          showDir: true,
          strokeColor: "#28F", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 //线宽
          // strokeStyle: "solid"  //线样式
        });

        passedPolyline = new AMap.Polyline({
          map: map,
          // path: lineArr,
          strokeColor: "#AF5", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 //线宽
          // strokeStyle: "solid"  //线样式
        });

        marker.on("moving", function(e) {
          passedPolyline.setPath(e.passedPath);
        });
        map.setFitView();
      });
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-message{
    height: 35px;
    line-height: 35px;
    padding: 5px 20px;
  }
  .nowdata > h3 {
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 16px;
    display: inline-block;
  }
  .el-button {
    font-size: 14px;
  }
  .nowdata {
    position: relative;
  }
  .grid-content > .line {
    width: 100%;
    background-color: skyblue;
  }
  .info {
    height: 288px;
    line-height: 30px;
    padding-top: 12px;
    padding-left: 24px;
    padding-right: 10px;
    box-sizing: border-box;
    border: 1px solid rgba(228, 231, 237, 1);
    border-radius:4px;
  }
  .el-row {
    margin-bottom: 15px;
    margin-right: 0!important;
    margin-left: 0!important;
  }
  .el-row :last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 4px;
    height: 672px;
    padding: 0px 20px;
    min-height: 36px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(228, 231, 237, 1);
    opacity: 1;
  }
  .content-right{
    border: none;
  }
  .line-title {
    height: 40px;
    line-height: 56px;
  }
  .line-title > h4 {
    display: inline-block;
    width: 32px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    line-height: 22px;
    color: rgba(48, 49, 51, 1);
    opacity: 1;
  }
  .line-map {
    width: 100%;
    background-color: #def5a8;
    margin: 20px 0px;
    position: relative;
  }
  .line-echart {
    width: 100%;
    position: relative;
  }
  /* 进度条 */
  /* .move{
    width:96%;
    height: 12px;
    background-color: pink;
    position: absolute;
    bottom: 15px;
    left: 36px;
  }
  #filldiv{
      position:absolute;
      top: 0px;
      left: 0px;
      width: 0px;
      height: 12px;
      background: blue;
      animation: move 2s;
  } */
  .btn {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 24px;
    height: 24px;
    opacity: 1;
    background-color: #aeecf7;
    border: 1px solid #4d6bf3;
    border-radius: 50%;
  }
  .choose {
    float: right;
    margin-right: 14px;
  }
  .info > h4 {
    display: block;
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    line-height: 22px;
    color: rgba(48, 49, 51, 1);
    opacity: 1;
  }
  .infoS {
    margin-top: 15px !important;
  }
  .info > p > span {
    width: 67px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 12px;
    color: rgba(48, 49, 51, 1);
    opacity: 1;
  }
  .info .infoList {
    width: 56px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 12px;
    color: rgba(144, 147, 153, 1);
    opacity: 1;
  }
  .online {
    /* height: 355px; */
    margin-top: 16px;
    border: 1px solid rgba(228, 231, 237, 1);
    border-radius:4px;
    padding-top: 10px;
    padding-left: 24px;
    padding-right: 10px;
  }
  .online > h4 {
    display: inline-block;
    width: 48px;
    height: 28px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    line-height: 28px;
    color: rgba(48, 49, 51, 1);
    opacity: 1;
  }
  .backBtn {
    width: 56px;
    height: 28px;
    text-align: center;
    padding: 0;
    font-size: 12px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .carDetail {
    display: inline-block;
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 16px;
    color: rgba(48, 49, 51, 1);
    opacity: 1;
  }
  .leftArrow {
    display: inline;
    line-height: 28px;
    vertical-align: middle;
  }
  .topLine {
    width: 100%;
    height: 1px;
    background: rgba(228, 231, 237, 1);
    opacity: 1;
    /* margin-top: 16px; */
    margin-bottom: 16px;
  }
  /* 颜色指标 */
  .colorStandard {
    position: absolute;
    right: 30px;
    bottom: 25px;
    text-align: center;
  }
  .numberStandard {
    position: absolute;
    right: -32px;
    bottom: 4px;
    text-align:left;
  }
  .left {
    width: 60px;
    height: 16px;
    /* background:rgba(48,211,133,1); */
    color: #fff;
    opacity: 1;
    font-size: 10px;
    padding: 1px 10px;
    line-height: 16px;
    float: left;
  }
  .one {
    background: #30d385;
    border-radius: 8px 0 0 8px;
  }
  .two {
    background: #e8c107;
  }
  .three {
    background: #ff9902;
  }
  .four {
    background: #ff0200;
  }
  .five {
    background: #990099;
  }
  .six {
    background: #990000;
    border-radius: 0 8px 8px 0;
  }
  .map,
  .test {
    width: 100%;
    height: 424px;
    position: relative;
    opacity: 1;
    border-radius: 4px;
    overflow: hidden;
  }
   /* 在线率下面的文本 */
  .text{
     width: 100%;
     height: 130px;
     margin-top: 10px;
     padding-left: 10px;
   }
  .text>p{
    height:17px;
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:12px;
    color:rgba(62,70,79,1);
    opacity:1;
    margin-top: 8px;
  }
  .text>span{
    height:17px;
    font-size:12px;
    display: inline-block;
    margin-top: 12px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:12px;
    color:rgba(144,147,153,1);
    opacity:1;
  }
</style>
