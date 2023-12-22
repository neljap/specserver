const {Router} = require("express");
const createContact = require("../controller/contactController");

const contactmsg = Router();

contactmsg.post("/contact/all", createContact);

module.exports = contactmsg;