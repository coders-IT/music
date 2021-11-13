import React from "react";
import "./Styles/MusicCard.css";

export default function MusicCard(props) {

    const shrink = (text)=>{
        if(window.innerWidth <= 400){
            if(text.length < 15)return text;
            return text.substr(0,15)+"..";
        }else{
            if(text.length < 20)return text;
            return text.substr(0,20)+"...";
        }
    }

    if (props.liked) {
        return (
            <div class="musicCardCont">
                <div class="songDetail">
                    {props.playing?(<i class="far fa-play-circle songStatus"></i>):(<i class="far fa-pause-circle songStatus"></i>)}
                    <img src={props.src} class="songImg"/>
                    <span>{shrink(props.name)}<br/><span class="singerName">Deepak Kumar</span></span>
                </div>
                <div class="songLike">
                    {props.likes}
                    <i class="far fa-heart"></i>
                </div>
            </div>
        );
    } else {
        return (
            <div class="musicCardCont">
                <div class="songDetail">
                    {props.playing?(<i class="far fa-play-circle songStatus"></i>):(<i class="far fa-pause-circle songStatus"></i>)}
                    <img src={props.src} class="songImg" align="middle"/>
                    <span>{shrink(props.name)}<br/><span class="singerName">Deepak Kumar</span></span>
                </div>
                <div class="songLike">
                    {props.likes}
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        );
    }
}
