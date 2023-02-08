const jwt = require('jsonwebtoken');
const USER = require('../models/userSchema');
const secretkey = process.env.KEY;


const authenticate = async(req,res,next)=>{
   // console.log(req.cookies.Amazonweb);
    try {
       const  token = req.cookies.Amazonweb;
       console.log(token);
       
       const verifyToken = jwt.verify(token,secretkey);
       console.log(verifyToken);
       
       const rootUser = await USER.findOne({_id: verifyToken._id,'tokens.token': token});
       console.log(rootUser);

       if(!rootUser) throw new Error("user not found");
       
       req.token = token;
       req.rootUser = rootUser;
       req.userID = rootUser._id;

      //  console.log(rootUser);
       
       next();

    } catch (error) {
       res.status(401).send('Unautherized: No token provide');
       console.log(error.message + 'unautorized');   
    }
}


module.exports = authenticate; 