export default (data, sig) => {
    let arr:object = []
    if (data && data.constructor === Array && data.length > 0) {
        data.forEach(item => {
            let itemJson = {}
            sig.forEach(its => {
                itemJson[its.nk] = item[its.ok] || ''
            })
            data.push(itemJson)
        })
    }
    return arr
}
