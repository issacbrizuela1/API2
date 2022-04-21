// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/Historial';

let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL);
export default class HistorialsController {

  //mostrar
  public async getHistorial({ request }: HttpContextContract) {
    let datos = request.all()
    const preb = (await mongo).model('historialsensores', schHistorial)
    const buscar = preb
      .find()
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return buscar
  }
  //verificar que sennsor pertenese al usuario
  
}
