import {
  getDetail as apiGetDetail
} from '@/api/song'

export async function getDetail(id: number) {
  try {
    const { data } = await apiGetDetail(id)
    // 正常逻辑
  } catch ({ code }) {
    // 处理错误状态码
    if (code == 100086) {
      alert('已经注册过')
    }
  }
  // return res
}
