<template>
<div class="login">
  <van-nav-bar title="登录"/>
  <form action="">
    <van-cell-group>
    <van-field
        v-model="user.mobile"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
    />
    <van-field
        v-model="user.code"
        type="text"
        label="验证码"
        placeholder="请输入验证码"
        required
        clearable
    />
    </van-cell-group>
  </form>
  <div class="btn-login">
    <van-button type="info" @click.prevent='handleLogin' :loading='loginLoading' loading-text="登录中...">登录</van-button>
  </div>
</div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      loginLoading: false
    }
  },
  methods: {
    async handleLogin () {
      this.loginLoading = true
      try {
        const data = await login(this.user)
        this.$store.commit('setUser', data)
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
      this.loginLoading = false
    }
  }

}
</script>

<style scoped>
.van-button {
    width: 100%
}

</style>
