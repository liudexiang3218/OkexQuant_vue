<template>
  <div class="user-login">
    <div :style="{'background-image':`url(${backgroundImage})`}" class="user-login-bg"/>
    <div class="content-wrapper">
      <h2 class="slogan">欢迎使用
        <br>OkexQuant 期货合约价差套利系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="user" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item
                  :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]"
                  prop="username"
                >
                  <div class="form-line">
                    <i class="el-icon-ali-zhanghao input-icon"/>
                    <el-input v-model="user.username" placeholder="会员名/邮箱/手机号"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item :rules="[ { required: true, message: '密码不能为空'}]" prop="password">
                  <div class="form-line">
                    <i class="el-icon-ali-mima input-icon"/>
                    <el-input v-model="user.password" type="password" placeholder="密码"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item>
                  <el-checkbox class="checkbox">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">登 录</el-button>
            </el-row>
          </div>
          <el-row class="tips">
            <a href="#" class="link">立即注册</a>
            <span class="line">|</span>
            <a href="#" class="link">忘记密码</a>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container'
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png'
export default {
  name: 'UserLogin',
  components: { BasicContainer },

  data() {
    return {
      backgroundImage: backgroundImage,
      user: {
        username: 'admin',
        password: '123456'
      }
    }
  },

  created() {},

  methods: {
    submitBtn() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$fetch('/user/login', { userName: this.user.username, password: this.user.password }).then(response => {
            this.$router.push({ path: '/' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "./UserLogin.scss";
</style>
