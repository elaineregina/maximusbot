const express = require("express");
const router = express.Router();

const whatsAppControler = require("../controllers/whatsappcontrollers");

router
  .get("/", whatsAppControler.VerifyToken)
  .post("/", whatsAppControler.ReceivedMessage);

module.exports = router;
