const http = require('http');
const port = 5000;
const connectToMongo = require('./db');

connectToMongo();


const server = http.createServer((req, res)=>{
    console.log(req.url)
    res.end('<h1>Terawe-HRMS Platform</h1>')
})

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})