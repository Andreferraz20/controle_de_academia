const fs = require('fs');
const data = require('./data.json');

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