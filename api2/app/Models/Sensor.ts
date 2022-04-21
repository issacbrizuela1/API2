import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class SensorM{
  static  schSensor=new Schema({
    idSensor: Number,
    Nombre: String,
    Descripcion:String,
    IMG:String,
    Fechadecreacion: Date,
    Fechadeactualizacio: Date
},{
  versionKey:false
});
static SensorM:any=model('sensores',this.schSensor);
}
  /*
  self.idSensor = 0
  self.idUsuario = 0
  self.NombreSensor = 
  self.Descripcion = 
  self.Fechadecreacion = 
  self.Fechadeactualisacion = 
  self.Estados = [indefinido, habilitado, deshabilitado]
  self.Estado = self.Estados[0]
  self.GPIO = list()
  self.IMG = 
  */