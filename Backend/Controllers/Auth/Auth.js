const {userModel} = require("../../Models/User.model");
const queryModel = require('../../Models/Query.model');
async function login(req, res) {
  const { id, password } = req.body;
  const user = await userModel.findOne({ id: id });
  if (!user) {
    return res.status(401).json({ message: "No User Found" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (isPasswordCorrect) {

    
    const {_id ,__v , password , ...data} = user._doc;

    res.status(200).json({ message: "Login Successfull", data});
    return;
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

module.exports = login;