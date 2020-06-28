import http from 'http'
import mineTypes from 'mime-types'
// 抓取网络资源数据
export default async (url: string, type: string = 'blob') => {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            const chunks = []
            let size = 0
            res.on('data', (chunk) => {
                size += chunk.length
                chunks.push(chunk)
            })
            res.on('end', (err) => {
                if (err) {
                    reject(err)
                } else {
                    const data = Buffer.concat(chunks, size)
                    const base64Img = 'data:' + mineTypes.lookup(url) + ';base64,' + data.toString('base64')
                    resolve(base64Img)
                }
            })
        })
    })
}
