// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/scHistorial';
import HistorialM from 'App/Models/Historial';
let URL2=Env.get('MONGO_URL2')
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
let mongo2 = mongoose.connect(URL2);
export default class HistorialsController {

  //mostrar
  public async getHistorial({ request }: HttpContextContract) {
    try {
      let resultado: any = []
      const preb = await mongoose.createConnection(URL).model('historialsensores', schHistorial).aggregate([{$sort: {
        Fechacreacion: -1
       }}]).exec().then((data) => {
        data.forEach(element => { {
            console.log(element)
            resultado.push(element)
          }
        });//console.log(resultado)
      }).catch((err) => {
        console.error(err);
      });
      return {
        status:true,
        message:"Se trajo los datos correctamente",
        data:resultado
      }
    } catch (error) {
      let resultado: any = []
      const preb = await mongoose.createConnection(URL2).model('historialsensores', schHistorial).aggregate([{$sort: {
        Fechacreacion: -1
       }}]).exec().then((data) => {
        data.forEach(element => { {
            console.log(element)
            resultado.push(element)
          }
        });//console.log(resultado)
      }).catch((err) => {
        console.error(err);
      });
      return {
        status:true,
        message:"Se trajo los datos correctamente",
        data:resultado
      }
    }
  }

  //verificar que sennsor pertenese al usuario

  public async ultimoregistrofiltro({ params }: HttpContextContract) {
   try {
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
   } catch (error) {
    try {

      const idUsuario = params.idUsuario
      const idSensor = params.idSensor
      let resultado: any = []
      const preb = await mongoose.createConnection(URL2).model('historialsensores', schHistorial).aggregate([{
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
  public async gethistorialDht11({})
  {
  try {
    let resultado: any = []
    await mongoose.createConnection(URL).model('historialsensores', schHistorial).aggregate
    ([{$match: {
      idSensor: 2
     }}, {$sort: {
      Fechacreacion: -1
     }}, {$limit: 10}, {$project: {
      Distacia: 1,
      Fechacreacion: 1
     }}]).exec().then((data) => {
      data.forEach(element => { {
          console.log(element)
          resultado.push(element)
        }
      });//console.log(resultado)
    }).catch((err) => {
      console.error(err);
    });
     return resultado
  } catch (error) {
    let resultado: any = []
    await mongoose.createConnection(URL2).model('historialsensores', schHistorial).aggregate
    ([{$match: {
      idSensor: 2
     }}, {$sort: {
      Fechacreacion: -1
     }}, {$limit: 10}, {$project: {
      Distacia: 1,
      Fechacreacion: 1
     }}]).exec().then((data) => {
      data.forEach(element => { {
          console.log(element)
          resultado.push(element)
        }
      });//console.log(resultado)
    }).catch((err) => {
      console.error(err);
    });
     return resultado
  }
  }
  public async gethistorialultrasonico({})
  {
  try {
    let resultado: any = []
    await mongoose.createConnection(URL).model('historialsensores', schHistorial).aggregate
    ([{$match: {
      idSensor: 2
     }}, {$project: {
      Temperatura: 1,
      Humedad: 1,
      Fechacreacion: 1
     }}, {$sort: {
      Fechacreacion: -1
     }}, {$limit: 10}]).exec().then((data) => {
      data.forEach(element => { {
          console.log(element)
          resultado.push(element)
        }
      });//console.log(resultado)
    }).catch((err) => {
      console.error(err);
    });
     return resultado
  } catch (error) {
    let resultado: any = []
    await mongoose.createConnection(URL2).model('historialsensores', schHistorial).aggregate
    ([{$match: {
      idSensor: 2
     }}, {$sort: {
      Fechacreacion: -1
     }}, {$limit: 10}, {$project: {
      Distacia: 1,
      Fechacreacion: 1
     }}]).exec().then((data) => {
      data.forEach(element => { {
          console.log(element)
          resultado.push(element)
        }
      });//console.log(resultado)
    }).catch((err) => {
      console.error(err);
    });
     return resultado
  }
  }
  
}
