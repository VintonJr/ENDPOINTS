const router = require("express").Router()

const { home, getUser, login, getUsers, create } = require("../controllers/UserControllers")

router.get('/', home)

router.get('/users', getUsers)

router.get('/user/', getUser)

router.post('/login', login)

router.post('/createuser', create)

module.exports = { router };