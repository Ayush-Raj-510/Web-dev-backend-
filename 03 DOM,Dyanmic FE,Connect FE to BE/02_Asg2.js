// Create a full - stack web application where the frontend collects the Principal(P), Rate of Interest(R), and Time(T) 
// from the user and sends these values
// to a backend server through an HTTP request.The backend should calculate both the Simple Interest(SI) and Compound Interest(CI),
// then send the calculated results back to the frontend.Finally, the frontend should display the
// Simple Interest and Compound Interest dynamically on the webpage without reloading the page.

const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "02_Asg2.html"));
});

app.post("/calculate", (req, res) => {
    const { principal, rate, time } = req.body;

    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);

    const simpleInterest = (p * r * t) / 100;
    const compoundInterest = p * Math.pow(1 + r / 100, t) - p;

    res.json({
        simpleInterest,
        compoundInterest
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});