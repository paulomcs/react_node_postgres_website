import React from "react"
import Card from "./Card.js"
import dadosFilmes from "../data/films.js"
import {useEffect, useState} from "react";

export default function MainContent(){
    
    
    let [filmes, setFilmes] = useState([])
    useEffect(() => {
        dadosFilmes()
            .then((res) => { setFilmes(res.data) })
            .catch((err)=>{
                console.error("ERROOOU")
            })
    }, [])
        
    console.log("FILMES NO MAIN = "+filmes)

    const elem = filmes.map(filme =>{
        return <Card
            nome={filme["titulo"]}
            categoria={filme["nome"]}
            datas={filme["datas"]}
            img={filme["img"]}
            id={filme["id"]}
        />
    })
    
    return(
        <div>
            <div className="movies-container">
                {elem}
            </div>
        </div>
    )

}