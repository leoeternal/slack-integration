const express = require("express");
const router = new express.Router();

const {
  addUser,
  getUsers,
  deleteUser,
  getUserDetails,
  sendMail,
} = require("../controllers/UserController");

router.post("/user", addUser);
router.get("/user/:id", getUserDetails);
router.get("/user", getUsers);
router.delete("/user/:id", deleteUser);
router.post("/send/mail", sendMail);

module.exports = router;
