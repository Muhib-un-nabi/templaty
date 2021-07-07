const express = require('express');
const {
  createSMTP,
  deleteSMTP,
  getAllSMTP,
  getSMTP,
  updateSMTP
} = require('../controllers/SMTPCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .get(getAllSMTP)
  .post(createSMTP);

router
  .route('/:id')
  .get(getSMTP)
  .patch(updateSMTP)
  .delete(deleteSMTP);

module.exports = router;
