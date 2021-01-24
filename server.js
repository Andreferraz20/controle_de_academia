const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(express.static(__dirname + '/public'));
server.use(methodOverride("_method"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.listen(5000, _ => {
    console.log("server is running")
});