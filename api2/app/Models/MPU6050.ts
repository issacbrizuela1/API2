import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose'
const schMPU6050 = new Schema({
  idH: Number,
  idRU: Number,
  idSensor: Number,
  acel_x: Number,
  acel_y: Number,
  acel_z: Number,
  ang_x: Number,
  ang_y: Number,
  ang_z: Number,
  Fechacreacion: Date
}, {
  versionKey: false
});
export default schMPU6050;