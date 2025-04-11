const queryModel = require("../Models/Query.model");
const totalQueryModel = require("../Models/TotalQuery");
const {userModel} = require('../Models/User.model')

async function handleQuery (req , res) {
    const role = req.query.role;
    const {id , department , summary , description , category} = req.body;
    let totalQueryCount = await totalQueryModel.findOne({});
    const newCount = totalQueryCount?totalQueryCount.totalQueries:0
    const complaintId = `${role === "student" ? "STU" : "FAC"}-${department}-${newCount}`;
    const constructedQuery = {
        raiserId : id,
        complaintId,
        summary,
        category,
        description,
        submittedDate : new Date()
    }
    try {
        const totalQueryNumber = await totalQueryModel.findOne({});
        totalQueryNumber.totalQueries = newCount + 1;
        await totalQueryNumber.save()
        const resonse = await queryModel.create(constructedQuery);
        console.log(resonse);
        const user = await userModel.findOne({id});
        user.queryIds.push(complaintId);
        await user.save()
        res.json({message : "Query Posted Successfully"})
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message : "Unable to Insert Query"})
    }
}
module.exports = handleQuery;