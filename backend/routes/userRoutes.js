const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require('../controller/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').post(upload.single('profilePicture'), registerUser).get(protect, getUsers);
router.post('/login', authUser);
router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  .put(protect, upload.single('profilePicture'), updateUserProfile);
router.route('/:id').delete(protect, deleteUser);

module.exports = router;
