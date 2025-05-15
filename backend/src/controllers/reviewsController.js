const reviewsController = {};

import reviewsModel from "../models/Reviews.js";

reviewsController.getReviews = async (req, res) =>{
    const reviews = await reviewsModel.find().populate('idCliente');
    res.json(reviews)
};

reviewsController.createReviews = async (req, res) =>{
    const {comment, rating, idCliente} = req.body;

    const newReview = new reviewsModel({
        comment, rating, idCliente
    });

    await newReview.save();
    res.json({message: "Reseña guardada"});
};

reviewsController.deleteReviews = async (req, res) =>{
    const deleteReview = await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Reseña eliminada"});
};

export default reviewsController;