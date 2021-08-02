const express = require('express');
const {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  updateSubscription
} = require('../controllers/subscriptionCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// router.route('/valid').post(checkCoupn);

//  Restricted Only  Use Super-admin
router.use(authController.restrictTo('super-admin'));

router
  .route('/')
  .post(createSubscription)
  .get(getSubscriptions);

router
  .route('/:id')
  .get(getSubscription)
  .patch(updateSubscription)
  .delete(deleteSubscription);

module.exports = router;
