import { Review } from '../models/Review.js';

export const getAllReviews = async (req, res ,next) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        req.reviews = reviews; // Store reviews data in the request object
        next(); // Pass control to the next middleware
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Error fetching reviews');
    }
};

export const createReview = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newReview = new Review({ name, description });
        await newReview.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).send('Error creating review');
    }
};
