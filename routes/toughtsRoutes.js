const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

//controller
router.get('/', checkAuth, ToughtController.showToughts)
router.get('/dashboard', checkAuth, ToughtController.dashboard)

module.exports = router