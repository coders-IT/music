import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import BaseContext from '../Context/BaseContext'
import "./Styles/PlayListCard.css"

export default function PlayListCard(props) {
    const context = useContext(BaseContext);

    const shrink = (x)=>{
        if(x.length > 12){
            return x.substr(0,12)+"..."
        }
        return x;
    }

    const addSong = async ()=>{
        var data = {
            "token":localStorage.getItem("jwtTokken"),
            "songs":JSON.stringify(context.curMusic)
        }
        //console.log("/api/playlist/",props.id.id, context.curMusic);
        await context.callApi("/api/playlist/"+props.id.id,"PUT", data);
        //console.log(data);
        context.setshowAddto(false);
    }
    const histroy = useHistory();
    const open = ()=>{
        context.setsearchResultshow(false);
        histroy.push("/playlist?id="+props.id.id);
        
    }

    
    return (
        <div className="playListCardCont" style={{backgroundImage:`url(${props.src})`, backgroundSize:"cover", backgroundPosition:"center"}} onClick={props.action==="create"?addSong:open}>
            <img src={props.src} className="albumcover" alt="album cover"/>
            <div className="details">
                <div className="playListName">{shrink(props.name)}</div>
                <div className="playListCreator">{props.creator}</div>
            </div>
        </div>
    )
}
