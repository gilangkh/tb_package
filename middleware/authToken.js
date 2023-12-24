const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const isAdmin= (req,res,next )=>{
    let secret = process.env.SECRET_TOKEN;

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null){ 
    console.log("tidak berhak masuk ")
    return res.sendStatus(401)
    }
    jwt.verify(token, secret, async (err, user) => {
        
        if (err) {
        return res.json("Middleware salah+ =",err)
        } else{
   
            let    status = user.status
            if(status !='admin') return res.sendStatus(403)
        req.user = user
        
        next()
    }
    })
}
const admin= (req,res,next )=>{

}
const authenticateToken =(req, res, next)=> {

    
    let secret = process.env.SECRET_TOKEN;

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null){ 
    return res.sendStatus(401)
    }
    jwt.verify(token, secret, async (err, user) => {
        
        if (err) {
        return res.json("Middleware salah")
        } else{

         req.user = user
        
        next()
    }
    })
}

module.exports = {authenticateToken, isAdmin};