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
    <van-button type="info">登录</van-button>
  </div>
</div>
</template>

<script>

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  }

}
</script>

<style scoped>
.van-button {
    width: 100%
}

</style>
