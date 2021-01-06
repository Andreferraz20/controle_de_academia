const exppress = require('express');

const routes = exppress.Router();

routes.get('/',  (req, res) => res.redirect("/instructors"));

routes.get('/instructors',  (req, res) => 
    res.render("instructors/index")
);

routes.get('/instructors/create',  (req, res) => 
    res.render("instructors/create")
);

routes.post('/instructors',  (req, res) => {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == ""){
            return res.send("Fill all fields");
        }
    }

    return res.send(req.body);
});

routes.get('/members',  (req, res) => 
    res.send("members")
);

module.exports = routes;