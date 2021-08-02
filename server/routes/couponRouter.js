const express = require('express');
const {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  checkCoupn
} = require('../controllers/couponCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/valid').post(checkCoupn);

//  Restricted Only  Use Super-admin
router.use(authController.restrictTo('super-admin'));

router
  .route('/')
  .post(createCoupon)
  .get(getCoupons);

router
  .route('/:id')
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

module.exports = router;
