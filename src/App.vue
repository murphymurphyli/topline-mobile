<template>
<div id='app'>
    <router-view />
   <div class='aa'></div>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
</div>

</template>

<script>
export default {
  name: 'App'

}
</script>

<style scoped>
.aa {
  background-color: lightblue;
  width: 375px;
  height: 200px;
}
</style>
