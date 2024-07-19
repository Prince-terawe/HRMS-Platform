const http = require('http');
const connectDb = require('./Database/db');
const port = 5000;

connectDb();
const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end('<h1>Terawe-HRMS Platform</h1>')
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})