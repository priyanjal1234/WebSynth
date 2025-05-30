const express = require("express");
const { getResult } = require("../controllers/aiController");
const { isLoggedin } = require("../middlewares/isLoggedin");

const router = express.Router();

router.post("/get-result", isLoggedin , getResult);


module.exports = router;
