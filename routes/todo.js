const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo
const User = db.User

// 載入 auth middleware
const { authenticated } = require('../config/auth')

//顯示全部Todo
router.get('/', authenticated, (req, res) => {
  res.render('index')
})

//顯示一筆Todo
router.get('/:id', authenticated, (req, res) => {
  res.send('顯示單一 Todo 頁面')
})

//顯示新增Todo頁面
router.get('/new', authenticated, (req, res) => {
  res.send('顯示新增 Todo 頁面')
})

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {
  res.send('新增一筆  Todo')
})

//顯示修改Todo頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('顯示修改 Todo 頁面')
})

//修改Todo
router.put('/:id', authenticated, (req, res) => {
  res.send('修改 Todo')
})

//刪除Todo
router.delete('/:id', authenticated, (req, res) => {
  res.send('刪除 Todo')
})


module.exports = router