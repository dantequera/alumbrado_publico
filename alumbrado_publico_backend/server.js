// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/auth.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'API alumbrado_publico - OK' }));

app.use('/api/auth', authRoutes);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Sincronizar BD y arrancar servidor
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conectado a la base de datos');
    // En desarrollo puede ser útil sync({ force: false, alter: true })
    await db.sequelize.sync(); 
    console.log('Sequelize sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo inicializar la aplicación:', err);
    process.exit(1);
  }
})();
