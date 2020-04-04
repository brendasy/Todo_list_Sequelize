const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo
const User = db.User

// 載入 auth middleware
const { authenticated } = require('../config/auth')

//顯示全部Todo
router.get('/', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })
    })
    .then(todos => { return res.render('index', { todos }) })
    .catch(error => { return res.status(422).json(error) })

})

//顯示新增Todo頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {

  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then(todo => { return res.redirect('/') })
    .catch(error => { return res.status(422).json(error) })
})

//顯示一筆Todo
router.get('/:id', authenticated, (req, res) => {

  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => { return res.render('detail', { todo: todo.get() }) })
    .catch(error => { return res.status(422).json(error) })

})

//顯示修改Todo頁面
router.get('/:id/edit', authenticated, (req, res) => {

  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => { return res.render('edit', { todo: todo.get() }) })
    .catch(error => { return res.status(422).json(error) })
})

//修改Todo
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      UserId: req.user.id,
      Id: req.params.id
    }
  })
    .then(todo => {
      todo.name = req.body.name
      todo.done = req.body.done === "on"

      return todo.save()
    })
    .then(todo => res.redirect(`/todos/${req.params.id}`))
    .catch(error => res.status(422).json(error))
})

//刪除Todo
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})


module.exports = router