const queryModel = require('../../Models/Query.model')
async function getAllQueries(req, res) {
    
    try{
        const queries = await queryModel.find({},{_id:0});
        res.json({message:"Queries" , queries});
    }catch(e){
        console.log(e);
        res.status(500).json({message :"Couldn't get queries"})
    }

}
module.exports = getAllQueries;