import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose'
const schKY_031 = new Schema({
  idH: Number,
  idRU: Number,
  idSensor: Number,
  Deteccion: String,
  Fechacreacion: Date
}, {
  versionKey: false
});
export default schKY_031;