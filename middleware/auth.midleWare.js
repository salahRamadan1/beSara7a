var jwt = require('jsonwebtoken');
const { createTryAndCatch } = require('../utils/catchErrors');
module.exports.auth=  
    async (req,res,next)=>{
        const token  = req.header('token')
            jwt.verify(token, process.env.SECRETTOKEN,async function(err, decoded) {
                if(err){
                    res.json({err})
                }else{            
                    req.id = decoded.userId
                         next()
                }
              });
        
        }
 