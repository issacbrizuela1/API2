import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import schMotores from 'App/Models/Motores';
import schHistorial from 'App/Models/scHistorial';

import mongoose from 'mongoose'

let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class MotoresController {
    public async autoincrement() {
        try {
            const preb = await mongoose.createConnection(URL).model('historialsensores', schMotores)
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
    public async insertarMotores({ request, response }) {
        const datos = request.all()
        const preb = await mongoose.createConnection(URL).model('historialsensores', schMotores)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: datos.idSensor,
                Posicion: datos.Posicion,
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
    public async ultimoregistroMotor({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schMotores).aggregate([{
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
                    idSensor: 5
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
    public async ultimoregistroServo({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schMotores).aggregate([{
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
                    idSensor: 6
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
    public async mostrartodoMotor({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schMotores).aggregate([{
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
                    idSensor: 5
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
    public async mostrartodosServo({ params }: HttpContextContract) {
        try {

            const idUsuario = params.idUsuario
            const idSensor = params.idSensor
            let resultado: any = []
            const preb = await mongoose.createConnection(URL).model('historialsensores', schMotores).aggregate([{
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
                    idSensor: 6
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
            return resultado
        }
        catch (error) {
            return error
        }
    }
}

