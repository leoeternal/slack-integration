const User = require("../models/UserModel");
const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const Template = require("../models/TemplateModel");

const api = process.env.SENDGRID_API;

sgMail.setApiKey(api);

const addUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const userSaved = await userData.save();
    res.status(200).send(userSaved);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(userDeleted);
  } catch (error) {
    res.status(401).send(error);
  }
};

const mail = (templateFind, user) => {
  let str = templateFind.text;
  if (str.search("{{firstname}}") !== -1) {
    str = str.replace("{{firstname}}", user.firstname);
  }
  if (str.search("{{lastname}}") !== -1) {
    str = str.replace("{{lastname}}", user.lastname);
  }
  if (str.search("{{gender}}") !== -1) {
    str = str.replace("{{gender}}", user.gender);
  }
  if (str.search("{{email}}") !== -1) {
    str = str.replace("{{email}}", user.email);
  }
  if (str.search("{{mobilenumber}}") !== -1) {
    str = str.replace("{{mobilenumber}}", user.mobilenumber);
  }
  if (str.search("{{designation}}") !== -1) {
    str = str.replace("{{designation}}", user.designation);
  }
  const message = {
    to: user.email,
    from: {
      email: "nikhiljindal79@gmail.com",
      name: "Valuebound",
    },
    subject: "Welcome to Valuebound",
    text: "welcome",
    html: str,
  };
  return message;
};

const sendMail = async (req, res) => {
  try {
    const templateFind = await Template.findById({ _id: req.body.templateId });
    sgMail
      .send(mail(templateFind, req.body.userDetails))
      .then((response) => console.log(response))
      .catch((error) => console.log(error.message));

    res.status(200).send({ status: "sent" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = { addUser, getUsers, deleteUser, getUserDetails, sendMail };
