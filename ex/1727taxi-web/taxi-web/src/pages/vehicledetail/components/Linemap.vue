<template>
   <!-- 地图轨迹部分 -->
  <div class="map">
    <div class="test">
      <div
        id="container"
        style="position: relative;width: 100%;height:100%;"
      ></div>
    </div>
  </div>
</template>
<script> </script>
<script>
import MapLoader from '../../../Js/Amap'
var map, colors, marker, lineArr, polyline, passedPolyline;
export default {
  data(){
      return{
                // 地图
            // map: null,
            // thisPosition: {
            //   location: "",
            //   lng: "",
            //   lat: ""
            // },
      }
  },
 mounted() {
    this.init();
  },
 methods:{
   startAnimation() {
      console.log(1111);
      marker.moveAlong(lineArr, 200);
    },
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
          ["AMap.ToolBar", "AMap.Scale", "AMap.MarkerClusterer"],
          function() {
            map.addControl(new AMap.ToolBar());
            map.addControl(new AMap.Scale());
            map.addControl(new AMap.MarkerClusterer());
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
}
</script>
<style  scoped>
.map,
.test {
  width: 100%;
  height: 424px;
  /* background-color: yellow; */
  position: relative;
  opacity: 1;
  border-radius: 4px;
  overflow: hidden;
}
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
</style>