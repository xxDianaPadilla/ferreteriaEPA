import providersModel from "../models/Providers.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const providersController = {};

providersController.getAllProviders = async (req, res) => {
    const providers = await providersModel.find()
    res.json(providers)
} 

providersController.insertProviders = async (req, res) =>{
    try {
        const { name, telephone} = req.body;
        
        let imageURL = "";
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            imageURL = result.secure_url;
        }
        
        const newProvider = await providersModel.create({
            name,
            telephone,
            image: imageURL
        });
        
        res.status(201).json(newProvider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

providersController.putProviders = async (req, res) =>{
    try {
        const { name, telephone } = req.body;
        
        const updateData = { 
            name, 
            telephone 
        };
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            updateData.image = result.secure_url;
        }
        
        const updatedProvider = await providersModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );
        
        if (!updatedProvider) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        
        res.json(updatedProvider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

providersController.deleteProviders = async (req, res) =>{
    const deleteProvider = await providersModel.findByIdAndDelete(req.params.id);
    res.json({message: "Provider deleted"});
};

export default providersController;