export function getSexOption(data: any) {
  const option: object =  {
    // title样式
    title: {
        text: data.title,
        left: 'left',
        padding: 20,
    },
    // tooltip 提示
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // 展示的数据
    legend: {
        orient: 'vertical',
        left: '70%',
        itemWidth : 6,
        itemHeight: 6,
        icon: 'circle',
        y: 'center',
        data: data.optionName,
        formatter(name: any) {
          let target: string = ''
          data.optionData.forEach((it: any) => {
            if (name == it.name) {
                target = '' + (it.value).toFixed(1) + ''
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


export function getPointOption(data: any) {
  const option: object =  {
    // title样式
    title: {
        text: data.title,
        left: 'left',
        padding: 20,
        formatter(name: any) {
          const arr = [
            '{b|' + data.title + '}{a|?%}']
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
        left: '62%',
        itemWidth : 6,
        itemHeight: 6,
        icon: 'circle',
        y: 'center',
        data: data.optionName,
        formatter(name: any) {
          let target: string = ''
          data.optionData.forEach((it: any) => {
            if (name == it.name) {
                target = '' + (it.value).toFixed(1) + ''
              }
          })
          const arr = [
            '{b|' + name + '}{a|' + target + '%}']
            return arr.join()
          },
        textStyle: {
            rich: {
                a: {
                    fontSize: 16,
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
            radius: ['40%', '60%'],
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

export function getRingOption(data: any) {
  const option: object =  {
    title: {
        text: data.title,
        left: 'left',
        padding: 20,
        textStyle: {
          fontSize: '20',
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
            radius: ['40%', '60%'],
            center: ['50%', '50%'],

            data: data.data,
            label: {
              // 此处修改指示线的样式
              normal: {
                    formatter: '{a|{d}%}{b|{b}}\n\n',
                    borderWidth: 20,
                    borderRadius: 4,
                    padding: [0, -60 ,  0 , -60],
                    rich: {
                        a: {
                            color: '#333',
                            fontSize: 12,
                            lineHeight: 2,
                            padding: [25, 0, 90, 10]
                        },
                        b: {
                            fontSize: 12,
                            lineHeight: 2,
                            padding: [-20, 0, 0, -35]
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
                        length: 5,
                        length2: 80,
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
