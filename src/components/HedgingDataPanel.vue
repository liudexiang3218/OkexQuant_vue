<template>
  <el-card :body-style="{ padding: '10px' }" shadow="hover">
    <div slot="header">
      <span>{{ coin.title }}</span>
    </div>
    <el-row :gutter="5" style="margin-top: 10px;">
      <el-button style="border: 0px;padding: 12px 10px;">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">当次周</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success" @click="handleBase('tn')">{{ infos[0] | numFormat(2) }}</el-tag>
        </el-col>
        <el-col :span="9">
          <el-tag @click="handleBase('tn')">{{ infos[1] | numFormat(2) }}</el-tag>
        </el-col>
      </el-button>
    </el-row>
    <el-row :gutter="5" style="margin-top: 10px;">
      <el-button style="border: 0px;padding: 12px 10px;">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">当周季</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success" @click="handleBase('tq')">{{ infos[2] | numFormat(2) }}</el-tag>
        </el-col>
        <el-col :span="9">
          <el-tag @click="handleBase('tq')">{{ infos[3] | numFormat(2) }}</el-tag>
        </el-col>
      </el-button>
    </el-row>
    <el-row :gutter="5" style="margin-top: 10px;">
      <el-button style="border: 0px;padding: 12px 10px;">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">次周季</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success" @click="handleBase('nq')">{{ infos[4] | numFormat(2) }}</el-tag>
        </el-col>
        <el-col :span="9" >
          <el-tag @click="handleBase('nq')">{{ infos[5] | numFormat(2) }}</el-tag>
        </el-col>
      </el-button>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'HedgingDataPanel',
  props: {
    coin: {
      type: Object,
      default: function() {
        return { coin: '', title: '', type: '' }
      }
    },
    infos: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0]
      }
    }
  },
  methods: {
    handleBase(type) {
      this.coin.type = type
      this.$emit('handleBase', this.coin)
    }
  }
}
</script>

<style scoped>
</style>
