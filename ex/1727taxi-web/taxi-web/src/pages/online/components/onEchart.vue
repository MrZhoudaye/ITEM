<template>
  <!-- <h1> 我是局部组件{{msg}} </h1>  -->
  <div class="online-echart">
    <div ref="myonlineechart" id="myonlinechart" class="online-echart"></div>
  </div>
</template>
<script src="http://echarts.baidu.com/build/dist/echarts.js"></script>
<script>
 var option
 export default {
  name:'onlone-echarts',
  data(){
    return {
     msg:"111111",
    }
  },
  mounted() {
    this.SetOnlineEchart();
  },
  methods:{
     SetOnlineEchart() {
      // 基于准备好的dom，初始化echarts实例
      let myOnlineChart = this.$echarts.init(this.$refs.myonlineechart);
      option = {
          backgroundColor: '#FFF',
          grid: {
              top: '1%',
              bottom:'5%',
              left: '2%',
              right: '1%'
          },
          tooltip: {
              transitionDuration:0,
              trigger: 'axis',
              label: {
                  show: true
              }
          },
          xAxis: {
              boundaryGap: true, //默认，坐标轴留白策略
              axisLine: {
                  show: false
              },
              axisLabel:{
                  interval:0
              },
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false,
                  alignWithLabel: true
              },
              data: [
                  '00:00','02：00','04:00','06:00', '08:00','10:00', '12:00','14:00', '16:00', '18:00','20:00','22:00',
                  '24:00'
                 ]
          },
          yAxis: {
              name:'分钟',
              type:'value',
              max: 60,
              min: 0,
              axisLine: {
                  show: false
              },
              splitLine: {
                  show: true,
                  lineStyle: {
                      type: 'dashed',
                      color: 'rgba(33,148,246,0.2)'
                  }
              },
              axisTick: {
                  show: false
              },
              splitArea: {
                  show: true,
                  areaStyle: {
                      color: 'rgb(245,250,254)'
                  }
              }
            //   data: [0, 20, 30, 40, 50, 60]
          },
          series: [{
              type: 'line',
              symbol: 'circle',
              // 折线圆点大小
              symbolSize: 6,
              // 设置折线弧度，取值：0-1之间
              //  smooth: 0.5,
              lineStyle: {
                  color: 'rgb(33,148,246)',
                  shadowBlur: 12,
                  shadowColor: 'rgb(33,148,246,0.9)',
                  shadowOffsetX: 1,
                  shadowOffsetY: 1
              },
              itemStyle: {
                  color: 'rgb(33,148,246)',
                  borderWidth: 1,
                  borderColor: '#FFF'
              },
            //   emphasis:{
            //     color:'rgb(33,148,246)'
            //   },
              label: {
                  show: false,
                  distance: 1,
                  emphasis: {
                      show: true,
                      offset: [25, -2],
                      //borderWidth:1,
                      // borderColor:'rgb(33,148,246)',
                      //formatter:'{bg|{b}\n数据量:{c}}',
                      backgroundColor: {
                          // image: uploadedDataURL
                      },
                      color: '#FFF',
                      padding: [8, 20, 8, 6],
                      //width:60,
                      height: 36,
                      formatter: function(params) {
                          var name = params.name;
                          var value = params.data;
                          var str = name  + value;
                          return str;
                      },
                      rich: {
                          bg: {
                              backgroundColor: {
                                  // image: uploadedDataURL
                              },
                              width: 78,
                              //height:42,
                              color: '#FFF',
                              padding: [20, 0, 20, 10]
                          },
                          br: {
                              width: '100%',
                              height: '100%'
                          }

                      }
                  }
              },
              data: [0, 50, 20, 30, 40, 50,30,50, 50, 20, 30, 40, 50,20]
          }]
      };
      // 为echarts对象加载数据
      myOnlineChart.setOption(option);
    }
  }
}
</script>
<style  scoped>
.online-echart {
  height: 600px;
  /* background-color: #7bf8d9; */
  margin-top: 15px;
}
</style>