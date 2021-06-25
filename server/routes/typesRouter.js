const express = require('express');
const {
  createType,
  deleteType,
  getTypes,
  getType,
  updateType
} = require('../controllers/typesCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .post(createType)
  .get(getTypes);

router
  .route('/:id')
  .get(getType)
  .patch(updateType)
  .delete(deleteType);

module.exports = router;
