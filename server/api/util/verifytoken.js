const error_string = require('./config/error_string.json')
exports.verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        return res.status(403).json({
            message: error_string.forbidden
        })
    }
}