// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/scHistorial';
import HistorialM from 'App/Models/Historial';

let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class HistorialsController {

  //mostrar
  public async getHistorial({ request }: HttpContextContract) {
    let datos = request.all()
    const preb =HistorialM.HistorialM.find()
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return preb
  }
  //verificar que sennsor pertenese al usuario
  public async ultimoregistrofiltro({ request }: HttpContextContract) {
    let datos = request.all()
    const preb = await mongoose.createConnection(URL).model('historialsensores', schHistorial)
    const buscar = preb
      .aggregate([{$lookup: {
        from: 'sensoresusuarios',
        localField: 'idRU',
        foreignField: 'idRU',
        as: 'rusensor'
       }}, {$replaceRoot: {
        newRoot: {
         $mergeObjects: [
          {
           $arrayElemAt: [
            '$rusensor',
            0
           ]
          },
          '$$ROOT'
         ]
        }
       }}, {$unwind: {
        path: '$rusensor',
        preserveNullAndEmptyArrays: false
       }}, {$match: {
        idUsuario: 1,
        idSensor: 1
       }}, {$project: {
        rusensor: 0
       }}, {$sort: {
        idH: -1
       }}, {$limit: 1}])
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return buscar
  }
}
