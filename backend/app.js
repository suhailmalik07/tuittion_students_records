const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const studentsRoutes = require('./routes/studentsRoutes')
const { authMiddleware } = require('./middleware/authMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

dotenv.config()

mongoose.connect(process.env.MONGO_URI,
  {
    useCreateIndex: true, useNewUrlParser: true,
    useUnifiedTopology: true, useFindAndModify: false
  },
  (error) => {
    if (error) return console.error(error);
    console.log('DB connected')
  })


app.use('/api', authRoutes)

app.use('/api/students', authMiddleware, studentsRoutes)


app.listen(8000, () => {
  console.log('Server is up and running!')
})
