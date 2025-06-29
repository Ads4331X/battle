const http = require('http');

const User = require('./user'); 


const hostname = '127.0.0.1';
const port = 300;

const server = http.createServer((req , res) =>{
    res.statusCode = 200;
    res.setHeader('content-type' , 'text/html');
    res.end(`<h1>Hello</h1>`)
})

server.listen(port , hostname , () =>{
    console.log('hello');
})