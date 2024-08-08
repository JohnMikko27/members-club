const express = require('express')
const app = express()
const path = require('path');
const catalogRouter = require('./routes/catalog')
const passport = require('passport')
const session = require('express-session')

require('./auth/passport')
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use('/', catalogRouter)
app.get('/', (req, res) => {
    console.log(req.user)
    res.render('index', {user: req.user})
})

app.listen(3000, () => console.log('Server listening on port 3000...'))