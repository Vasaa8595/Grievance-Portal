const schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");
const {model} = require("mongoose");
const userSchema = new schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    queryIds: {
      type: [String],
      default:[],
    },
  },
  { discriminatorKey: "role" }
);

//runs every time save method in usermodel is called
userSchema.pre("save", async function (next) {
  const user = this;
  //if the password is not modified theres no need to generate new hashed password
  if (!user.isModified("password")) return next();
  //generating salt
  const salt = await bcrypt.genSalt(10);
  //hashing and storing
  user.password = await bcrypt.hash(user.password, salt);
});

//schema methods 
//used to compare password with users password
//this is similar to having a class and methods
userSchema.methods.comparePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}

const userModel = model("User", userSchema);
const facultyModel = userModel.discriminator('faculty' , new schema({
  forwardedQueries : {
    type:[String],
    default:[]
  }
}))
module.exports = { userModel, facultyModel };