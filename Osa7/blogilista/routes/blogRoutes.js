const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(
    authController.checkIfLoggedIn,
    blogController.createBlog,
    userController.updateUserBlogsAfterBlogCreate
  );

router
  .route('/:id')
  .get(blogController.getOneBlog)
  .patch(blogController.updateBlog)
  .delete(authController.checkIfLoggedIn, blogController.deleteBlog);

router
  .route('/:id/comments')
  .post(authController.checkIfLoggedIn, blogController.addComment);

router.route('/').post(blogController.createBlog);

module.exports = router;
