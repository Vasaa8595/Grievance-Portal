const router = require('express').Router();

const getAllQueries = require('../Controllers/Admin-Handlers/GetAllQueries');
const solveQuery = require('../Controllers/Admin-Handlers/SolveQueries');

router.get("/queries", getAllQueries);

router.put('/query' , solveQuery)


module.exports = router;