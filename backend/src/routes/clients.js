import express from 'express';

const router = express.Router();
import clientsController from "../controllers/clientsController.js";

router.route("/")
.get(clientsController.getClients)
.post(clientsController.createClients);

router.route("/:id")
.put(clientsController.updateClients)
.delete(clientsController.deleteClients);

export default router;