import Sharecode from './index'

export default async (res) => {
    let data: any = ''
    let flag: boolean = false
    let msg: string | object = ''
    let name: string = res.name || ''
    try {
        let query = Sharecode.findOne()
        query.where('name', name)
        query.select('-_name')
        let exec = await query.exec()
        if (exec) {
            data = {
                name: exec.name,
                code: exec.code,
                mode: exec.mode
            }
            msg = '息获取成功'
            flag = true
        } else msg = '查询失败'
    } catch (e) {
        data = e
        msg = e.message
    }
    return {data, flag, msg}
}
