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
    },
    // 显示原生播放器
    {
        name: '显示原生播放器',
        index: 8,
        sdkName: 'showVideoPlayer',
        data: {
            // tslint:disable-next-line:max-line-length
            videoUrl: 'https://piaoshen.oss-cn-beijing.aliyuncs.com/moive/videos/2019/08/30/d38b665493634f63a322729202c537de.mp4',
            // tslint:disable-next-line:max-line-length
            posterUrl: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/moive/images/2019/08/30/471524384f5a44a99635016afdd365e9.jpg',
            videoTop: 0,
            videoLeft: 0,
            videoWidth: 750,
            videoHeight: 200,

        },
        callBackName: ''
    },
    // 显示图片浏览
    {
        name: '显示图片浏览',
        index: 9,
        sdkName: 'showImageBrowser',
        data: {
            currentImageIndex: 1,
            photoImageUrls: [
                // tslint:disable-next-line:max-line-length
                'http://piaoshen.oss-cn-beijing.aliyuncs.com/moive/images/2019/08/30/471524384f5a44a99635016afdd365e9.jpg',
                'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blobfnf0giug00800430.jpg'
            ],
            originUrl: location.href,
            isGif: 0
        },
        callBackName: ''
    }
]
export default data
