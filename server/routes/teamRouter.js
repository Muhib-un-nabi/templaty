const express = require('express');
const {
  updateUsers,
  deleteUsers,
  addQueryParams,
  getTeamDetail,
  createUser
} = require('../controllers/teamCantroller');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.route('/detail').get(addQueryParams, getTeamDetail);

router.use(authController.restrictTo('admin'));

router.route('/users').post(createUser, addQueryParams, getTeamDetail);

router.route('/users/:id').delete(deleteUsers);
// .patch(updateUsers)

module.exports = router;
