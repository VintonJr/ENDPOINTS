const express = require('express');

const { router } = require('./routes/users')

const port = 4000

const server = express()

server.use('/', router)

server.use('/users', router)

server.use('/users/:email', router)

server.use('/login', router)

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})