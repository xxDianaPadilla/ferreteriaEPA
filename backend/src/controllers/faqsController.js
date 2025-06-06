import faqsModel from "../models/Faqs.js";

const faqsController = {};

faqsController.getAllFaqs = async (req, res) => {
    try {
        const faqs = await faqsModel.find();
        res.status(200).json(faqs);
    } catch (error) {
        console.log("error " + error);
        res.status(500).json({message: "Internal server error"});
    }
};

faqsController.insertFaqs = async (req, res) => {
    const {question, answer, level, isActive} = req.body;

    try {
        if(!question || !answer || !level || isActive === undefined){
            return res.status(400).json({message: "All fields are required"});
        }

        if(level < 1 || level > 10){
            return res.status(400).json({message: "Levl must be between 1 and 10"});
        }

        if(question.length < 4 || answer.length < 4){
            return res.status(400).json({message: "Question and answer must be at least 4 characters long"});
        }

        const newFaqs = new faqsModel({
            question, answer, level, isActive
        });

        newFaqs.save();

        return res.status(200).json({message: "Faqs saved"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

faqsController.updateFaqs = async (req, res) => {
    const {question, answer, level, isActive} = req.body;

    try {
        if(level < 1 || level > 10){
            return res.status(400).json({message: "Levl must be between 1 and 10"});
        }

        if(question.length < 4 || answer.length < 4){
            return res.status(400).json({message: "Question and answer must be at least 4 characters long"});
        }

        const updatedFaqs = await faqsModel.findByIdAndUpdate(req.params.id, {question, answer, level, isActive}, {new: true});

        if(!updatedFaqs){
            return res.status(400).json({message: "Not found"});
        }

        res.status(200).json({message: "Faqs updated"});
        
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

faqsController.deleteFaqs = async (req, res) => {
    try {
        const deletedFaqs = await faqsModel.findByIdAndDelete(req.params.id);

        if(!deletedFaqs){
            return res.status(400).json({message: "Not found"});
        }

        res.status(200).json({message: "Faqs deleted"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

faqsController.getFaqsById = async (req, res) => {
    try {
        const faqs = await faqsModel.findById(req.params.id);

        if(!faqs){
            return res.status(400).json({message: "Not found"});
        }

        res.status(200).json(faqs);
    } catch (error) {
        console.log("error " + error);
        res.status(500).json({message: "Internal server error"});
    }
};

export default faqsController;