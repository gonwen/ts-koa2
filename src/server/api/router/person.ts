// person
import getFileName from '../../../utils/getFileName'
import addPerson from '../../db/person/add'
import listPerson from '../../db/person/list'
const prefixbase:string = '/' + getFileName(__filename)
const configData: object = {
    dec: '案例板块',
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
                let json = await listPerson()
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
        }
    ]
}
export = configData
