import Person from './index'

export default async (res) => {
    let data = {
        flag: false,
        data: null
    }
    let size:number = Number(res.s) || 10
    let num:number = Number(res.n) || 1
    let title:string = res.t || ''
    let reg = new RegExp(title,'i')
    let query = Person.find()
    query.skip((num - 1) * size)
    query.limit(size)
    query.where('familyName', reg)
    query.select('familyName id createUserName createDate -_id')
    query.sort({'id': 1})
    let exec = await query.exec()

    let queryCount = Person.find()
    queryCount.where('familyName', reg)
    queryCount.select('id')
    let count = await queryCount.count()

    if (exec) {
        data.data = {
            list: exec,
            total: count,
            totalPage: Math.ceil(count/size)
        }
        data.flag = true
    }
    return data
}
