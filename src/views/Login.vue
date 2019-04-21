<template>
  <div>
    <UserLogin/>

  </div>
</template>
<script>
import store from '@/store'
import UserLogin from '@/blocks/UserLogin/UserLogin.vue'

export default {
  name: 'Login',
  components: {
    UserLogin
  },
  created() {
    store.commit('logout')
  }
}
</script>
