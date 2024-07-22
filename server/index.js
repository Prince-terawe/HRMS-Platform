const http = require('http');
const {connectDb} = require('./Database/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT;


connectDb();
const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end('<h1>Terawe-HRMS Platform</h1>')
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})