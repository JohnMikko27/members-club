const express = require('express')
const app = express()
const path = require('path');
const catalogRouter = require('./routes/catalog')
const passport = require('passport')
const session = require('express-session');
const pool = require('./db/pool');

require('./auth/passport')
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({ secret: "cats", resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 10} }));
app.use(passport.session());

app.use('/', catalogRouter)
app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});
app.get('/', async(req, res) => {
    let ismember = false;
    if (req.user){
        ismember = req.user.ismember
        console.log(req.user.ismember);
        console.log(req.user)
    }
    const { rows } = await pool.query(`SELECT messages.message_id, messages.title, messages.message, messages.user_id, users.username FROM messages LEFT OUTER JOIN users ON messages.user_id = users.id;`)
    // console.log(rows);
    res.render('index', {ismember: ismember, user: req.user, messages: rows});
})


app.listen(3000, () => console.log('Server listening on port 3000...'))