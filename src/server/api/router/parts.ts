// person
import getFileName from '../../../utils/getFileName'
import addPerson from '../../db/part/add'
import listPerson from '../../db/part/list'
import deletePart from '../../db/part/delete'
import infoPart from '../../db/part/info'
const prefixbase:string = '/' + getFileName(__filename)
const configData: object = {
    dec: '族',
    path: prefixbase,
    api: [
        {
            url: '/add',
            type: 'DB',
            async callback (res) {
                await addPerson()
                return {
                    data: {
                        code: 0,
                        flag: true,
                        msg: 'shi db test',
                        data: {}
                    }
                }
            },
            vad: false
        },
        {
            url: '/list',
            type: 'DB',
            async callback (res) {
                let json = await listPerson(res)
                let flag = json.flag
                let data = json.data
                return {
                    data: {
                        code: flag ? 0 : -1,
                        flag: !!flag,
                        msg: flag ? '成员列表查询成功' : data.msg,
                        data: data
                    }
                }
            },
            vad: false
        },
        {
            url: '/delete',
            type: 'DB',
            async callback (res) {
                let json = await deletePart(res)
                let flag = json.flag
                let data = json.data
                return {
                    data: {
                        code: flag ? 0 : -1,
                        flag: !!flag,
                        msg: json.msg,
                        data: data
                    }
                }
            },
            vad: false
        },
        {
            url: '/info',
            type: 'DB',
            async callback (res) {
                let json = await infoPart(res)
                let flag = json.flag
                let data = json.data
                return {
                    data: {
                        code: flag ? 0 : -1,
                        flag: !!flag,
                        msg: json.msg,
                        data: data
                    }
                }
            },
            vad: false
        }
    ]
}
export = configData
