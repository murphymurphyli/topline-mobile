// 文章相关接口封装的模块
import request from '@/utils/request'
// 获取推荐列表数据
export const getArticles = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
