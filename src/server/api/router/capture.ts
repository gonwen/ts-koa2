// person
import Puppeteer from '../../../capture'
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
                let url = res.url
                let flag = false
                let msg = 'no found file'
                let code = -1
                let data: any = ''
                try {
                    const pt = new Puppeteer({
                        chromium: 'E:\\\chrome-win\\chrome.exe',
                        webUrl: url,
                        saveUrl: '',
                        saveType: 'png'
                    })
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
