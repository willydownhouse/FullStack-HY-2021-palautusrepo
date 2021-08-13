const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authController.checkIfLoggedIn, blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getOneBlog)
  .patch(blogController.updateBlog)
  .delete(authController.checkIfLoggedIn, blogController.deleteBlog);

router.route('/').post(blogController.createBlog);

module.exports = router;
