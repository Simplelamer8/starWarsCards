import React from 'react'
import styles from "./StarshipCards.module.css";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { InputContext } from '@/app/page';

export function StarshipCards(props:any) {

    const [results, setResults] : [any, any] = useState(props.results);
    const [starshipsData, setStarshipsData]:[any, any] = useState(null);

    
    const inputValue = useContext(InputContext).toLowerCase();

    useEffect(() => {
        setStarshipsData(new Array(props.results.length).fill("hide"));
    }, [])

    function fetchMoreCards()
    {
        axios.get(`http://swapi.dev/api/starships/${starshipsData.length + 1}/`)
        .then((response) => {
            debugger;
            setResults([...results, response.data]);
            setStarshipsData([...starshipsData, "hide"]);
        })
        .catch((error) => {
            alert("No more cards are avaiable...");
            console.log(error);
            return;
        })
    }

    function filterCards(card:any)
    {
        const name = card.name;
        const model = card.model;
        const passengers = card.passengers;
        const starshipClass = card.starship_class;
        const capacity = card.cargo_capacity;
        const cost = card.cost_in_credits;
        const crew = card.crew;
        const manu = card.manufacturer;
        return name.includes(inputValue) || model.includes(inputValue) || passengers.includes(inputValue) || starshipClass.includes(inputValue) || capacity.includes(inputValue) || cost.includes(inputValue) || crew.includes(inputValue) || manu.includes(inputValue);
    }

  return (
    <div className={styles.container}>
        {
            starshipsData && results.map((item:any, index:number) => (
                filterCards(item) && 
                <div key={index} className={styles.card}>
                    <p>{item.name}</p>
                    <p>Model: {item.model}</p>
                    <p>Passengers: {item.passengers}</p>
                    <p>Starship class: {item.starship_class}</p>
                    <p>Cargo capacity: {item.cargo_capacity}</p>
                    <p>Cost in credits: {item.cost_in_credits}</p>
                    <p>Crew: {item.crew}</p>
                    <p>Manufacturer: {item.manufacturer}</p>
                </div>
            ))
        }
        <button onClick={fetchMoreCards}>Get 1 more card</button>
    </div>
  )
}
