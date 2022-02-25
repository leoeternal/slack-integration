const express = require("express");
const router = new express.Router();

const {
  addTemplate,
  getTemplates,
  deleteTemplate,
} = require("../controllers/TemplateController");

router.post("/template", addTemplate);
router.get("/template", getTemplates);
router.delete("/template/:id", deleteTemplate);

module.exports = router;
