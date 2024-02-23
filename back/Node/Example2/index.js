var express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send('Hello world!')
})

app.post("/", (req, res) => {
    res.send('Hello world!')
})

app.get("/params", (req, res) => {
    console.log("query", req.query);
    console.log("Param", req.params);
    console.log("body", req.body);
    res.send('Hello Params!')
})

app.get("/params/:id", (req, res) => {
    console.log("query", req.query);
    console.log("Param", req.params);
    console.log("body", req.body);
    res.send(`Hello Params ID! ${req.params.id}`)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
