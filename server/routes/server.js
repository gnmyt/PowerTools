const {checkServer} = require("../controller/shell");
const app = require("express").Router();

app.post("/check", (req, res) => {
    checkServer(req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(400).json({status: "failed", message: err});
    });
});

module.exports = app;