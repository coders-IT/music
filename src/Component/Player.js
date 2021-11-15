import "./Styles/Player.css";

import React from "react";

export default function Player() {
    var playPause, audio, timerDot, curTimeAudio, songtimeslider, volumeSlider, curVolume, volumeDot, curTimeShow, fullTimeShow, volumeLogo;

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


    const timeUpdate = () => {
        const dist =
            (audio.currentTime / audio.duration) * window.innerWidth * 0.35;
        curTimeAudio.style.width = dist + "px";
        timerDot.style.left = dist - 5 + "px";
        curTimeShow.innerHTML = getTime(audio.currentTime);
        fullTimeShow.innerHTML = getTime(audio.duration);
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

    return (
        <div className="playerCont">
            <audio src="https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/Jag%20Ghoomeya%20128%20Kbps.mp3?alt=media&token=ae95cea5-7e1b-4f27-87e3-f6c85846c2ab" id="song" onTimeUpdate={timeUpdate}></audio>
            <div className="songDetails flex">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=media&token=d4caef00-6f0c-4310-9949-59a2c1bd403a"
                    alt=""
                    width="70px"
                    height="70px"
                />
                <div className="playersongDetail">
                    <div className="playersongName">Deepak Kumar</div>
                    <div className="playersinger">Deepak</div>
                </div>
                <i className="fas fa-heart" id="playerliked"></i>
            </div>
            <div className="sliderCont">
                <div className="volumeCont flex">
                    <i className="fas fa-step-backward action"></i>
                    <i className="fas fa-play" id="playPause" onClick={playHandle}></i>
                    <i className="fas fa-step-forward action"></i>
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
                <i className="fas fa-volume-up" id="volumeLogo"></i>
                <div className="volumeSlider" id="volumeSlider" onClick={volumeSliderHandle}>
                    <div className="dot" id="volumeDot"></div>
                    <div id="curVolume"></div>
                </div>
            </div>
        </div>
    );
}
