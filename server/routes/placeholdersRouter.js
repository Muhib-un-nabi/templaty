const express = require('express');
const {
  createPlaceholder,
  deletePlaceholder,
  getPlaceholder,
  getPlaceholders,
  updatePlaceholder
} = require('../controllers/placeholdersCantroller');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .post(createPlaceholder)
  .get(getPlaceholders);

router
  .route('/:id')
  .get(getPlaceholder)
  .patch(updatePlaceholder)
  .delete(deletePlaceholder);

module.exports = router;
