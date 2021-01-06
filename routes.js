const exppress = require('express');
const instructors = require('./instructors');
const routes = exppress.Router();

routes.get('/',  (req, res) => res.redirect("/instructors"));

routes.get('/instructors',  (req, res) => 
    res.render("instructors/index")
);

routes.get('/instructors/create',  (req, res) => 
    res.render("instructors/create")
);

routes.post('/instructors',  instructors.post);

routes.get('/members',  (req, res) => 
    res.send("members")
);

module.exports = routes;