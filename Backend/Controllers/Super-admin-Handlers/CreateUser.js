const studentModel = require('../../Models/Student.model')
const { facultyModel } = require("../../Models/User.model");
async function createUser(req , res) {
    const students = req.body;
    try {
        for (const student of  students) {
            const studentObj = new facultyModel(student);
            await studentObj.save();
        }
        res.json({message : "User/'s created"});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message : e.message})
    }
}

module.exports = createUser;