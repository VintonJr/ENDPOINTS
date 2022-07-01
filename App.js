const express = require('express');

const { router } = require('./routes/users')
const app = express()


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT



app.use('/', router)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        success: false,
        message: err.message
    })
})



app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})