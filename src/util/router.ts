import { MapType } from './types'
import { stringToBoolean, castArray, arrayParse } from '@jydata/fe-util'
import { Route } from 'vue-router'

/**
 * 处理 route 中的参数类型
 * @param config 配置
 */
export function paramTypes(
  config: MapType<NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor>
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
        : strVal
      map[key] = value
      return map
    }, {} as MapType<any>)
    return props
  }
}
