import mdb from 'mongoose'
let url = 'mongodb://localhost:27017/gongwen'
import log from '../../utils/logs'

export default () => {
    mdb.connect(url,{
        useNewUrlParser:true
    }, (err) => {
        if (err) log.oc(err)
        else log.c('mongodb 连接成功')
    })
}
