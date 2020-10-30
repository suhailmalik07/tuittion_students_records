const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  password: {
    type: String,
    required: true,
    select: false,
    min: 4,
    max: 255
  }
})

module.exports = mongoose.model('User', userSchema)
