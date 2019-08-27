import { get, post, put } from '@/fn/ajax'

/**
 * 获取省及城市接口
 */
export async function getProvinceList() {
    const res = get('/common/get_province_city_info')
    return res
}
/**
 * 根据唯一标识获取公共部分数据
 * 这是一个公共接口
 * @param data 接口数据
 */
export async function getQualification(data: string) {
    const res = get('/common/get_common_data', { identify: data })
    return res
}
