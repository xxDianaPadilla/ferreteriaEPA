const brachesController = {};

import branchesModel from "../models/Branches.js";

brachesController.getBranches = async (req, res) =>{
    const branches = await branchesModel.find();
    res.json(branches)
};

brachesController.createBranches = async (req, res) =>{
    const {name, address, telephone, schedule} = req.body;

    const newBranch = new branchesModel({
        name, address, telephone, schedule
    });

    await newBranch.save();
    res.json({message: "Sucursal guardada"});
};

brachesController.deleteBranches = async (req, res) =>{
    const deleteBranch = await branchesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Sucursal eliminada"});
};

brachesController.updateBranches = async (req, res) =>{
    const {name, address, telephone, schedule} = req.body;

    const updatedBranch = await branchesModel.findByIdAndUpdate(req.params.id, {name, address, telephone, schedule}, {new: true});
    
    res.json({message: "Sucursal actualizada"});
};

export default brachesController;