/**
 * 获取userAgent
 */
export function ua() {
    const userAgent = navigator.userAgent
    return userAgent
}

/**
 * 判断是否是影城端
 */
export function isJyCinema() {
    const agent = ua()
    if (agent.indexOf('JYDataCinema') > -1) {
        return true
    } else {
        return false
    }
}

/**
 * 判断是否是广告主端
 */
export function isJyAdvertiser() {
    const agent = ua()
    if (agent.indexOf('JYDataAdvertiser') > -1) {
        return true
    } else {
        return false
    }
}

/**
 * 判断是否是广告主端或影城端
 */
export function isJyApp() {
    if (isJyCinema() || isJyAdvertiser()) {
        return true
    } else {
        return false
    }
}

/**
 * 判断是否是IOS广告主端
 */
export function isJyAdvIos() {
    const agent = ua().toLowerCase()
    if (agent.indexOf('jydataadvertiser_ios') > -1) {
        return true
    } else {
        return false
    }
}

/**
 * 判断是否是安卓广告主端
 */
export function isJyAdvAndroid() {
    const agent = ua().toLowerCase()
    if (agent.indexOf('jydataadvertiser_android') > -1) {
        return true
    } else {
        return false
    }
}

/**
 * 导出当前广告主app的版本
 */
export function getAppVersion() {
    const agent: string = ua().toLowerCase()
    const ar = agent.split('(webview')[0].split('/')
    const ver = Number(ar[ar.length - 1].split('.').join(''))
    const isIos = agent.indexOf('jydataadvertiser_ios') > -1
    const isAndroid = agent.indexOf('jydataadvertiser_android') > -1
    if (isIos || isAndroid) {
        return ver
    } else {
        return 0
    }
}
