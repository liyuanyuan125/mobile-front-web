export default {
  name: 'RenderTitle',
  functional: true,
  props: {
    render: Function,
    index: Number
  },
  render: (h: any, ctx: any) => {
    const params = {
      index: ctx.props.index
    }
    return ctx.props.render(h, params)
  }
}
