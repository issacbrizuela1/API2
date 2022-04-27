import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import schKY_031 from 'App/Models/KY_031';
import mongoose from 'mongoose'
let URL2=Env.get('MONGO_URL2')
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
let mongo2 = mongoose.connect(URL2);
export default class Ky_031sController {
    public async autoincrement() {
        try {
            try {
                const preb = mongoose.createConnection(URL).model('historialsensores', schKY_031)
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
                const preb = mongoose.createConnection(URL2).model('historialsensores', schKY_031)
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
    public async insertarKy_031({ request, response }) {
    try {
        const datos = request.all()
        const preb = (await mongo).model('historialsensores', schKY_031)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        if (id == "" || id == null || id == "Nan" || id == 0 || id == undefined) { id += 1 }
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: 3,
                Deteccion: datos.Deteccion,
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
        const preb = (await mongo2).model('historialsensores', schKY_031)
        let idd = await this.autoincrement()
        let id = (await idd) + 1
        if (id == "" || id == null || id == "Nan" || id == 0 || id == undefined) { id += 1 }
        preb
            .insertMany({
                idH: id,
                idRU: datos.idRU,
                idSensor: 3,
                Deteccion: datos.Deteccion,
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
    public async ultimoregistroKy_031({ params }: HttpContextContract) {
        try {
            try {
    
                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL).model('historialsensores', schKY_031).aggregate([{$lookup: {
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
                  idSensor: 3
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
        } catch (error) {
            try {
    
                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL2).model('historialsensores', schKY_031).aggregate([{$lookup: {
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
                  idSensor: 3
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
      }
    public async mostrartodoKy_031({ params }: HttpContextContract) {
        try {
            try {

                const idUsuario = params.idUsuario
                const idSensor = params.idSensor
                let resultado: any = []
                const preb = await mongoose.createConnection(URL).model('historialsensores', schKY_031).aggregate([{
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
                        idSensor: 3
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
                const preb = await mongoose.createConnection(URL2).model('historialsensores', schKY_031).aggregate([{
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
                        idSensor: 3
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
