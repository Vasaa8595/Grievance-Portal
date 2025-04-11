const queryModel = require("../../Models/Query.model");

async function solveQuery(req, res) {
    const complaintId = req.query.complaintId
    const {status , remarks} = req.body;

    try {
       const query = await queryModel.findOne({complaintId});
       if(!query) {
         return res.status(404).json({message :"Query Not Found"})
       } 
       query.status = status;
       query.remarks = remarks
       await query.save();
       res.json({message:`${status} Successfully`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error in resolving"});
    }
}

module.exports = solveQuery;