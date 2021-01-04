const exppress = require('express');

const routes = exppress.Router();

routes.get('/',  (req, res) => res.redirect("/instructors"));

routes.get('/instructors',  (req, res) => 
    res.render("instructors/index")
);

routes.get('/members',  (req, res) => 
    res.send("members")
);

module.exports = routes;