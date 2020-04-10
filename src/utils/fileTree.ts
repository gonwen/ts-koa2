import {readdirSync, statSync, } from 'fs'

export default class CreateFileTree {
    private path: string
    private fileList: any = []
    private targetObj: object = {}
    private ignore: any = ['dist', '.idea', '.nuxt', 'node_modules', '.git', '.svn']
    constructor(ignore) {
        //
        this.ignore = ignore
    }
    geFileList(path: string) {
        let files = this.readFile(path, this.targetObj)
        return this.fileList
    }
    readFile(path, targetObj) {
        const walk = (file) => {
            if (this.ignore.indexOf(file) === -1) {
                let states = statSync(path + '/' + file)
                if (states.isDirectory()) {
                    let item
                    if(targetObj['children']) {
                        item = {name: file, children: []}
                        targetObj['children'].push(item)
                        // targetObj['children'] = [item, ...targetObj['children']]
                    } else {
                        item = {name:file,children:[]}
                        this.fileList = [item, ...this.fileList]
                        // this.fileList.push(item)
                    }
                    this.readFile(path + '/' + file, item)
                } else {
                    let size: number = states.size
                    let name: string = file
                    let pat: string = path + '/' + file
                    let obj = {
                        size,
                        name,
                        pat
                    }
                    if(targetObj['children']) {
                        var item = {name:file, value: obj.pat}
                        // targetObj['children'] = [item, ...targetObj['children']]
                        targetObj['children'].push(item)
                    } else {
                        let item = {name: file, value: obj.pat}
                        this.fileList.push(item)
                    }
                }
            }
        }
        let files = readdirSync(path)
        files.forEach(walk)
    }
}
