import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  //AUTH-SESION
  Route.get('token', async ({ auth }) => {
    await auth.use('api').authenticate()
    console.log(auth.use('api').user!)
    return { resp: 'activo' }
  })
  Route.get('srevisarToken', 'AuthController.VerificarToken')
  Route.get('straerUsuario', 'AuthController.getUser')
  Route.post('scerrarSesion', 'AuthController.Logout')
  Route.get('idusuario', 'AuthController.idusuario')
//SENSORES 
Route.get('smostrarRU', 'SensorsController.getSensoresusuario')
Route.get('smostrarSensores', 'SensorsController.getSensoresA')
Route.get('smostrarSensoresa', 'SensorsController.getSensores')
Route.post('screarSensores', 'SensorsController.crearSensor')
//Route.put('updateSensores/:id', 'SensorsController.updateSensores')
//Route.delete('eliminarSensores/:id', 'SensorsController.deleteSensor')
Route.get('sSensoresincrement', 'SensorsController.autoincrementSEN')
Route.get('smisSensores/:id', 'UsuariosensorsController.sensoresquetieneelusuario')
//HISTORIAL
Route.get('smostrarHistorial', 'HistorialsController.getHistorial')
Route.get('sfiltroultimoregistro/:idUsuario/:idSensor', 'HistorialsController.ultimoregistrofiltro')
Route.get('shistorialbyuser/:id', 'UsuariohistorialsController.getHistorialbyid')
//sensores-insercion
Route.post('sinsertarDHT11', 'Dht11sController.insertarDHT11')
Route.post('sinsertarHcSr04', 'HcSr04sController.insertarHcSr04')
Route.post('sinsertarKy_031', 'Ky_031sController.insertarKy_031')
Route.post('sinsertarMotores', 'MotoresController.insertarMotores')
Route.post('sinsertarMPU6050', 'Mpu6050sController.insertarMPU6050')
}).middleware('auth')

//LOGIN
Route.get('revisarToken', 'AuthController.VerificarToken')
Route.get('pruebaslista', 'SensorsController.pruebaslista')
Route.post('Login', 'AuthController.Login')
Route.post('Register', 'AuthController.register')
//SENSORES 
Route.get('mostrarRU', 'SensorsController.getSensoresusuario')
Route.get('mostrarSensores', 'SensorsController.getSensoresA')
Route.get('mostrarSensoresa', 'SensorsController.getSensores')
//Route.put('updateSensores/:id', 'SensorsController.updateSensores')
//Route.delete('eliminarSensores/:id', 'SensorsController.deleteSensor')
Route.get('Sensoresincrement', 'SensorsController.autoincrementSEN')
Route.get('misSensores/:id', 'UsuariosensorsController.sensoresquetieneelusuario')
//HISTORIAL
Route.get('mostrarHistorial', 'HistorialsController.getHistorial')
Route.get('filtroultimoregistro/:idUsuario/:idSensor', 'HistorialsController.ultimoregistrofiltro')
Route.get('historialbyuser/:id', 'UsuariohistorialsController.getHistorialbyid')
//sensores registro
Route.post('insertarDHT11', 'Dht11sController.insertarDHT11')
Route.post('insertarHcSr04', 'HcSr04sController.insertarHcSr04')
Route.post('insertarKy_031', 'Ky_031sController.insertarKy_031')
Route.post('insertarMotores', 'MotoresController.insertarMotores')
Route.post('insertarMPU6050', 'Mpu6050sController.insertarMPU6050')
//sensores mostrar   ultimoregistroKy_031
Route.get('mostrarmiDht11/:idUsuario', 'Dht11sController.ultimoregistroDHT11')
Route.get('mostrarmiHcSr04/:idUsuario', 'HcSr04sController.ultimoregistroHcSr04') 
Route.get('mostrarmiKy_031/:idUsuario', 'Ky_031sController.ultimoregistroKy_031')
Route.get('mostrarmiMotore/:idUsuario', 'MotoresController.ultimoregistroMotor')
Route.get('mostrarmiServo/:idUsuario', 'MotoresController.ultimoregistroServo')
Route.get('mostrarmiMPU6050/:idUsuario', 'Mpu6050sController.ultimoregistroMPU6050')
//Historial sensores 
Route.get('mostrartodDht11/:idUsuario', 'Dht11sController.mostrartodoDHT11')
Route.get('mostrartodHcSr04/:idUsuario', 'HcSr04sController.mostrartodoHcSr04')
Route.get('mostrartodKy_031/:idUsuario', 'Ky_031sController.mostrartodoKy_031')
Route.get('mostrartodMotore/:idUsuario', 'MotoresController.mostrartodoMotor')
Route.get('mostrartodServo/:idUsuario', 'MotoresController.mostrartodosServo')
Route.get('mostrartodMPU6050/:idUsuario', 'Mpu6050sController.mostrartodoMPU6050')
//pruebas autoincrement
Route.get('autoin', 'MotoresController.autoincrement')

//prueba
Route.get('dht11','HistorialsController.gethistorialDht11')
Route.get('ultrasonico','HistorialsController.gethistorialultrasonico')