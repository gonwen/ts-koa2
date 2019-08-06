export default (data, sig) => {
    let arr:any = []
    if (data && data.constructor === Array && data.length > 0) {
        data.forEach(item => {
            let itemJson = {}
            sig.forEach(its => {
                itemJson[its.nk] = item[its.ok] || ''
            })
            arr.push(itemJson)
        })
    }
    return arr
}
