import React, { useContext } from 'react'
import BaseContext from '../Context/BaseContext'
import "./Styles/PlayListCard.css"

export default function PlayListCard(props) {
    const context = useContext(BaseContext);
    const addSong = async ()=>{
        var data = {
            "token":localStorage.getItem("jwtTokken"),
            "songs":JSON.stringify(context.curMusic)
        }
        console.log("/api/playlist/",props.id.id, context.curMusic);
        data = await context.callApi("/api/playlist/"+props.id.id,"PUT", data);
        console.log(data);
        context.setshowAddto(false);
    }

    const open = ()=>{

    }

    
    return (
        <div class="playListCardCont" style={{backgroundImage:`url(${props.src})`, backgroundSize:"cover", backgroundPosition:"center"}} onClick={props.action=="create"?addSong:open}>
            <img src={props.src} class="albumcover" alt="album cover"/>
            <div class="details">
                <div class="playListName">{props.name}</div>
                <div class="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
