const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(express.json());

app.use(cors());


// use the short id for createing the is 
// think how we can delete after the 48hours
// mongo db specified tie delete

const connection = require("./config/config");

const URLSchema = require("./Models/urls")

app.get("/", (req, res) => {
    res.send("home page")
})

app.post("/", async (req, res) => {
    const { originalURL, shortURL } = req.body;
    console.log(shortURL)



    const url = await URLSchema.find({ shortURL });

    if (url.length === 1) {
        return res.json({ status: 400, "message": "This URL Name Is Already Present" })
    }

    const fullURL = "http://" + req.get('host') + "/" + shortURL;


    const newURL = new URLSchema({
        originalURL,
        shortURL,
        fullURL
    })
    newURL.save()

    res.send({ success: true, "message": fullURL })


})

app.get("/:shortURL", async (req, res) => {
    const { shortURL } = req.params;

    const data = await URLSchema.find({ shortURL });
    console.log(data.length)

    if (data.length <= 0) {
        res.send({ erroe: true, "msg": "Error 404, This url not Found" })
    }
    else {
        res.redirect(data[0].originalURL)
    }
})


app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`connect to db on port ${process.env.PORT}`)
    }
    catch (err) {
        console.log(`err in connecting to db ${err}`)
    }
})
