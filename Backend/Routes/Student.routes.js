const router = require("express").Router();
const postAnonymous = require("../Controllers/AnonymousQuery");
const getQuery = require("../Controllers/GerQuery");
const handleQuery = require("../Controllers/PersonalQueryPost");

router.post('/personal-query',handleQuery);
router.get('/queries' , getQuery)
router.post('/anonymous-query',postAnonymous)


module.exports = router;