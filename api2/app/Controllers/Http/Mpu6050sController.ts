// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
import schMPU6050 from "App/Models/MPU6050"

export default class Mpu6050sController {
    public async autoincrement() {
        try {
            const preb = (await mongo).model('historialsensores', schMPU6050)
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
    public async insertarMPU6050({ request, response }) {
        const datos = request.all()
        const preb = (await mongo).model('historialsensores', schMPU6050)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        if (id == "" || id == null || id == "Nan" || id == 0 || id == undefined) { id += 1 }
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: 2,
                acel_x: datos.acel_x,
                acel_y: datos.acel_y,
                acel_z: datos.acel_z,
                ang_x: datos.ang_x,
                ang_y: datos.ang_y,
                ang_z: datos.ang_z,
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