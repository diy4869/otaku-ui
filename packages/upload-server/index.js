const Koa = require('koa')
const KoaRouter = require('koa-router')
const body = require('koa-body')
const path = require('path')
const formidable = require('formidable')

const app = new Koa()
const router = new KoaRouter()

router
  .post('/upload', async (ctx) => {
    // ctx.
    console.log(ctx.request.files)
    const form = formidable({
      multipart: true,
      uploadDir: path.resolve(__dirname + '/uploads'),
      formidable: {
        bytesReceived: 1024 * 1024 * 1024 * 1024,
        maxFileSize: 1024 * 1024 * 1024 * 1024 // 1tb
      }
    })

    form.parse(ctx.req, (err, fields, files) => {
      if (err) {
        console.log(err)
      }
      // console.log
      ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
        ctx.state = { fields, files };
        ctx.body = JSON.stringify(ctx.state, null, 2);

    })
    // ctx.body = 'hello world'
    // formidable
  })


function cors () {
    return async function (ctx, next) {
      ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE')
      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.set('Access-Control-Allow-Headers', '*')

  
      if (ctx.method === 'OPTIONS') {
        ctx.status = 204
        await next()
      } else {
        await next()
      }
    }
  }
  

  console.log(__dirname + '/uploads')
app
  .use(cors())
  .use(body())
 
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log('服务启动中')
  })