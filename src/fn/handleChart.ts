
import moment from 'moment'
export function formatCharts(object: any, count: number) {
    const lastDate: any[] = []
    // 返回的时间戳是  年月日 00：00：00格式
    const nowDate = moment(new Date()).format('YYYY/MM/DD 00:00:00')
    const now = new Date(nowDate).getTime()
    for (let i = 1; i < count + 1; i++) {
        lastDate.unshift(now - i * 24 * 60 * 60 * 1000)
    }
    // console.log('object', object)
    // 处理数据
    const lastValue = (object || []).map((it: any) => {
        const rivalName = it.rivalName || it.platformName
        const data = it.data || it.dataList
        // 如果某个竞品没有值的时候，data 可能会返回[]或 null，而需要在0上显示一条线
        const yVal = new Array(count).fill(0)
        data.map((ite: any) => {
            const mapIndex = lastDate.indexOf(ite.date)
            yVal[mapIndex] = ite.value
        })
        return {
            name: rivalName,
            list: yVal
        }
    })
    return {
        xDate: lastDate,
        yDate: lastValue
    }
}
