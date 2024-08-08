const express = require('express')
const app = express()
const path = require('path');
const catalogRouter = require('./routes/catalog')

app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', catalogRouter)
app.get('/', (req, res) => res.send('hi kids'))

app.listen(3000, () => console.log('Server listening on port 3000...'))