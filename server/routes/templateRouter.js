const express = require('express');
const {
  createTemplate,
  deleteTemplate,
  getTemplate,
  getTemplates,
  updateTemplate
} = require('../controllers/templateCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .post(createTemplate)
  .get(getTemplates);

router
  .route('/:id')
  .get(getTemplate)
  .patch(updateTemplate)
  .delete(deleteTemplate);

module.exports = router;
