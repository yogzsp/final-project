const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// Middleware
app.use(bodyParser.json())
app.use(cors())

// import routes
const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/auth2')
const kelasRoutes = require('./routes/kelas')
const kelasTakenRoutes = require('./routes/kelasTaken')
const quizRoutes = require('./routes/quiz')
const nilaiRoutes = require('./routes/nilai')

// ruoutes example
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/kelas', kelasRoutes)
app.use('/kelasTaken', kelasTakenRoutes)
app.use('/quiz', quizRoutes)
app.use('/nilai', nilaiRoutes)

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connect Error!'))
db.once('open', () => {
    console.log('Database is Connected')
})

// listen
app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
})