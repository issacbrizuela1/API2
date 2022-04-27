import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import schHistorial from "App/Models/scHistorial";
import mongoose from 'mongoose';
import Env from '@ioc:Adonis/Core/Env'
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class UsuariohistorialsController {
  public async getHistorialbyid({ params, request }: HttpContextContract) {

    try {

      const idUsuario = params.id
      let resultado: any = []
      await mongoose.createConnection(URL).model('historialsensores', schHistorial).aggregate([{
        $lookup: {
          from: 'sensoresusuarios',
          localField: 'idRU',
          foreignField: 'idRU',
          as: 'ussen'
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
                  '$ussen',
                  0
                ]
              },
              '$$ROOT'
            ]
          }
        }
      }, {
        $unwind: {
          path: '$ussen',
          preserveNullAndEmptyArrays: false
        }
      }, {
        $unwind: {
          path: '$sensores',
          preserveNullAndEmptyArrays: true
        }
      }, {
        $project: {
          ussen: 0,
          sensores: 0
        }
      }, {
        $sort: {
          idH: -1
        }
      }]).exec().then((data) => {
        data.forEach(element => {
          if (element.idUsuario == idUsuario) {
            resultado.push(element)
          }

        });
      }).catch((err) => {
        console.error(err);
      });
      return resultado
    }
    catch (error) {
      return error
    }
  }
}
