const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {
// next helps to request next peace of middleware

    // verify authentication
   const {authorization} = req.headers //we get the autthorization headers
    //if it doesnt then sends an error
   if(!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
   }
   //splitting the bearer part and the token
   const token = authorization.split(' ')[1]
   
   //to verify token we use jsonweb token if there is one
   try{
    const {_id} = jwt.verify(token, process.env.SECRET)//needs a secret to verify the signature that is used in frontend 

    req.user = await User.findOne({ _id }).select('_id')
    next() //finds the next handler function

   }catch(error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})

   }


}


module.exports = requireAuth