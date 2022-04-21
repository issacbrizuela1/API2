import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
const schMotores = new Schema({
  idH:Number,
    idRU:Number,
    idSensor:Number,
    Posicion:String,
    Fechacreacion:Date
}, {
  versionKey: false
});
export default schMotores;