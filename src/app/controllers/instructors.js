const Instructor = require("../models/Instructor");

const {age, date} = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Instructor.all(instructors => {
            return res.render(`instructors/index`, {instructors})
        })
    },
    create(req, res) {
        res.render("instructors/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body);
    
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Fill all fields");
            }
        }
    
        Instructor.create(req.body, instructor => {    
            return res.redirect(`/instructors/${instructor.id}`)
        })

        return
    },
    show(req, res) {
        Instructor.find(req.params.id, instructor =>{
            if(!instructor){
                return res.send("Instructor not found");
            }

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(",");

            instructor.created_at = date(instructor.created_at).format;

            return res.render("instructors/show", {instructor})
        })
    },
    edit(req, res) {
        Instructor.find(req.params.id, instructor =>{
            if(!instructor){
                return res.send("Instructor not found");
            }

            instructor.birth = date(instructor.birth).iso;

            instructor.created_at = date(instructor.created_at).format;

            return res.render("instructors/edit", {instructor})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body);
    
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Fill all fields");
            }
        }

        Instructor.update(req.body, _ => res.redirect(`/instructors/${req.body.id}`))
        
    },
    delete(req, res) {
        Instructor.delete(req.body.id, _ => res.redirect(`/instructors`))
    }
}