import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let userFound;
        let userType;

        if (email === config.admin.email && password === config.admin.password) {
            userType = "admin";
            userFound = { _id: "admin" };
        } else {
            userFound = await employeesModel.findOne({ email });
            userType = "employee";

            if (!userFound) {
                userFound = await clientModel.findOne({ email });
                userType = "client";
            }
        }

        if (!userFound) {
            return res.json({ message: "User not found" });
        }

        if (userType !== "admin") {
            const isMatch = bcryptjs.compare(password, userFound.password);
            if (!isMatch) {
                return res.json({ message: "Invalid password" });
            }
        }

        jsonwebtoken.sign(
            { id: userFound._id, userType },
            config.JWT.secret,
            { expiresIn: config.JWT.expires },
            (error, token) => {
                if (error) console.log("error" + error);
                res.cookie("authToken", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.json({ message: "login successful" });
            }
        )
    } catch (error) {
        console.log("error" + error);
    }
}

export default loginController;