// Se importa la conexión a la base de datos
const db = require('./firebase.js');

// Definimos la referencia
const ref = db.ref('lecturas'); 

const lecturasController = {};

// Recibe datos del ESP32 y crea un registro nuevo en el historial
lecturasController.postLectura = async (req, res) => {
  try {

    const { luz, movimiento, foco } = req.body;

    if (luz === undefined || movimiento === undefined) {
        return res.status(400).json({ error: 'Faltan datos de luz o movimiento' });
    }

    const nuevaLectura = { 
        luz: Number(luz),             // Aseguramos que sea número
        movimiento: Number(movimiento), 
        foco: Boolean(foco),          // Aseguramos que sea true/false
        timestamp: new Date().toISOString() // Fecha automática
    };

    // Usamos push() para guardar en el historial (genera un ID único tipo -NK7s8d...)
    const nuevaRef = await ref.push(nuevaLectura);

    // Se responde con éxito
    res.status(201).json({
      message: 'Lectura creada correctamente',
      id: nuevaRef.key, // Devolvemos el ID generado por si se necesita
      datos: nuevaLectura
    });

  } catch (error) {
    console.error('Error escribiendo en Firebase:', error);
    res.status(500).json({ error: 'Error interno al crear lectura' });
  }
};


// Trae todo el historial de lecturas
lecturasController.getAllLecturas = async (req, res) => {
  try {
    const snapshot = await ref.once('value');
    // Si no hay datos, se devuelve un objeto vacío {}
    res.status(200).json(snapshot.val() || {});
  } catch (error) {
    console.error('Error al leer Firebase:', error);
    res.status(500).json({ error: 'Error al obtener lecturas' });
  }
};


// Busca una lectura específica por su código hash
lecturasController.getByIdLectura = async (req, res) => {
  try {
    const { id } = req.params; // El ID viene en la URL
    const snapshot = await ref.child(id).once('value');
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lectura específica' });
  }
};


// Permite corregir un dato antiguo si fuera necesario
lecturasController.updateLectura = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevaData = req.body; // Lo que queremos cambiar
    
    // Verificamos si existe antes de actualizar
    const snapshot = await ref.child(id).once('value');
    if (!snapshot.exists()) {
        return res.status(404).json({ error: 'No existe esa lectura para actualizar' });
    }

    await ref.child(id).update(nuevaData);
    res.status(200).json({ message: 'Lectura actualizada correctamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar lectura' });
  }
};


// Borra un registro específico
lecturasController.deleteLectura = async (req, res) => {
  try {
    const { id } = req.params;
    await ref.child(id).remove();
    res.status(200).json({ message: 'Lectura eliminada del historial' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar lectura' });
  }
};

module.exports = lecturasController;
