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
        <div className="playListCardCont" style={{backgroundImage:`url(${props.src})`, backgroundSize:"cover", backgroundPosition:"center"}} onClick={addSong}>
                        {/* <img src={props.src} className="albumcover" alt="album cover"/> */}
            <div className="details">
                <div className="playListName">{props.name}</div>
                <div className="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
