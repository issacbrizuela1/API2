//import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose'
export default class HistorialM {
  static schHistorial = new Schema({
    idH: Number,
    idRU: Number,
    idSensor: Number,
    Fechacreacion: Date
  }, {
    versionKey: false
  });
  static HistorialM: any = model('sensores', this.schHistorial);
}