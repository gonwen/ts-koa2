import path from 'path'
import puppeteer from "puppeteer"
import mineTypes from 'mime-types'

type Config = {
    chromium: string
    webUrl: string
    saveUrl: string
    saveType: string // default => __dirname
    width?: string | number  // default => 1200
    height?: string | number // default => 800    docment's height => auto
}
class Puppeteer {
    public conf: Config
    public page: any
    public browser: any
    constructor (config: Config) {
        this.conf = config
    }
    async init () {
        const conf = this.conf
        this.browser = await puppeteer.launch({
            executablePath:   conf.chromium,
            args: ['--no-sandbox'],
            dumpio: false
        })
        this.page = await this.browser.newPage()
        await this.page.goto(conf.webUrl)
        await this.page.setViewport({
            width: conf.width || 1200,
            height: conf.height || 800
        })
        const base64s = await this.save()
        await this.close()
        return base64s
    }
    async save () {
        const baseDir = path.join(__dirname, '../../temp/')
        const ph: string = (this.conf.saveUrl || baseDir) + 'test-capture.png'
        const res: any = await this.page.screenshot()
        const data: string = res.toString('base64')
        return 'data:' + mineTypes.lookup(ph) + ';base64,' + data
    }
    async close () {
        await this.browser.close()
    }
}
// const pt = new Puppeteer({
//     chromium: 'E:\\\chrome-win\\chrome.exe',
//     webUrl: 'http://www.ciip.com/6ZqQ6JeP5Yqf6IO96aG16Z2i?axios=1',
//     saveUrl: '',
//     saveType: 'png'
// })
// pt.init()
export default Puppeteer
