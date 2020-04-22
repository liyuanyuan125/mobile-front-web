import md5 from 'md5'
export default class ApiHelper {
    private clientKey: string = '1234567'
    private channelCode: string = 'h5'
    private method: string

    constructor(method: string) {
        this.method = method ? method.toUpperCase() : 'GET'
    }

    public generateSignature(timeStamp: number, query: string, postData: string) {
        let signature = ''
        // query = query.replace('http://', 'https://')
        signature += this.channelCode
        signature += this.clientKey
        signature += timeStamp
        if (this.method === 'POST') {
            signature += query
            signature += postData
        } else {
            signature += query
            if (postData) {
                signature += '?'
                signature += postData
            }
        }
        return md5(signature)
    }

    public setPostData(param: any) {
        const strArr = []
        for (const key in param) {
            if (this.method === 'POST') {
                if (typeof param[key] === 'object') {
                    strArr.push(this.flatParamObjectValue(key, param[key]))
                } else {
                    if (param[key]) {
                        strArr.push(key + '=' + encodeURIComponent(param[key]))
                    }
                }
            } else {
                if (param[key]) {
                    strArr.push(key + '=' + encodeURIComponent(param[key]))
                }
            }
        }
        return strArr.join('&')
    }


    public flatParamObjectValue(key: string, value: any) {
        const childObjectValueArr: any = []
        for (const k in value) {
            if (typeof value[k] === 'object') {
                childObjectValueArr.push(this.flatParamObjectValue(key + '[' + k + ']', value[k]))
            } else {
                childObjectValueArr.push(key + '[' + k + ']' + '=' + encodeURIComponent(value[k]))
            }
        }
        return childObjectValueArr.join('&')
    }


}
