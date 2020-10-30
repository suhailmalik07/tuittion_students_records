const express = require('express')
const { getAllStudentsController, addStudentController } = require('../controllers/studentController')

const routes = express.Router()

routes.get('/', getAllStudentsController)

routes.post('/', addStudentController)

module.exports = routes
