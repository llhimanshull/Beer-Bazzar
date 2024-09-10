import { Blog } from '../models/Blog.js';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Utility to resolve __dirname in ES6 module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({ storage: storage });

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.render('blogs', { blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Error fetching blogs');
    }
};

export const displayCreateBlogForm = (req, res) => {
    res.render('createBlog');
};

export const createBlog = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        const { category, title, paragraph } = req.body;
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

        const newBlog = new Blog({ category, title, paragraph, imageUrl });
        await newBlog.save();
        res.redirect('/blogs');
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Error creating blog');
    }
};

export const uploadBlogImage = upload.single('image');
