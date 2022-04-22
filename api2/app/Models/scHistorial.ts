//import { DateTime } from 'luxon';
import mongoose, { Schema } from 'mongoose';

const schHistorial = new Schema({
  idH: Number,
  idRU: Number,
  idSensor: Number,
  Fechacreacion: Date
});
export default schHistorial;