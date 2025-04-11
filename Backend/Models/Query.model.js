
const { model } = require("mongoose");

const schema = require("mongoose").Schema;

const querySchema = new schema({
  raiserId : {
    type : String,
    default:"Anonymous",
  },
  complaintId : {
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  summary:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected" , "InProgress"],
    default:"Pending"
  },
  submittedDate: {
    type: Date,
    required: true,
  },
  remarks:{
    type:String,
    default:null
  },
  resolvedDate: {
    type: Date,
    default: null,
  },
  forwarToStaff: {
    type:String,
    default:'Not forwarded Yet'
  }
});

const queryModel = model("Queries" , querySchema);
module.exports = queryModel