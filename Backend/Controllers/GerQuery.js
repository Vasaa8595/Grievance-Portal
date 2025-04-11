const queryModel = require('../Models/Query.model');
const {userModel} = require('../Models/User.model');
//get a single user's queries
async function getQuery(req, res) { 
    const id = req.query.id;
    try {
        const user = await userModel.findOne({id},{_id : 0 , queryIds:1});
        const userQueries = await queryModel.find(
          { complaintId: { $in: user.queryIds } },
          { _id: 0 }
        );
        console.log(userQueries);
        if (userQueries) {
          userQueries.forEach((query) => {
            query.submittedDate = query.submittedDate?.toString();
            query.resolvedDate = query.resolvedDate?.toString();
          });
        }
        res.json({message : "Queries" , userQueries})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Error in getting queries"});
    }
}

module.exports = getQuery;
