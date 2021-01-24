const fs = require('fs');
const data = require('./data.json');
const {age, date} = require('./utils');
const Intl = require('intl')

//create
exports.post = (req, res) => {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == ""){
            return res.send("Fill all fields");
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length +1);

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        created_at,
        gender,
        services
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) =>{
        if(err) return res.send("Write file error")

        return res.redirect("/instructors")
    })

    return res.send(req.body)
}

exports.show = (req, res) => {
    const {id} = req.params;
    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id;
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", {instructor})

}

exports.edit = (req, res) =>{
    const {id} = req.params;

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id;
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }
    
    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    console.log(instructor)

    return res.render("instructors/edit", { instructor })
}

exports.put = (req, res) =>{
    const {id} = req.body;
    let  index = 0
    
    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if(id == instructor.id){
            index = foundIndex;
            return true;
        }
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if(err) return res.send("Write error")

        return res.redirect(`/instructors/${id}`)
    })
}