const express = require("express");
const { generateResult } = require("../utils/gemini");
const chatModel = require("../models/chat-model");
const router = express.Router();

router.post("/get-result", async function (req, res) {
  try {
    let { prompt } = req.body;
    
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });
    let {fileData,fileTree} = await generateResult(prompt);
    let resCreated = await chatModel.create({ response: fileData });

    let currentProject = await chatModel.findOne({_id: resCreated._id})
    res.status(200).json({ fileData,fileTree, resCreated, currentProject });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});


module.exports = router;
