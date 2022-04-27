import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
let URL2=Env.get('MONGO_URL2')
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
let mongo2 = mongoose.connect(URL2);
import schMPU6050 from "App/Models/MPU6050"

export default class Mpu6050sController {
    public async autoincrement() {
        try {
            try {
                const preb = await mongoose.createConnection(URL).model('historialsensores', schMPU6050)
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
        } catch (error) {
            try {
                const preb = await mongoose.createConnection(URL2).model('historialsensores', schMPU6050)
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
    }
    public async insertarMPU6050({ request, response }) {
        try {
            const datos = request.all()
            const preb = await mongoose.createConnection(URL).model('historialsensores', schMPU6050)
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
        } catch (error) {
            const datos = request.all()
            const preb = await mongoose.createConnection(URL2).model('historialsensores', schMPU6050)
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
    }
    public async ultimoregistroMPU6050({ params }: HttpContextContract) {
        try {
            try {

                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL).model('historialsensores', schMPU6050).aggregate([{
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
                        idSensor: 4
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
        } catch (error) {
            try {

                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL2).model('historialsensores', schMPU6050).aggregate([{
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
                        idSensor: 4
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
    }

    public async mostrartodoMPU6050({ params }: HttpContextContract) {
        try {
            try {

                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL).model('historialsensores', schMPU6050).aggregate([{
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
                        idSensor: 4
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
        } catch (error) {
            try {

                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL2).model('historialsensores', schMPU6050).aggregate([{
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
                        idSensor: 4
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
}
