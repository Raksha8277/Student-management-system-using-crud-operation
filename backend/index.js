const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())


const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentDB";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const Student = require('./models/Student')

app.post('/api/create', (req, res) => {
  Student.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/api/students', (req, res) => {
  Student.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/api/update/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/api/delete/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = app;