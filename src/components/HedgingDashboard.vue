<template>
  <el-card>
    <div slot="header">
      <span>套利指数</span>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'BTC',coin:'btc',type:''}"
            :infos="infosBTC"
            @handleBase="handleBase"
          />
        </el-col>
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'LTC',coin:'ltc',type:''}"
            :infos="infosLTC"
            @handleBase="handleBase"
          />
        </el-col>
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'ETH',coin:'eth',type:''}"
            :infos="infosETH"
            @handleBase="handleBase"
          />
        </el-col>
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'ETC',coin:'etc',type:''}"
            :infos="infosETC"
            @handleBase="handleBase"
          />
        </el-col>
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'BCH',coin:'bch',type:''}"
            :infos="infosBCH"
            @handleBase="handleBase"
          />
        </el-col>
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'XRP',coin:'xrp',type:''}"
            :infos="infosXRP"
            @handleBase="handleBase"
          />
        </el-col>
        <el-col :span="3">
          <hedging-data-panel
            :coin="{title:'EOS',coin:'eos',type:''}"
            :infos="infosEOS"
            @handleBase="handleBase"
          />
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import Vue from 'vue'
import HedgingDataPanel from './HedgingDataPanel.vue'
require('websocket').w3cwebsocket

var StompJs = require('@stomp/stompjs')
export default {
  name: 'HedgingDashboard',
  components: {
    HedgingDataPanel
  },
  props: {
    infosBTC: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    },
    infosLTC: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    },
    infosETH: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    },
    infosETC: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    },
    infosBCH: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    },
    infosXRP: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    },
    infosEOS: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    }
  },
  data() {
    return {
      coins: ['btc', 'ltc', 'eth', 'etc', 'bch', 'xrp', 'eos']
    }
  },
  mounted() {
    const client = new StompJs.Client({
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
      self.coins.forEach(c => {
        client.subscribe('/topic/tn_' + c, function(message) {
          self.callbackInfos(message, c, 'tn')
        })
        client.subscribe('/topic/tq_' + c, function(message) {
          self.callbackInfos(message, c, 'tq')
        })
        client.subscribe('/topic/nq_' + c, function(message) {
          self.callbackInfos(message, c, 'nq')
        })
      })
    }
    client.onDisconnect = function() {
      self.coins.forEach(c => {
        client.unsubscribe('/topic/tn_' + c)
        client.unsubscribe('/topic/tq_' + c)
        client.unsubscribe('/topic/nq_' + c)
      })
    }
    client.activate()
  },
  methods: {
    callbackInfos(message, coin, type) {
      const data = JSON.parse(message.body)
      let infos
      if (coin === 'btc') {
        infos = this.infosBTC
      } else if (coin === 'ltc') {
        infos = this.infosLTC
      } else if (coin === 'eth') {
        infos = this.infosETH
      } else if (coin === 'etc') {
        infos = this.infosETC
      } else if (coin === 'bch') {
        infos = this.infosBCH
      } else if (coin === 'xrp') {
        infos = this.infosXRP
      } else if (coin === 'eos') {
        infos = this.infosEOS
      }
      if (type === 'tn') {
        Vue.set(infos, 0, data.s_b_v)
        Vue.set(infos, 1, data.b_s_v)
      } else if (type === 'tq') {
        Vue.set(infos, 2, data.s_b_v)
        Vue.set(infos, 3, data.b_s_v)
      } else if (type === 'nq') {
        Vue.set(infos, 4, data.s_b_v)
        Vue.set(infos, 5, data.b_s_v)
      }
    },
    handleBase(coin) {
      this.$emit('handleBase', coin)
    }
  }
}
</script>
