//Importamos la configuración del servidor (está en la misma carpeta)
const app = require('./app.js');

// Se iortamos la Base de Datos para asegurar que conecte al inicio
const db = require('../controllers/firebase.js'); 

// 3. Obtenemos las variables configuradas en app.js
const port = app.get('port');
const host = app.get('host');

// 4. Arrancamos el servidor
app.listen(port, host, () => {
    console.log(`=================================================`);
    console.log(`>>> Servidor Web y API corriendo exitosamente`);
    console.log(`>>> Accede en: http://${host}:${port}`);
    console.log(`>>> Para ver datos: http://${host}:${port}/lecturas`);
    console.log(`=================================================`);
});

