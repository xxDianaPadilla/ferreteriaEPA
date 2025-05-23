import productsModel from "../models/Products.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const productsController = {};

productsController.getProducts = async (req, res) =>{
    const products = await productsModel.find();
    res.json(products)
};

productsController.createProducts = async (req, res) =>{
    try {
        const { name, description, price, stock } = req.body;
        
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
        
        const newProduct = await productsModel.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            image: imageURL
        });
        
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

productsController.deleteProducts = async (req, res) =>{
    const deleteProduct = await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Producto eliminado"});
};

productsController.updateProducts = async (req, res) =>{
    try {
        const { name, description, price, stock } = req.body;
        
        const updateData = { 
            name, 
            description, 
            price: parseFloat(price), 
            stock: parseInt(stock) 
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
        
        const updatedProduct = await productsModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

productsController.getProduct = async (req, res) =>{
    const product = await productsModel.findById(req.params.id);
    res.json(product);
};

export default productsController;