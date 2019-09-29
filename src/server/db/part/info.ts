import Person from './index'

export default async (res) => {
    let data = {
        data: {},
        flag: false,
        msg: ''
    }
    let id:string = res.id || ''
    try {
        if (id) {
            let query = Person.findOne()
            query.where('id', id)
            query.select('-_id')
            let exec = await query.exec()
            if (exec) {
                data.data = exec
                data.flag = true
                data.msg = '族信息获取成功'
            } else data.msg = '查询失败'
        } else data.msg = '不能为空'
    } catch (e) {
        data.data = e
        data.msg = e.message
    }
    return data
}
