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
  //AUTH-SENSORES 

  Route.get('smostrarSensores', 'SensorsController.getSensores')
  Route.post('screarSensores', 'SensorsController.crearSensor')
  Route.put('supdateSensores/:id', 'SensorsController.updateSensores')
  Route.delete('seliminarSensores/:id', 'SensorsController.deleteSensor')

  //AUTH-HISTORIAL
  Route.get('smostrarHistorial', 'HistorialsController.getHistorial')
}).middleware('auth')

//LOGIN
Route.get('revisarToken', 'AuthController.VerificarToken')
Route.get('pruebaslista', 'SensorsController.pruebaslista')
Route.post('Login', 'AuthController.Login')
Route.post('Register', 'AuthController.register')



//SENSORES 
Route.get('mostrarSensores', 'SensorsController.getSensores')
Route.post('crearSensores', 'SensorsController.crearSensor')
//Route.put('updateSensores/:id', 'SensorsController.updateSensores')
//Route.delete('eliminarSensores/:id', 'SensorsController.deleteSensor')
Route.get('Sensoresincrement', 'SensorsController.autoincrementSEN')
Route.get('verificarsensor', 'SensorsController.verificarsensor')
Route.get('misSensores/:id', 'SensorsController.sensoresquetieneelusuario')





//HISTORIAL
Route.get('mostrarHistorial', 'HistorialsController.getHistorial')
Route.get('filtroultimoregistro', 'HistorialsController.ultimoregistrofiltro')








//sensores
Route.post('insertarDHT11', 'Dht11sController.insertarDHT11')
Route.post('insertarHcSr04', 'HcSr04sController.insertarHcSr04')
Route.post('insertarKy_031', 'Ky_031sController.insertarKy_031')
Route.post('insertarMotores', 'MotoresController.insertarMotores')
Route.post('insertarMPU6050', 'Mpu6050sController.insertarMPU6050')