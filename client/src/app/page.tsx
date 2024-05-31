"use client"
import styles from "./page.module.css";
import { FilmCards } from "@/components/filmCards/FilmCards";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { PeopleCards } from "@/components/peopleCards/PeopleCards";
import { PlanetCards } from "@/components/planetCards/PlanetCards";
import { StarshipCards } from "@/components/starshipsCards/StarshipCards";

export const InputContext = createContext("");

export default function Home() {
  const [inputValue, setInputValue]:[string, any] = useState("");
  const [filmsData, setFilmsData]:[any, any] = useState(null);
  const [peopleData, setPeopleData]:[any, any] = useState(null);
  const [planetsData, setPlanetsData]:[any, any] = useState(null);
  const [starshipsData, setStarshipsData]:[any, any] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/films")
    .then((response) => {
      setFilmsData(response.data);
    });

    axios.get("http://localhost:5000/api/people")
    .then((response) => {
      setPeopleData(response.data);
    })

    axios.get("http://localhost:5000/api/planets")
    .then((response) => {
      setPlanetsData(response.data);
    })

    axios.get("http://localhost:5000/api/starships")
    .then((response) => {
      console.log(response.data);
      setStarshipsData(response.data);
    })
  }, [])
  return (
    <main className={styles.main}>
      <form>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      </form>
      <InputContext.Provider value={inputValue}>
        {filmsData && <FilmCards {...filmsData} />}
        {peopleData && <PeopleCards {...peopleData} />}
        {planetsData && <PlanetCards {...planetsData} />}
        {starshipsData && <StarshipCards {...starshipsData} /> }
      </InputContext.Provider>
    </main>
  );
}
