<template>
  <div>
    <hedging-dashboard v-on:handleBase="handleBase"></hedging-dashboard>
    <div style="margin-top: 10px;"></div>
    <hedging-chart :coin="showCoin"></hedging-chart>
    <div style="margin-top: 10px;"></div>
    <hedging-list
      :hedgings="hedginglist"
      v-on:liquid="liquid"
      v-on:repair="repair"
      v-on:refresh="refreshHedgingList"
      v-on:liquidAll="liquidAll"
    ></hedging-list>
    <div style="margin-top: 10px;"></div>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane
        :key="item.configId"
        v-for="item in editableTabs"
        :label="item.title"
        :name="item.configId"
      >
        <hedging-config :hedgingConfig="item" v-on:save="save" v-on:start="start" v-on:stop="stop"></hedging-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HedgingConfig from "@/components/HedgingConfig.vue";
import HedgingChart from "@/components/HedgingChart.vue";
import HedgingList from "@/components/HedgingList.vue";
import HedgingDashboard from "@/components/HedgingDashboard.vue";
export default {
  name: "app",
  data() {
    return {
      editableTabsValue: "",
      editableTabs: [],
      hedginglist: [],
      showCoin: {
        coin: "btc",
        type: "tn",
        title: "BTC"
      }
    };
  },
  mounted() {
    this.listConfigs();
    this.$fetch("/hedging/list").then(response => {
      this.hedginglist = response.data;
    });
  },
  methods: {
    listConfigs() {
      this.$fetch("/hedging/config/list", {
        coin: this.showCoin.coin,
        type: this.showCoin.type
      }).then(response => {
        this.editableTabs = response.data;
        if (this.editableTabs.length == 0) {
          this.handleTabsEdit(null, "add");
        } else {
          this.editableTabsValue = this.editableTabs[0].configId;
        }
      });
    },
    save(data) {
      this.$post("/hedging/config/save", data).then(() => {
        this.$message({
          message: "策略已成功保存!",
          type: "success"
        });
      });
    },
    start(data) {
      this.$post("/hedging/config/save", data).then(() => {
        this.$message({
          message: "策略已成功开始!",
          type: "success"
        });
      });
    },
    stop(data) {
      this.$post("/hedging/config/save", data).then(() => {
        this.$message({
          message: "策略已停止!",
          type: "warning"
        });
      });
    },
    liquid(data) {
      this.$fetch("/hedging/liquid", { hedgingId: data }).then(response => {
        this.hedginglist.forEach((hedging, index) => {
          if (hedging.hedgingId === data) {
            hedging.liquid = true;
          }
        });
      });
    },
    repair(data) {
      this.$fetch("/hedging/repair", { hedgingId: data }).then(response => {
        if (response.success) {
          this.hedginglist.forEach((hedging, index) => {
            if (hedging.hedgingId === data) {
              this.hedginglist[index] = response.data;
              return;
            }
          });
        }
      });
    },
    refreshHedgingList() {
      this.$fetch("/hedging/list").then(response => {
        this.hedginglist = response.data;
      });
    },
    liquidAll() {
      this.$confirm("您确定要将所有套利交易平仓吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetch("/hedging/liquidall").then(response => {
          if (response.errorCode == 0) {
            this.$message("操作成功");
          }
        });
      });
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        this.$fetch("/hedging/config/new", {
          coin: this.showCoin.coin,
          type: this.showCoin.type
        }).then(response => {
          this.editableTabs.push(response.data);
          this.editableTabsValue = response.data.configId;
        });
      } else if (action === "remove") {
        this.$confirm("此操作将永久删除该策略, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$fetch("/hedging/config/remove", { configId: targetName }).then(
            () => {
              let tabs = this.editableTabs;
              let activeName = this.editableTabsValue;
              if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                  if (tab.configId === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      activeName = nextTab.configId;
                    }
                  }
                });
              }
              this.editableTabsValue = activeName;
              this.editableTabs = tabs.filter(
                tab => tab.configId !== targetName
              );
              if (this.editableTabs.length == 0) {
                this.handleTabsEdit(null, "add");
              }
            }
          );
        });
      }
    },
    handleBase(coin) {
      this.showCoin.title = coin.title;
      this.showCoin.coin = coin.coin;
      this.showCoin.type = coin.type;
      this.listConfigs();
    }
  },
  components: {
    HedgingConfig,
    HedgingChart,
    HedgingList,
    HedgingDashboard
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
