import { Visitor } from '../models/Visitor.js';
import jwt from 'jsonwebtoken';

export const registerVisitor = async (req, res) => {
    const { name, email, number } = req.body;
    try {
        await Visitor.create({ name, email, number });
        res.status(201).send("Registered successfully");
    } catch (error) {
        res.status(400).send("Error registering user");
    }
};
