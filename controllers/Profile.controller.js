'use strict'

/**
 *  importing Modules
 */
const Profile = require('../models/Profile');
const mongoose = require('mongoose');
// directory paths
const photoPath = './public/images/profile/';
const fs = require('fs');

// create profile
const createProfile = {
    // create personal info
    personal: async(req,res, next)=>{
        // Accepting requests
        const {address, phone, bio} = req.body
        const User_id = req.user.payload.user_id;
        const isExist = await Profile.findOne({user: User_id}).clone();
        if(isExist){
            next();
        }
        else{
            const newProfile = Profile({
                address: address,
                phone: phone,
                bio: bio,
                user: User_id
            });
            await newProfile.save({returnOriginal:true}, (err, success)=>{
                // if error 
                if(err) return res.status(404).json({messsage: err.message})
                // if profile not found
                else if(success == null)  return res.status(404).json({messsage: "Unable to create profile!", status:false})
                // if created
                else return res.status(201).json({profile: success,messsage: 'Profile created successfully!', status:true})
            })
        }
    },
    // create/upload photo
    photo: async(req,res, next)=>{
        // Accepting requests
        const photo = req.file.filename;
        const User_id = req.user.payload.user_id;
        const isExist = await Profile.findOne({user: User_id});
        if(isExist){
            if(isExist.photo){
                const oldPhoto = isExist.photo;
                const fullPhotoPathName = photoPath+oldPhoto;
                fs.unlink(fullPhotoPathName, function(err) {
                    if (err) {
                    return console.error(err.message);
                    }
                    next();
                });
            }
            else next(); 
        }
        else {
            const newProfile = Profile({
                photo: photo,
                user: User_id
            })
            await newProfile.save({returnOriginal: true}, function(err, updatedProfile){
            if(err) res.status(404).json({message: err.message})
            else if(!updatedProfile) res.status(404).json({message: "Unable to upload!", status:false})
            else{
                return res.status(201).json({profile: updatedProfile ,message: 'Photo uploaded!', status:true})
            }
        });
        }
    },
};

/**
 *  Update Profile
 */
const updateProfile = {

    /**
     *  personal info
    */
    personal: async(req, res)=>{
        //const User_id = req.User.User_id;
        const { address,phone, bio} = req.body;
        const User_id = req.user.payload.user_id;
        await Profile.findOneAndUpdate({user: User_id}, {
            $set: {
                address: address,
                phone: phone,
                bio: bio,
            }
        },  async (err, updatedPersonalInfo) =>{
            if(err) return res.status(404).json({messsage: err.message})
            else if(updatedPersonalInfo == null) res.status(404).json({message: "Unable to update profile!", status:false})
            else return res.status(201).json({profile: updatedPersonalInfo,messsage: 'Profile updated successfully!', status:true})
        }).clone();
    },
    /**
     *  Update photo
     */
    photo: async(req,res)=>{
       const User_id = req.user.payload.user_id;
       const photo = req.file.filename;
       await Profile.findOneAndUpdate({user: User_id},{
        $set: {
            photo: photo
        }
        },{returnOriginal: true},(err,success)=>{
            if(err) res.status(404).json({message: err.message})
            else if(!success) res.status(404).json({message: "Unable to upload!", status:false})
            else{
            return res.status(201).json({message: 'Photo uploaded!', status:true})
            }
        }).clone();
    },
};
// Reading Profile
const readProfile = {
    /**
     * 
     * reading profile authorized
     */
    auth: {
        byId: async(req, res)=>{ 
            const user_id = req.user.payload.user_id;
            let valid_user = mongoose.Types.ObjectId(user_id);
            await User.aggregate([
                {
                    $match: { _id: valid_user }
                },
                {
                    $lookup:
                    {
                        from: `profiles`,
                        localField: `user`,
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
            ], (err,success)=>{
               // console.log(success)
                if(err) return res.status(400).json({message: 'Something went wrong!', status:false})
                else if(!success) return res.status(404).json({message: 'Error', status:false});
                else return res.status(200).json({data: success,status:true})
            });
            
        }
    },
   
}

module.exports ={
    createProfile,
    updateProfile,
    readProfile,
}