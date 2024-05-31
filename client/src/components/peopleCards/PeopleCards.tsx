import React from 'react'
import styles from "./PeopleCards.module.css";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { InputContext } from '@/app/page';

export function PeopleCards(props:any) {
    const [results, setResults] : [any, any] = useState(props.results);
    const [peoplesData, setPeoplesData]: [any, any] = useState(null);


    const inputValue = useContext(InputContext).toLowerCase();

    useEffect(() => {
        setPeoplesData(new Array(props.results.length).fill("hide"));
    }, [])

    function fetchMoreCards()
    {
        axios.get(`http://swapi.dev/api/people/${peoplesData.length + 1}/`)
        .then((response) => {
            debugger;
            setResults([...results, response.data]);
            setPeoplesData([...peoplesData, "hide"]);
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
        const eyeColor = card.eye_color.toLowerCase();
        const gender = card.gender.toLowerCase();
        const height = card.height.toLowerCase();
        const hairColor = card.hair_color.toLowerCase();
        const skinColor = card.skin_color.toLowerCase();
        return name.includes(inputValue) || eyeColor.includes(inputValue) || gender.includes(inputValue) || height.includes(inputValue) || hairColor.includes(inputValue) || skinColor.includes(inputValue); 
    }


  return (
    <div className={styles.container}>
        {
            peoplesData && results.map((item:any, index:number) => (
                filterCards(item) &&
                <div key={index} className={styles.card}>
                    <p>{item.name}</p>
                    <p>eye color: {item.eye_color}</p>
                    <p>gender: {item.gender}</p>
                    <p>height: {item.height}</p>
                    <p>hair color: {item.hair_color}</p>
                    <p>skin color: {item.skin_color}</p>
                </div>
            ))
        }
        <button onClick={fetchMoreCards}>Get 1 more card</button>
    </div>
  )
}
