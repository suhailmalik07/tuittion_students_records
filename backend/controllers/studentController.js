const Joi = require('joi')
const Student = require('../models/Student')
const Test = require('../models/Test')

const studentValidator = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    grade: Joi.string().min(1).max(255).required(),
    gender: Joi.string().min(1).max(1).regex(new RegExp('^[MFO]$')).required(),
    age: Joi.number().min(1).max(150).required()
  })

  return schema.validate(data).error
}

const addStudentController = async (req, res) => {
  const validationError = studentValidator(req.body)
  if (validationError) return res.status(400).json({ message: validationError.details[0].message })

  try {
    const newUser = await Student({ ...req.body }).save()
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const paginate = async (Modal, req, res) => {
  let { page = 1, filter = '', limit = 20 } = req.query
  page = Number(page)
  limit = Number(limit)

  const startIndx = (page - 1) * filter

  try {
    const results = { page, limit, filter }
    results.totalResults = await Modal.countDocuments()
    results.totalPages = Math.ceil(results.totalResults / limit)

    results.results = await Modal.find({}).skip(startIndx).limit(limit)
    return results
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAllStudentsController = async (req, res) => {
  try {
    const paginatedResults = await paginate(Student, req, res)
    res.json(paginatedResults)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getStudentWithTests = async (req, res) => {
  const { id } = req.params
  try {
    const student = await Student.findById(id).populate('tests')
    res.json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const addTest = async (req, res) => {
  const { id } = req.params
  try {
    const test = await new Test({ ...req.body }).save()
    const student = await Student.findByIdAndUpdate({ _id: id }, { $push: { tests: test } }, { new: true })
    res.json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { addStudentController, getAllStudentsController, getStudentWithTests, addTest }
