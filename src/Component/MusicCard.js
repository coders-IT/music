import React, { useContext } from "react";
import { useHistory } from "react-router";
import BaseContext from "../Context/BaseContext";
import "./Styles/MusicCard.css";

export default function MusicCard(props) {
    const history = useHistory();
    const context = useContext(BaseContext);
    const shrink = (text) => {
        if (window.innerWidth <= 400) {
            if (text.length < 15) return text;
            return text.substr(0, 15) + "..";
        } else {
            if (text.length < 20) return text;
            return text.substr(0, 20) + "...";
        }
    };

    const playSong = async () => {
        context.setcurMusic(props.id);
        const audio = document.getElementById("audio");

        console.log(audio);
        if (audio != null) audio.currentTime = 0;
        await audio.load();
        const out = audio.play();
        const playPause = document.getElementById("playPause");
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        const playPause2 = document.getElementById("playPause2");
        playPause2.classList.remove("fa-play");
        playPause2.classList.add("fa-pause");
        context.setsearchResultshow(false);
    };

    if (props.liked == false) {
        return (
            <div
                className="musicCardCont"
                onClick={playSong}
                style={
                    context.curMusic._id === props.id._id
                        ? { backgroundColor: "#0b2266" }
                        : {}
                }
            >
                <div className="songDetail">
                    {context.curMusic._id !== props.id._id ? (
                        <i className="far fa-play-circle songStatus"></i>
                    ) : (
                        <i className="far fa-pause-circle songStatus"></i>
                    )}
                    <img src={props.src} className="songImg" />
                    <span>
                        {shrink(props.name)}
                        <br />
                        <span className="singerName">{shrink(props.singer)}</span>
                    </span>
                </div>
                <div className="songLike">
                    {props.likes}
                    <i className="far fa-heart"></i>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="musicCardCont"
                onClick={playSong}
                style={
                    context.curMusic._id === props.id._id
                        ? { backgroundColor: "#0b2266" }
                        : {}
                }
            >
                <div className="songDetail">
                    {context.curMusic._id !== props.id._id ? (
                        <i className="far fa-play-circle songStatus"></i>
                    ) : (
                        <i className="far fa-pause-circle songStatus"></i>
                    )}
                    <img src={props.src} className="songImg" align="middle" />
                    <span>
                        {shrink(props.name)}
                        <br />
                        <span className="singerName">{shrink(props.singer)}</span>
                    </span>
                </div>
                <div className="songLike">
                    {props.likes}
                    <i className="fas fa-heart"></i>
                </div>
            </div>
        );
    }
}
