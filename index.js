const express = require("express");
const router = require('./server/apis');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static("build"));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use('/api', router);