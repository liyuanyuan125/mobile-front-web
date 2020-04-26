export function getSexOption(data: any) {
  const option: object =  {
    // title样式
    title: {
        text: data.title,
        left: data.titleLeft,
        padding: data.titleMargin,
        show: data.titleShow,
        textStyle: {
          fontSize: data.titleSize,
          fontWeight: data.titleWeight
      }
    },
    // tooltip 提示
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        show: false
    },
    // 展示的数据
    legend: {
        orient: 'vertical',
        left: '71%',
        itemWidth : 6,
        itemHeight: 6,
        icon: 'circle',
        y: 'center',
        data: data.optionName,
        formatter(name: any) {
          let target: string = ''
          data.optionData.forEach((it: any) => {
            if (name == it.name) {
                target = '' + (it.value).toFixed(data.legendtoFixed) + ''
              }
          })
          const arr = [
            '{a|' + target + '%}',
            '{b|' + name + '}']
            return arr.join('\n')
          },
        textStyle: {
            rich: {
                a: {
                    fontSize: 16,
                    verticalAlign: 'middle',
                    align: 'center',
                    padding: [0, 10, 19, -1],
                    fontWeight: 'bold'
                },
                b: {
                    fontSize: 12,
                    align: 'center',
                    padding: [0, 10, 5, -1],
                    lineHeight: 15,
                    color: '#999'
                }
            }
        }
    },
    color: data.color,
    series: [
        {
            name: data.title,
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    show: data.emphasisShow,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data.data
        }
      ]
    }
    return option

}

// 敏感度
export function getPointOption(data: any) {
  const option: object =  {
    // title样式
    title: {
      text: data.title,
      left: data.titleLeft,
      padding: data.titleMargin,
      show: data.titleShow,
      textStyle: {
        fontSize: data.titleSize,
        fontWeight: data.titleWeight
    },
      formatter(name: any) {
        const arr = [
          '{b|' + data.title + '}']
          return arr.join()
        }
    },
    // tooltip 提示
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // 展示的数据
    legend: {
        orient: 'vertical',
        left: '60%',
        itemWidth : 6,
        itemHeight: 6,
        icon: 'circle',
        y: 'center',
        data: data.optionName,
        formatter(name: any) {
          let target: string = ''
          data.optionData.forEach((it: any) => {
            if (name == it.name) {
                target = '' + (it.value).toFixed(data.legendtoFixed) + ''
              }
          })
          const arr = [
            '{b|' + name + '}{a|' + target + '%}']
            return arr.join()
          },
        textStyle: {
            rich: {
                a: {
                    fontSize: 14,
                    verticalAlign: 'middle',
                    align: 'center',
                    padding: [0, -10, 0, 0],
                    fontWeight: 'bold'
                },
                b: {
                    fontSize: 12,
                    align: 'center',
                    padding: [0, 10, 0, 0],
                    color: '#999'
                }
            }
        }
    },
    color: data.color,
    series: [
        {
            name: data.title,
            type: 'pie',
            radius: ['32%', '50%'],
            center: ['33%', '50%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data.data
        }
      ]
    }
    return option

}
//  粉丝指数
export function getRingOption(data: any) {
  const option: object =  {
    title: {
      text: data.title,
      left: data.titleLeft,
      padding: data.titleMargin,
      show: data.titleShow,
      textStyle: {
        fontSize: data.titleSize,
        fontWeight: data.titleWeight
    }
  },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        show: false
    },
    legend: {
        show: false,
    },
    color: data.color,
    series: [
        {
            name: '',
            type: 'pie',
            radius: [data.withinProportion, data.externalProportion],
            center: ['50%', '50%'],

            data: data.data,
            label: {
              // 此处修改指示线的样式
              normal: {
                    // formatter: '{a|{d}%}{b|{b}}\n\n',
                    formatter(a: any) {
                      const arr = [
                        '{b|' + a.name + '}{a|' + parseFloat(a.percent).toFixed(1) + '%}']
                        return arr.join()
                    },
                    borderWidth: 20,
                    borderRadius: 4,
                    rich: {
                        a: {
                            fontSize: data.fontsize,
                            lineHeight: 2,
                        },
                        b: {
                            fontSize:  data.fontsize,
                            lineHeight: 2,
                        }
                    }
                },
              emphasis: {
                show: true,
              }
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 5,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            },
            itemStyle: {
                normal: {
                    label: { // 此处为指示线文字
                        show: true,
                        position: 'outer', // 标签的位置
                        alignTo: 'labelLine',
                        bleedMargin: 4,
                        textStyle: {
                            fontWeight: 200,
                            fontSize: 20 // 文字的字体大小
                        }
                    },
                    labelLine: {  // 指示线状态
                        show: true,
                        smooth: 0,
                        length: 15,
                        length2: 3,
                        lineStyle: {
                          width: 1,
                          type: 'solid'
                        }
                    },
                    rich: {
                        color: '#ffo'
                    }
                }
            }
        }
    ]
}

    return option

}

