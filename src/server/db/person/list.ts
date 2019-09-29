import Person from './index'

export default async () => {
    let data = {
        flag: false,
        data: null
    }
    await Person.find({}, (err, doc) => {
        if (err) data.data = err
        else {
            data.data = doc
            data.flag = true
        }
        console.log('err***', err)
        console.log('doc***', doc)
    })
    return data
}
