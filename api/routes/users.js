const { Router } = require('express');
const UserController = require('../controllers/users');
const {body, check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = Router();


router.get('/getUser',
    authenticateJWT,
    UserController.getUserById
);
router.post('/updateUser',
    [
        check("username").not().isEmpty(),
        validateRequest,
    ],
    authenticateJWT,
    UserController.updateUser
);

router.get('/', UserController.getUsers);

router.post('/',
    [
        check("username").not().isEmpty(),
        check("email").not().isEmpty(),
        check("password").not().isEmpty(),
        validateRequest,
    ],
    UserController.createUser);

router.post('/login',
    [
        check("email").not().isEmpty(),
        check("password").not().isEmpty(),
        validateRequest,
    ],
    UserController.login); 

    router.get('/protected', authenticateJWT, (req, res) => {
        res.status(200).json({ message: 'You have access to this route!' });
    });

module.exports = router;


