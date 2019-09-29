// this is sign handle middleware
import md5 from 'md5'
import baseConfig from '../config/base.config'
export default (json) => {
    let signpass = baseConfig.signKey
    let data = json || {}
    let sign = ''
    let str = ''
    let newKey = Object.keys(data).sort()
    for (let j = 0; j < newKey.length; j++) {
        if (data[newKey[j]] !== '') str += newKey[j] + data[newKey[j]]
    }
    sign = signpass + str + signpass
    sign = md5(sign)
    return sign.toUpperCase()
}
