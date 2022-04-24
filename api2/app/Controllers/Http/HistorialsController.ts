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
    const preb = HistorialM.HistorialM.find().exec()
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return preb
  }

  //verificar que sennsor pertenese al usuario

  public async ultimoregistrofiltro({ params }: HttpContextContract) {
    try {

      const idUsuario = params.idUsuario
      const idSensor = params.idSensor
      let resultado: any = []
      const preb = await mongoose.createConnection(URL).model('historialsensores', schHistorial).aggregate([{
        $lookup: {
          from: 'sensoresusuarios',
          localField: 'idRU',
          foreignField: 'idRU',
          as: 'rusensor'
        }
      }, {
        $lookup: {
          from: 'sensores',
          localField: 'idSensor',
          foreignField: 'idSensor',
          as: 'sensores'
        }
      }, {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: [
                  '$sensores',
                  0
                ]
              },
              '$$ROOT'
            ]
          }
        }
      }, {
        $replaceRoot: {
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
        }
      }, {
        $unwind: {
          path: '$rusensor',
          preserveNullAndEmptyArrays: false
        }
      }, {
        $unwind: {
          path: '$sensores',
          preserveNullAndEmptyArrays: false
        }
      }, {
        $project: {
          rusensor: 0,
          sensores: 0
        }
      }, {
        $sort: {
          idH: -1
        }
      }]).exec().then((data) => {
        data.forEach(element => {
          if (element.idUsuario == idUsuario && element.idSensor == idSensor) {
            console.log(element)
            resultado.push(element)
          }
        });//console.log(resultado)
      }).catch((err) => {
        console.error(err);
      });
      return resultado[0]
    }
    catch (error) {
      return error
    }
  }
}
