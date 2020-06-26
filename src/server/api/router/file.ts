// person
import grabWebFile from '../../../utils/grabWebFile'
import getFileName from '../../../utils/getFileName'
import CreateFileTree from '../../../utils/fileTree'
import {readFile, readFileSync, writeFileSync} from 'fs'
const prefixbase:string = '/' + getFileName(__filename)
const configData: object = {
    dec: '文件列表',
    path: prefixbase,
    api: [
        {
            url: '/list',
            type: 'DB',
            async callback (res) {
                let path = res.path
                let ignor = JSON.parse(res.ignore) || []
                let createFileTree = new CreateFileTree(ignor)
                let fileList = await createFileTree.geFileList(path)
                return {
                    data: {
                        code: fileList ? 0 : -1,
                        flag: !!fileList,
                        msg: fileList ? '文件列表列表查询成功' : '获取失败',
                        data: fileList
                    }
                }
            },
            vad: false
        },
        {
            url: '/info',
            type: 'DB',
            async callback (res) {
                let path = res.path
                let flag = false
                let msg = 'no found file'
                let code = -1
                let data = ''
                try {
                    data = await readFileSync(path, 'utf8')
                    code = 0
                    msg = 'succuss'
                    flag = true
                } catch (e) {}
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
        },
        {
            url: '/save',
            type: 'DB',
            nmd: 'post',
            async callback (res) {
                let path = res.path
                let value = res.value
                let flag = false
                let msg = 'save is error'
                let code = -1
                let data: any = ''
                try {
                    data = await writeFileSync(path, value,'utf8')
                    code = 0
                    msg = 'succuss'
                    flag = true
                } catch (e) {}
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
        },
        {
            url: '/fileByUrl',
            type: 'DB',
            async callback (res) {
                let url = res.url
                let flag = false
                let msg = 'no found file'
                let code = -1
                let data: any = ''
                try {
                    data = await grabWebFile(url)
                    code = 0
                    msg = 'succuss'
                    flag = true
                } catch (e) {}
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
