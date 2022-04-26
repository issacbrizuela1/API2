import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import schHC_SR04 from 'App/Models/HC_SR04';
import mongoose from 'mongoose'
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class HcSr04sController {
    public async autoincrement() {
        try {
            const preb = await mongoose.createConnection(URL).model('historialsensores', schHC_SR04)
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
    public async insertarHcSr04({ request, response }) {
        const datos = request.all()
        const preb = await mongoose.createConnection(URL).model('historialsensores', schHC_SR04)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        if (id == "" || id == null || id == "Nan" || id == 0 || id == undefined) { id += 1 }
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: 2,
                Distacia: datos.Distacia,
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
    public async ultimoregistroHcSr04({ params }: HttpContextContract) {
        try {
    
          const idUsuario = params.idUsuario
          const idSensor = params.idSensor
          let resultado: any = []
          const preb = await mongoose.createConnection(URL).model('historialsensores', schHC_SR04).aggregate([{$lookup: {
            from: 'sensoresusuarios',
            localField: 'idRU',
            foreignField: 'idRU',
            as: 'ussen'
           }}, {$lookup: {
            from: 'sensores',
            localField: 'idSensor',
            foreignField: 'idSensor',
            as: 'sensores'
           }}, {$replaceRoot: {
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
           }}, {$replaceRoot: {
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
           }}, {$unwind: {
            path: '$ussen',
            preserveNullAndEmptyArrays: false
           }}, {$unwind: {
            path: '$sensores',
            preserveNullAndEmptyArrays: true
           }}, {$project: {
            ussen: 0,
            sensores: 0
           }}, {$match: {
            idSensor: 2
           }}, {$sort: {
            idH: -1
           }}, {$limit: 1}]).exec().then((data) => {
            data.forEach(element => {
              if (element.idUsuario == idUsuario) {
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
    public async prueba() {
        return "hola"
    }

    public async mostrartodoHcSr04({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schHC_SR04).aggregate([{
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
                $match: {
                    idSensor: 2
                }
            }, {
                $sort: {
                    idRU: -1
                }
            }, { $limit: 1 }]).exec().then((data) => {
                data.forEach(element => {
                  if (element.idUsuario == idUsuario) {
                    console.log(element)
                    resultado.push(element)
                  }
                });
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
