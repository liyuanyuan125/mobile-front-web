import ApiHelper from './signHelper'
import { random } from '@/fn/string'
export default (options: any) => {

    const finalUrl = { url: options.baseURL + options.url }
    // api签名
    const mxApiHelper = new ApiHelper(options.method)
    const timeStamp = new Date().getTime()
    const method = options.method.toUpperCase()
    const postData = method === 'GET' ? mxApiHelper.setPostData(options.params) : options.data
    const signature = mxApiHelper.generateSignature(timeStamp, finalUrl.url, postData)
    return {
        'X-PS-Platform': 'h5',
        'X-PS-SendTS': timeStamp,
        'X-PS-Check': signature,
        'X-PS-CID': random('h5'),
    }
}
