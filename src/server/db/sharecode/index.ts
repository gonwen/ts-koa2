import mdb from 'mongoose'

let shareCodeSchma = new mdb.Schema({
    name: String,
    code: String,
    mode: String
})

export default mdb.model('Sharecode',shareCodeSchma)
