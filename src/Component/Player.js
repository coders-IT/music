import "./Styles/Player.css";

import React, { useContext, useState } from "react";
import BaseContext from "../Context/BaseContext";
import { useHistory } from "react-router";

export default function Player(props) {
    // const [playClass, setplayClass] = useState()
    const [liked, setliked] = useState(false);
    var playPause,
        audio,
        timerDot,
        curTimeAudio,
        songtimeslider,
        volumeSlider,
        curVolume,
        volumeDot,
        curTimeShow,
        fullTimeShow,
        playPause2,
        nextsong,
        pervioussong,
        volumeLogo;
    const context = useContext(BaseContext);
    const histroy = useHistory();
    setTimeout(() => {
        playPause = document.getElementById("playPause");
        playPause2 = document.getElementById("playPause2");
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
        pervioussong = document.getElementById("pervioussong");
        nextsong = document.getElementById("nextsong");
        audio.ontimeupdate = timeUpdate;
    }, 100);

    const shrink = (text) => {
        if (!text) return "";

        if (text.length < 15) return text;
        return text.substr(0, 15) + "..";
    };

    const getTime = (x) => {
        var min = parseInt(x / 60);
        if (!min) min = 0;
        var sec = parseInt(x % 60);
        if (!sec) sec = 0;
        return `${min > 9 ? "" : "0"}${min}:${sec > 9 ? "" : "0"}${sec}`;
    };

    const songTimeSliderHandler = (e) => {
        const pos = e.clientX - songtimeslider.offsetLeft;
        if (pos < 0 || pos > window.innerWidth * 0.35) return;
        curTimeAudio.style.width = pos + "px";
        timerDot.style.left = pos - 5 + "px";
        audio.currentTime = audio.duration * (pos / (window.innerWidth * 0.35));
    };

    const volumeSliderHandle = (e) => {
        const pos = e.clientX - volumeSlider.offsetLeft;
        if (pos < 0 || pos > 100) return;
        volumeDot.style.left = pos - 5 + "px";
        curVolume.style.width = pos + "px";
        audio.volume = pos / 100;
        //console.log(audio.volume);
        if (audio.volume === 0) {
            volumeLogo.setAttribute("class", "fas fa-volume-mute");
        } else if (audio.volume < 0.5) {
            volumeLogo.setAttribute("class", "fas fa-volume-down");
        } else {
            volumeLogo.setAttribute("class", "fas fa-volume-up");
        }
    };

    const lastSong = async () => {
        if (context.curMusic.index === 0) return;
        else {
            if (!context.curMusic.index) {
                return;
            }
            context.setcurMusic(context.curQueue[context.curMusic.index - 1]);
            if (context.changeURL)
                histroy.push(
                    `/audio?id=${
                        context.curQueue[context.curMusic.index - 1]._id
                    }`
                );
            pervioussong.onClick=()=>{};
            nextsong.onClick=()=>{};
            audio.currentTime = 0;
            await audio.load();
            audio.play();
            pervioussong.onClick = lastSong;
            nextsong.onClick = nextSong;
            const playPause = document.getElementById("playPause");
            playPause.classList.remove("fa-play");
            playPause.classList.add("fa-pause");
            const playPause2 = document.getElementById("playPause2");
            playPause2.classList.remove("fa-play");
            playPause2.classList.add("fa-pause");
        }
    };

    const nextSong = async () => {
        if (context.curMusic.index === context.curQueue.length - 1) return;
        else {
            if (context.curMusic.index !== 0 && !context.curMusic.index) {
                return;
            }
            //console.log(context.curQueue, context.curMusic.index + 1);
            context.setcurMusic(context.curQueue[context.curMusic.index + 1]);
            if (context.changeURL)
                histroy.push(
                    `/audio?id=${
                        context.curQueue[context.curMusic.index + 1]._id
                    }`
                );
                pervioussong.onClick=()=>{};
                nextsong.onClick=()=>{};
            audio.currentTime = 0;
            await audio.load();
            audio.play();
            pervioussong.onClick = lastSong;
            nextsong.onClick = nextSong;
            const playPause = document.getElementById("playPause");
            playPause.classList.remove("fa-play");
            playPause.classList.add("fa-pause");
            const playPause2 = document.getElementById("playPause2");
            playPause2.classList.remove("fa-play");
            playPause2.classList.add("fa-pause");
        }
    };
    const timeUpdate = () => {
        if (!audio) return;
        const dist =
            (audio.currentTime / audio.duration) * window.innerWidth * 0.35;
        curTimeAudio.style.width = dist + "px";
        timerDot.style.left = dist - 5 + "px";
        curTimeShow.innerHTML = getTime(audio.currentTime);
        fullTimeShow.innerHTML = getTime(audio.duration);
        if (audio.currentTime === audio.duration) {
            nextSong();
        }
    };

    const playHandle = (e) => {
        if (playPause.classList.contains("fa-pause")) {
            playPause.classList.remove("fa-pause");
            playPause.classList.add("fa-play");
            playPause2.classList.remove("fa-pause");
            playPause2.classList.add("fa-play");
            audio.pause();
        } else {
            playPause.classList.remove("fa-play");
            playPause.classList.add("fa-pause");
            playPause2.classList.remove("fa-play");
            playPause2.classList.add("fa-pause");
            audio.play();
        }
    };

    const muteHandle = () => {
        volumeLogo.setAttribute("class", "fas fa-volume-mute");
        volumeDot.style.left = 0 + "px";
        curVolume.style.width = 0 + "px";
        audio.volume = 0;
    };

    const maxMusic = () => {
        //console.log(Object.keys(context.curMusic).length);
        if (Object.keys(context.curMusic).length === 0) return;
        if(context.changeURL === true){
            context.setchangeURL(false);
            histroy.push("/");
            return;
        }
        context.setchangeURL(true);
        histroy.push(`/audio?id=${context.curMusic._id}`);
    };

    const likeHandle = async () => {
        if (context.user === null) {
            context.setloginShow(true);
            return;
        } else {
            if (context.curMusic.liked === false) {
                //console.log("liking the song");
                var data = {
                    token: localStorage.getItem("jwtTokken"),
                };

                data = await context.callApi(
                    "/api/user/savesong/" + context.curMusic._id,
                    "POST",
                    data
                );

                var tempQue = context.curQueue;
                tempQue[context.curMusic.index].plays += 1;
                tempQue[context.curMusic.index].liked = true;
                context.setcurQueue(tempQue);
                context.setcurMusic(tempQue[context.curMusic.index]);
                //console.log(data);

                var curUser = context.user;
                curUser.savedAudio.push(context.curMusic._id);
                context.setuser(curUser);
            } else {
                //console.log("liking the song");
                data = {
                    token: localStorage.getItem("jwtTokken"),
                };

                await context.callApi(
                    "/api/user/unsavesong/" + context.curMusic._id,
                    "POST",
                    data
                );
                //console.log(data);
                //console.log(context.curMusic.index);
                tempQue = context.curQueue;
                tempQue[context.curMusic.index].plays -= 1;
                tempQue[context.curMusic.index].liked = false;
                context.setcurMusic(tempQue[context.curMusic.index]);
                context.setcurQueue(tempQue);
            }
            getLike();
        }
    };

    const getLike = () => {
        if (context.user === null) {
            setliked(false);
            return;
        }
        setliked(context.user.savedAudio.indexOf(context.curMusic._id) !== -1);
    };

    return (
        <div className="playerCont">
            <div className="songDetails flex">
                <img
                    src={context.curMusic.clip}
                    alt=""
                    width="70px"
                    height="70px"
                    className="coverimg"
                />
                <div className="playersongDetail">
                    <div className="playersongName">
                        {shrink(context.curMusic.name)}
                    </div>
                    <div className="playersinger">
                        {shrink(context.curMusic.singer)}
                    </div>
                </div>
                <i
                    className={`${liked === false ? "far" : "fas"} fa-heart`}
                    id="playerliked"
                    onClick={likeHandle}
                ></i>
            </div>

            <div className="sepratePause flex">
                <div className="sepratePlayer">
                <i
                    className="fas fa-play"
                    id="playPause2"
                    onClick={playHandle}
                ></i>
                </div>
                <i className={`fas ${context.changeURL === false ?"fa-angle-up":"fa-angle-down"}`} onClick={maxMusic}></i>
            </div>

            <div className="sliderCont">
                <div className="volumeCont flex">
                    <i className="fas fa-random"></i>
                    <i
                        className="fas fa-step-backward action"
                        onClick={lastSong}
                        id="pervioussong"
                    ></i>
                    <i
                        className="fas fa-play"
                        id="playPause"
                        onClick={playHandle}
                    ></i>
                    <i
                        className="fas fa-step-forward action"
                        onClick={nextSong}
                        id="nextsong"
                    ></i>
                    <i className={`fas ${context.changeURL === false ?"fa-angle-up":"fa-angle-down"}`} onClick={maxMusic}></i>
                </div>
                <div className="timerCont flex">
                    <div className="initTime" id="curTimeShow">
                        00:00
                    </div>
                    <div
                        className="songtimerslider"
                        id="songtimeslider"
                        onClick={songTimeSliderHandler}
                    >
                        <div className="dot" id="timerDot"></div>
                        <div id="curTimeAudio"></div>
                    </div>
                    <div className="completeTime" id="fullTimeShow">
                        00:00
                    </div>
                </div>
            </div>
            <div className="flex volume">
                <i
                    className="fas fa-volume-up"
                    id="volumeLogo"
                    onClick={muteHandle}
                ></i>
                <div
                    className="volumeSlider"
                    id="volumeSlider"
                    onClick={volumeSliderHandle}
                >
                    <div className="dot" id="volumeDot"></div>
                    <div id="curVolume"></div>
                </div>
            </div>
        </div>
    );
}
