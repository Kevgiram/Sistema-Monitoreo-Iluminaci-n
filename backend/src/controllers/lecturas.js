
const { Router } = require('express');
const router = Router();

const { 
    postLectura, 
    getAllLecturas, 
    getByIdLectura, 
    updateLectura, 
    deleteLectura 
} = require('./lecturasController');

// --- DEFINICIÓN DE RUTAS ---

// POST /lecturas → Crear nueva lectura (Desde ESP32)
router.post('/', postLectura);

// GET /lecturas → Obtener todo el historial
router.get('/', getAllLecturas);

// GET /lecturas/:id → Obtener una lectura específica por su ID de Firebase
router.get('/:id', getByIdLectura);

// PUT /lecturas/:id → Actualizar/Corregir una lectura
router.put('/:id', updateLectura);

// DELETE /lecturas/:id → Borrar una lectura
router.delete('/:id', deleteLectura);

module.exports = router;