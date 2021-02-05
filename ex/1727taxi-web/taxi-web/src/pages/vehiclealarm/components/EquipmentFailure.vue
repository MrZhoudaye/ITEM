<template>
  <div>
    <div class="factor-limit-table-box">
      <el-table
        :data="FactorLimitData"
        :header-cell-style="{background:'#F2F6FC'}"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="carNumber"
          label="车牌号"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="failureCause"
          label="故障原因"
          align="center"
          min-width="10%">
        </el-table-column>
      </el-table>
    </div>
    <div class="factor-limit-page-box clear-float">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 15, 25, 35]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="30">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FactorLimit',
  data () {
    return {
      currentPage: 1,
      FactorLimitData: [{
        carNumber: '浙A-7T2U8',
        time: '2020-08-09 10:32',
        failureCause: '检测仪故障，检测仪只能读取车辆控制单元里储存的故障码'
      }, {
        carNumber: '浙B-7T2U8',
        time: '2020-08-10 11:32',
        failureCause: '电池电量不足，当前剩余10%'
      }, {
        carNumber: '冀A-7T2U8',
        time: '2020-08-09 10:32',
        failureCause: '传感器故障，出现易熄火，空档滑行熄火，怠速不稳等故障现象'
      }]
    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    showTest (num) {
      console.log(num)
    }
  },
  mounted () {
    this.showTest(22222)
  }
}
</script>

<style scoped>
  .factor-limit-page-box{
    margin-top: 10px;
    margin-right: 15px;
  }

  .factor-limit-page-box >>> .el-pagination{
    float: right;
  }
</style>
