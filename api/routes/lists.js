const { Router } = require('express');
const ListController = require('../controllers/lists');
const {body, check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = Router();


// router.get('/:userId', ListController.getUserLists);

router.get('/',
    authenticateJWT,
    // [
    //   body('email').notEmpty().withMessage('Email is required'),
    // ],
    // validateRequest,
    ListController.getUserLists
  );

router.post(
    '/addItem',
    authenticateJWT,
    [
      body('listType').notEmpty().withMessage('List type is required'),
      body('movieId').notEmpty().withMessage('Movie ID is required'),
      body('contentType').notEmpty().withMessage('Content type is required'),
      body('image').notEmpty().withMessage('Image is required'),
    ],
    validateRequest,
    ListController.addListItem
  );
  
  router.delete(
    '/removeItem',
    authenticateJWT,
    [
      body('listItemId').notEmpty().withMessage('List item ID is required'),
    ],
    validateRequest,
    ListController.removeListItem
  );


router.get('/protected', authenticateJWT, (req, res) => {
        res.status(200).json({ message: 'You have access to this route!' });
    });

module.exports = router;


