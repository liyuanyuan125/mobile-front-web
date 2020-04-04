import { MapType } from './types'
import { stringToBoolean, castArray, arrayParse } from '@jydata/fe-util'
import { Route } from 'vue-router'

// 定义简单值，包括：数字、布尔、字符串、普通对象、数组
type SimpleValue = number | boolean | string | object

/**
 * 处理 route 中的参数类型
 * @param config 配置
 */
export function paramTypes(
  config: MapType<
    NumberConstructor
    | BooleanConstructor
    | StringConstructor
    | ArrayConstructor
    | SimpleValue
  >
) {
  return ({ params }: Route) => {
    const props = Object.entries(config)
    .reduce((map, [key, type]) => {
      const strVal = params[key]
      const value = type === Number
        ? (+strVal || 0)
        : type === Boolean
        ? stringToBoolean(strVal)
        : type === Array
        ? castArray(arrayParse(strVal))
        : typeof type !== 'function'
        // type 若不是 function（Number、Boolean、Array 都是 function），
        // 则它就是一个 SimpleValue，直接就用该值
        ? type
        : strVal
      map[key] = value
      return map
    }, {} as MapType<any>)
    return props
  }
}
