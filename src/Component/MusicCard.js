import React, { useContext } from "react";
import { useHistory } from "react-router";
import BaseContext from "../Context/BaseContext";
import "./Styles/MusicCard.css";

export default function MusicCard(props) {
    const history = useHistory();
    const context = useContext(BaseContext);
    const shrink = (text)=>{
        if(window.innerWidth <= 400){
            if(text.length < 15)return text;
            return text.substr(0,15)+"..";
        }else{
            if(text.length < 20)return text;
            return text.substr(0,20)+"...";
        }
    }

    const playSong = async ()=>{
        context.setcurMusic(props.id);
        const audio = document.getElementById("audio");
        
        console.log(audio)
        if(audio != null) audio.currentTime = 0;
        await audio.load();
        const out = audio.play();
        const playPause = document.getElementById("playPause");
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
    }


    if (props.liked) {
        return (
            <div class="musicCardCont" onClick={playSong}>
                <div class="songDetail">
                    {context.curMusic._id !== props.id._id?(<i class="far fa-play-circle songStatus"></i>):(<i class="far fa-pause-circle songStatus"></i>)}
                    <img src={props.src} class="songImg"/>
                    <span>{shrink(props.name)}<br/><span class="singerName">{shrink(props.singer)}</span></span>
                </div>
                <div class="songLike">
                    {props.likes}
                    <i class="far fa-heart"></i>
                </div>
            </div>
        );
    } else {
        return (
            <div class="musicCardCont"  onClick={playSong} style={context.curMusic._id === props.id._id?{color:"#005180"}:{}}>
                <div class="songDetail">
                    {context.curMusic._id !== props.id._id?(<i class="far fa-play-circle songStatus"></i>):(<i class="far fa-pause-circle songStatus"></i>)}
                    <img src={props.src} class="songImg" align="middle"/>
                    <span>{shrink(props.name)}<br/><span class="singerName">{shrink(props.singer)}</span></span>
                </div>
                <div class="songLike">
                    {props.likes}
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        );
    }
}
