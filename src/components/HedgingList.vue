<template>
  <el-card>
    <div slot="header">
      <span>交易记录</span>
      <span style="float: right; padding: 3px 0;">
        <el-button type="text" @click="onLiquidAll">全部平仓</el-button>
        <el-button type="text" @click="onRefresh">刷新</el-button>
      </span>
    </div>
    <el-table :data="hedgings" style="width: 100%">
      <el-table-column label="交易日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.time | dataFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="策略" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="盈亏率" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.profitRate | numFormat(4) }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="开仓买入" width="180">
        <template slot-scope="scope">
          <span>{{ buyDealAmount(scope.$index, scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开仓卖出" width="180">
        <template slot-scope="scope">
          <span>{{ sellDealAmount(scope.$index, scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平仓买入" width="180">
        <template slot-scope="scope">
          <span>{{ reverseBuyDealAmount(scope.$index, scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平仓卖出" width="180">
        <template slot-scope="scope">
          <span>{{ reverseSellDealAmount(scope.$index, scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.status | formatStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.liquid && scope.row.status==0"
            size="mini"
            type="danger"
            @click="handleLiquid(scope.$index, scope.row)"
          >平仓</el-button>
          <el-button
            v-if="scope.row.status!=1"
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="handleRepair(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'HedgingList',
  filters: {
    formatStatus: function(val) {
      switch (val) {
        case 0:
          return '进行中'
        case 2:
          return '平仓中'
      }
      return '结束'
    }
  },
  props: {
    hedgings: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  methods: {
    buyDealAmount: function(index, row) {
      if (row.buyTrade && row.buyTrade.futureOrder) {
        return row.buyTrade.futureOrder.filledQty
      }
      return ''
    },
    sellDealAmount: function(index, row) {
      if (row.sellTrade && row.sellTrade.futureOrder) {
        return row.sellTrade.futureOrder.filledQty
      }
      return ''
    },
    reverseBuyDealAmount: function(index, row) {
      if (row.reverseHedgings) {
        var dealamout = 0
        row.reverseHedgings.forEach((hedging, index) => {
          if (hedging.buyTrade && hedging.buyTrade.futureOrder) {
            dealamout =
              dealamout + hedging.buyTrade.futureOrder.filledQty
          }
        })
        return dealamout
      }
      return ''
    },
    reverseSellDealAmount: function(index, row) {
      if (row.reverseHedgings) {
        var dealamout = 0
        row.reverseHedgings.forEach((hedging, index) => {
          if (hedging.sellTrade && hedging.sellTrade.futureOrder) {
            dealamout =
              dealamout + hedging.sellTrade.futureOrder.filledQty
          }
        })
        return dealamout
      }
      return ''
    },
    handleLiquid(index, row) {
      this.$confirm('确定要平仓此交易?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('liquid', row.hedgingId)
      })
    },
    handleRepair(index, row) {
      this.$emit('repair', row.hedgingId)
    },
    onRefresh() {
      this.$emit('refresh')
    },
    onLiquidAll() {
      this.$emit('liquidAll')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
