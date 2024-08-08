const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/club', (req, res) => res.render('club'))
router.get('/signup', (req, res) => res.render('signup'))
router.post('/signup', userController.postForm)

module.exports = router