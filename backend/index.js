const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());


const connection = require("./config/config");


app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`connect to db on port ${process.env.PORT}`)
    }
    catch (err) {
        console.log(`err in connecting to db ${err}`)
    }
})