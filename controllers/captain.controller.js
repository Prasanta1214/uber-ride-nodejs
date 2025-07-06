const captainModel= require('../models/captain.models');
const captainService = require('../services/captain.service');
const {validationResult} =require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});

    
}
module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token, captain})
}

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain;
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    res.status(200).json({ captain });
}
module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}