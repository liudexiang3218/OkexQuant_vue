<template>
  <el-form ref="form" :model="hedgingConfig" label-width="80px" style="text-align: left;">
    <el-form-item label="类型" required>{{ hedgingType }}</el-form-item>
    <el-form-item label="名称" required>
      <el-input v-model="hedgingConfig.title"/>
    </el-form-item>
    <el-form-item label="杠杆" required>
      <el-select v-model="hedgingConfig.leverRate">
        <el-option
          v-for="item in leverRates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="合约张数" required>
      <el-input v-model="hedgingConfig.volume"/>
      <span style="font-size: 12px;">策略交易总的合约张数限制</span>
    </el-form-item>
    <el-form-item label="近卖远买" required>
      <el-input
        v-model="hedgingConfig.sellBuyThresholdRate"
        :disabled="hedgingConfig.autoSellBuyThresholdRate"
      />
      <span style="font-size: 12px;">近期卖出远期买入阀值，当套利指数超过此阀值就进行套利交易</span>
    </el-form-item>
    <el-form-item label="近买远卖" required>
      <el-input
        v-model="hedgingConfig.buySellThresholdRate"
        :disabled="hedgingConfig.autoBuySellThresholdRate"
      />
      <span style="font-size: 12px;">近期买入远期卖出阀值，当套利指数超过此阀值就进行套利交易</span>
    </el-form-item>
    <el-form-item label="监控价格" required>
      <el-col :span="4">
        <el-form-item label="委买价">
          <el-select v-model="hedgingConfig.buyLevel">
            <el-option
              v-for="item in buyLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="委卖价">
          <el-select v-model="hedgingConfig.sellLevel">
            <el-option
              v-for="item in sellLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开仓滑点">
          <el-input v-model="hedgingConfig.startPremiumRate"/>
          <span style="font-size: 12px;">单位(%)，加大买价和降低卖价，促使交易完全成交</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="平仓滑点">
          <el-input v-model="hedgingConfig.finishPremiumRate"/>
          <span style="font-size: 12px;">单位(%)，加大买价和降低卖价，促使交易完全成交</span>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="单笔限制" required>
      <el-input v-model="hedgingConfig.maxTradeVolume"/>
      <span style="font-size: 12px;">单笔交易最高合约张数限制，0为不限制</span>
    </el-form-item>
    <el-form-item label="时间限制" required>
      <el-input v-model="hedgingConfig.lastHegingHour"/>
      <span style="font-size: 12px;">单位(小时)，合约交割时间前多少小时允许开仓，0为不限制</span>
    </el-form-item>
    <el-form-item label="行情限制" required>
      <el-col :span="8">
        <el-form-item label="开仓限制">
          <el-input v-model="hedgingConfig.startThresholdAmount"/>
          <span style="font-size: 12px;">单位(美元)，当行情买卖委托金额大于此金额才进行开仓套利</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="平仓限制">
          <el-input v-model="hedgingConfig.finishThresholdAmount"/>
          <span style="font-size: 12px;">单位(美元)，当行情买卖委托金额大于此金额才进行平仓套利</span>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="止盈率" required>
      <el-input v-model="hedgingConfig.profitRate"/>
      <span style="font-size: 12px;">单位(%)，盈利除以总成本(买入成本+卖出成本+买入手续费+卖出手续费)</span>
    </el-form-item>
    <el-form-item label="平仓止损" required>
      <el-input v-model="hedgingConfig.maxHedgingHour"/>
      <span style="font-size: 12px;">单位(小时)，当套利交易未结束并且超过此时间将直接进行平仓，0为不限制</span>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!hedgingConfig.start" type="primary" @click="onSubmit">开始</el-button>
      <el-button v-if="hedgingConfig.start" type="danger" @click="onCancel">停止</el-button>
      <el-button v-if="showSave" type="primary" @click="onSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'HedgingConfig',
  props: {
    hedgingConfig: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      showSave: false,
      buyLevelOptions: [
        {
          value: 1,
          label: '买一价'
        },
        {
          value: 2,
          label: '买二价'
        },
        {
          value: 3,
          label: '买三价'
        },
        {
          value: 4,
          label: '买四价'
        },
        {
          value: 5,
          label: '买五价'
        }
      ],
      sellLevelOptions: [
        {
          value: 1,
          label: '卖一价'
        },
        {
          value: 2,
          label: '卖二价'
        },
        {
          value: 3,
          label: '卖三价'
        },
        {
          value: 4,
          label: '卖四价'
        },
        {
          value: 5,
          label: '卖五价'
        }
      ],
      leverRates: [
        {
          value: 10,
          label: '10倍'
        },
        {
          value: 20,
          label: '20倍'
        }
      ]
    }
  },
  computed: {
    hedgingType: function() {
      if (this.hedgingConfig.type === 'tt') {
        return this.hedgingConfig.coin + '现货与当周套利'
      } else if (this.hedgingConfig.type === 'tn') {
        return this.hedgingConfig.coin + '当周与次周套利'
      } else if (this.hedgingConfig.type === 'tq') {
        return this.hedgingConfig.coin + '当周与季度套利'
      } else if (this.hedgingConfig.type === 'nq') {
        return this.hedgingConfig.coin + '次周与季度套利'
      }
      return ''
    }
  },
  watch: {
    hedgingConfig: {
      handler(curVal, oldVal) {
        if (this.hedgingConfig.start) this.showSave = true
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      this.hedgingConfig.start = true
      this.$emit('start', this.hedgingConfig)
      this.$nextTick(function() {
        this.showSave = false
      })
    },
    onCancel() {
      this.hedgingConfig.start = false
      this.$emit('stop', this.hedgingConfig)
      this.$nextTick(function() {
        this.showSave = false
      })
    },
    onSave() {
      this.$emit('save', this.hedgingConfig)
      this.$nextTick(function() {
        this.showSave = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
