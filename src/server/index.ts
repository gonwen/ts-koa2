import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import createAllRouter from './api/index'
import * as log from '../utils/logs'
import errorMiddleware from '../utils/error'
const packageConfig = require('../../package.json')

const app = new Koa()

async function start() {

    const host:string = packageConfig.config.server.host || '0.0.0.0'
    const port:number = packageConfig.config.server.port || 3091

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
    app.listen(port, host)
    log.c(`server start succuss about: ${host}:${port}`)
}

start()
