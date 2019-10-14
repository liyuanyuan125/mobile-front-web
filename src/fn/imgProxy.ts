/**
 * 图片代理，主要是合图片来源于票神的用
 * @param url 原url
 * @param digits 要保留的位数
 */
export function imgProxy(url: string, width: number, height?: number, type = 4) {
    // 因域名不同，故票神的图片代理，都走线上
    // const host = hostName.split(".")[1];
    const link = 'https://picagent.piaoshen.com/picture/cut_picture?uri='
    return link +
        encodeURIComponent(url) +
        '&width=' + Math.round(width) +
        (height ? ('&height=' + Math.round(height)) : '') +
        '&clipType=' + type

}
