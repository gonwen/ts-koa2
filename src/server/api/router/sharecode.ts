// person
import getFileName from '../../../utils/getFileName'
import addSharecode from '../../db/sharecode/add'
import infoSharecode from '../../db/sharecode/info'
const prefixbase:string = '/' + getFileName(__filename)
const configData: object = {
    dec: '分享代码',
    path: prefixbase,
    api: [
        {
            url: '/add',
            type: 'DB',
            nmd: 'post',
            async callback (res) {
                let json: any = await addSharecode(res)
                json.code = json.flag ? 0 : -1
                return {data: json}
            },
            vad: false
        },
        {
            url: '/info',
            type: 'DB',
            nmd: 'get',
            async callback (res) {
                let json: any = await infoSharecode(res)
                json.code = json.flag ? 0 : -1
                return {data: json}
            },
            vad: false
        }
    ]
}
export = configData
