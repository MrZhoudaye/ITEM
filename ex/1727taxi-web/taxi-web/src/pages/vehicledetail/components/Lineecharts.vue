<template>
<div class="line">
      <!-- <h1> 我是局部组件{{msg}} </h1>  -->
  <div ref="lineechart" id="linechart">
  </div>
      <el-button id="play" circle><i id="icon" class="el-icon-video-play"></i></el-button>
      <div id="move">
        <div id="filldiv"></div>
        <div class="small"></div>
      </div>
</div>

</template>
<script src="http://echarts.baidu.com/build/dist/echarts.js"></script>

<script>
import $ from 'jquery'
var option,echarts,graphic,colorList
export default {
  name:'lineechart',
  data(){
    return {
     option:{}
    }
  },
  mounted() {
    this.SetEchart();
  },
  methods:{
    SetEchart() {
    // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.lineechart);
    
        colorList=["#30d385", "#e8c107", "#ff9902", "#ff0200", "#ff0200","#990000"]
    // 
        option = {
            backgroundColor: "#FFF",
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // grid区域
            grid: {
                // show:true,
                left: '1%',
                right: '1%',
                bottom: '18%',
                top: '10%',
                containLabel: true //---grid 区域是否包含坐标轴的刻度标签
            },
            // X轴
            xAxis: {
                type: 'category',
                // boundaryGap:false,
                // name  轴名称
                // nameLocation:'end', 轴名称相对位置
                // nameTextStyle:{				//---坐标轴名称样式
                    // color:"#fff",
                    // padding:[5,0,0,-5],	//---坐标轴名称相对位置
                // },
                // nameGap:15,					//---坐标轴名称与轴线之间的距离
                data: ['00:00','01:00','02：00','03:00','04:00','05:00','06:00','07:00', '08:00','09:00','10:00','11:00',
                    '12:00','13:00','14:00','15:00', '16:00','17:00', '18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                axisLine: {
                    shaw:true,
                    lineStyle: {
                        color: 'rgba(144,147,153,1)'
                    }
                },
                // 坐标轴刻度
                axisTick:{
                //   lengt:5
                //   interval:auto,
                show:false,
                //   alignWithLabel: true
                },
                // 坐标轴标签
                axisLabel: {    
                    interval: 1,
                    // rotate: 40,
                    color:"rgba(144,147,153,1)",
                    textStyle: {
                        fontFamily: 'Microsoft YaHei'
                    }
                },
                splitArea:{			//--网格区域
                    show:false,		//---是否显示，默认false
                }, 
            },
            // Y轴
            yAxis: {
                type: 'value',
                // boundaryGap:true,

                max: '250',
                // 坐标轴轴线
                axisLine: {
                    show: true,  //是否显示
                    // 线
                    lineStyle: {
                        color: {
                            type:"linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 1, color: "#30d385" // 0% 处的颜色
                            }, 
                            {
                                offset: 0.8, color: "#e8c107" // 0% 处的颜色
                            },
                            {
                                offset: 0.6, color: "#ff9902" // 0% 处的颜色
                            },
                            {
                                offset: 0.4, color:  "#ff0200" // 0% 处的颜色
                            },
                            {
                                offset: 0.2, color:  "#ff0200" // 0% 处的颜色
                            }, 
                            {
                                offset: 0, color: "#990000" // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        width:3
                        // 'rgba(144,147,153,1)'
                    }
                },
                // 刻度
                axisTick:{
                    show:false,
                    alignWithLabel:true
                //   inside:true
                },
                // 标签
                axisLabel: {
                    color:'rgba(144,147,153,1)'
                },
                // grid中的分割线
                splitLine: {
                    show: false,
                    width:1,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    }
                },
            },
            series: [     
                {
                // name: '1',
                type: 'bar',
                // 柱子宽度
                barWidth:'20',
                // 柱子之间距离
                // barGap:false,
                // barCategoryGap:'10%',		//---柱形间距
                showBackground: true,
                backgroundStyle: {
                    color: '#F2F6FC'
                },
                data: [100,20,50,30,200,150,240,100,240,40,150,120,130,60,250,70,150,90,120,10,230,150,140,100,150],

                itemStyle: {
                    normal: {
                        // color: colorList[1]
                        color:function(params) {
                        var colorList =[
                                        "#30d385",
                                        "#e8c107",
                                        "#ff9902",
                                        "#ff0200",
                                        "#990099",
                                        "#990000"
                                        ];
                        var data= [100,20,50,30,200,150,240,100,240,40, 150,120,130,60,250,70,150,90,120,10,230,150,140,100,150]
                            for(var i=0;i<data.length;i++){
                                if(data[i]<=50 ){
                                // console.log(data[i])
                                // console.log("这是"+colorList[params.dataIndex])
                                // return colorList[0]
                                }
                                else if(data[i]<100){
                                // console.log(data[i])
                                // console.log("这是"+colorList[params.dataIndex])
                            //    return colorList[1]

                                }
                                else if(data[i]<150){
                                // console.log(data[i])
                                // console.log("这是"+colorList[params.dataIndex])
                                //  return colorList[3]

                                }
                                else if(data[i]<200){
                                // console.log("这是"+colorList[params.dataIndex])

                                // console.log(data[i])
                                }
                                else{
                                //   console.log(data[i])

                                //  return
                                //   console.log("这是"+colorList[params.dataIndex])

                                } 
                            }
                        // return colorList[params.dataIndex]
                        }
                    },
                },
            }
            ]
        };
    
    // 为echarts对象加载数据
        myChart.setOption(option);
         var count = 0;
         var time = null;

        // autoPlay();
            function autoPlay() {
                var dataArry=[100,20, 50, 30,200,150,240,100,240,40,150,120,130,60,
                            250,70,150,90,120,10,230,150,140,100,150]
                var dataLength = dataArry.length;
                var filldiv = document.getElementById("filldiv")
                time = setInterval(function () {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0  // 索引值
                    });
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: count
                    });
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: count
                    });

                    count++;
                   
                    // console.log(count)
                    if(count==1){
                      filldiv.style.width = count/dataLength*100/2 + "%";
                    }
                    else{
                      filldiv.style.width = count/dataLength*100-1/dataLength*100/2 + "%";
                    }
                    // filldiv.style.width = count/dataLength*100 + "%";
                    if(count == dataLength) {
                        count = 0;
                        clearInterval(time);
                    }
                }, 2000);
            }
            function stopPlay () {
              clearInterval(time)
            }
            var onOff=true
            $("#play").click(function(){
              if(onOff==true){
                console.log("点击了播放按钮")
                $("#icon").removeClass('el-icon-video-play')
                $("#icon").addClass('el-icon-video-pause')
                autoPlay();
                onOff=false

              }
              else{
                console.log("点击了暂停按钮")
                $("#icon").addClass('el-icon-video-play')
                $("#icon").removeClass('el-icon-video-pause')
                stopPlay()
                onOff=true

              }
            })
    },
  }
}
</script>
<style  scoped>
  #linechart {
    height: 166px;
    /* position: relative; */
    box-sizing: border-box;
  }
  #move{
    width: 95.1%;
    height: 12px;
    background:rgba(242,246,252,1);
    opacity:1;
    position: absolute;
    bottom: 15px;
    left: 38px;
    overflow: hidden;
  }
  .small{
      float: right;
      width: 19px;
      height: 12px;
      background-color: #fff;
  }
  #filldiv{
    position:absolute;
    top: 0px;
    left: 0px;
    width: 0px;
    height: 12px;
    background:rgba(40,122,208,1);
    opacity:1;
 }
 .el-button{
     width: 24px;
     height:24px;
     position: absolute;
     bottom: 9px;
     left: 16px;
     border: 1px solid rgba(40,122,208,1);
     background-color:rgba(40,122,208,1);
     padding: 0;
     color: #fff;
 }
 
</style>