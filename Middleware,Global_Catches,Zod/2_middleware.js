const express = require("express");
const app = express();
app.use(express.json());

// Authentication Middleware
function auth(req, res, next) {
    const token = req.headers.authorization;
    if (token !== "12345") {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    next();
}

// Input Validation Middleware
function validateUser(req, res, next) {
    const { name, age } = req.body;
    if (!name || age === undefined) {
        return res.status(400).json({
            message: "Name and Age are required"
        });
    }
    if (typeof age !== "number" || age < 18) {
        return res.status(400).json({
            message: "Age must be a number and at least 18"
        });
    }
    next();
}

// Route
app.post("/register", auth, validateUser, (req, res) => {
    res.json({
        message: "User Registered Successfully",
        user: req.body
    });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
