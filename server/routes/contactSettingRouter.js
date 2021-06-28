const express = require('express');
const {
  getSetting,
  savaSetting,
  // createSetting,
  deleteSetting,
  addQueryParams
} = require('../controllers/contactSettingCantroller');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(addQueryParams, getSetting)
  .patch(savaSetting)
  .delete(addQueryParams, deleteSetting);

module.exports = router;
