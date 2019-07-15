// 频道模块
// 用户
import request from '@/utils/request'

// 获取首页频道列表
// 已经登录：用户频道列表
// 已经登录：推荐频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
