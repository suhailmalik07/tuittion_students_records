const express = require('express')

const { loginController, registerController } = require('../controllers/userController')

const routes = express.Router()

routes.post('/login', loginController)

routes.post('/register', registerController)

module.exports = routes
