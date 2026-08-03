const express = require("express");
const port = 3000;
const app = express();

app.get("/healthCheckup", function (req, res) {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyid = req.query.kidneyid;

    if (username != "ayush" && password != "pass"){
        res.status(400).json({
            msg: "unauthorised user access"
        })
        return;
    }
    if (kidneyid != 1 || kidneyid != 2) {
        res.status(403).json({
            msg: "invalid input"
        })
    }
    res.status(200).json({
        msg: "all kidneys are fine"
    })
})
app.listen(port);
console.log("server is running at http://localhost:3000/healthCheckup")