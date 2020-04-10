// this is logger handle middleware
import * as log4js from 'log4js'
import logConfig from '../config/log.config'

log4js.configure(logConfig)

const errorLogger = log4js.getLogger('errorLogger')
const resLogger = log4js.getLogger('resLogger')
const handleLogger = log4js.getLogger('handleLogger')
const consoleLogger = log4js.getLogger()

const log = {
    e (ctx, err, resTime) {
        if (ctx && err) errorLogger.error(formatError(ctx, err, resTime))
    },
    r (ctx, resTime) {
        if (ctx) resLogger.info(formatRes(ctx, resTime))
    },
    h (ctx, resTime, info) {
        if (ctx && info) handleLogger.info(formatHandle(ctx, resTime, info))
    },
    c (info) {
        if (info) consoleLogger.info(formatInfo(info))
    },
    oc (err) {
        if (err) errorLogger.error(formatOriginError(err))
    }
}

// 格式化请求日志
const formatReqLog = (ctx, resTime) => {
    let req = ctx.req
    let getClientIp = (req) => {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress || ''
    }
    let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/)
    let logText:string = ''
    // 访问方法
    let method = ctx.method
    logText += 'request method: ' + method + '\n'
    // 请求原始地址
    logText += 'request originalUrl:  ' + ctx.URL.href + '\n'
    // 客户端ip
    logText += 'request client ip:  ' + ip + '\n'
    // 客户端设备信息
    logText += 'request client info:  ' + req.headers['user-agent'] + '\n'
    // 请求参数
    if (method === 'GET') logText += 'request query:  ' + JSON.stringify(ctx.query) + '\n'
    else logText += 'request body: ' + '\n' + JSON.stringify(ctx.request.body) + '\n'
    // 服务器响应时间
    logText += 'response time: ' + resTime + '\n'
    return logText
}
// 格式化响应日志
const formatRes = (ctx, resTime) => {
    let res = ctx.res
    let logText:string = ''
    // 响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n'
    // 添加请求日志
    logText += formatReqLog(ctx, resTime).toString()
    // 响应状态码
    logText += 'response status: ' + res.statusCode + '\n'
    // 响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(res.body) + '\n'
    // 响应日志结束
    logText += '*************** response log end ***************' + '\n'
    return logText
}
// 格式化操作日志
const formatHandle = (ctx, resTime, info) => {
    let logText:string = ''
    // 操作日志开始
    logText += '\n' + '*************** handle log start ***************' + '\n'
    // 添加请求日志
    logText += formatReqLog(ctx, resTime).toString()
    // 操作信息
    logText += 'handle message: ' + info.toString() + '\n'
    // 操作日志结束
    logText += '*************** handle log end ***************' + '\n'
    return logText
}
// 格式化日志信息
const formatInfo = (info) => {
    let logText:string = ''
    // 信息日志开始
    logText += '\n' + '*************** console log start ***************' + '\n'
    // 信息信息
    logText += 'console message: ' + info.toString() + '\n'
    // 信息日志结束
    logText += '*************** console log end ***************' + '\n'
    return logText
}
// 格式化错误日志
const formatError = function(ctx, err, resTime) {
    let logText:string = ''
    // 错误信息开始
    logText +=  '\n' + '*************** error log start ***************' +  '\n'
    // 添加请求日志
    logText += formatReqLog(ctx, resTime).toString()
    // 错误名称
    logText += 'err name: ' + err.name +  '\n'
    // 错误详情
    logText += 'err message: ' + err.stack +  '\n'
    // 错误信息结束
    logText += '*************** error log end ***************' + '\n'
    return logText
}
// 格式化错误日志
const formatOriginError = function(err) {
    let logText:string = ''
    // 错误信息开始
    logText +=  '\n' + '*************** error log start ***************' +  '\n'
    // 错误名称
    logText += 'err name: ' + err.name +  '\n'
    // 错误详情
    logText += 'err message: ' + err.stack +  '\n'
    // 错误信息结束
    logText += '*************** error log end ***************' + '\n'
    return logText
}
export default log
