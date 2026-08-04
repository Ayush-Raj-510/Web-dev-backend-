const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "mySecretKey";

// Fake Database
const users = [];

/*
========================
REGISTER
========================
*/
app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to Database
    users.push({
        username,
        password: hashedPassword
    });

    res.json({
        message: "User Registered Successfully"
    });
});

/*
========================
LOGIN
========================
*/
app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    // Find User
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid Password"
        });
    }

    // Generate JWT
    const token = jwt.sign(
        {
            username: user.username
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login Successful",
        token: token
    });

});

/*
========================
JWT Middleware
========================
*/

function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token Missing"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if (err) {
            return res.status(403).json({
                message: "Invalid Token"
            });
        }

        req.user = decoded;
        next();

    });

}

/*
========================
PROTECTED ROUTE
========================
*/

app.get("/profile", verifyToken, (req, res) => {

    res.json({
        message: "Welcome",
        user: req.user
    });

});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});