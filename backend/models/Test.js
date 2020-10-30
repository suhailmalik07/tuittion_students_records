const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  subject: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  date: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Test', TestSchema)
