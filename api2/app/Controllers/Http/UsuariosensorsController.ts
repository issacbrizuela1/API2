import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schSensorusuario from 'App/Models/scSensorUsuario';
let URL = Env.get('MONGO_URL');
export default class UsuariosensorsController {
    public async sensoresquetieneelusuario({ params, request, response }: HttpContextContract) {

        try {
    
          const datos = params.id
          let resultado:any=[]
          const preb = await mongoose.createConnection(URL).model('sensoresusuarios', schSensorusuario).aggregate([{
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
              $project: {
                sensores: 0
              }
            }]).exec().then((data) => {
              data.forEach(element => {
                if(element.idUsuario==datos)
                {
                  //console.log(element.idUsuario)
                  resultado.push(element)
                }
              });//console.log(resultado)
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
