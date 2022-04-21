// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import schKY_031 from 'App/Models/KY_031';
import mongoose from 'mongoose'

let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class Ky_031sController {
    public async autoincrement() {
        try {
            const preb = (await mongo).model('historialsensores', schKY_031)
            let s = await preb.aggregate([{
                $project: {
                    idH: 1,
                    _id: 0
                }
            }, {
                $sort: {
                    idH: -1
                }
            }, { $limit: 1 }])
            let res
            s.forEach((element) => {
                res = element.idH
            })
            return res
        } catch (error) {
            return error
        }
    }
    public async insertarKy_031({ request, response }) {


        const datos = request.all()
        const preb = (await mongo).model('historialsensores', schKY_031)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        if (id == "" || id == null || id == "Nan" || id == 0 || id == undefined) { id += 1 }
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: 2,
                Deteccion: datos.Deteccion,
                Fechacreacion: Date.now()
            })
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((err) => {
                console.log(err)
            })
    }
    public async prueba() {
        return "hola"
    }
}
