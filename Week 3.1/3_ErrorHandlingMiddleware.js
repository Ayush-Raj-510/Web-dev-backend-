const express = require("express");
const port = 3002;
const app = express();
app.use(express.json());   // "Request body me aaya JSON data automatic object me convert karke req.body me store karo."

app.post("/hc", function (req, res) {
    const kidneys = req.body.kidneys;
    const kidneylength = kidneys.length;
    res.send("you have " + kidneylength + " kidneys");
})

// error handling middleware
app.use(function (err, req, res, next) {
    res.json({
        msg: "something wrong with server "
    })
})
app.listen(port);
console.log("server is running at http://localhost:3002")