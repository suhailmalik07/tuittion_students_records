const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
    unique: true
  },
  grade: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
  gender: {
    type: String,
    required: true,
    min: 1,
    max: 1
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 150
  },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
})

module.exports = mongoose.model('Student', studentSchema)

