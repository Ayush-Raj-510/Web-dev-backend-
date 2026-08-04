const express = require("express");
const zod = require("zod");
const port = 3005;
const app = express();

app.use(express.json()); 
const schema = zod.object({
    email: zod.string().email(),              // must be a valid email
    password: zod.string().min(8),            // at least 8 characters
    country: zod.literal("IN").or(zod.literal("US")), // only IN or US
    kidneys: zod.array(zod.number())          // array of numbers
});

app.post("/hc", function (req, res) {
    const response = schema.safeParse(req.body);
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