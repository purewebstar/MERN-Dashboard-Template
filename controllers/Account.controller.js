/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
'use strict'

/**
 *  importing Modules
*/
const User = require('../models/User');
const Profile = require('../models/Profile')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const initAgenda = require('../config/initAgenda');

/**
 * 
 *  create account, read , ....
 * 
*/
// creating User account 
// regex to test password strength
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
const createAccount = {
    /**  
     * 
     *  local account
     */
    local: async(req, res)=>{
        const {firstName, lastName, email, password} = req.body;

        if(!(strongPassword.test(password) || mediumPassword.test(password))){
            return res.status(400).json({message: 'Weak password!' ,status: false})
        }
        if(!(email && password && firstName && lastName)){
            return res.status(400).json({message: 'Input required!' ,status: false})
        }
        let displayName = email.split('@')[0];
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.findOne({
            $or: [
                {email: email},
                {google: email}
            ]
        }).clone();
        if(!result){
            const newUser = User({               
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                displayName: displayName,
            });
            await newUser.save({new:true}, async(err,success)=>{
                if(err) return res.status(400).json({message: err.message})
                else if(success){
                    // create profile
                    (async function () {
                        await initAgenda.start();
                        // delete user account of not verified
                        (async function () {
                            await initAgenda.schedule(`in 2 days`, "remove email not verified user account", {
                                user_id: success._id, 
                            });
                        })();

                    })();
                    /// send verify new account email
                    let verify = verifyAccount.newAccount(success.email, success._id);                  
                    return res.status(201).json({message: "verify your email!", status:true})
                }
            })
        }
        else if(result) return res.status(409).json({message: 'User exist!', status:false});
    },
     /**
     * 
     *  google account
     */
    google: async(req,res)=>{
        const{firstName, lastName, email, imageUrl} = req.body;

        const displayName = email&&email.split('@')[0];
        const newUser = User({
            google: email,
            email: email,
            emailVerified: true,
            external: true,
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
        });
        await newUser.save({new:true}, async(err,success)=>{
         if(err) return res.status(400).json({message: err.message})
         else{
            const newProfile = new Profile({ 
                user: success._id,
                photo: imageUrl,
            });
            await newProfile.save();
            // payload
            const user_id = success._id;
            const payload = {user_id: user_id};
            const accessToken = jwt.sign({payload}, process.env.ACCESS_KEY, {expiresIn: '1m'});
            const refreshToken = jwt.sign({payload}, process.env.REFRESH_KEY, {expiresIn: '7d'});
            let valid_user = mongoose.Types.ObjectId(success._id);
            User.aggregate([
                {
                    $match: {_id: valid_user}
                },
                {
                    $lookup:
                    {
                        from: `profiles`,
                        localField: `_id`,
                        foreignField: `user`,
                        as: `profileObj`
                    }
                },
                {
                    $unwind: '$profileObj'
                },
                {
                    $project: 
                    {
                        password: 0,
                        __v: 0
                    }
                },
            ], 
                (err,success)=>{
                if(err) return res.status(400).json({message: 'Something went wrong!', status:false})
                else if(!(success[0])) return res.status(404).json({message: 'User Not Found!', status:false});
                else{
                    return res
                    .status(200)
                    .json({ data: success, access: accessToken, refreshToken:refreshToken, message: "success",status:true });
                }
            })
            
         }
      })
    },
};
// Verify account status
const verifyAccount = {
    /**
     *  Verify account for new account registration
    */
    newAccount: async (email, user_id) =>{
        const payload = {user_id: user_id};
        const refreshToken = jwt.sign({payload}, process.env.REFRESH_KEY, {expiresIn: '2d'});
        let verifyLink = `${process.env.ORIGIN_ACCESS_HOST}/${process.env.NEW_ACCOUNT_VERIFY_ROUTE}/${refreshToken}`;
        // sending verification to user email  
        let validEmail = User.findOne({email: email}).clone();
        if(validEmail){
            (async function () {
                await initAgenda.start();
                await initAgenda.schedule(`in 5 seconds`, "send new account verify email report", {
                    to: email, from: `${process.env.SECRET_SITE_EMAIL}`,subject: 'Verify Account', text: 'MERN ACCOUNT USERS',
                    email:email, ejsTemplate: 'new-account-verify.ejs',
                    verifyLink: verifyLink,
                });
            })();
            return true;
        }
        return false;
    },
     /**
     *  Verify account for password reset
    */
    resetPassword: async (req, res) =>{
        const {email} = req.body;
        await User.findOne({email: email}, (err, success)=>{
            if(err) return res.status(403).json({message: err.message, status:false})
            else if(success){
                const User_id = success._id;
                const payload = {user_id: User_id};
                const refreshToken = jwt.sign({payload}, process.env.REFRESH_KEY, {expiresIn: '2d'});
                let verifyLink = `${process.env.ORIGIN_ACCESS_HOST}/${process.env.RESET_PASSWORD_VERIFY_ROUTE}/${refreshToken}`;
                // sending verification to user email  
                (async function () {
                    await initAgenda.start();
                    await initAgenda.schedule(`in 5 seconds`, "send reset password verify email report", {
                        to: success.email, from: `${process.env.SECRET_SITE_EMAIL}`,subject: 'Verify Account', text: 'MERN ACCOUNT USERS',
                        email:success.email, ejsTemplate: 'reset-password-verify.ejs',
                        verifyLink: verifyLink,
                    });
                })(); 
                 return res.status(201).json({message: "verify your email!", status:true})
            }
            else return res.status(404).json({message: 'Not found!', status: false})
        }).clone();
    },
}

// Reading Account
const readAccount = {

    byId: async(req, res)=>{
        const User_id = req.user.payload.user_id;
        await User.findOne({_id: User_id},function(err, success){
           if(err) return res.status(400).json({message: err.message, status:false})
           else if(!success) return res.status(404).json({message: 'Not Found!', status:false})
           else{
            const USER = {}
                USER.google = success.google;
                USER.firstName = success.firstName;
                USER.id = success._id;
            return res.status(200).json({data: USER,status:true})
           }
        }).clone();
    },
    verified: (user_id)=>{
        let valid_user = mongoose.Types.ObjectId(user_id);
        let isVerified;
        User.aggregate([
            {
                $match: 
                {
                    $and: [
                        { _id: valid_user },
                        {emailVerified: false}, 
                        {external: false}
                    ]
                }
            },
        ], (err,success)=>{
            if(err) isVerified = false;
            else if(success) isVerified = true;
            else isVerified = false;
        });
        return isVerified;
    },
    local: async(req, res)=>{
        const {email, password} = req.body;
        if(!(email && password)){
            return res.status(400).json({message: 'Input required!' ,status: false})
        }
        const result = await User.findOne({email: email}).clone();
        let isMatch;
        if(result){
            if(result.password){
                isMatch = await bcrypt.compare(password, result.password);
            }           
            if(isMatch){
                let valid_user = mongoose.Types.ObjectId(result._id);
                await User.aggregate([
                    {
                        $match: {
                            $and: [
                                { _id: valid_user },
                                { emailVerified: true }, 
                                { external: false }
                            ]
                        }
                    },
                    {
                        $lookup:
                        {
                            from: `profiles`,
                            localField: `_id`,
                            foreignField: `user`,
                            as: `profileObj`
                        }
                    },
                    {
                        $unwind: '$profileObj'
                    },
                    {
                        $project: 
                        {
                            password: 0,
                            __v: 0
                        }
                    },
                ], async (err, success)=>{
                    
                    if(err) return res.status(400).json({message: 'Something went wrong!', status:false})
                    else if(!(success[0] && isMatch)) return res.status(404).json({message: 'User Not Found!', status:false});
                    else{
                        if(!(success[0]&&success[0].profileObj&&success[0].profileObj[0])){
                            const newProfile = new Profile({
                                user: success[0]&&success[0]._id
                            });
                            await newProfile.save();
                        }

                        const payload = {user_id: success[0]&&success[0]._id};
                        const accessToken = jwt.sign({payload}, process.env.ACCESS_KEY, {expiresIn: '1m'});
                        const refreshToken = jwt.sign({payload}, process.env.REFRESH_KEY, {expiresIn: '7d'});
                        return res                           
                            .status(200)
                            .json({ data: success&&success[0], accessToken: accessToken, refreshToken:refreshToken, message: "success" ,status: true});

                    }
                });
            }
            else return res.status(404).json({message: 'Password mismatch!', status: false});
        }
       else return res.status(404).json({message: 'User Not Found', status:false});
    },
    
    google: async(req,res, next)=>{
        const {email} = req.body;
        await User.aggregate([
            {
                $match: {
                    $or: [
                        { email: email },
                        { google: email }, 
                    ]
                }
            },
            {
                $lookup:
                {
                    from: `profiles`,
                    localField: `_id`,
                    foreignField: `user`,
                    as: `profileObj`
                }
            },
            {
                $unwind: '$profileObj'
            },
            {
                $project: 
                {
                    password: 0,
                    __v: 0
                }
            },
        ],(err, success)=>{
           if(err) return res.status(400).json({message: err.message, status:false})
           else if(!success[0]){
              next()
           }
           else{
            // payload
            const payload = {user_id: success[0]&&success[0]._id};
            const accessToken = jwt.sign({payload}, process.env.ACCESS_KEY, {expiresIn: '1m'});
            const refreshToken = jwt.sign({payload}, process.env.REFRESH_KEY, {expiresIn: '7d'});
            return res
                
                .status(200)
                .json({ data: success, access: accessToken, refreshToken:refreshToken, message: "success", status:true });
              
           }
        });
    },

};

const updateAccount = {
    updatePassword: async (req, res)=>{
        const {oldPassword, newPassword} = req.body;
        const User_id = req.user.payload.user_id;
        if(!(strongPassword.test(newPassword) && mediumPassword.test(newPassword))){
            return res.status(400).json({message: 'Weak password!' ,status: false})
        }
        const hashedOldPassword = await bcrypt.hash(oldPassword, 12);
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        await User.findOneAndUpdate({_id: User_id}, {
            $set:{
                password: hashedNewPassword
            }
        }, {returnOriginal: true}, (err,success)=>{
            if(err) return res.status(400).json({message: 'Something went wrong!', status:false});
            else if(success) return res.status(201).json({messsage: 'password updated!', status: true});
        }).clone();

    },
    newAccount: async(req, res)=>{
        const token = req.body.token;
        if(!token) return res.status(500).json({message: 'Expired!', status:false});
        jwt.verify(token, process.env.REFRESH_KEY, async(err, decoded) =>{
            if(err) return res.status(500).json({message: 'Expired!', status:false});
            if(decoded){
                let user_id = decoded.payload.user_id;
                await User.findOneAndUpdate({_id: user_id}, {
                    $set:{
                        emailVerified: true,
                    }
                }, (err,success)=>{
                    if(err) return res.status(500).json({message: 'Something went wrong!', status:false});
                    else if(success) return res.status(201).json({messsage: 'verified!', status: true});
                }).clone();
            }
        });

    },
    resetPassword: async (req, res)=>{
        const {newPassword, token} = req.body;
        if(!token) return res.status(500).json({message: 'Expired!', status:false});
        if(newPassword==='' || newPassword===null){
            return res.status(400).json({message: 'Input required!' ,status: false})
        }
        jwt.verify(token, process.env.REFRESH_KEY, async(err, decoded) =>{
            if(err) return res.status(500).json({message: 'Expired!', status:false});
            if(decoded){
                let user_id = decoded.payload.user_id;
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                //  const User_id = req.User.User_id;
                await User.findOneAndUpdate({_id: user_id}, {
                    $set:{
                        password: hashedPassword
                    }
                }, {returnOriginal: true}, (err,success)=>{
                    if(err) return res.status(500).json({message: 'Something went wrong!', status:false});
                    else if(success){
                        return res.status(201).json({messsage: 'password updated!', status: true});
                    }
                }).clone();
            }
        });

    },
    checkResetPassword: async (req, res)=>{
        const {token} = req.body;
        if(!token) return res.status(500).json({message: 'Expired!', status:false});
        jwt.verify(token, process.env.REFRESH_KEY, async(err, decoded) =>{
            if(err) return res.status(500).json({message: 'Expired!', status:false});
            if(decoded){
                let user_id = decoded.payload.user_id;
                let isExist = User.findOne({_id: user_id}).clone();
                if(isExist) return res.status(201).json({messsage: 'verified!', verifyToken: token, status: true});
                else if(err) return res.status(404).json({message: 'Not found!', status:false});
            }
        });

    },
}
/** REMOVE NOT VERIFIED AND EXPIRED ACCOUNT */
const removeAccount = {
    expired: (user_id)=>{
        User.findOneAndDelete({_id: user_id},(err,success)=>{
            if(err) return false;
            else if(success) return true;
            else return false;
        }).clone();
    }
}

module.exports = {
    createAccount,
    readAccount,
    updateAccount,
    verifyAccount,
    removeAccount,
}
