const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  ubicacion: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  fotoUrl: { type: String, default: null },
  estado: {
    type: String,
    enum: ['pendiente', 'en revision', 'resuelto', 'cerrado'],
    default: 'pendiente'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

reporteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Reporte', reporteSchema);