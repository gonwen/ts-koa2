// person
import Puppeteer, {Config} from '../../../capture'
import getFileName from '../../../utils/getFileName'
const prefixbase:string = '/' + getFileName(__filename)
const configData: object = {
    dec: '网站截屏',
    path: prefixbase,
    api: [
        {
            url: '/png',
            type: 'DB',
            async callback (res) {
                const webUrl = res.url
                const saveType = res.format || 'png'
                const width = res.w
                const height = res.h
                let flag = false
                let msg = 'no found file'
                let code = -1
                let data: any = ''
                try {
                    const query: Config = {
                        chromium: 'E:\\\chrome-win\\chrome.exe',
                        saveUrl: '',
                        webUrl,
                        saveType,
                        width,
                        height
                    }
                    const pt = new Puppeteer(query)
                    data = await pt.init()
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
