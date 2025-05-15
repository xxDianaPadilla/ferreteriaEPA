import express from "express";
import providersController from "../controllers/ProvidersController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({dest: "public/"})

router.route("/")
.get(providersController.getAllProviders)
.post(upload.single("image"), providersController.insertProviders);

export default router;