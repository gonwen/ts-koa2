// person
import getFileName from '../../../utils/getFileName'
import CreateMmdfile from '../../../utils/mmdfile.create'
import path from "path";
const prefixbase:string = '/' + getFileName(__filename)
const configData: object = {
    dec: 'MMD',
    path: prefixbase,
    api: [
        {
            url: '/tree',
            type: 'DB',
            async callback (res) {
                let path = res.path
                let flag = false
                let msg = 'no found file'
                let code = -1
                let data = ''
                if (path) {
                    const createMmd = new CreateMmdfile()
                    await createMmd.readFile(path)
                    if (createMmd.jsonInfo.length > 0) {
                        data = createMmd.jsonInfo
                        msg = 'succuss'
                        code = 0
                        flag = true
                    }
                }
                return {
                    data: {
                        code,
                        flag,
                        msg,
                        data
                    }
                }
            },
            vad: false
        }
    ]
}
export = configData
