const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../Controller/MessageController");

router.post("/send", sendMessage);
router.get("/:user1/:user2", getMessages);

module.exports = router;

