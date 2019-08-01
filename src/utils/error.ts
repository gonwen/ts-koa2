// this is error handle middleware
export default (err, ctx, log) => {
    err.message = JSON.stringify({
        code: -400,
        msg: `${err.name}: ${err.message}`,
        data: `${err.stack}`,
    })
    log.e(ctx, err, 0)
}
