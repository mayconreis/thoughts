const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtPost)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/delete', checkAuth, ToughtController.deleteTought)
router.get('/', ToughtController.showToughts)

module.exports = router