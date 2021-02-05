<template>
  <div class="real-time-area">
    <real-list :listData="list"></real-list>
    <real-map :carList="carList"></real-map>
  </div>
</template>

<script>
import RealList from './components/RealList'
import RealMap from './components/RealMap'
export default {
  name: 'NowData',
  components: {
    RealList,
    RealMap
  },
  data () {
    return {
      list: [
        {
          id: "1",
          carNumber: '豫A-7T2UA',
          pmTen: '500',
          pmTwoPointFive: '170',
          time: '15:03:49',
          carStatus: 'online'
        }, {
          id: "2",
          carNumber: '浙A-7T2UB',
          pmTen: '517',
          pmTwoPointFive: '156',
          time: '15:03:49',
          carStatus: 'offline'
        }, {
          id: "3",
          carNumber: '浙A-7T2UC',
          pmTen: '600',
          pmTwoPointFive: '160',
          time: '15:03:49',
          carStatus: 'online'
        }, {
          id: "4",
          carNumber: '浙B-7T2UD',
          pmTen: '430',
          pmTwoPointFive: '122',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "5",
          carNumber: '浙B-7T2UE',
          pmTen: '422',
          pmTwoPointFive: '123',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "6",
          carNumber: '冀B-7T2UD',
          pmTen: '600',
          pmTwoPointFive: '122',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "7",
          carNumber: '冀B-7T2UE',
          pmTen: '500',
          pmTwoPointFive: '123',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "8",
          carNumber: '皖B-7T2UD',
          pmTen: '600',
          pmTwoPointFive: '122',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "9",
          carNumber: '皖B-7T2UE',
          pmTen: '500',
          pmTwoPointFive: '123',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "10",
          carNumber: '津B-7T2UD',
          pmTen: '600',
          pmTwoPointFive: '122',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "11",
          carNumber: '津B-7T2UE',
          pmTen: '500',
          pmTwoPointFive: '123',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "12",
          carNumber: '甘B-7T2UD',
          pmTen: '700',
          pmTwoPointFive: '140',
          time: '16:03:50',
          carStatus: 'online'
        }, {
          id: "13",
          carNumber: '甘B-7T2UE',
          pmTen: '700',
          pmTwoPointFive: '150',
          time: '16:03:50',
          carStatus: 'online'
        }
      ],
      carList: [
        {
          id: '2',
          value: 22,
          center: '116.405285,39.904989',
          type: '2'
        }, {
          id: '3',
          value: 260,
          center: '117.190182,39.125596',
          type: '3'
        }, {
          id: '4',
          value: 45,
          center: '114.502461,38.045474',
          type: '4'
        }, {
          id: '5',
          value: 115,
          center: '112.549248,37.857014',
          type: '5'
        },
      ]
    }
  },
  created(){
    console.log(1111111)
  }
}
</script>

<style scoped>
  .real-time-area{
    height: calc(100% - 32px);
    position: absolute;
    top: 32px;
    bottom: 0;
    left: 0;
    right: 0;
    /*background-color: #001529;*/
  }
</style>
