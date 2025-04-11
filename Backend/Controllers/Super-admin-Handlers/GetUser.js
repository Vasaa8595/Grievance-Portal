const user = require("../../Models/User.model")
async function getUsers(req , res) {
    try {
        const users = await user.find({},{_id : 0, password : 0, role:0});
        res.json({ message: "users", users });
    } catch (error) {
        res.json({message : error.message})
    }
}
module.exports = getUsers;
