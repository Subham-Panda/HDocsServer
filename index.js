const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const reportController = require("./controllers/reportController");

const DB = 'mongodb+srv://Subham:7ZCIIFEHaA8Jk89c@cluster0.qofs7.mongodb.net/hdocsDatabase?retryWrites=true&w=majority'
mongoose
    // .connect(process.env.DATABASE_LOCAL, {
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connections successful'));


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
    res.send("working");
});

app.post('/api/report/all', reportController.getReports);
app.post('/api/report/add', reportController.createReport);


app.all('*', (req, res, next) => {
    return res.status(404).json({
        status: 'fail',
        message: 'Invalid endpoint',
    })
});

app.listen(8000, () => {
    console.log(`Example app listening at 8000`);
});

module.exports = app;