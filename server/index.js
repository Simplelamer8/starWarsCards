const expresss = require("express");
const cors = require("cors");
const axios = require("axios");
const app = expresss();

const PORT = process.env.PORT || 5000;

app.use(expresss.json());
app.use(cors());

app.get("/api/films", (req, res) => {
    let filmsResponse;
    axios.get("https://swapi.dev/api/films/")
    .then((response) => {
        filmsResponse = response.data
    })
    .then(() => {
        console.log(filmsResponse);
        res.json(filmsResponse)
    })
})

app.get("/api/people", (req, res) => {
    let peopleResponse;
    axios.get("https://swapi.dev/api/people/")
    .then((response) => {
        peopleResponse = response.data;
    })
    .then(() => {
        res.json(peopleResponse);
    })
})

app.get("/api/planets", (req, res) => {
    let planetResponse;
    axios.get("https://swapi.dev/api/planets/")
    .then((response) => {
        planetResponse = response.data;
    })
    .then(() => {
        res.json(planetResponse);
    })
})

app.get("/api/starships", (req, res) => {
    let starshipsResponse;
    axios.get("https://swapi.dev/api/starships/")
    .then((response) => {
        starshipsResponse = response.data;
    })
    .then(() => {
        res.json(starshipsResponse);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})