<template>
  <el-form ref="form" :model="hedgingConfig" label-width="80px" style="text-align: left;">
    <el-form-item label="类型" required>{{hedgingType}}</el-form-item>
    <el-form-item label="名称" required>
      <el-input v-model="hedgingConfig.title"></el-input>
    </el-form-item>
    <el-form-item label="杠杆" required>
      <el-select v-model="hedgingConfig.leverRate">
        <el-option
          v-for="item in leverRates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="合约张数" required>
      <el-input v-model="hedgingConfig.volume">
        <i slot="append">策略交易总的合约张数限制</i>
      </el-input>
    </el-form-item>
    <el-form-item label="近卖远买" required>
      <el-input
        v-model="hedgingConfig.sellBuyThresholdRate"
        :disabled="hedgingConfig.autoSellBuyThresholdRate"
      >
        <i slot="append">近期卖出远期买入阀值，当套利指数超过此阀值就进行套利交易</i>
      </el-input>
    </el-form-item>
    <el-form-item label="近买远卖" required>
      <el-input
        v-model="hedgingConfig.buySellThresholdRate"
        :disabled="hedgingConfig.autoBuySellThresholdRate"
      >
        <i slot="append">近期买入远期卖出阀值，当套利指数超过此阀值就进行套利交易</i>
      </el-input>
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
            ></el-option>
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
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开仓滑点">
          <el-input v-model="hedgingConfig.startPremiumRate">
            <i slot="append">单位(%)，加大买价和降低卖价，促使交易完全成交</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="平仓滑点">
          <el-input v-model="hedgingConfig.finishPremiumRate">
            <i slot="append">单位(%)，加大买价和降低卖价，促使交易完全成交</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="单笔限制" required>
      <el-input v-model="hedgingConfig.maxTradeVolume">
        <i slot="append">单笔交易最高合约张数限制，0为不限制</i>
      </el-input>
    </el-form-item>
    <el-form-item label="时间限制" required>
      <el-input v-model="hedgingConfig.lastHegingHour">
        <i slot="append">单位(小时)，合约交割时间前多少小时允许开仓，0为不限制</i>
      </el-input>
    </el-form-item>
    <el-form-item label="行情限制" required>
      <el-col :span="8">
        <el-form-item label="开仓限制">
          <el-input v-model="hedgingConfig.startThresholdAmount">
            <i slot="append">单位(美元)，当行情买卖委托金额大于此金额才进行开仓套利</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="平仓限制">
          <el-input v-model="hedgingConfig.finishThresholdAmount">
            <i slot="append">单位(美元)，当行情买卖委托金额大于此金额才进行平仓套利</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="止盈率" required>
      <el-input v-model="hedgingConfig.profitRate">
        <i slot="append">单位(%)，盈利除以总成本(买入成本+卖出成本+买入手续费+卖出手续费)</i>
      </el-input>
    </el-form-item>
    <el-form-item label="平仓止损" required>
      <el-input v-model="hedgingConfig.maxHedgingHour">
        <i slot="append">单位(小时)，当套利交易未结束并且超过此时间将直接进行平仓，0为不限制</i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" v-if="!hedgingConfig.start">开始</el-button>
      <el-button type="danger" @click="onCancel" v-if="hedgingConfig.start">停止</el-button>
      <el-button type="primary" @click="onSave" v-if="showSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "HedgingConfig",
  props: {
    hedgingConfig: {
      type: Object
    }
  },
  data() {
    return {
      showSave: false,
      buyLevelOptions: [
        {
          value: 1,
          label: "买一价"
        },
        {
          value: 2,
          label: "买二价"
        },
        {
          value: 3,
          label: "买三价"
        },
        {
          value: 4,
          label: "买四价"
        },
        {
          value: 5,
          label: "买五价"
        },
        {
          value: 6,
          label: "买六价"
        },
        {
          value: 7,
          label: "买七价"
        },
        {
          value: 8,
          label: "买八价"
        },
        {
          value: 9,
          label: "买九价"
        },
        {
          value: 10,
          label: "买十价"
        }
      ],
      sellLevelOptions: [
        {
          value: 1,
          label: "卖一价"
        },
        {
          value: 2,
          label: "卖二价"
        },
        {
          value: 3,
          label: "卖三价"
        },
        {
          value: 4,
          label: "卖四价"
        },
        {
          value: 5,
          label: "卖五价"
        },
        {
          value: 6,
          label: "卖六价"
        },
        {
          value: 7,
          label: "卖七价"
        },
        {
          value: 8,
          label: "卖八价"
        },
        {
          value: 9,
          label: "卖九价"
        },
        {
          value: 10,
          label: "卖十价"
        }
      ],
      leverRates: [
        {
          value: 10,
          label: "10倍"
        },
        {
          value: 20,
          label: "20倍"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.hedgingConfig.start = true;
      this.$emit("start", this.hedgingConfig);
      this.$nextTick(function() {
        this.showSave = false;
      });
    },
    onCancel() {
      this.hedgingConfig.start = false;
      this.$emit("stop", this.hedgingConfig);
      this.$nextTick(function() {
        this.showSave = false;
      });
    },
    onSave() {
      this.$emit("save", this.hedgingConfig);
      this.$nextTick(function() {
        this.showSave = false;
      });
    }
  },
  computed: {
    hedgingType: function() {
      if (this.hedgingConfig.type === "tt") {
        return this.hedgingConfig.coin + "现货与当周套利";
      } else if (this.hedgingConfig.type === "tn") {
        return this.hedgingConfig.coin + "当周与次周套利";
      } else if (this.hedgingConfig.type === "tq") {
        return this.hedgingConfig.coin + "当周与季度套利";
      } else if (this.hedgingConfig.type === "nq") {
        return this.hedgingConfig.coin + "次周与季度套利";
      }
      return "";
    }
  },
  watch: {
    hedgingConfig: {
      handler(curVal, oldVal) {
        if (this.hedgingConfig.start) this.showSave = true;
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
