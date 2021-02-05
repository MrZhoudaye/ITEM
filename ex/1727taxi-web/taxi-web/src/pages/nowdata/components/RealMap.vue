<template>
  <div class="real-map-content">
    <div class="select-factory-box">
      <el-select v-model="formInline.pmselect">
        <el-option label="PM2.5" value="PM2.5"></el-option>
        <el-option label="PM10" value="PM10"></el-option>
      </el-select>
    </div>
    <div class="map-box" id="container"></div>
    <div class="legend-box clear-float">
      <div class="legend-li" v-for="item in this.legendData" :key="item.id" :style="{backgroundColor: item.color}">{{item.value}}μg/m³</div>
    </div>
  </div>
</template>

<script>
import MapLoader from '../../../assets/js/Amap'
export default {
  name: 'RealMap',
  props: {
    carList: Array
  },
  data () {
    return {
      map: '',
      marker: '',
      markerContent: '',
      legendData: [
        {
          id: '1',
          color: '#30D385',
          value: '35'
        }, {
          id: '2',
          color: '#E8C107',
          value: '75'
        }, {
          id: '3',
          color: '#FF9902',
          value: '115'
        }, {
          id: '4',
          color: '#FF0200',
          value: '150'
        }, {
          id: '5',
          color: '#990099',
          value: '250'
        }, {
          id: '6',
          color: '#990000',
          value: '350'
        }
      ],
      formInline: {
        pmselect: 'PM2.5'
      }
    }
  },
  mounted () {
    this.initData()
    this.initMap()
  },
  methods: {
    initData () {
      // console.log(positions)
    },
    initMap () {
      var map = ''
      var getCarData = this.carList
      // console.log(getCarData)
      let that = this
      MapLoader().then(AMap => {
        var position = new AMap.LngLat(116.397428, 39.90923)
        // 创建地图实例
        map = new AMap.Map('container', {
          zoom: 8,
          center: position,
          resizeEnable: true,
          mapStyle: 'amap://styles/grey'
        })

        // 点标记显示内容，HTML要素字符串
        window.clearMarker = clearMarker
        var markers = []
        var usualUrl = '../../../../static/img/'
        var needUrl = ''
        var setUrl = ''
        var colorClass=''
        var markerContent = ''
        for (var i = 0; i < getCarData.length; i++) {
          var marker
          if (getCarData[i].value >= 0 && getCarData[i].value <= 35){
            needUrl = 'two-car.png'
            colorClass = 'two-car'
          }else if (getCarData[i].value > 35 && getCarData[i].value <= 75) {
            needUrl = 'three-car.png'
            colorClass = 'three-car'
          }else if (getCarData[i].value > 75 && getCarData[i].value <= 115) {
            needUrl = 'four-car.png'
            colorClass = 'four-car'
          }else if (getCarData[i].value > 115 && getCarData[i].value <= 150) {
            needUrl = 'five-car.png'
            colorClass = 'five-car'
          }else if (getCarData[i].value > 150 && getCarData[i].value <= 250) {
            needUrl = 'six-car.png'
            colorClass = 'six-car'
          }else if (getCarData[i].value > 250 && getCarData[i].value <= 350) {
            needUrl = 'seven-car.png'
            colorClass = 'seven-car'
          }else {
            needUrl = 'one-car.png'
            colorClass = 'one-car'
          }

          markerContent = ''
          setUrl = usualUrl + needUrl
          markerContent += ''+
          '<div class="show-marker-content" data-id="' + getCarData[i].id + '" onclick="clearMarker(this)">'+
            '<div class="show-marker-img-box"><img src="' + setUrl + '" /></div>'+
            '<div class="show-marker-value-box ' + colorClass + '">' + getCarData[i].value + '</div>'+
          '</div>'

          marker = new AMap.Marker({
            position: getCarData[i].center.split(','),
            content: markerContent,
            offset: new AMap.Pixel(-12,-12)
          })

          map.add(marker)
        }

        // 触发方法
        function clearMarker(ev) {
          var getId = ev.getAttribute('data-id')
          that.$router.push({ path: '/vehicledetail?id=' + getId })
        }
      })
    }
  }
}
</script>

<style scoped>
  .map-box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .map-box >>> .show-marker-content{
    position: relative;
    width: 24px;
    height: 24px;
  }

  .map-box >>> .show-marker-content img{
    width: 100%;
    height: 100%;
  }

  .map-box >>> .show-marker-content .show-marker-value-box{
    position: absolute;
    top: -19px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    height: 22px;
    line-height: 18px;
    white-space: nowrap;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 2px 5px;
    background-color: #2FD284;
    font-size: 12px;
  }

  .map-box >>> .show-marker-content .show-marker-value-box:after{
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #fff;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate3d(-50%,0,0);
    border-color:#2FD284 transparent transparent;
  }

  /*地图上car样式集*/
  .map-box >>> .show-marker-content .one-car{
    background-color: #CCCCCC;
  }
  .map-box >>> .show-marker-content .one-car:after{
    border-color:#CCCCCC transparent transparent;
  }

  .map-box >>> .show-marker-content .two-car{
    background-color: #2FD284;
  }
  .map-box >>> .show-marker-content .two-car:after{
    border-color:#2FD284 transparent transparent;
  }

  .map-box >>> .show-marker-content .three-car{
    background-color: #E8C107;
  }
  .map-box >>> .show-marker-content .three-car:after{
    border-color:#E8C107 transparent transparent;
  }

  .map-box >>> .show-marker-content .four-car{
    background-color: #FA9602;
  }
  .map-box >>> .show-marker-content .four-car:after{
    border-color:#FA9602 transparent transparent;
  }

  .map-box >>> .show-marker-content .five-car{
    background-color: #FF0200;
  }
  .map-box >>> .show-marker-content .five-car:after{
    border-color:#FF0200 transparent transparent;
  }

  .map-box >>> .show-marker-content .six-car{
    background-color: #990099;
  }
  .map-box >>> .show-marker-content .six-car:after{
    border-color:#990099 transparent transparent;
  }

  .map-box >>> .show-marker-content .seven-car{
    background-color: #970101;
  }
  .map-box >>> .show-marker-content .seven-car:after{
    border-color:#970101 transparent transparent;
  }

  /*图例样式*/
  .legend-box{
    position: fixed;
    bottom: 12px;
    right: 16px;
  }

  .legend-li{
    float: left;
    width: 70px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #FFFFFF;
    background-color: purple;
  }

  /*select选择*/
  .select-factory-box{
    position: absolute;
    top: 21px;
    right: 40px;
    z-index: 1;
  }

  .select-factory-box >>> .el-select .el-input .el-input__inner{
    width: 112px;
    height: 30px;
    line-height: 30px;
  }

  .select-factory-box >>> .el-select .el-input .el-input__suffix .el-input__suffix-inner .el-input__icon{
    line-height: 30px;
  }
</style>
