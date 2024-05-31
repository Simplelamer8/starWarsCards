import React, { useContext, useEffect, useState } from 'react'
import styles from "./FilmCards.module.css"
import axios from 'axios';
import { InputContext } from '@/app/page';

export function FilmCards(props:any) {
    const [filmsData, setFilmsData]: [any, any] = useState(null);
    const [results, setResults] : [any, any] = useState(props.results);
    useEffect(() => {
        setFilmsData(new Array(props.results.length).fill("hide"));
    }, [])

    const inputValue = useContext(InputContext).toLowerCase();

    function fetchMoreCards()
    {
        axios.get(`http://swapi.dev/api/films/${filmsData.length + 1}/`)
        .then((response) => {
            setResults([...results, response.data]);
            setFilmsData([...filmsData, "hide"]);
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
        let title = card.title.toLowerCase();
        let openingCrawl = card.opening_crawl.toLowerCase();
        return title.includes(inputValue.toLowerCase()) || openingCrawl.includes(inputValue.toLowerCase());
    }

  return (
    <div className={styles.container}>
        {
            filmsData && results && results.map((item:any, index:number) => (
                filterCards(item) && 
                <div key={index} className={styles.card}>
                    <div className={filmsData[index] === "hide" ? styles.hideItem : styles.showItem}>
                        <h2>{item.title}</h2>
                        <p>
                            {item.opening_crawl}
                        </p>
                    </div>
                    <button onClick={() => {
                        setFilmsData(filmsData.map((filmElem:any, filmIndex:number) => {
                            if (filmIndex === index)
                            {
                                if (filmElem === "hide")
                                {
                                    return "show";   
                                }   
                                else 
                                {
                                    return "hide";
                                }
                            }
                            else
                            {
                                return filmElem;
                            }
                        }))
                    }}>{filmsData[index] === "hide" ? "Learn More" : "Hide details"}</button>
                </div>
            ))
        }
        <button onClick={fetchMoreCards}>Get more Cards</button>
    </div>
  )
}
