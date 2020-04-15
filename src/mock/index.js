if (process.env.NODE_ENV === 'development') {
  const Mock = require('mockjs2')

  // require('./api/music')

  Mock.setup({
    timeout: 800
  })

  console.log(
    '%capi mock worked',
    `
      color: #ee0;
      background-color: #242424;
      font-size: 18px;
      font-family: Monaco;
      padding: 3px 8px;
      border-radius: 2px;
    `
  )
}
