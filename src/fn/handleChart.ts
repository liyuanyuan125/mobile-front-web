
import moment from 'moment'
export function formatCharts(object: any, count: number) {
    const lastDate: any[] = []
    const nowDate = moment(new Date()).format('YYYY-MM-DD 00:00:00')
    const now = new Date(nowDate).getTime()
    for (let i = 0; i < this.count; i++) {
        lastDate.unshift(now - i * 24 * 60 * 60 * 1000)
    }
    // 处理数据
    const lastValue = (object || []).map((it: any) => {
        const { rivalName, data } = it
        const yVal = new Array(this.count).fill(null)
        data.map((ite: any) => {
            const mapIndex = lastDate.indexOf(ite.date)
            yVal[mapIndex] = ite.value
        })
        return {
            name: rivalName,
            list: yVal
        }
    })
}
