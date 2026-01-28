const express = require('express');
const router = express.Router();
const Reporte = require('../models/Reporte');

router.get('/', async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ createdAt: -1 });
    res.json(reportes);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, ubicacion, fotoUrl } = req.body;
    if (!titulo || !descripcion || !ubicacion?.lat || !ubicacion?.lng) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoReporte = new Reporte({ titulo, descripcion, ubicacion, fotoUrl });
    const saved = await nuevoReporte.save();

    if (req.app.get('io')) {
      req.app.get('io').emit('nuevoReporte', saved);
    }

    res.status(201).json(saved);
  } catch (error) {
    console.error('Error al crear reporte:', error);
    res.status(500).json({ error: 'Error al guardar el reporte' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { estado } = req.body;
    const reporte = await Reporte.findByIdAndUpdate(
      req.params.id,
      { estado, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });

    if (req.app.get('io')) {
      req.app.get('io').emit('reporteActualizado', reporte);
    }

    res.json(reporte);
  } catch (error) {
    console.error('Error al actualizar reporte:', error);
    res.status(500).json({ error: 'Error al actualizar el reporte' });
  }
});

module.exports = router;