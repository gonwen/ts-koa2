import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import createAllRouter from './api/index'
import log from '../utils/logs'
import errorMiddleware from '../utils/error'
import db from './db/index'
const packageConfig = require('../../package.json')

const app = new Koa()

async function start() {

    const host:string = packageConfig.config.server.host || '0.0.0.0'
    const port:number = packageConfig.config.server.port || 3092

    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin)
        ctx.set('Access-Control-Allow-Credentials', 'true')
        // ctx.set('Access-Control-Allow-Origin', '*')
        // ctx.set('Access-Control-Allow-Credentials', 'true')
        // ctx.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
        // ctx.set('Access-Control-Allow-Headers', 'cache-control,content-type,hash-referer,x-requested-with')
        await next()
    })

    app.use(bodyparser())
    createAllRouter(app)
    app.use(async (ctx, next) => {
        //响应开始时间
        const start = new Date().getTime()
        //响应间隔时间
        let ms:number
        await next()
        ms = (new Date()).getTime() - start
        log.c(ctx.cookies.get('maxAge'))
        log.r(ctx, ms)
    })
    app.on('error', async (err, ctx) => {
        errorMiddleware(err, ctx, log)
    })
    db()
    app.listen(port, host)
    log.c(`server start succuss about: ${host}:${port}`)
}

start()
