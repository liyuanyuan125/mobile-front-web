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
    const agent = ua()
    if (agent.indexOf('JYDataAdvertiser_iOs') > -1) {
        return true
    } else {
        return false
    }
}

/**
 * 判断是否是安卓广告主端
 */
export function isJyAdvAndroid() {
    const agent = ua()
    if (agent.indexOf('JYDataAdvertiser_Android') > -1) {
        return true
    } else {
        return false
    }
}
