const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.status(200).json("Message added successfully!");
    }
    return res.status(300).json("Failed to add message to the database!");
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updateAt: 1 });
    const projectMessages = messages.map(msg => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));
    return res.status(200).json(projectMessages);
  } catch (error) {
    next(error);
  }
};
