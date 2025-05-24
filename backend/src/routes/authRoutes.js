import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/verify-auth', verifyToken, (req, res) => {
    res.json({
        message: "Authenticated",
        user: {
            id: req.user.id,
            userType: req.user.userType
        }
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie("authToken");
    res.json({message: "Logged out successfully"});
});

export default router;