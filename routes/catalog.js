const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('passport')

router.get('/login', (req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', {successRedirect: "/", failureRedirect: "/login"}))

router.get('/club', (req, res) => res.render('club', ))

router.post('/club', userController.postClubForm);

router.get('/signup', (req, res) => res.render('signup'))

router.post('/signup', userController.postForm)

router.get('/message', (req, res) =>res.render('messageForm'))

router.post('/message', userController.postMessageForm);

router.get('/delete/:id', userController.deleteMessage)

module.exports = router