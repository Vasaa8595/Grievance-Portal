const schema = require("mongoose").Schema;
const {userModel} = require("./User.model");
const studentSchema = new schema({
  currentYear: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    enum: ["Continuing", "Stopped"],
    default: "Continuing",
  },
  currentSem: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
});

const studentModel = userModel.discriminator("student" , studentSchema);

module.exports = studentModel;