const User = require("../models/UserModel");
const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const Template = require("../models/TemplateModel");

const addTemplate = async (req, res) => {
  const count = await Template.find().count();
  req.body.templateId = count + 1;
  try {
    const templateCreated = new Template(req.body);
    const templateSaved = await templateCreated.save();
    res.status(200).send(templateSaved);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).send(templates);
  } catch (error) {
    res.status(401).send(error);
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const templateDeleted = await Template.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(templateDeleted);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = { addTemplate, getTemplates, deleteTemplate };
