const express = require("express");
const zod = require("zod");
const port = 3005;
const app = express();

app.use(express.json()); 
const schema = zod.array(zod.number());
app.post("/hc", function (req, res) {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if (!response.success) {
        res.status(411).json({
            msg: "Invalid Input"
        })
    }
    else {
        res.send({
            response
        })
    }
})
app.listen(port);
console.log("server is running at http://localhost:3005")