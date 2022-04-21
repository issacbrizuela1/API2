import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
const schHC_SR04 = new Schema({
  idH:Number,
    idRU:Number,
    idSensor:Number,
    Distacia:Number,
    Fechacreacion:Date
},{
  versionKey:false
});
export default schHC_SR04;