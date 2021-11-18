import React from 'react'
import "./Styles/PlayListCard.css"

export default function PlayListCard(props) {
    console.log("src",props.src)
    return (
        <div class="playListCardCont" style={{backgroundImage:`url(${props.src})`, backgroundSize:"cover", backgroundPosition:"center"}}>
            {/* <img src={props.src} class="albumcover" alt="album cover"/> */}
            <div class="details">
                <div class="playListName">{props.name}</div>
                <div class="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
