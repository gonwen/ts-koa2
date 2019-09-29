import Parts from './index'
// const jsonList = require('../../../config/findCurrencyFamilyPage.json')

export default async () => {
    let data = []
    for (let i in data) {
        let person = new Parts(data[i])
        await person.save()
    }
}
