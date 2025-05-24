import jsonwebtoken from "jsonwebtoken";
import {config} from '../config.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }

    jsonwebtoken.verify(token, config.JWT.secret, (error, decoded) => {
        if(error){
            return res.status(401).json({message: "Invalid token"});
        }

        req.user = decoded;
        next();
    });
};

export default verifyToken;