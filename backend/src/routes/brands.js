import express from "express";
import brandsController from "../controllers/BrandsController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({dest: "brands/"})

router.route("/")
.get(brandsController.getAllBrands)
.post(upload.single("image"), brandsController.insertBrands);

router.route("/:id")
.put(upload.single("image"), brandsController.putBrands)
.delete(brandsController.deleteBrands);


export default router;