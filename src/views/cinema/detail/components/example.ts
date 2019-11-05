interface AgesType {
    range: string
    value: number
}
interface GenderType {
    type: string
    value: number
}
interface MaritalType {
    status: string
    value: number
}
interface PerferType {
    type: string
    value: number
}


// 影院默认数据
export const example: any = {
    userAges: [
        {
            range: '<19岁',
            value: 2.36
        }, {
            range: '19-25岁',
            value: 17.31
        }, {
            range: '26-35岁',
            value: 55.78
        }, {
            range: '36-45岁',
            value: 19.36
        }, {
            range: '46-55岁',
            value: 5.04
        }, {
            range: '>55岁',
            value: 0.14
        }
    ],
    userGender: [{
        type: '男性',
        value: 62.43
    }, {
        type: '女性',
        value: 37.57
    }],
    userMarital: [{
        status: '已婚',
        value: 43.22
    }, {
        status: '未婚',
        value: 56.78
    }],
    consumePerfer: {
        data: [{
            type: '食品饮料',
            value: 1.38
        }, {
            type: '手机、数码',
            value: 0.99
        }, {
            type: '家用电器',
            value: 0.91
        }, {
            type: '家具、厨具',
            value: 0.81
        }, {
            type: '电脑、办公',
            value: 0.63
        }, {
            type: '玩具乐器',
            value: 0.56
        }, {
            type: '个护化妆',
            value: 0.49
        }, {
            type: '鞋靴、箱包',
            value: 0.41
        }, {
            type: '运动户外',
            value: 0.4
        }]
    }
}
