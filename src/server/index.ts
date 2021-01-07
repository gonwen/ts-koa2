import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import createAllRouter from './api/index'
import log from '../utils/logs'
import errorMiddleware from '../utils/error'
import db from './db/index'
const packageConfig = require('../../package.json')
const app = new Koa()

const start = async () => {
    const host:string = packageConfig.config.server.host || '0.0.0.0'
    const port:number = packageConfig.config.server.port || 3092

    app.use(async (ctx, next) => {
        let origin = ctx.req.headers.origin
        ctx.set('Access-Control-Allow-Origin', origin)
        ctx.set('Access-Control-Allow-Credentials', 'true')

        let opt:any = {
            'maxAge': 1000 * 60 * 60,
            'SameSite': 'None',
            'Secure': true,
            'domain': origin
        }
        ctx.cookies.set('user-info-sid', 'sthigregregregregregregrheigheg', opt)

        // ctx.set('Access-Control-Allow-Origin', '*')
        // ctx.set('Access-Control-Allow-Credentials', 'true')
        // ctx.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
        // ctx.set('Access-Control-Allow-Headers', 'cache-control,content-type,hash-referer,x-requested-with')
        await next()
    })
    let limitSize = '50mb'
    app.use(bodyparser({
        formLimit: limitSize,
        jsonLimit: limitSize,
        textLimit: limitSize,
        enableTypes: ['json', 'form', 'text']
    }))
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
// async function starts() {}
start()
