const express = require('express');
const {
  getNotification,
  createNotification,
  deleteNotification,
  getNotifications,
  updateNotification
} = require('../controllers/notificationCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .post(createNotification)
  .get(getNotifications);

router
  .route('/:id')
  .get(getNotification)
  .post(updateNotification)
  .delete(deleteNotification);

module.exports = router;
