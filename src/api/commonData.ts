import { get, post, put } from '@/fn/ajax'

/**
 * 主账号详情接口
 * @param data 接口数据
 */
export async function getProvinceList() {
    const res = get('/common/get_province_city_info')
    return res
}
