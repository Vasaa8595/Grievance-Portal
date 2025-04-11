const {Schema , model} = require('mongoose');

const totalQuerySchema = new Schema({
    totalQueries : {
        type:Number,
        default:0
    }
})

const totalQueryModel = model('totalQueries' , totalQuerySchema);

module.exports = totalQueryModel;