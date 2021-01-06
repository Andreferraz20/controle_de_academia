const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

server.use(express.urlencoded({extend: true}));
server.use(express.static(__dirname + '/public'));
server.use(routes)
server.set("view engine", "njk");

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.listen(5000, _ => {
    console.log("server is running")
});