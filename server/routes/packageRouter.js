const express = require('express');
const {
  createPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage
} = require('../controllers/packageCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/').get(getPackages);

router.route('/:id').get(getPackage);

//  Restricted Only  Use Super-admin
router.use(authController.restrictTo('super-admin'));

router.route('/').post(createPackage);

router
  .route('/:id')
  .post(updatePackage)
  .delete(deletePackage);

module.exports = router;
