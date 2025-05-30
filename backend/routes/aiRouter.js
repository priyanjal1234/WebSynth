const express = require("express");

const { getResult } = require("../controllers/aiController");
const router = express.Router();

router.post("/get-result", getResult);


module.exports = router;
