<template>
  <el-card v-loading="isLoading">
    <div slot="header">
      <span>{{ title }}</span>
    </div>
    <div>
      <ve-line
        :data="chartData"
        :settings="chartSettings"
        :extend="chartExtend"
        :data-zoom="dataZoom"
        :not-set-unchange="['dataZoom']"
      />
    </div>
  </el-card>
</template>
<script>
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/markLine'
import VeLine from 'v-charts/lib/line.common'
require('websocket').w3cwebsocket

var StompJs = require('@stomp/stompjs')
var client
var subscription
export default {
  name: 'HedgingChart',
  components: { VeLine },
  props: {
    coin: {
      type: Object,
      default: function() {
        return {
          coin: 'btc',
          type: 'tn',
          tilte: 'BTC'
        }
      }
    }
  },
  data() {
    return {
      isLoading: false,
      chartSettings: {
        labelMap: {
          time: '时间',
          s_b_v: '近卖远买',
          b_s_v: '近买远卖'
        }
      },
      dataZoom: [
        {
          type: 'slider',
          start: 80,
          end: 100,
          showDetail: false,
          xAxisIndex: 0
        }
      ],
      chartExtend: {
        axisLabel: {
          formatter: function(value) {
            var date = new Date()
            date.setTime(value)
            var texts = [date.getHours(), date.getMinutes(), date.getSeconds()]
            return texts.join(':')
          }
        },
        tooltip(v) {
          return v
        }
      },
      chartData: {
        columns: ['time', 's_b_v', 'b_s_v'],
        rows: []
      }
    }
  },
  computed: {
    hedgingType: function() {
      return this.coin.type + '_' + this.coin.coin
    },
    title: function() {
      if (this.coin.type === 'tt') {
        return this.coin.title + '现货与当周套利指数'
      } else if (this.coin.type === 'tn') {
        return this.coin.title + '当周与次周套利指数'
      } else if (this.coin.type === 'tq') {
        return this.coin.title + '当周与季度套利指数'
      } else if (this.coin.type === 'nq') {
        return this.coin.title + '次周与季度套利指数'
      }
      return ''
    }
  },
  watch: {
    coin: {
      handler() {
        subscription.unsubscribe()
        this.fetchdata()
        subscription = client.subscribe(
          '/topic/' + this.hedgingType,
          this.callback
        )
      },
      deep: true
    }
  },
  mounted() {
    this.fetchdata()
    client = new StompJs.Client({
      brokerURL: process.env.VUE_APP_brokerURL,
      connectHeaders: {
        login: 'admin',
        passcode: 'admin'
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    })
    var self = this
    client.onConnect = function() {
      subscription = client.subscribe(
        '/topic/' + self.hedgingType,
        self.callback
      )
    }
    client.onDisconnect = function() {
      subscription.unsubscribe()
    }
    client.activate()
  },
  methods: {
    fetchdata() {
      this.isLoading = true
      this.chartData.rows = []
      this.$fetch('/hedging/data', {
        coin: this.coin.coin,
        type: this.coin.type
      }).then(response => {
        this.isLoading = false
        if (response.data) this.chartData.rows = response.data
      }).catch(() => {
        this.isLoading = false
      })
    },
    callback(message) {
      var data = JSON.parse(message.body)
      if (this.coin.type === data.type) {
        if (this.chartData.rows.length > 10000) {
          this.chartData.rows.shift()
        }
        this.chartData.rows.push(data)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
