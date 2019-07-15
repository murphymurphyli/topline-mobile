<template>
  <div id="app">
    <!-- 头部 -->
    <van-nav-bar title="首页" fixed/>
    <!-- 头部 -->
    <!-- 频道标签 -->
    <van-tabs v-model="activeChannelIndex" class="channel-tabs" sticky :offset-top="46">
      <van-tab v-for="channelItem in channels" :key="channelItem.id" :title="channelItem.name">
        <van-pull-refresh :success-text="channelItem.downPullLoading" :success-duration="1000" v-model="channelItem.downPullLoading" @refresh="onRefresh">
          <van-list v-model="channelItem.upPullLoading" :finished="channelItem.upPullFinished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="articleItem in channelItem.articles" :key="articleItem.art_id" :title="articleItem.title"/>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>-->
    </van-tabs>
    <!-- 频道标签 -->
    <!-- 底部 -->
    <van-tabbar route>
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'home',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      // pullRefreshLoading: false,
      channels: []
    }
  },
  computed: {
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      // 已经登录
      if (user) {
        const data = await getUserChannels()
        // channels = data.channels
        console.log(data)
      } else {
        // 未登录
        const localChannels = JSON.parse(
          window.localStorage.getItem('channels')
        )
        if (localChannels) {
          channels = localChannels
        } else {
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      channels.forEach(item => {
        item.articles = []
        item.timestamp = Date.now()
        item.downPullLoading = false
        item.upPullLoading = false
        item.upPullFinished = false
      })
      this.channels = channels
    },
    async onLoad () {
      await this.$sleep(800)

      console.log('onload')
      let data = []
      data = await this.loadArticles()
      // console.log(data)

      // 如果没有pre_timestamp并且数组是空的，则意味着没有数据了
      if (!data.pre_timestamp && !data.results.length) {
        // 设置改频道组件已经记载完毕，组件会自动给出提示并且不再onload
        this.activeChannel.upPullFinished = true
        // 取消loading
        this.activeChannel.upPullLoading = false

        return
      }

      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp

        data = await this.loadArticles()
      }
      this.activeChannel.timestamp = data.pre_timestamp

      this.activeChannel.articles.push(...data.results)

      this.activeChannel.upPullLoading = false
      // console.log(data)

      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     // 所有数据加载完毕
      //     this.finished = true;
      //   }
      // }, 500);
    },
    async onRefresh () {
      const { activeChannel } = this
      const timestamp = this.activeChannel.timestamp
      this.activeChannel.timestamp = Date.now()
      console.log(timestamp)
      const data = await this.loadArticles()
      // 如果有最新数据，将数据更新到频道的文章列表中
      if (data.results.length) {
        // 将最新的推荐内容重置到频道文章中
        this.activeChannel.articles = data.results
        // 因为重置了文章列表，那么当前数据化中的pre_timestamp 就是上拉加载更多的下一页数据
        activeChannel.timestamp = data.pre_timestamp
        activeChannel.downPullSuccessText = '更新成功'
        // 当下拉刷新有数据并充值以后数据无法满足一屏幕，所以我们使用onload在多加载一些数据
        this.onload()
      } else {
        // 如果没有最新数据，提示已经是最新数据
        activeChannel.downPullSuccessText = '已经是最新数据'
      }
      activeChannel.downPullLoading = false

      // 如果没有最新数据，将数据更新到频道的文章列表中。

      // console.log('onRefresh')
      // setTimeout(() => {
      //   this.pullRefreshLoading = false
      // }, 500)
    },
    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId,
        timestamp,
        withTop: 1
      })
      return data
    }
  }
}
</script>

<style scoped>
.van-list {
  margin-bottom: 100px;
}
van-tabs__nav--line {
  margin-top: 46px;
  position: fixed;
}
</style>
