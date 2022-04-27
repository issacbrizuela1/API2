import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import SensorM from 'App/Models/Sensor'
import schSensor from 'App/Models/scSensor';
import schSensorusuario from 'App/Models/scSensorUsuario';
let URL = Env.get('MONGO_URL');
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class SensorsController {
  public async guardarMongo({request,response})
  {
    const trigger=request.input('trigger')
    const echo= request.input('echo')
    try {
      await mongoose.connect(URL)
      response=new SensorM.schSensor({})
    } catch (error) {
      
    }
  }

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
      ]).exec()
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
    const datos = request.all()
    await mongoose.connect(URL)
    let autoinc = this.autoincrementSEN()
    let id = await autoinc + 1
    if (id == "NaN" || id == null) { id += 1 };
    response = new SensorM.SensorM({ datos })
    response.save()
    return response

  }
  //mostrar
  public async getSensoresusuario() {
    //poner filtro para usuario logueado
    const resp = await mongoose.createConnection(URL).model('sensoresusuarios', schSensorusuario).find({}).exec()
    return resp
    
  }
  //mostrar
  public async getSensoresA({  response }: HttpContextContract) {
    //poner filtro para usuario logueado
    const resp = await mongoose.createConnection(URL).model('sensores', schSensor).find({}).exec()
    return {
      status:true,
      message:"Se trajo los datos correctamente",
      data:resp
    }
  }
  public async getSensores({  response }: HttpContextContract) {
    //poner filtro para usuario logueado
    const resp = SensorM.SensorM.find({}).exec()
    return resp
    
  }
  //verificar que sennsor pertenese al usuario
  

}
