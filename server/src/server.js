
const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const { employeeRouter } = require('./routes/employee');

const port = process.env.PORT || '3000';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(employeeRouter);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

if (process.env.NODE_ENV != 'production') {
    app.use(cors());
}

app.listen(port, () => {
    console.log(`started on port - ${port}`);
});