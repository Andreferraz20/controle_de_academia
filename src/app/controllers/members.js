const {age, date} = require('../.../lib/utils');
const Intl = require('intl')

module.exports = {
    index(req, res) {
        res.render("members/index")
    },
    create(req, res) {
        res.render("members/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body);
    
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Fill all fields");
            }
        }    
        return
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body);
    
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Fill all fields");
            }
        }


        return
    },
    delete(req, res) {
        return
    }
}