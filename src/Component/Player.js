import "./Styles/Player.css";

import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";

export default function Player(props) {
    var playPause, audio, timerDot, curTimeAudio, songtimeslider, volumeSlider, curVolume, volumeDot, curTimeShow, fullTimeShow, volumeLogo;
    const context = useContext(BaseContext);
    setTimeout(() => {
        playPause = document.getElementById("playPause");
        audio = document.querySelector("audio");
        timerDot = document.getElementById("timerDot");
        curTimeAudio = document.getElementById("curTimeAudio");
        songtimeslider = document.getElementById("songtimeslider");
        volumeSlider = document.getElementById("volumeSlider");
        curVolume = document.getElementById("curVolume");
        volumeDot = document.getElementById("volumeDot");
        curTimeShow = document.getElementById("curTimeShow");
        fullTimeShow = document.getElementById("fullTimeShow");
        volumeLogo = document.getElementById("volumeLogo");
    }, 0);


    const shrink = (text)=>{
        if(!text) return "";
        if(window.innerWidth <= 400){
            if(text.length < 15)return text;
            return text.substr(0,15)+"..";
        }else{
            if(text.length < 20)return text;
            return text.substr(0,20)+"...";
        }
    }

    const getTime = (x) => {
        var min = parseInt(x / 60);
        var sec = parseInt(x % 60);
        return `${min > 9 ? "" : "0"}${min}:${sec > 9 ? "" : "0"}${sec}`;
    };

    const songTimeSliderHandler = (e) => {
        const pos = e.clientX - songtimeslider.offsetLeft;
        if (pos < 0 || pos > window.innerWidth * 0.35) return;
        curTimeAudio.style.width = pos + "px";
        timerDot.style.left = pos - 5 + "px";
        audio.currentTime =
            audio.duration * (pos / (window.innerWidth * 0.35));
    };

    const volumeSliderHandle = (e) => {
        const pos = e.clientX - volumeSlider.offsetLeft;
        if (pos < 0 || pos > 100) return;
        volumeDot.style.left = pos - 5 + "px";
        curVolume.style.width = pos + "px";
        audio.volume = pos / 100;
        console.log(audio.volume);
        if (audio.volume == 0) {
            volumeLogo.setAttribute("class", "fas fa-volume-mute");
        } else if (audio.volume < 0.5) {
            volumeLogo.setAttribute("class", "fas fa-volume-down");
        } else {
            volumeLogo.setAttribute("class", "fas fa-volume-up");
        }
    };

    const lastSong = async ()=>{
        if(context.curMusic.index == 0)return;
        else {
            context.setcurMusic(context.curQueue[context.curMusic.index - 1]);
            audio.currentTime = 0;
            await audio.load();
            audio.play();
        }
    }

    const nextSong = async ()=>{
        if(context.curMusic.index == context.curQueue.length - 1)return;
        else {
            context.setcurMusic(context.curQueue[context.curMusic.index + 1]);
            audio.currentTime = 0;
            await audio.load();
            audio.play();
        }
    }
    const timeUpdate = () => {
        if(!audio) return;
        const dist =
            (audio.currentTime / audio.duration) * window.innerWidth * 0.35;
        curTimeAudio.style.width = dist + "px";
        timerDot.style.left = dist - 5 + "px";
        curTimeShow.innerHTML = getTime(audio.currentTime);
        fullTimeShow.innerHTML = getTime(audio.duration);
        if(audio.currentTime === audio.duration) {
            nextSong();
        }
    };

    const playHandle = (e) => {
        if (playPause.classList.contains("fa-pause")) {
            playPause.classList.remove("fa-pause");
            playPause.classList.add("fa-play");
            audio.pause();
        } else {
            playPause.classList.remove("fa-play");
            playPause.classList.add("fa-pause");
            audio.play();
        }
    };

    const muteHandle = ()=>{
        volumeLogo.setAttribute("class", "fas fa-volume-mute");
        volumeDot.style.left = 0+ "px";
        curVolume.style.width = 0 + "px";
        audio.volume = 0;
    }

    return (
        <div className="playerCont">
            <audio src={context.curMusic.audio} id="audio" onTimeUpdate={timeUpdate} muted={false}></audio>
            <div className="songDetails flex">
                <img
                    src={context.curMusic.clip}
                    alt=""
                    width="70px"
                    height="70px"
                />
                <div className="playersongDetail">
                    <div className="playersongName">{shrink(context.curMusic.name)}</div>
                    <div className="playersinger">{shrink(context.curMusic.singer)}</div>
                </div>
                <i className={`${props.liked == false?"far":"fas"} fa-heart`} id="playerliked"></i>
            </div>
            <div className="sliderCont">
                <div className="volumeCont flex">
                    <i className="fas fa-step-backward action" onClick={lastSong}></i>
                    <i className="fas fa-play" id="playPause" onClick={playHandle}></i>
                    <i className="fas fa-step-forward action" onClick={nextSong}></i>
                </div>
                <div className="timerCont flex">
                    <div className="initTime" id="curTimeShow">
                        00:00
                    </div>
                    <div className="songtimerslider" id="songtimeslider" onClick={songTimeSliderHandler}>
                        <div className="dot" id="timerDot"></div>
                        <div id="curTimeAudio"></div>
                    </div>
                    <div className="completeTime" id="fullTimeShow">
                        00:00
                    </div>
                </div>
            </div>
            <div className="flex">
                <i className="fas fa-volume-up" id="volumeLogo" onClick={muteHandle}></i>
                <div className="volumeSlider" id="volumeSlider" onClick={volumeSliderHandle}>
                    <div className="dot" id="volumeDot"></div>
                    <div id="curVolume"></div>
                </div>
            </div>
        </div>
    );
}
