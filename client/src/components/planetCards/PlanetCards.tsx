import React from 'react'
import styles from "./PlanetCards.module.css";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { InputContext } from '@/app/page';

export function PlanetCards(props:any) {
    const [results, setResults] : [any, any] = useState(props.results);
    const [planetsData, setPlanetsData]: [any, any] = useState(null);


    const inputValue = useContext(InputContext).toLowerCase();

    useEffect(() => {
        setPlanetsData(new Array(props.results.length).fill("hide"));
    }, [])

    function fetchMoreCards()
    {
        axios.get(`http://swapi.dev/api/planets/${planetsData.length + 1}/`)
        .then((response) => {
            debugger;
            setResults([...results, response.data]);
            setPlanetsData([...planetsData, "hide"]);
        })
        .catch((error) => {
            alert("No more cards are avaiable...");
            console.log(error);
            return;
        })
    }


    function filterCards(card:any)
    {
        debugger;
        const name = card.name.toLowerCase();
        const climate = card.climate.toLowerCase();
        const diameter = card.diameter.toLowerCase();
        const gravity = card.gravity.toLowerCase();
        const orbitalPeriod = card.orbital_period.toLowerCase();
        const population = card.population.toLowerCase();
        const terrain = card.terrain.toLowerCase();
        const rotationPeriod = card.rotation_period.toLowerCase();
        return terrain.includes(inputValue) || rotationPeriod.includes(inputValue) || name.includes(inputValue) || climate.includes(inputValue) || diameter.includes(inputValue) || gravity.includes(inputValue) || orbitalPeriod.includes(inputValue) || population.includes(inputValue); 
    }

  return (
    <div className={styles.container}>
        {
            planetsData && results.map((item:any, index:number) => (
                filterCards(item) && 
                <div key={index} className={styles.card}>
                    <p>{item.name}</p>
                    <p>Climate: {item.climate}</p>
                    <p>Diameter: {item.diameter}km</p>
                    <p>Gravity: {item.gravity}</p>
                    <p>Orbital period: {item.orbital_period}</p>
                    <p>Population: {item.population}</p>
                    <p>Terrain: {item.terrain}</p>
                    <p>Rotation period: {item.rotation_period}</p>
                </div>
            ))
        }
        <button onClick={fetchMoreCards}>Get 1 more card</button>
    </div>
  )
}
