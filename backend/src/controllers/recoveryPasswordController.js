import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import clientsModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js";
import { config } from "../config.js";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    const { email } = req.body;

    try {
        let userFound;
        let userType;

        userFound = await clientsModel.findOne({ email })
        if (userFound) {
            userType = "client";
        } else {
            userFound = await employeesModel.findOne({ email })
            if (userFound) {
                userType = "employee";
            }
        }

        if (!userFound) {
            return res.json({ message: "User not found" });
        }

        const code = Math.floor(10000 + Math.random() * 90000).toString();

        const token = jsonwebtoken.sign(
            { email, code, userType, verified: false },
            config.JWT.secret,
            { expiresIn: "20m" }
        )

        res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 })

        await sendEmail(
            email,
            "Password recovery code",
            `Your verification code is: ${code}`,
            HTMLRecoveryEmail(code)
        )

        res.json({ message: "Verification code sent" })
    } catch (error) {
        console.log("error" + error);
    }
};

recoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({ message: "Invalid code" });
        }

        const newToken = jsonwebtoken.sign(
            {
                email: decoded.email,
                code: decoded.code,
                userType: decoded.userType,
                verified: true,
            },

            config.JWT.secret,
            {expiresIn: "20m"}
        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 20 * 60 * 1000});

        res.json({message: "Code verified successfully"});
    } catch (error) {
        console.log("error" + error);
    }
};

recoveryPasswordController.newPassword = async (req, res) =>{
    const {newPassword} = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if(!decoded.verified){
            return res.json({message: "Code not verified"});
        }

        const {email, userType} = decoded;

        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        let updatedUser;

        if(userType === "client"){
            updatedUser = await clientsModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
        }else if(userType === "employee"){
            updatedUser = await clientsModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
        }

        res.clearCookie("tokenRecoveryCode");
        res.json({message: "Password updated successfully"});
    } catch (error) {
        console.log("error" + error);
    }
};

export default recoveryPasswordController;