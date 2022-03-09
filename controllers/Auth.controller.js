'use strict';

const jwt = require('jsonwebtoken');

/**
 * 
 *  Token
 */
const tokens = {
    /**
     *  renew access token
     */
    renew: async(req,res)=>{
        const token = req.params.token;
        if(!token) return res.status(401).json({message: 'Unauthorized', status: false});
        let verified =  jwt.verify(token, process.env.REFRESH_KEY);
        if(verified){
            const payload = {user_id: verified.payload.user_id};
            const accessToken = jwt.sign({payload}, process.env.ACCESS_KEY, {expiresIn: '1m'});
            return res.status(201).json({accessToken: accessToken, status:true});
        }
        else return res.status(401).json({message: 'error', status:false});
    },
    /**
     *  verify refresh token
     */
    verify: async(token)=>{
        if(!token) return false; 
        jwt.verify(token, process.env.REFRESH_KEY, (err, success)=>{
            if(err) return false;
            else if(success){
                return success.payload.user_id;
            }
        });
    },
}


module.exports = tokens;