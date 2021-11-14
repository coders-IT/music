import React from 'react'
import "./Styles/PlayListCard.css"

export default function PlayListCard(props) {
    return (
        <div class="playListCardCont">
            <div class="followers">Follwers {props.follower}</div>
            <img src={props.src} class="albumcover"/>
            <div class="details">
                <div class="playListName">{props.name}</div>
                <div class="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
