<template>
  <div id="app">
    <el-container>
      <el-header>
        <div id="nav">
          <el-menu :default-active="$route.path" router mode="horizontal">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-dialog :fullscreen="true" :visible.sync="loginDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <login></login>
    </el-dialog>
  </div>
</template>
<script>
import Login from "./views/Login.vue";
export default {
  data() {
    return {
      navList: [
        { name: "/", navItem: "首页" },
        { name: "/about", navItem: "关于我们" },
        { name: "/login", navItem: "账号管理" }
      ]
    };
  },
  computed: {
    loginDialogVisible: function() {
      return !this.$store.state.isLogin;
    }
  },
  components: {
    Login
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
