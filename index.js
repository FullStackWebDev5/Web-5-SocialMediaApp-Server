const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./public'))
app.use(cors())

const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
})

app.get('/', (req, res) => {
  res.json({
    status: 'SUCCESS',
    message: 'All good!'
  })
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      status: 'SUCCESS',
      data: users
    })
  } catch (error) {
    res.json({
      status: 'FAIL',
      message: error.message
    })
  }
})

app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, avatar } = req.body
    await User.create({ firstName, lastName, email, avatar })
    res.json({
      status: 'SUCCESS',
      message: 'User created successfully'
    })
  } catch (error) {
    res.json({
      status: 'FAIL',
      message: error.message
    })
  }
})


app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() =>  console.log(`Server running on http://localhost:${process.env.PORT}`))
    .catch(error => console.log(error))
})