import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose'
const schDHT11M = new Schema({
  idH: Number,
  idRU: Number,
  idSensor: Number,
  Temperatura: Number,
  Humedad: Number,
  Fechacreacion: Date
},{
  versionKey:false
});
export default schDHT11M;