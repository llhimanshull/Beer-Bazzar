import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import  Jwt  from 'jsonwebtoken';
import { authenticateJWT, login } from './controllers/adminController.js';
import { registerVisitor } from './controllers/visitorController.js';
import { getAllBlogs, displayCreateBlogForm, createBlog, uploadBlogImage } from './controllers/blogController.js';
import { getAllBeers, displayCreateBeerForm, createBeer, uploadBeerImage } from './controllers/beerController.js';
import { getAllReviews,createReview } from './controllers/reviewController.js';
mongoose.connect("mongodb+srv://himanshuchandekar946:SOIQ83XvrV8rORX2@beerbazaar.wblvsu5.mongodb.net/?retryWrites=true&w=majority&appName=BeerBazaar", {
    dbName: "BeerBazaar",
}).then(c => console.log("database connected")).catch(e => console.log(e));

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

// Public Routes
app.get("/", getAllBeers, getAllReviews, (req, res) => {
    const { beers, reviews } = req;
    res.render('index', { beers, reviews });
});
app.get("/beerguide", (req, res) => {res.render("beerguide")});
app.get("/login", (req, res) => {res.render("login")});
app.get("/blogs", getAllBlogs);

app.post("/", registerVisitor);
app.post("/login", login);
app.post("/createReview",createReview);

// Admin Routes (protected with authentication middleware)
app.get("/admin", authenticateJWT, (req, res) => res.render("admin"));
app.get("/admin/blogs", authenticateJWT, getAllBlogs); // Display all blogs in admin panel
app.get("/admin/blogs/create", authenticateJWT, displayCreateBlogForm); // Display form to create a new blog
app.post("/admin/blogs/create", authenticateJWT, uploadBlogImage, createBlog); // Create a new blog
app.get("/admin/beer", authenticateJWT, getAllBeers); // Display all beers in admin panel
app.get("/admin/beer/create", authenticateJWT, displayCreateBeerForm); // Display form to create a new beer
app.post("/admin/beer/create", authenticateJWT, uploadBeerImage, createBeer); // Create a new beer

app.listen(5000, () => {
    console.log("server is working");
});
