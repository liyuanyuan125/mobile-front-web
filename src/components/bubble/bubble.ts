
export function fillList(dataLength: number) {
  const empty = {
    name: '',
    value: -1
  }
  let fillItem
  switch (dataLength) {
    case 7:
      fillItem = new Array(2).fill(empty)
      break
    case 6:
      fillItem = new Array(2).fill(empty)
      break
    case 5:
      fillItem = new Array(2).fill(empty)
      break
    case 4:
      fillItem = new Array(3).fill(empty)
      break
    case 3:
      fillItem = new Array(4).fill(empty)
      break
    case 2:
      fillItem = new Array(4).fill(empty)
      break
    case 1:
      fillItem = new Array(4).fill(empty)
      break
    default:
      fillItem = new Array(1).fill(empty)
      break
  }
  return fillItem
}
