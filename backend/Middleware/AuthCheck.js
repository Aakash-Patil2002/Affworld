const jwt=require('jsonwebtoken');
const AuthCheck=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const user=jwt.verify(token,process.env.SECRETE_KEY);
    req.userId=user.id
    next();
}

module.exports=AuthCheck;