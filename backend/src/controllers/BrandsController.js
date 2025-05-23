import brandsModel from "../models/Brands.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const brandsController = {};

brandsController.getAllBrands = async (req, res) => {
    const brands = await brandsModel.find()
    res.json(brands)
} 

brandsController.insertBrands = async (req, res) =>{
    try {
        const { name, year, slogan} = req.body;
        
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
        
        const newBrand = await brandsModel.create({
            name,
            year,
            slogan,
            image: imageURL
        });
        
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

brandsController.putBrands = async (req, res) =>{
    try {
        const { name, year, slogan } = req.body;
        
        const updateData = { 
            name, 
            year, 
            slogan 
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
        
        const updatedBrand = await brandsModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );
        
        if (!updatedBrand) {
            return res.status(404).json({ error: 'Marca no encontrado' });
        }
        
        res.json(updatedBrand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

brandsController.deleteBrands = async (req, res) =>{
    const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Brand deleted"});
};

export default brandsController;