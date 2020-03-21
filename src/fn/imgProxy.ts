
export interface ImgObj {
    source: string,
    url: string
}
/**
 *
 * @param imgUrl 图片来源的object
 * @param width 宽
 * @param height 高
 * @param type 裁切类型3=缩放4=裁切
 */
export function imgFixed(imgUrl: ImgObj, width?: number, height?: number, type?: number) {
    if (!imgUrl.url) {
        return ''
    }
    if (imgUrl.source === 'jydata') {
        // 鲸鱼图片走阿里云裁切
        return aliImgClip(imgUrl.url, width, height, type = 0)
    } else {
        // 票神图片代理裁切
        return imgProxy(imgUrl.url, width, height, type = 4)
    }
}

/**
 *
 * @param url 阿里云图片 url
 * @param width 宽
 * @param height 高
 * @param type 裁切类型 和票神对应，目前只用了3=缩放 4=等比裁切
 * 阿里官方文档：https://help.aliyun.com/document_detail/44688.html
 */
export function aliImgClip(url: string, width?: number, height?: number, type = 0) {
    let clipType = ''
    const wid = width ? (',w_' + Math.round(width)) : ''
    const hei = height ? (',h_' + Math.round(height)) : ''
    switch (type) {
        case 0:
            return url
        // case 1:
        // 定宽等比缩放，如果高大于需求则截取高为需求
        // case 2:
        // 定宽等比缩放，不限制高
        case 3:
            // 固定宽或者固定高
            // 如果宽大于需求，高大于需求，宽>高，宽等于需求宽，高等比
            // 如果宽大于需求，高大于需求，高>宽，高等于需求高，宽等比
            // 如果宽大于需求，高小于需求，宽等于需求宽，高等比
            // 如果宽小于需求，高大于需求，高等于需求高，宽等比
            // 如果都小则不做处理
            clipType = ',m_lfit'
            return url + '?x-oss-process=image/resize' + encodeURIComponent(clipType + wid + hei)
        case 4:
            // 固定宽和高，如果小于则放大，宽截取中间的需求宽
            clipType = ',m_fill'
            return url + '?x-oss-process=image/resize' + encodeURIComponent(clipType + wid + hei)
    }
}

/**
 * 图片代理，主要是合图片来源于票神的用
 * @param url 原url
 */
export function imgProxy(url: string, width?: number, height?: number, type = 4) {
    // 因域名不同，故票神的图片代理，都走线上
    const link = 'https://picagent.piaoshen.com/picture/cut_picture?uri='
    return link +
        encodeURIComponent(url) +
        (width ? '&width=' + Math.round(width) : '') +
        (height ? ('&height=' + Math.round(height)) : '') +
        '&clipType=' + type

}
