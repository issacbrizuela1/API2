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
static SensorM:any= model('sensores',this.schSensor);
}