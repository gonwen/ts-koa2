import tinyPng from 'tinify'
import path from 'path'
import CreateFileTree from '../utils/fileTree'

interface KeyInfo {
    e: string
    v: string
    n: number
    s: boolean
}
interface InitConfig {
    include?: []
    basedir?: string
    originDir?: string
    compressDir?: string
    fileList?: []
    keyInfo?: KeyInfo
}
interface ResData {
    status: boolean
    msg: string | object
    data?: any
}

class CompressImage {

    private keyList: KeyInfo[] = []
    private includeFormater: string[]
    private baseDir: string
    private originDir: string
    private compressDir: string
    private fileList: any
    private curKeyIndex: number = 0
    constructor(option?: InitConfig) {
        this.init(option)
    }
    getFormater(path: string): string {
        let pos = path.lastIndexOf('.')
        let fom = ''
        if (pos !== -1) fom = path.substring(pos + 1)
        return fom
    }
    validateFormater(path: string, include: string[] = this.includeFormater): boolean {
        let inc = include
        let cur = this.getFormater(path)
        let flag = false
        if (inc.length > 0 && cur) {
            cur = cur.toUpperCase()
            inc.forEach(item => {
                if (item.toUpperCase() === cur) flag = true
            })
        }
        return flag
    }
    validateKeyStatus(callback) {
        let curKeyInfo = this.keyList[this.curKeyIndex]
        tinyPng.key = curKeyInfo.v
        if (curKeyInfo.s) {
            tinyPng.validate((err) => {
                curKeyInfo.n = tinyPng.compressionCount
                curKeyInfo.s = !err
                let status = !err
                let msg: string | object = ''
                let data: any = ''
                if (err) {
                    msg = `**** [${curKeyInfo.e}] -- this key is bad ****`
                    data = err
                    if (this.curKeyIndex + 1 < this.keyList.length) {
                        this.curKeyIndex++
                        this.validateKeyStatus(callback)
                    }
                } else {
                    msg = `**** [${curKeyInfo.e}] -- this key is good **** num: ${curKeyInfo.n}`
                    data = curKeyInfo.n
                }
                let resData: ResData = {status, msg, data}
                callback(resData)
            })
        }
    }
    compressDoing(info): any {
        return new Promise((resolve, reject) => {
            let item = info
            let flag: boolean = this.validateFormater(item.name)
            let status: boolean = false
            let msg: string | object = 'Compression of this format is not supported'
            if (flag) {
                // console.log(`${item.name}--Compression started....--[${item.value}]`)
                let source = tinyPng.fromFile(item.value)
                source.toFile(`${this.compressDir}/${item.name}`, err => {
                    if (err) {
                        msg = err
                        // log.oc(msg)
                    }
                    else {
                        status = true
                        msg = `${item.name}--Compression success--[${item.value}]`
                        // console.log(msg)
                    }
                    resolve({status, msg})
                })
            } else resolve({status, msg})
        })
    }
    async batchCompress() {
        for (let i = 0; i < this.fileList.length; i++) {
            let item = this.fileList[i]
            let index = i
            console.log(`${item.name}--Compression started....--[${item.value}]`)
            let res = await this.compressDoing(item)
            console.log(`${item.name}--${res.status ? 'Compression success' : 'Compression error'}....--[${item.value}]`)
            if (!res.status) console.log(res.msg)
            this.keyList[this.curKeyIndex].n = tinyPng.compressionCount
        }
    }
    async initCompress() {
        this.validateKeyStatus(res => {
            if (res.status) this.batchCompress()
            else console.log(res.msg)
        })
    }
    init(option?: InitConfig) {
        let pt: any = option || {}
        this.includeFormater = pt.include || ['jpg', 'png', 'git']
        this.baseDir = pt.basedir || path.join(__dirname, '../../')
        this.originDir = pt.originDir || `${this.baseDir}temp/img/origin`
        this.compressDir = pt.compressDir || `${this.baseDir}temp/img/compress`
        this.fileList = pt.fileList || new CreateFileTree([]).geFileList(this.originDir)
        this.keyList.push(pt.keyInfo || {
            e: 'gongwen@bjjy.com',
            v: '0VGGtyTHfmT0KKQccM423t2QBZjpNKNG', // tinyPng  key
            n: 0, // Compressed times of current key in the current month
            s: true // Whether the key is valid
        })
        if (pt.proxy) tinyPng.proxy = pt.proxy
    }
}

new CompressImage().initCompress()
