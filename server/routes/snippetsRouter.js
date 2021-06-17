const express = require('express');
const {
  createSnippet,
  deleteSnippet,
  getSnippet,
  getSnippets,
  updateSnippet
} = require('../controllers/snippetsCantroller');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .post(createSnippet)
  .get(getSnippets);

router
  .route('/:id')
  .get(getSnippet)
  .patch(updateSnippet)
  .delete(deleteSnippet);

module.exports = router;
