<template>
  <el-card shadow="hover" :body-style="{ padding: '10px' }">
    <div slot="header">
      <span>{{coin.title}}</span>
    </div>
    <el-row :gutter="5">
      <el-button style="border: 0px;padding: 12px 10px;" @click="handleBase('tt')">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">现当周</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success">{{ infos[0] | numFormat(2)}}</el-tag>
        </el-col>
        <el-col :span="9">
          <el-tag>{{ infos[1] | numFormat(2)}}</el-tag>
        </el-col>
      </el-button>
    </el-row>
    <el-row :gutter="5" style="margin-top: 10px;">
      <el-button style="border: 0px;padding: 12px 10px;" @click="handleBase('tn')">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">当次周</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success">{{ infos[2] | numFormat(2)}}</el-tag>
        </el-col>
        <el-col :span="9">
          <el-tag>{{ infos[3] | numFormat(2)}}</el-tag>
        </el-col>
      </el-button>
    </el-row>
    <el-row :gutter="5" style="margin-top: 10px;">
      <el-button style="border: 0px;padding: 12px 10px;" @click="handleBase('tq')">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">当周季</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success">{{ infos[4] | numFormat(2)}}</el-tag>
        </el-col>
        <el-col :span="9">
          <el-tag>{{ infos[5] | numFormat(2)}}</el-tag>
        </el-col>
      </el-button>
    </el-row>
    <el-row :gutter="5" style="margin-top: 10px;">
      <el-button style="border: 0px;padding: 12px 10px;" @click="handleBase('nq')">
        <el-col :span="6">
          <label class="el-form-item__label" style="font-size: 12px;line-height: 30px;">次周季</label>
        </el-col>
        <el-col :span="9">
          <el-tag type="success">{{ infos[6] | numFormat(2)}}</el-tag>
        </el-col>
        <el-col :span="9">
          <el-tag>{{ infos[7] | numFormat(2)}}</el-tag>
        </el-col>
      </el-button>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "HedgingDataPanel",
  props: {
    coin: {
      type: Object,
      default: function() {
        return { coin: "", title: "", type: "" };
      }
    },
    infos: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
  },
  methods: {
    handleBase(type) {
      this.coin.type = type;
      this.$emit("handleBase", this.coin);
    }
  }
};
</script>

<style scoped>
</style>
