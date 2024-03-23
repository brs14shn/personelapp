'use strict'


const Token = require('../models/tokenModel')

module.exports = async(req,res,next)=>{
   
    const auth = req.headers?.authorization || null;  // Token ......Token key
    const tokenKey=auth ?auth.split(" ") : null
    

    if(tokenKey && tokenKey[0] == "Token"){
        const tokenData = await Token.findOne({token:tokenKey[1]}).populate('userId')
       if(tokenData){
        req.user = tokenData.userId ;
        console.log(req.user);
       }
    }
    
    next()

}