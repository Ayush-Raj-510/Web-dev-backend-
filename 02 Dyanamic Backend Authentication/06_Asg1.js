// Build a Node.js API with JWT authentication where POST / signin returns a JWT for valid credentials,
// and GET / users returns the list of users only if a valid JWT is provided; otherwise, return a 403 Forbidden response.

// The application has two endpoints.The first endpoint, POST / signin, accepts a username and password,
// validates them against the database, and if they are correct, generates a JWT using jwt.sign().The client stores this token.
// For protected endpoints like GET / users, the client sends the token in the Authorization: Bearer < token > header.
// A middleware verifies the token using jwt.verify().If the token is valid, the request proceeds and the list of users is returned.
// If the token is missing or invalid, the server responds with 403 Forbidden.
// This is a stateless authentication mechanism because the server does not need to maintain session data.

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const JWT_SECRET = "mysecretkey";

// Fake Database
const users = [
    {
        username: "ayush",
        password: "123456"
    },
    {
        username: "admin",
        password: "admin123"
    },
    {
        username: "rahul",
        password: "rahul123"
    }
];


// =====================
// SIGN IN
// =====================

app.post("/signin", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            username: username
        },
        JWT_SECRET
    );

    res.json({
        token: token
    });

});


// =====================
// AUTH MIDDLEWARE
// =====================

function auth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(403).json({
            message: "Token Missing"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();

    } catch {

        return res.status(403).json({
            message: "Invalid Token"
        });

    }

}


// =====================
// GET USERS
// =====================

app.get("/users", auth, (req, res) => {

    const allUsers = users.map(user => ({
        username: user.username
    }));

    res.json(allUsers);

});


app.listen(3000, () => {
    console.log("Server Running...");
});