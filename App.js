const express = require('express');

const { router } = require('./routes/users')
const app = express()


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = 4000





app.use('/', router)

app.use('/users', router)

app.use('/users/:email', router)

app.use('/login', router)

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})