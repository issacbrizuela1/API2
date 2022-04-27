import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schDHT11M from 'App/Models/DHT11'
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class Dht11sController {
    public async autoincrement() {
        try {
            const preb = await mongoose.createConnection(URL).model('historialsensores', schDHT11M)
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
    public async insertarDHT11({ request, response }) {


        const datos = request.all()
        const preb = await mongoose.createConnection(URL).model('historialsensores', schDHT11M)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        if (id == "" || id == null || id == "Nan" || id == 0 || id == undefined) { id += 1 }
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: 1,
                Temperatura: datos.Temperatura,
                Humedad: datos.Humedad,
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

    public async ultimoregistroDHT11({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schDHT11M).aggregate([{
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
                    idSensor: 1
                }
            }, {
                $sort: {
                    idH: -1
                }
            }, { $limit: 1 }]).exec().then((data) => {
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

    public async mostrartodoDHT11({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schDHT11M).aggregate([{
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
                    idSensor: 1
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
