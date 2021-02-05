<template>
  <div class="real-data-content">
    <div class="info-title-box">
      <div class="info-title">今日共50辆</div>
      <div class="info-title info-online">在线数量：<span class="info-title-number info-online-number">44</span></div>
      <div class="info-title info-offline">离线数量：<span class="info-title-number info-offline-number">6</span></div>
      <div class="info-title-search clear-float" style="position: relative" @click="inputInOut">
        <img class="info-title-search-img" :src="this.searchChangeImgFlag == 'peace' ? this.searchPeaceUrl : this.searchActiveUrl" />
        <input @click.stop v-model="keyword" class="info-title-search-input" :style="{display: searchInputFlag}" type="text" placeholder="请输入车牌号查询" />
      </div>
    </div>

    <div class="info-table-box" style="height: calc(100% - 38px)">
      <div class="info-tebale-head clear-float">
        <div class="info-tebale-head-th" style="width: 30%">车牌号</div>
        <div class="info-tebale-head-th pm-tebale-head-th" style="width: 20%">PM10
          <div class="sort-box">
            <div class="usual-pm-img-box pmten-top-img-box" @click="asceOrder('one')"><img class="sort-img" :src="this.oneTopImgUrlFlag == 'default' ? this.topDefaultImgUrl : this.topApplyImgUrl" /></div>
            <div class="usual-pm-img-box pmten-bottom-img-box" @click="descOrder('one')"><img class="sort-img" :src="this.oneBottomImgUrlFlag == 'default' ? this.bottomDefaultImgUrl : this.bottomApplyImgUrl" /></div>
          </div>
        </div>
        <div class="info-tebale-head-th pm-tebale-head-th" style="width: 20%">PM2.5
           <div class="sort-box">
            <div class="usual-pm-img-box pmpoint-top-img-box" @click="asceOrder('two')"><img class="sort-img" :src="this.twoTopImgUrlFlag == 'default' ? this.topDefaultImgUrl : this.topApplyImgUrl" /></div>
            <div class="usual-pm-img-box pmpoint-bottom-img-box" @click="descOrder('two')"><img class="sort-img" :src="this.twoBottomImgUrlFlag == 'default' ? this.bottomDefaultImgUrl : this.bottomApplyImgUrl" /></div>
          </div>
        </div>
        <div class="info-tebale-head-th" style="width: 30%">时间</div>
      </div>
      <div style="height: calc(100% - 32px)">
      <vue-scroll :ops="ops">
      <div>
        <div class="info-tebale-list clear-float" v-for="item of finalListData" :key="item.id">
          <div class="info-tebale-list-td" style="width: 30%"><span :class="['online-show-circle', item.carStatus]"></span>{{item.carNumber}}</div>
          <div class="info-tebale-list-td" style="width: 20%">{{item.pmTen}}</div>
          <div class="info-tebale-list-td" style="width: 20%">{{item.pmTwoPointFive}}</div>
          <div class="info-tebale-list-td clear-float" style="width: 30%">{{item.time}}<img class="right-arrow-img" src="../../../assets/img/to-right-arrow.png"/></div>
        </div>
        <div class="info-tebale-list" style="text-align: center" v-show="hasNoMatch">
          没有找到匹配数据
        </div>
      </div>
      </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'  
export default {
  name: 'RealList',
  components: {
    VueScroll
  },
  props: {
    listData: Array
  },
  data () {
    return {
      searchInputFlag: 'none',
      searchChangeImgFlag: 'peace',
      searchPeaceUrl: require('../../../assets/img/search.png'),
      searchActiveUrl: require('../../../assets/img/search-active.png'),
      keyword: '',
      timer: null,
      needListData: '',
      onListData: '',
      offListData: '',
      finalListData: '',
      oneTopImgUrlFlag: 'default',
      oneBottomImgUrlFlag: 'default',
      twoTopImgUrlFlag: 'default',
      twoBottomImgUrlFlag: 'default',
      topDefaultImgUrl: require('../../../assets/img/top-default-arrow.png'),
      topApplyImgUrl: require('../../../assets/img/top-apply-arrow.png'),
      bottomDefaultImgUrl: require('../../../assets/img/bottom-default-arrow.png'),
      bottomApplyImgUrl: require('../../../assets/img/bottom-apply-arrow.png'),
      ops: {
        vuescroll: {
          mode: 'native',
          wheelScrollDuration: 100,
          sizeStrategy: 'percent',
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 550,
          easing: 'easeInQuar',
          verticalNativeBarPos: 'right'
        },
        rail: {
          background: '#c3c3c3',
          opcity: 0,
          size: '5px'
        },
        bar: {
          showDelay: 500,
          background: '#c3c3c3',
          opacity: 1,
          minSize: .4,
          size: '5px',
          keepShow: false,
          onlyShowBarOnScroll: false
        }
      }
    }
  },
  computed: {
    hasNoMatch () {
      return !this.finalListData.length
    }
  },
  watch: {
    keyword () {
      this.oneTopImgUrlFlag = 'default'
      this.oneBottomImgUrlFlag = 'default'
      this.twoTopImgUrlFlag = 'default'
      this.twoBottomImgUrlFlag = 'default'
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.keyword == '') {
        this.candleData()
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        const getNeedListData = this.needListData
        for (let i = 0; i < getNeedListData.length; i++) {
          if (getNeedListData[i].carNumber.indexOf(this.keyword) > -1) {
            result.push(getNeedListData[i])
          }
        }
        this.finalListData = result
      }, 100)
    }
  },
  methods: {
    inputInOut () {
      if (this.searchInputFlag == 'none') {
        this.searchInputFlag = 'inline-block'
      } else if (this.searchInputFlag = 'inline-block') {
        this.searchInputFlag = 'none'
      } else {}

      if (this.searchChangeImgFlag == 'peace') {
        this.searchChangeImgFlag = 'active'
      } else if (this.searchChangeImgFlag = 'active') {
        this.searchChangeImgFlag = 'peace'
      } else {}
    },
    candleData () {
      if (this.listData && this.listData.length > 0) {
        const getListData = this.listData;
        const onListDataArry = [];
        let offListDataArry = [];
        let offListTransArry = [];
        for (let i = 0; i < getListData.length; i++) {
          if (getListData[i].carStatus == 'online') {
            onListDataArry.push(getListData[i])
          }else if (getListData[i].carStatus == 'offline') {
            offListDataArry.push(getListData[i])
          } else {}
        }
        if (offListDataArry && offListDataArry.length > 0) {
          for (let j = 0; j < offListDataArry.length; j++) {
            offListTransArry.push(offListDataArry[j])
            offListTransArry[j].id = offListDataArry[j].id
            offListTransArry[j].carNumber = offListDataArry[j].carNumber
            offListTransArry[j].pmTen = '/'
            offListTransArry[j].pmTwoPointFive = '/'
            offListTransArry[j].time = '/'
            offListTransArry[j].carStatus = offListDataArry[j].carStatus
          }
        } else {
          offListDataArry = []
          offListTransArry = []
        }
        this.onListData = onListDataArry
        this.offListData = offListTransArry
        this.needListData = this.onListData.concat(this.offListData)
        this.finalListData = this.onListData.concat(this.offListData)
      }
    },
    candleSearchData () {
      const getSearchListData = this.finalListData
      const searchOnListDataArry = []
      const searchOffListDataArry = []
      for (let i = 0; i < getSearchListData.length; i++) {
          if (getSearchListData[i].carStatus == 'online') {
            searchOnListDataArry.push(getSearchListData[i])
          }else if (getSearchListData[i].carStatus == 'offline') {
            searchOffListDataArry.push(getSearchListData[i])
          } else {}
        }
        this.onListData = searchOnListDataArry
        this.offListData = searchOffListDataArry
    },
    asceOrder (pmSign) {
      this.candleSearchData ()
      if (pmSign == "one") {
        this.twoTopImgUrlFlag = 'default'
        this.twoBottomImgUrlFlag = 'default'
        this.oneBottomImgUrlFlag = 'default'
        this.oneTopImgUrlFlag = 'apply'
        this.asceOrderCandle('pmTen')
      } else if (pmSign == "two") {
        this.oneTopImgUrlFlag = 'default'
        this.oneBottomImgUrlFlag = 'default'
        this.twoBottomImgUrlFlag = 'default'
        this.twoTopImgUrlFlag = 'apply'
        this.asceOrderCandle('pmTwoPointFive')
      }
    },
    descOrder (pmSign) {
      this.candleSearchData ()
      if (pmSign == "one") {
        this.twoTopImgUrlFlag = 'default'
        this.twoBottomImgUrlFlag = 'default'
        this.oneTopImgUrlFlag = 'default'
        this.oneBottomImgUrlFlag = 'apply'
        this.descOrderCandle('pmTen')
      } else if (pmSign == "two") {
        this.oneTopImgUrlFlag = 'default'
        this.oneBottomImgUrlFlag = 'default'
        this.twoTopImgUrlFlag = 'default'
        this.twoBottomImgUrlFlag = 'apply'
        this.descOrderCandle('pmTwoPointFive')
      }
    },
    asceOrderCandle (pmType) {
      const getAsceListData = this.onListData
      for (let i = 0; i < getAsceListData.length; i++) {
        for(let j = 0; j < getAsceListData.length - i - 1; j++) {
          if (getAsceListData[j][pmType] < getAsceListData[j+1][pmType]) {
            var hand = getAsceListData[j]
            getAsceListData[j] = getAsceListData[j+1]
            getAsceListData[j+1] = hand
          }
        }
      }
      this.onListData = getAsceListData
      this.finalListData = this.onListData.concat(this.offListData)
      // console.log(this.onListData);
    },
    descOrderCandle (pmType) {
      const getDescListData = this.onListData
      for (let i = 0; i < getDescListData.length; i++) {
        for(let j = 0; j < getDescListData.length - i - 1; j++) {
          if (getDescListData[j][pmType] > getDescListData[j+1][pmType]) {
            var hand = getDescListData[j]
            getDescListData[j] = getDescListData[j+1]
            getDescListData[j+1] = hand
          }
        }
      }
      this.onListData = getDescListData
      this.finalListData = this.onListData.concat(this.offListData)
      // console.log(this.onListData);
    }
  },
   mounted () {
    this.candleData ()
  }
}
</script>

<style scoped>
  /*车辆在线离线部分样式*/
  .real-data-content{
    height: 70%;
    position: absolute;
    top: 19px;
    left: 2px;
    width: 320px;
    /*height: 704px;*/
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
    /*background-color: #001529;*/
    /*opacity: .5;*/
    background-color: rgba(0,21,41,.5);
    color: #FFFFFF;
    font-size: 12px;
    z-index: 1;
  }

  .info-title-box{
    display: flex;
    line-height: 38px;
  }

  .info-title{
    margin-left: 16px;
  }

  .info-title:nth-of-type(1){
    margin-left: 10px;
  }

  .info-title-search{
    flex: 1;
    line-height: 16px;
  }

  .info-online-number{
    color: #67C23A;
  }

  .info-offline-number{
    color: #607D8B;
  }

  .info-title-search-img{
    float: right;
    height: 16px;
    margin-top: 11px;
    margin-right: 10px;
  }

  .info-title-search-input{
    position: absolute;
    top: 0;
    right: 35px;
    box-sizing: border-box;
    height: 26px;
    margin: 6px 0;
    padding: 0 5px;
    border: none;
    border-radius: 4px
  }

  /*列表详情部分样式*/
  .info-tebale-head{
    width: 100%;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    padding: 0 2%;
    /*background-color: #FFFFFF;*/
    /*opacity: .1;*/
    background-color: rgba(255,255,255,0.1);
  }

  .info-tebale-list{
    width: 100%;
    line-height: 42px;
    padding: 0 2%;
    word-wrap: break-word;
    word-break: break-all;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(207,216,220,.5);
  }

  .info-tebale-head-th{
    float: left;
    text-align: center;
  }

  .info-tebale-list-td{
    float: left;
    text-align: center;
  }

  .online-show-circle{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
  }

  .online{
    background-color: #67C23A;
  }

  .offline{
    background-color: #607D8B;
  }

  .right-arrow-img{
    float: right;
    height: 8px;
    margin-top: 17px;
    margin-right: 6px;
  }

  /*排序部分样式处理*/
  .pm-tebale-head-th{
    display: flex;
  }

  .sort-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .usual-pm-img-box{
    height: 12px;
    line-height: 12px;
    margin: 0;
    padding: 0;
    font-size: 0;
  }

  .sort-img{
    height: 12px;
  }
</style>
