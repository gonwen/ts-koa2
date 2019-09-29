import mdb from 'mongoose'
let url = 'mongodb://localhost:27017/gongwen'

export default () => {
    mdb.connect(url,{
        useNewUrlParser:true
    })
}
