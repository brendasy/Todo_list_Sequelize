const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:id', (req, res) => {

})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {
  res.render('index')
})


module.exports = router