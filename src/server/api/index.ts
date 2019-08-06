import axios from 'axios'
import * as qs from 'qs'
import * as fs from 'fs'
import * as Router from 'koa-router'
import apiConfigParseData from './apiConfigparse'
import baseConfig from '../../config/base.config'
import getSignInfo from '../../utils/sign'
const router = new Router({
    prefix: baseConfig.apiPath
})
let routerDirs:string = '/router'
let routers = fs.readdirSync(__dirname + routerDirs)
const createAllRouter = async (app) => {
    routers.forEach(item => {
        let apiItmes = require(__dirname + routerDirs + '/' + item)
        apiItmes.api.forEach(aitem => {
            let nmd = aitem.nmd || 'get'
            router[nmd](((apiItmes.path || '') + aitem.url), async (ctx) => {
                let md = ctx.method.toLowerCase()
                if (md === 'get' || md === 'post') {
                    let oSign = ctx.req.headers.nd_sign
                    let odata = md === 'post' ? ctx.request.body : ctx.query
                    let nSign = getSignInfo(odata)
                    if (oSign === nSign) {
                        let ores = null
                        let query = odata
                        try {
                            let omd = (aitem.omd && aitem.omd.toLowerCase()) || 'get'
                            if (omd === 'post') ores = await axios.post(aitem.org, qs.stringify(query))
                            else ores = await axios.get(aitem.org, {params: query || {}})
                        } catch {}
                        ctx.body = apiConfigParseData(ores, aitem)
                    } else {
                        ctx.body = {
                            msg: 'sign is error',
                            code: -211,
                            flag: false
                        }
                    }
                } else {
                    ctx.body = {
                        msg: 'method must be get or post',
                        code: -212,
                        flag: false
                    }
                }
                if (ctx.body && ctx.body.code >= 0) {
                 /**/
                }
            })
        })
    })
    app.use(router.routes()).use(router.allowedMethods())
}

export default createAllRouter
