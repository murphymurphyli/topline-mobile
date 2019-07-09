// 用户
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile: data.mobile,
      code: data.code
    }
  })
}
