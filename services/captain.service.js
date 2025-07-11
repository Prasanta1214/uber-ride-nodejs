const captainModel = require('../models/captain.models');


module.exports.createCaptain = async({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    vehicleType,
    capacity

})=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !vehicleType || !capacity){
        throw new Error('All fields are required');
    }
    const captain =  captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
            
        }
    });
    return captain;
}