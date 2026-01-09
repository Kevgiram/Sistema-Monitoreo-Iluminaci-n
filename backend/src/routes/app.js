const express = require('express');
const cors = require('cors'); // Cors es ncesario para que la web pueda pedir datos
const server = express();

// --- CONFIGURACIONES ---
server.set('port', process.env.PORT || 8080);

// '0.0.0.0' es para que escuche en TODAS las IPs dentro de la pc (WiFi o Ethernet)
server.set('host', '0.0.0.0'); 

// --- MIDDLEWARES (Funciones intermedias) ---
server.use(express.json()); // Vital para entender los JSON del ESP32
server.use(cors());         // Vital para que el Frontend no sea bloqueado

// --- RUTAS ---
// 1. Ruta de prueba (Pantalla de bienvenida)
server.get('/', function (req, res) {
    res.send('<h1>📡 Servidor IoT Activo</h1><p>Sistema de Monitoreo listo.</p>');
});

// 2. Ruta de Operaciones CRUD

server.use('/lecturas', require('../controllers/lecturas'));

// Exportamos la configuración para que index.js la encienda
module.exports = server;