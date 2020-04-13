const lineClassList = [
  'van-ellipsis',
  'van-multi-ellipsis--l2',
  'van-multi-ellipsis--l3',
]

/**
 * 获取行数控制对应的类名
 * @param lines 行数，合法的值为 1、2、3
 */
export function getLineClass(lines: number | null | undefined) {
  return typeof lines === 'number' && (lines == 1 || lines == 2 || lines == 3)
   ? lineClassList[lines - 1]
   : ''
}
