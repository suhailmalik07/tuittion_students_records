const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const dotenv = require('dotenv')
const User = require('../models/User')

dotenv.config()

const loginValidator = data => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).email().required(),
    password: Joi.string().min(4).max(255).required(),
  })

  return schema.validate(data).errors
}

const registerValidator = data => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(4).max(255).email().required(),
    password: Joi.string().min(4).max(255).required(),
  })

  return schema.validate(data).errors
}

const loginController = async (req, res) => {
  const validationError = loginValidator(req.body)
  if (validationError) return res.status(400).json({ message: validationError.details[0].message })

  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) return res.status(400).json({ message: 'User does not exists with given email! ' })

    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) return res.status(400).json({ message: 'Invalid password!' })

    const genJWTToken = jsonWebToken.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY)

    res.json({ token: genJWTToken, name: user.name, email: user.email })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const registerController = async (req, res) => {
  const validationError = registerValidator(req.body)
  if (validationError) return res.status(400).json({ message: validationError.details[0].message })

  try {
    if (await User.findOne({ email: req.body.email })) return res.status(400).json({ message: 'User already exists!' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await new User({ ...req.body, password: hashedPassword }).save()
    delete user.password
    res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { loginController, registerController }
