import express from 'express';

const router = express.Router();
import branchesController from "../controllers/branchesController.js";

router.route("/")
.get(branchesController.getBranches)
.post(branchesController.createBranches);

router.route("/:id")
.put(branchesController.updateBranches)
.delete(branchesController.deleteBranches);

export default router;