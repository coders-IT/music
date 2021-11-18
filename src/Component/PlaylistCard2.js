import React, { useContext } from 'react'
import BaseContext from '../Context/BaseContext'
import "./Styles/PlayListCard2.css"

export default function PlaylistCard2(props) {

    const context = useContext(BaseContext);

    const addSong = async ()=>{
        var data = {
            "token":localStorage.getItem("jwtTokken"),
            "songs":[context.curMusic._id]
        }
        console.log("/api/playlist/edit/"+props.id);
        data = await context.callApi("/api/playlist/edit/"+props.id,"POST", data);
        console.log(data);
    }

    return (
        <div class="playListCardCont2" style={{backgroundImage:`url(${props.src})`, backgroundSize:"cover", backgroundPosition:"center"}} onClick={addSong}>
            {/* <img src={props.src} class="albumcover" alt="album cover"/> */}
            <div class="details">
                <div class="playListName">{props.name}</div>
                <div class="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
