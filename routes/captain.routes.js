const express =require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be in 6 character'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 character long'),
    body('vehicle.plate').isLength({min:6}).withMessage('Plate number must be at least 6 character long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike or auto'),
],

captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be in 6 character'),
],
captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);




module.exports = router;