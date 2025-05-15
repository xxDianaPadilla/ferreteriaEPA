const clientsController = {};

import clientsModel from "../models/Clients.js";

clientsController.getClients = async (req, res) =>{
    const clients = await clientsModel.find();
    res.json(clients)
};

clientsController.createClients = async (req, res) =>{
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    const newClient = new clientsModel({
        name, lastName, birthday, email, password, telephone, dui, isVerified
    });

    await newClient.save();
    res.json({message: "Cliente guardado"});
};

clientsController.deleteClients = async (req, res) =>{
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Cliente eliminado"});
};

clientsController.updateClients = async (req, res) =>{
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    const updatedClient = await clientsModel.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, password, telephone, dui, isVerified}, {new: true});
    
    res.json({message: "Cliente actualizado"});
};

export default clientsController;