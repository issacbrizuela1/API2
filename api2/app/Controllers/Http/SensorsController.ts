import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import SensorM from 'App/Models/Sensor'
import schSensor from 'App/Models/scSensor';
import schSensorusuario from 'App/Models/scSensorUsuario';
let URL = Env.get('MONGO_URL');
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class SensorsController {
  //EXTRAS
  public async autoincrementSEN() {
    try {
      const preb = SensorM.SensorM
      let s = await preb.aggregate([
        {
          $project: {
            idSensor: 1,
          },
        },
        {
          $sort: {
            idSensor: -1,
          },
        },
        { $limit: 1 },
      ])
      let res
      s.forEach((element) => {
        res = element.idSensor
      })
      return res
    } catch (error) {
      return error
    }
  }
  //CREAR
  public async crearSensor({ request, response }) {
    let datos = request.all()
    await mongoose.connect(URL)
    let autoinc = this.autoincrementSEN()
    let id = await autoinc + 1
    if (id == "NaN" || id == null) { id += 1 };
    response = new SensorM.SensorM({ datos })
    response.save()
    return response

  }
  //mostrar
  public async getSensores({ request, response }: HttpContextContract) {
    //poner filtro para usuario logueado
    response = await SensorM.SensorM.find({})
    return {men:"hola",dat:response}
  }
  //editar
  public async updateSensores({ params, request, response }: HttpContextContract) {

    const datos = request.all()
    const preb = SensorM.SensorM
    preb
      .updateOne({ idSensor: params.id }, { datos })
      .then((data) => {
        //console.log(data)
        return response.ok
      })
      .catch((err) => {
        return err
      })
  }
  //eliminar
  public async deleteSensor({ params, request, response }: HttpContextContract) {
    // const datos = request.all()
    const preb = SensorM.SensorM
    preb
      .deleteOne({ idSensor: params.id })
      .then((data) => {
        return response.finished
        //console.log(data)
      })
      .catch((err) => {
        return err
      })
  }
  //verificar que sennsor pertenese al usuario
  public async sensoresquetieneelusuario({ params, request, response }: HttpContextContract) {

    try {

      const datos = params.id
      let resultado:any=[]
      const preb = await mongoose.createConnection(URL).model('sensoresusuarios', schSensorusuario)
      const buscar =await preb
        .aggregate([{
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
