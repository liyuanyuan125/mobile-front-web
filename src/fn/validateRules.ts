/***
 * 通用验证规则库
 *
 * NOTE:
 *
 * 1、不通用的规则不要放在这里
 *
 * 2、所有的验证规则，均为函数，并以 validate 开头，返回 string 值或 undefined，
 *    如果 string 为空或 undefined，则表示验证通过；非空 string 是错误消息
 *
 * 3、目前，所有函数必须为「同步」函数，异步验证稍后有需要再讨论
 */
import moment from 'moment'
/**
 * 验证密码
 * @param password 密码值
 */
export function validatePassword(password: string): string | undefined {
  if (password === '') {
    return '密码不能为空'
  }

  if (/\s/.test(password)) {
    return '密码不能含有空格'
  }

  if (
    !/[a-z]/.test(password) &&
    !/[A-Z]/.test(password) &&
    !/\d/.test(password)
  ) {
    return '密码必须字母、数字组合'
  }

  // 一般直接在 apply 上设置 maxlength 为 16，此处就不验证过长了，最后一条规则兜底
  if (password.length < 6) {
    return '密码过短，不能少于 6 位'
  }

  if (!/^[a-zA-Z\d]{6,16}$/.test(password)) {
    return '密码为 6-16 位字母、数字组合'
  }
}

/**
 * 验证中国手机号
 * @param mobile 手机号
 */
export function validataTel(mobile: string): string | undefined {
  const reg = /^1[3-9]\d{9}$/
  if (!reg.test(mobile)) {
    return '手机号不符合规范'
  }
}

/**
 * 校验验证码
 * @param code 验证码
 */
export function validataCode(code: string): string | undefined {
  const reg = /^[0-9]{6}$/
  if (!reg.test(code)) {
    return '验证码为 6 位数字'
  }
}

/**
 * 验证邮箱地址
 * @param email 邮箱
 */
export function validateEmail(email: string): string | undefined {
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!reg.test(email)) {
    return '邮箱格式错误'
  }
}

/**
 * 时间戳格式转换年月日
 */
export function formatTimes(value: any) {
  if (!value) {
    return ''
  }
  const date: any = new Date(value)
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
}

/**
 * 年月日转换时间戳格式
 */
export function formatTimestamp(val: any) {
  if (!val) {
    return ''
  }
  return new Date(val).getTime()
}

/**
 * 数字格式化保留两位小数每个三位加逗号
 */
export function formatNumber(num: number, type?: any) {
  if (num != undefined) {
    if (type == 2) {
      return num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    } else {
      return num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }
  }
}

/**
 * 日期转换格式
 * type = 2 格式转化去除 -
 */
type strFor = string | number
export function formatConversion(date: strFor, type?: number) {
  const format = 'YYYY-MM-DD'
  const strDate = String(date).trim()
  if (/^\d{4}\d{2}\d{2}$/.test(strDate)) {
    return moment(strDate).format(format)
  }
  if (/^(\d{4})[-\/\.]?(\d{2})$/.test(strDate)) {
    return [RegExp.$1, RegExp.$2].join('-')
  }
  if (type == 2) {
    return strDate.replace(/-/g, '')
  }
  return date
}

/**
 * 获取当前日期
 * 格式 = 20190616
 */
export function getTodayDate() {
  const todayDate = new Date().toLocaleDateString().split('/')
  const year = todayDate[0]
  const mouth = todayDate[1].length == 1 ? '0' + todayDate[1] : todayDate[1]
  const date = todayDate[2].length == 1 ? '0' + todayDate[2] : todayDate[2]
  return `${year}${mouth}${date}`
}

/**
 * 数字规则
 * 千用逗号表示，万用万字表示保留一位小数，亿保留1位小数
 */
export function roleNumber(num: string | number) {
  num = '' + num
  if (num.length < 4) {
    return num
  } else if (num.length == 4) {
    return num.replace(/^\d+/, (m: string) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
  } else if (num.length >= 5 && num.length < 9) {
    const tenThousand = (Number(num) / 10000).toFixed(1)
    const number = tenThousand.replace(/^\d+/, (m: string) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
    return `${number}万`
  } else if (num.length >= 9) {
    const calculate = (Number(num) / 100000000).toFixed(1)
    const number = calculate.replace(/^\d+/, (m: string) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
    return `${number}亿`
  } else {
    return 0
  }
}
/**
 * 验证URL格式
 * @param url 链接
 */
export function validateURL(url: string): boolean | undefined {
  const reg = /^https:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"\"])*$/
  return reg.test(url)
}
