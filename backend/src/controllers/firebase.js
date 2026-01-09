
const admin = require('firebase-admin');


//Importamos las credenciales de seguridad
const serviceAccount = require('../../credenciales.json');

// Inicializar Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sistema-monitoreo-d901b-default-rtdb.firebaseio.com/'
  });
}
const db = admin.database();
module.exports = db;
