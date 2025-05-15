import employeeModel from "../models/Employees.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) =>{
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;

    try {
        const employeeExist = await employeeModel.findOne({email});
        if(employeeExist){
            return res.json({message: "Employee already exist"});
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newEmployee = new employeeModel({
            name, lastName, birthday, email, address, hireDate, password: passwordHash, telephone, dui, isssNumber, isVerified
        });

        await newEmployee.save();
        
        jsonwebtoken.sign(
            {id: newEmployee._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expires},
            (error, token) => {
                if(error) console.log("Error");

                res.cookie("authToken", token);
                res.json({message: "Employee registered"})
            }
        )
    } catch (error) {
        console.log("error" + error);
        res.json({message: "Error"});
    }
};

export default registerEmployeeController;