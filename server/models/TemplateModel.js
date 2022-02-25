const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  templateId: {
    type: Number,
  },
  templateName: {
    type: String,
  },
  triggerType: {
    type: String,
  },
  text: {
    type: String,
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
