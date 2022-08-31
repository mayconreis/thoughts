const express = require('express')
const router = express.Router()
const ThoughtController = require('../controllers/ThoughtController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ThoughtController.dashboard)
router.get('/add', checkAuth, ThoughtController.createThought)
router.post('/add', checkAuth, ThoughtController.createThoughtPost)
router.get('/edit/:id', checkAuth, ThoughtController.updateThought)
router.post('/edit', checkAuth, ThoughtController.updateThoughtPost)
router.post('/delete', checkAuth, ThoughtController.deleteThought)
router.get('/', ThoughtController.showThoughts)

module.exports = router