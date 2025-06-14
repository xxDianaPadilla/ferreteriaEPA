import express from "express";
import claimsController from "../controllers/claimsController.js";

const router = express.Router();

router.route("/")
.get(claimsController.getAllClaims)
.post(claimsController.insertClaims);

router.route("/:id")
.get(claimsController.getClaimsById)
.put(claimsController.updateClaims)
.delete(claimsController.deleteClaims);

export default router;