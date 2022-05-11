let jwt = require("jsonwebtoken");
const JWT_SECRET = "thisIsJWTwebToken";

function fetchuser(req,res,next){

   const token = req.header("auth-token");      // we have extracted the token from header 

   if(!token){
       res.status(401).json({error : "login with correct credentials"});
   }

   try {

    let data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;        // we have modified req for the next funtion which use the req //
    next();
       
   } 
   
   catch (error) {
    res.status(401).json({error : "login with correct credentials"});
}


}

module.exports = fetchuser;