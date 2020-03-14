/**
 * 舆情顶部工具条数据
 */
export interface SentimentBarItem {
    /**
     * 页面标题
     */
    title: string

    /**
     * 背景颜色
     */
    bgColor?: string

    /**
     * 标题颜色 #303030
     */
    color?: string

    /**
     * 自定义样式
     */
    cusStyle?: string

    /**
     * 是否显示关注
     */
    diggShow?: boolean

    /**
     * 是否显示 pk
     */
    pkShow?: boolean
}
