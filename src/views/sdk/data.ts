import { random } from '@/fn/string'
interface SDKType {
    name: string
    index: number
    sdkName: string
    data: any
    callBackName: string
}
// 参考文档：http://zentao.aiads.com/index.php?m=doc&f=view&docID=21
const data: SDKType[] = [
    // 打开h5界面
    {
        name: '打开h5界面',
        index: 0,
        sdkName: 'openAppLinkClient',
        data: {
            applinkData: 'https://m.piaoshen.com',
            originUrl: location.href,
            // linkType:'1' 埋点用，目前可能用不到
        },
        callBackName: ''
    },
    // 获取API请求验签值
    {
        name: '获取API请求验签值',
        index: 1,
        sdkName: 'getApiSignature',
        data: {
            apiUrl: 'https://api.aiads-dev.com/common/get_common_data',
            httpMethod: 'get',
            params: 'identify=PARTNER_BUSINESS',
            platform: 'h5'
        },
        callBackName: random('getApiSignature', 'CallBack')
    },
    // 上传图片
    {
        name: '上传图片',
        index: 2,
        sdkName: 'handleUploadImage',
        data: {
            sourceType: 1,
            imageCount: 1
        },
        callBackName: 'uploadImageCallBack'
    },
    // 回到上一级原生页面（有可能刷新）
    {
        name: '回到上一级原生页面（有可能刷新）',
        index: 3,
        sdkName: 'handleGoBack',
        data: {
            isCloseWindow: true,
            refreshWindow: true,
        },
        callBackName: ''
    },
    // 拨打电话
    {
        name: '拨打电话',
        index: 4,
        sdkName: 'handleDialTel',
        data: {
            phoneNumber: '110'
        },
        callBackName: ''
    },
    // 设置导航栏
    {
        name: '设置导航栏',
        index: 5,
        sdkName: 'setNavBarStatus',
        data: {
            isShowNavBar: true,
            isWebViewOnScreenTop: true,
            navBarMainTitle: '导航栏标题',
            isShowRightShareBtn: true,
            shareContent: {
                summary: '分享描述',
                title: '分享标题',
                url: location.href,
                pic: 'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blob1dn0giug00800420.jpg'
            }
        },
        callBackName: ''
    },
    // 获取客户端网络状态
    {
        name: '获取客户端网络状态',
        index: 6,
        sdkName: 'getNativeNetStatus',
        data: {
        },
        callBackName: 'nativeNetStatusCallBack'
    },
    // 显示原生分享弹框
    {
        name: '显示原生分享弹框',
        index: 7,
        sdkName: 'showShare',
        data: {
            summary: '分享描述',
            title: '分享标题',
            url: location.href,
            pic: 'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blob1dn0giug00800420.jpg'
        },
        callBackName: 'showShareCallBack'
    }
]
export default data
