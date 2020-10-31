const jsonWebToken = require("jsonwebtoken")
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
  let { authorization = '' } = req.headers
  authorization = authorization.split(' ')[1]

  if (!authorization) return res.status(501).json({ message: 'authorization required!' })

  try {
    const { id } = jsonWebToken.decode(authorization)
    const user = await User.findOne({ _id: id })

    if (!user) return res.status(501).json({ message: 'Token is not valid!' })
    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { authMiddleware }
