import claimsModel from "../models/Claims.js";
import clientsModel from "../models/Clients.js";
import productsModel from "../models/Products.js";
import branchesModel from "../models/Branches.js";
import employeesModel from "../models/Employees.js";
import mongoose from "mongoose";

const claimsController = {};

claimsController.getAllClaims = async (req, res) => {
    try {
        const claims = await claimsModel.find();
        res.status(200).json(claims);
    } catch (error) {
        console.log("error " + error);
        res.status(500).json({ message: "Internal server <error" });
    }
};

claimsController.insertClaims = async (req, res) => {
    const { customerId, productId, branchId, employeeId, subject, description, status, response, level } = req.body;

    try {
        if (!customerId || !subject || !description) {
            return res.status(400).json({ message: "customerId, subject and description are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ message: "customerId must be a valid ObjectId" });
        }

        if (subject.length < 5) {
            return res.status(400).json({ message: "Subject must be at least 5 characters long" });
        }

        if (description.length < 10) {
            return res.status(400).json({ message: "Description must be at least 10 characters long" });
        }

        if (response && response.length < 10) {
            return res.status(400).json({ message: "Response must be at least 10 characters long" });
        }

        const customerExists = await clientsModel.findById(customerId);
        if (!customerExists) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ message: "productId must be a valid ObjectId" });
            }
            const productExists = await productsModel.findById(productId);
            if (!productExists) {
                return res.status(404).json({ message: "Product not found" });
            }
        }

        if (branchId) {
            if (!mongoose.Types.ObjectId.isValid(branchId)) {
                return res.status(400).json({ message: "branchId must be a valid ObjectId" });
            }
            const branchExists = await branchesModel.findById(branchId);
            if (!branchExists) {
                return res.status(404).json({ message: "Branch not found" });
            }
        }

        if (employeeId) {
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({ message: "employeeId must be a valid ObjectId" });
            }
            const employeeExists = await employeesModel.findById(employeeId);
            if (!employeeExists) {
                return res.status(404).json({ message: "Employee not found" });
            }
        }

        const newClaim = new claimsModel({
            customerId,
            productId,
            branchId,
            employeeId,
            subject,
            description,
            status,
            response,
            level
        });

        await newClaim.save();

        return res.status(201).json({ message: "Claims created successfully" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

claimsController.updateClaims = async (req, res) => {
    const { customerId, productId, branchId, employeeId, subject, description, status, response, level } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ message: "customerId must be a valid ObjectId" });
        }

        if (subject.length < 5) {
            return res.status(400).json({ message: "Subject must be at least 5 characters long" });
        }

        if (description.length < 10) {
            return res.status(400).json({ message: "Description must be at least 10 characters long" });
        }

        if (response && response.length < 10) {
            return res.status(400).json({ message: "Response must be at least 10 characters long" });
        }

        const customerExists = await clientsModel.findById(customerId);
        if (!customerExists) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ message: "productId must be a valid ObjectId" });
            }
            const productExists = await productsModel.findById(productId);
            if (!productExists) {
                return res.status(404).json({ message: "Product not found" });
            }
        }

        if (branchId) {
            if (!mongoose.Types.ObjectId.isValid(branchId)) {
                return res.status(400).json({ message: "branchId must be a valid ObjectId" });
            }
            const branchExists = await branchesModel.findById(branchId);
            if (!branchExists) {
                return res.status(404).json({ message: "Branch not found" });
            }
        }

        if (employeeId) {
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({ message: "employeeId must be a valid ObjectId" });
            }
            const employeeExists = await employeesModel.findById(employeeId);
            if (!employeeExists) {
                return res.status(404).json({ message: "Employee not found" });
            }
        }

        const updatedClaims = await claimsModel.findByIdAndUpdate(req.params.id, {customerId, productId, branchId, employeeId, subject, description, status, response, level}, {new: true});

        if(!updatedClaims){
            return res.status(400).json({message: "Not found"});
        }

        res.status(200).json({message: "Claims updated"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

claimsController.deleteClaims = async (req, res) => {
    try {
        const deletedClaims = await claimsModel.findByIdAndDelete(req.params.id);

        if(!deletedClaims){
            return res.status(400).json({message: "Not found"});
        }

        res.status(200).json({message: "Claims deleted"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

claimsController.getClaimsById = async (req, res) => {
    try {
        const claims = await claimsModel.findById(req.params.id);

        if(!claims){
            return res.status(400).json({message: "Not found"});
        }

        res.status(200).json(claims);
    } catch (error) {
        console.log("error " + error);
        res.status(500).json({message: "Internal server error"});
    }
};

export default claimsController;