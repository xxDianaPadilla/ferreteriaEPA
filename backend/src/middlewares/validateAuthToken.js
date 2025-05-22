import jsonwebtoken from "jsonwebtoken";
import {config} from '../config.js';

export const validateAuthToken = (allowedUserTypes = []) => {
    return(req, res, next) => {
        try {
            const {authToken} = req.cookies;

            if(!authToken){
                return res.json({message: "No auth token found, you must login"});
            }

            const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);

            if(!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Access denied"});
            }

            next();
        } catch (error) {
            console.log("error" + error);
        }
    }
};