import express from "express";
import faqsController from "../controllers/faqsController.js";

const router = express.Router();

router.route("/")
.get(faqsController.getAllFaqs)
.post(faqsController.insertFaqs);

router.route("/:id")
.get(faqsController.getFaqsById)
.put(faqsController.updateFaqs)
.delete(faqsController.deleteFaqs);

export default router;