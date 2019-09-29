import Person from './index'

export default async () => {
    let n:string = 'test'
    let a:number = 21
    let m:number = 13612345678
    let e:string = 'test@test.com'
    let ad:string = 'huhgu grgir grjgrj'
    let lo:string = ''
    let index:number = 100
    for (let i = 0; i <index; i++) {
        let person = new Person({
            name: n + i,
            age: a + i,
            moblie: m + i,
            email: i + e,
            adress: i + ad,
            logo: i + lo
        })
        await person.save()
    }
}
