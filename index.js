import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "M7I2xAShQNBgHzqUkZHYKcxV3HoTaMpHi6evaaso"
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/images", async (req, res) => {
    let start = req.body["start-date"];
    let end = req.body["end-date"];
    const response = await axios.get("https://api.nasa.gov/neo/rest/v1/feed", { params: { start_date: start, end_date: end, api_key: apiKey, } })
    let arreglo = response.data['near_earth_objects'][end];
    console.log(arreglo);
    res.render("index.ejs", { arreglo })
})



app.listen(port, () => {
    console.log(`The server is on ${port} port`)
})