import React, { useContext, useEffect } from 'react'
import BaseContext from '../Context/BaseContext'
import "./Styles/PlayListCard2.css"

export default function PlaylistCard2(props) {

    const context = useContext(BaseContext);

    const addSong = async ()=>{
        var data = {
            "token":localStorage.getItem("jwtTokken"),
            "songs":JSON.stringify(context.curMusic)
        }
        console.log("/api/playlist/",props.id.id, context.curMusic);
        data = await context.callApi("/api/playlist/"+props.id.id,"PUT", data);
        console.log(data);
    }

    useEffect(()=>{
        console.log(props.name, props.creator);
    },[])

    return (
        <div class="playListCardCont" style={{backgroundImage:`url(${props.src})`, backgroundSize:"cover", backgroundPosition:"center"}} onClick={addSong}>
                        {/* <img src={props.src} class="albumcover" alt="album cover"/> */}
            <div class="details">
                <div class="playListName">{props.name}</div>
                <div class="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
