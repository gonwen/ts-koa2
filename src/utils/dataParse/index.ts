import arr from './array'
import obj from './object'
import str from './string'
import bol from './bolean'
import num from './number'

export default (data, sig) => {
    this.A = (data, sig) => arr
    this.B = (data, sig) => bol
    this.S = (data, sig) => str
    this.J = (data, sig) => obj
    this.N = (data, sig) => num
}
