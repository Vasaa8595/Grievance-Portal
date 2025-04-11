const queryModel = require("../Models/Query.model");
const totalQueryModel = require("../Models/TotalQuery");

async function postAnonymous(req, res) {
    const body = req.body;
    const id = req.query.id;
    const role = req.query.role; 
    try{
        const queryCount = await totalQueryModel.findOne({});
        const complaintId = `${role === 'student'?'STU':'FAC'}-ANO-${queryCount.totalQueries}`
        await queryModel.create({ ...body, raiserId: id, complaintId , submittedDate : new Date() });
        queryCount.totalQueries = queryCount.totalQueries+ 1;
        await queryCount.save();
        res.json({message : "Posted Successfully"}); 
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Error in posting anonymously"})
    }
}

module.exports = postAnonymous;