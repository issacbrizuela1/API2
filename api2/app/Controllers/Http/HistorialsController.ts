// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/Historial';

let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class HistorialsController {

  //mostrar
  public async getHistorial({ request }: HttpContextContract) {
    let datos = request.all()
    const preb = (await mongo).model('historialsensores', schHistorial)
    const buscar = preb
      .find()
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return buscar
  }
  //verificar que sennsor pertenese al usuario
  public async verificarsensorhistorial({ request, response }) {
    try {

      let datos = request.all()
      const preb = (await mongo).model('historialsensores', schHistorial)
      const buscar = preb
        .aggregate([{$lookup: {
          from: 'sensoresusuarios',
          localField: 'idSensor',
          foreignField: 'idSensor',
          as: 'sensorusuario'
         }}, {$unwind: {
          path: '$sensorusuario',
          preserveNullAndEmptyArrays: false
         }}, {$replaceRoot: {
          newRoot: {
           $mergeObjects: [
            {
             idRU: 1,
             idUsuario: 1,
             idSensor: 1
            },
            '$$ROOT'
           ]
          }
         }}, {$unwind: {
          path: '$idSensor'
         }}, {$project: {
          sensorusuario: 0,
          __v: 0
         }}, {$match: {
          idSensor: 1,
          idUsuario: 1,
          idRU: 1
         }}])
          .then((schHistorial) => {
            return schHistorial
          })
          .catch((err) => {
            console.log(err)
          })
        return buscar
    }
    catch (error) {
      return error
    }
  }
}
