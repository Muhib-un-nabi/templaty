const express = require('express');
const {
  createorUpdateSMTP,
  deleteSMTP,
  getAllSMTP,
  getSMTP,
  sendMail
} = require('../controllers/SMTPCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .get(getAllSMTP)
  .post(createorUpdateSMTP);

router.route('/send').post(sendMail);

router
  .route('/:id')
  .get(getSMTP)
  .delete(deleteSMTP);

module.exports = router;
