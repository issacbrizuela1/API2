import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose'
const schSensorusuario = new Schema({
  idRU: Number,
  idUsuario: Number,
  idSensor: Number
}, {
  versionKey: false
});
export default schSensorusuario;