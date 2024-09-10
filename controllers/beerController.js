import { Beer }from '../models/Beer.js';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Utility to resolve __dirname in ES6 module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const getAllBeers = async (req, res ,next) => {
    try {
        const beers = await Beer.find();
        req.beers = beers; // Store beers data in the request object
        next(); // Pass control to the next middleware
    } catch (error) {
        console.error('Error fetching beers:', error);
        res.status(500).send('Error fetching beers');
    }
};

export const displayCreateBeerForm = (req, res) => {
    res.render('createBeer');
};

export const createBeer = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        const { name, description, popularity } = req.body;
        let imageUrl = '';

        if (req.file) {
            const filename = Date.now() + '-' + req.file.originalname;
            const outputPath = path.join(__dirname, '../public/uploads/', filename);
            
            // Use Sharp to resize and save the image
            await sharp(req.file.buffer)
                .resize(800) // Resize to a width of 800px, maintaining aspect ratio
                .toFile(outputPath);

            imageUrl = '/uploads/' + filename;
        }

        const newBeer = new Beer({ name, description, popularity, imageUrl });
        await newBeer.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error creating beer:', error);
        res.status(500).send('Error creating beer');
    }
};

export const uploadBeerImage = upload.single('image');
