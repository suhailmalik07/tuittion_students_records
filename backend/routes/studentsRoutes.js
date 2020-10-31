const express = require('express')
const { getAllStudentsController, addStudentController, getStudentWithTests, searchStudent, addTest } = require('../controllers/studentController')

const routes = express.Router()

routes.get('/', getAllStudentsController)

routes.post('/', addStudentController)
routes.get('/:id', getStudentWithTests)
routes.post('/:id', addTest)

module.exports = routes
