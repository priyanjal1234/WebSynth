const { generateResult } = require("../utils/gemini");
const chatModel = require("../models/chat-model");
const userModel = require("../models/user-model");

const getResult = async function (req, res) {
  try {
    let { prompt } = req.body;
    let user = await userModel.findOne({ email: req.user.email });

    if (!prompt) return res.status(400).json({ message: "Prompt is required" });
    let { fileData, fileTree } = await generateResult(prompt);

    let existingChat = await chatModel.findOne({ user: user._id });

    if (existingChat) {
      if (existingChat.response.length >= 20) {
        existingChat.response.shift();
      }
      existingChat.response.push(fileData);
      await existingChat.save();
    } else {
      existingChat = await chatModel.create({
        user: user._id,
        response: [fileData],
      });
    }

    res.status(200).json({ fileData, fileTree, currentProject: existingChat });
  } catch (error) {
    res
      .status(500)
      .json({
        errorMessage:
          error instanceof Error ? error.message : "Error getting ai response",
      });
  }
};

module.exports = {
  getResult,
};
