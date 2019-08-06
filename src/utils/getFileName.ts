export default (filename:string = '') => {
    let n = filename
    if (n && n.constructor === String) {
        n = n.substring(0, n.lastIndexOf('.'))
        n = n.substring(n.lastIndexOf('\\') + 1, n.length)
    }
    return n
}
