const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);

const registerUser = async (req, res) => {

    const isValid = Joi.object({
        name : Joi.string().required(),
        username : Joi.string().min(3).max(30).required(),
        password : Joi.string().min(8).required(),
        email : Joi.string().email()
    }).validate(req.body);

    if(isValid.error){
        return res.status(400).send({
            status : 400,
            message : "Invalid Input",
            data : isValid.error,
        })
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password,BCRYPT_SALT);

    const userObj = new User({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword
    });

    try {
        userObj.save();
        res.status(201).send({
            status : 201,
            message : "User Created successfully!"
        });
    } 
    catch (error) {
        res.status(400).send({
            status : 400,
            message : "DB Error : User creation failed",
            data : error
        })
    }

}   


const loginUser = async (req, res) =>{

    const {loginId, password} = req.body;
    let userData;
    try {
        if(Joi.isEmail(loginId)){
            userData = await User.findOne({email : loginId}); 
        }
        else{
            userData = await User.findOne({username : loginId});
        }

        if(!userData){
            return res.status(400).send({
                status : 400,
                message : "No user found! Please register or check your credentials",
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, userData.password);

        if(isPasswordMatched){
            return res.status(200).send({
                status : 200,
                message : "Successfully logged in!"
            })
        }
        else{
            return res.status(400).send({
                status : 400,
                message : "Incorrect Password!"
            })
        }
    } 
    catch (error) {
        res.status(400).send({
            status : 400,
            message : "DB Error : Login failed",
            data : error
        })
    }
}


module.exports = { registerUser, loginUser }