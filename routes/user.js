const express = require('express');
const router = express.Router();
const { getUsers, postUser, deleteUsers, getUser, updateUser, deleteUser, sendTokenResponse, login } = require('../controllers/userController');
const adminValidator = require('../middlewares/utils/validators');
const protectedRoute = require('../middlewares/auth');

router.route('/login')
    .post(login)

router.route('/')
    .get(protectedRoute, adminValidator, getUsers)
    .post(protectedRoute, postUser)
    .delete(protectedRoute, deleteUsers);


router.route('/:userId')
    .get(getUser)
    .put(protectedRoute, updateUser)
    .delete(protectedRoute, deleteUser);
module.exports = router;