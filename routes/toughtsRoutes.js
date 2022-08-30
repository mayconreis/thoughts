const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

//controller
router.get('/', ToughtController.showToughts)

module.exports = router