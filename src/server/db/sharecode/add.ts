import Sharecode from './index'

export default async (res) => {
    let data: any = ''
    let flag: boolean = false
    let msg: string | object = ''
    let code: string = res.code || ''
    let name: string = res.name || ''
    let mode: string = res.mode || ''
    try {
        let person = new Sharecode({
            name: name,
            code: code,
            mode: mode
        })
        let saveRes = await person.save()
        data = name
        msg = '添加成功'
        flag = true
    } catch (e) {
        data = e
        msg = e.message
    }
    return {data, flag, msg}
}
