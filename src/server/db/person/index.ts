import mdb from 'mongoose'

let personSchma = new mdb.Schema({
    name: String,
    age: Number,
    moblie: Number,
    email: String,
    adress: String,
    logo: String
})

export default mdb.model('Person',personSchma)
