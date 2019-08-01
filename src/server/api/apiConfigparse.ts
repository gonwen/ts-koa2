export default (ores, cfig) => {
    let data:any = null
    let msg:string = ''
    let code:number = -1
    let flag:boolean = false
    let config:any = cfig || null
    if (ores && ores.data) {
        let cky = (config.pdt && config.pdt.fg && config.pdt.fg.ky) || 'code'
        let mky = (config.pdt && config.pdt.mg && config.pdt.mg.ky) || 'msg'
        let dky = (config.pdt && config.pdt.dt && config.pdt.dt.ky) || 'data'
        let dtp = (config.pdt && config.pdt.dt && config.pdt.dt.ty) || 'A'
        msg = ores.data[mky] || msg
        let cvl = ores.data[cky]
        switch (cky) {
            case 'code':
                code = cvl || -1
                if (cvl >= 0) flag = true
                break
            case 'flag':
                if (cvl === 'success') flag = true
                break
            case 'success':
                if (cvl) flag = true
                break
        }
        if (config.cbf) {
            data = config.cbf(ores.data[dky])
        } else {
            let dvl = ores.data[dky]
            let dvlType = (dvl && dvl.constructor) || ''
            if (dvl) {
                let sig = config.sig
                if (sig) {
                    switch (dtp) {
                        case 'A':
                            if (dvlType === Array) {
                                //
                                data = []
                                dvl.forEach(item => {
                                    let itemJson = {}
                                    sig.forEach(its => {
                                        itemJson[its.nk] = item[its.ok] || ''
                                    })
                                    data.push(itemJson)
                                })
                            }
                            break
                        case 'J':
                            break
                        case 'B':
                            break
                        case 'S':
                            break
                        case 'N':
                            break
                    }
                } else data = dvl
            }
        }
    }
    if (flag) code = 0
    else msg = msg || '服务出错'
    return {
        data: data,
        msg: msg,
        code: code,
        flag: flag
    }
}
