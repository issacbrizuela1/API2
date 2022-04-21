import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose'
const schSensor = new Schema({
  idSensor: Number,
  Nombre: String,
  Descripcion: String,
  IMG: String,
  Fechadecreacion: Date,
  Fechadeactualizacio: Date
}, {
  versionKey: false
});
export default schSensor;