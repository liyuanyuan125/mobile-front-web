import ApiHelper from './signHelper'
export default (options: any) => {

    const finalUrl = { url: options.baseUrl + options.path }
    // api签名
    const mxApiHelper = new ApiHelper(options.method)
    const timeStamp = new Date().getTime()
    const postData = mxApiHelper.setPostData(options.params)
    const signature = mxApiHelper.generateSignature(timeStamp, finalUrl.url, postData)
    const cid = mxApiHelper.createRandom32() // 生成32位的随机字符串
    const defaultOptions = {
        // dataType: "json",
        showLoading: true,
        showNetWorkErr: false,
        crossDomain: true,
        timeout: 60000,
        type: options.method,
        xhrFields: {
            withCredentials: true,
        },
        postData,
    }
    const defaultHeader = {
        'X-PS-ChannelCode': 'h5',
        'X-PS-TS': timeStamp,
        'X-PS-Version': '1.0',
        'X-PS-Check': signature,
        'X-PS-CID': cid,
    }
    const finalHeader = { headers: Object.assign(defaultHeader, options.headers) }

    const xhrOptions = Object.assign(defaultOptions, options, finalHeader, finalUrl)
    return xhrOptions
}
