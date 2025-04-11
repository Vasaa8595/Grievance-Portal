const createUser = require("../Controllers/Super-admin-Handlers/CreateUser");
const getUsers = require("../Controllers/Super-admin-Handlers/GetUser");

const router = require("express").Router();

router.route("/user")

router.route("/user").get(getUsers).post(createUser);

module.exports = router;
