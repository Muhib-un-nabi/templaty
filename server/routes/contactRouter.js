const express = require('express');
const {
  createContact,
  getContacts,
  updateContact,
  getContact,
  deleteContact
} = require('../controllers/contactCantroller');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router
  .route('/')
  .post(createContact)
  .get(getContacts);

router
  .route('/:id')
  .get(getContact)
  .patch(updateContact)
  .delete(deleteContact);

module.exports = router;
