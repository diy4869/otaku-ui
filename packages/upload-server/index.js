const Koa = require('koa')
const KoaRouter = require('koa-router')
const body = require('koa-body')

const app = new Koa()
const router = new KoaRouter()

router
  .post('/upload', async (ctx) => {
    console.log(ctx.request.files)
  })


app
  .use(body({
    multipart: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log('服务启动中')
  })