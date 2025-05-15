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

brandsController.insertBrands = async (req, res) => {
    try {
        const {name, year, slogan} = req.body;
        let imageURL = "";

        if(req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            imageURL = result.secure_url;
        }

        const newBrand = new brandsModel({name, year, slogan, image: imageURL});
        await newBrand.save();

        res.json({message: "Brand saved"});
    } catch (error) {
        console.error("Error inserting brand:", error);
        res.status(500).json({message: "Error saving brand", error});
    }
};

brandsController.putBrands = async (req, res) => {
    const {name, year, slogan} = req.body;

    let imageURL = "";

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"]
            }
        )
        imageURL = result.secure_url
    }

    await brandsModel.findByIdAndUpdate(req.params.id, {name, year, slogan, image: imageURL}, {new: true});

    res.json({message: "Brand updated"});
};

brandsController.deleteBrands = async (req, res) =>{
    const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Brand deleted"});
};

export default brandsController;