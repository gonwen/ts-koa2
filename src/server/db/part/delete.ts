import Person from './index'

export default async (res) => {
    let data = {
        data: {},
        flag: false,
        msg: ''
    }
    let ids:string = res.ids || ''
    let arr = []
    try {
        if (ids) arr = ids.split(',')
        if (arr && arr.length > 0) {
            let query = Person.find()
            await query.remove({id: {$in: arr}}, (err, info) => {
                if (!err && info && info.ok === 1 && info.n > 0) {
                    data.msg = '删除成功'
                    data.flag = true
                } else data.msg = '删除失败'
            })
        } else data.msg = '不能为空'
    } catch (e) {
        data.data = e
        data.msg = e.message
    }
    return data
}
