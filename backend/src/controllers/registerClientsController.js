import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import clientsModel from "../models/Clients.js";
import {config} from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) =>{
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    try {
        const existsClient = await clientsModel.findOne({email});
        if(existsClient){
            return res.json({message: "Client already exists"});
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newClient = new clientsModel({
            name, lastName, birthday, email, password: passwordHash, telephone, dui: dui || null, isVerified: isVerified || false
        });

        await newClient.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "2h"}
        )

        res.cookie("verificationToken", tokenCode, {maxAge: 2 * 60 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        });

        const mailOptions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar tu cuenta utiliza este código: " + verificationCode + "expira en dos horas"
        }

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error) console.log("error" + error);
            res.json({message: "Email sent" + info});
        });

        res.json({message: "Client registered, please verify your email"});
    } catch (error) {
        console.log("error" + error);
        res.json({message: "Error" + error});
    }
};

registerClientsController.verifyCodeEmail = async (req, res) =>{
    const {verificationCodeRequest} = req.body;

    const token = req.cookies.verificationToken;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {email, verificationCode: storedCode} = decoded;

    if(verificationCodeRequest !== storedCode){
        res.json({message: "Invalid code."});
    }

    const client = await clientsModel.findOne({email});
    client.isVerified = true;
    await client.save();

    res.clearCookie("verificationToken");

    res.json({message: "Email verified successfully"});
};

export default registerClientsController;