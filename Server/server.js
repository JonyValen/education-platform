const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
let app = express()

hbs.registerPartials(__dirname+'/views/partials/')
app.set('view engine', 'hbs')
app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.render('homepage.hbs', {})
})

app.listen(3000, () => {
  console.log('App listening on port 3000')
})
