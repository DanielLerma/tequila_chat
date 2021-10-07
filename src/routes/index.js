const router = require('express').Router();

const userRoutes = require('./users');

// para que el router use ruta de usuarios (sin necesidad de 'app')
router.use('/users', userRoutes);

module.exports = router;