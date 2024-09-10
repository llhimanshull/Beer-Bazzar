import { User } from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = '07082002';

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.redirect('/login');
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, secret);
        res.cookie('token', accessToken, { httpOnly: true });
        res.redirect('/admin');
    } else {
        res.status(401).send("Username or password incorrect");
    }
};

export const registerAdmin = async () => {
    const hashedPassword = await bcrypt.hash("Sangharsh@69", 10);
    await User.create({ username: "Ashwin@69", password: hashedPassword });
    console.log("Admin registered");
};

// registerAdmin();
