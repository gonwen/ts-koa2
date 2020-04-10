// 动态生成mmd文件
import {readdirSync, readFileSync, statSync,} from 'fs'
import path from 'path'

interface mmdItemInfo {
    name: string
    node?: []
}

class CreateMmdfile {

    private type: string = 'J'
    private target: string = ''
    constructor(type?: string, target?: string) {
        this.type = type
        this.target = target
    }

    parseMmdToJson (str: string) {

    }

    parseJsonToMmd (json: object) {

    }

    createSplitTag (num: number) {
        let tag = '#'
        return `\n${tag.repeat(num)} `
    }

    // 解析配置信息
    parseConfig (str: string) {
        let json = null
        let pre = this.parsePre(str)
        let style = this.pareStyle(str)
        if (pre) {
            if (!json) json = {}
            json = {...json, ...pre}
        }
        if (style) {
            if (!json) json = {}
            json = {...json, ...style}
        }
        return json
    }

    // 解析文件地址
    parsePre (str: string) {
        let json = null
        let rm = str.match(/(?<=<pre>).*(?=<\/pre>)/)
        if (rm) {
            json = {}
            json.fileUrl = rm[0]
        }
        return json
    }

    // 解析样式配置信息
    pareStyle (str: string) {
        let json = null
        const styleKey = ['borderColor', 'fillColor', 'textColor', 'collapsed']
        styleKey.forEach(key => {
            let rm = str.match(eval(`/(?<=${key}=\`).*(?=\`)/`))
            if (rm) {
                if (!json) json = {}
                rm = rm[0].split('`')
                if (rm[0]) json[key] = rm[0]
            }
        })
        return json
    }

    setNameAndConfig (obj, name: string) {
        let a = name.split('\n>')
        let config = this.parseConfig(name)
        if (config) obj.config = config
        a = a[0].split('\n')
        // 过滤 反斜杠 [\]
        obj.name = a[0].replace(/\\/g, '')
        return a[0]
    }

    parseSplice (arr, lev) {
        let a = arr
        let l = lev
        if (a.constructor === Array) {
            a.forEach((item, index) => {
                let node = item.data.split(this.createSplitTag(lev))
                this.setNameAndConfig(item, node[0])
                node.splice(0, 1)
                if (node.length > 0) {
                    item.node = []
                    node.forEach(nodeItem => {
                        item.node.push({
                            data: nodeItem
                        })
                    })
                    this.parseSplice(item.node, lev + 1)
                }
                // 调试中可注释放开查询解析前源数据
                delete item.data
            })
        }
    }

    async readFile (path: string) {
        let data = await readFileSync(path, 'utf8')
        let arr = data.split(this.createSplitTag(1))
        arr.splice(0, 1)
        let tree = []
        arr.forEach((item, index) => {
            tree.push({
                data: item
            })
        })
        this.parseSplice(tree, 2)
        console.log('***')
        return tree
    }

}

const createMmd = new CreateMmdfile()
const filename = 'README' // README   readme_6_0  readme
createMmd.readFile(path.join(__dirname, '../../') + `/${filename}.mmd`)
